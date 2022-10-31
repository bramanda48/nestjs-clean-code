import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { map, Observable } from 'rxjs';
import { IResponseFormat } from '../../../domain/common/response.interface';

export class ResponseFormat<T> {
    isArray: boolean;
    path: string;
    duration: string;
    method: string;
    data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, IResponseFormat<T>> {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<IResponseFormat<T>> {
        const now = Date.now();
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();

        return next.handle().pipe(
            map((data) => ({
                statusCode: 200,
                data,
                metadata: {
                    request: {
                        timestamp: new Date(now).toISOString(),
                        method: request.method,
                        path: request.url,
                        params: !isEmpty(request.params) ? request.params : null,
                        query: !isEmpty(request.query) ? request.query : null,
                        body: !isEmpty(request.body) ? request.body : null
                    },
                    response: {
                        isArray: Array.isArray(data),
                        isPaginated: false,
                        duration: `${Date.now() - now}ms`
                    },
                    pagination: null,
                }
            }) as IResponseFormat),
        );
    }
}