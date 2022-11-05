import { Injectable } from '@nestjs/common';
import { ConsoleLogger } from '@nestjs/common/services';
import { isEmpty } from 'lodash';
import * as Rollbar from 'rollbar';
import { ILogger } from '../../domain/common/logger.interface';
import { Env } from '../../domain/config/environment.interface';
import { EnvService } from '../config/environment/environment.service';

@Injectable()
export class LoggerService extends ConsoleLogger implements ILogger {
    private rollbar: Rollbar;
    constructor(
        private readonly envSevice: EnvService,
    ) {
        super();
        const rollbarAccessToken = this.envSevice.getRollbarAccessToken();
        if (!isEmpty(rollbarAccessToken)) {
            this.rollbar = new Rollbar({
                accessToken: rollbarAccessToken,
                captureUncaught: true,
                captureUnhandledRejections: true,
                environment: this.envSevice.name(),
            });
        }
    }

    debug(context: string, message: string) {
        if (!this.envSevice.isEnv(Env.production)) {
            super.debug(message, context);
            if (this.rollbar) {
                this.rollbar.debug(message, context);
            }
        }
    }

    log(context: string, message: string) {
        super.log(message, context);
        if (this.rollbar) {
            this.rollbar.log(message, context);
        }
    }

    error(context: string, message: string, trace?: string) {
        super.error(message, trace, context);
        if (this.rollbar) {
            this.rollbar.error(message, trace, context);
        }
    }

    warn(context: string, message: string) {
        super.warn(message, context);
        if (this.rollbar) {
            this.rollbar.warn(message, context);
        }
    }

    verbose(context: string, message: string) {
        if (!this.envSevice.isEnv(Env.production)) {
            super.verbose(message, context);
        }
    }
}