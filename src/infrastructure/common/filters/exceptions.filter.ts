import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { isEmpty } from 'lodash';
import {
    IExceptionMessage,
    IResponseFormat,
} from '../../../domain/common/response.interface';
import { LoggerService } from '../../logger/logger.service';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    constructor(private readonly logger: LoggerService) {}

    catch(exception: any, host: ArgumentsHost) {
        const now = Date.now();
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request: any = ctx.getRequest();
        const result: IResponseFormat = {
            statusCode: HttpStatus.OK,
            errors: [],
            metadata: {
                request: {},
                response: {},
                pagination: null,
            },
        } as IResponseFormat;
        const errors: IExceptionMessage[] = [];

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        if (exception instanceof BadRequestException) {
            status = exception.getStatus();
            const errResponse: any = exception.getResponse();
            if (Array.isArray(errResponse.message)) {
                errResponse.message.forEach((x) => {
                    errors.push({
                        code: HttpStatus[status],
                        message: x,
                        stack: exception.stack,
                    });
                });
            } else {
                errors.push({
                    code: HttpStatus[status],
                    message: exception.message,
                    stack: exception.stack,
                });
            }
        } else if (exception instanceof HttpException) {
            status = exception.getStatus();
            errors.push({
                code: HttpStatus[status],
                message: exception.message,
                stack: exception.stack,
            });
        } else if (exception instanceof Error) {
            const err = exception as Error;
            errors.push({
                code: HttpStatus[status],
                message: err.message,
                stack: err.stack,
            });
        } else {
            errors.push({
                code: HttpStatus[status],
                message: exception.message.error,
                stack: exception.stack,
            });
        }

        // Log message
        errors.forEach((message) =>
            this.logMessage(request, message, status, exception),
        );

        // Set result
        result.statusCode = status;
        result.metadata.request = {
            timestamp: new Date().toISOString(),
            method: request.method,
            path: request.url,
            params: !isEmpty(request.params) ? request.params : null,
            query: !isEmpty(request.query) ? request.query : null,
            body: !isEmpty(request.body) ? request.body : null,
        };
        result.metadata.response = {
            isArray: false,
            isPaginated: false,
            duration: `${Date.now() - now}ms`,
        };
        result.errors = errors;
        response.status(status).json(result);
    }

    private logMessage(
        request: any,
        message: IExceptionMessage,
        status: number,
        exception: any,
    ) {
        if (status === 500) {
            this.logger.error(
                `End Request for ${request.path}`,
                `method=${request.method} status=${status} code=${
                    message.code ?? null
                } message=${message.message ?? null}`,
                status >= 500 ? exception.stack : '',
            );
        } else {
            this.logger.warn(
                `End Request for ${request.path}`,
                `method=${request.method} status=${status} code=${
                    message.code ?? null
                } message=${message.message ?? null}`,
            );
        }
    }
}
