import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IDatabaseConfig } from '../../../domain/config/database.interface';
import { Env, IEnvConfig } from '../../../domain/config/environment.interface';
import { IRollbarConfig } from '../../../domain/config/rollbar.interface';

@Injectable()
export class EnvService
    implements IEnvConfig, IDatabaseConfig, IRollbarConfig {
    constructor(
        private readonly configService: ConfigService
    ) { }

    getServeUrl(): string {
        return this.configService.get<string>('SERVE_URL');
    }

    getServePort(): number {
        return this.configService.get<number>('SERVE_PORT');
    }

    getRollbarAccessToken(): string {
        return this.configService.get<string>('ROLLBAR_ACCESS_TOKEN') ?? null;
    }

    getDatabaseHost(): string {
        return this.configService.get<string>('DATABASE_HOST');
    }

    getDatabasePort(): number {
        return this.configService.get<number>('DATABASE_PORT');
    }

    getDatabaseUser(): string {
        return this.configService.get<string>('DATABASE_USER');
    }

    getDatabasePassword(): string {
        return this.configService.get<string>('DATABASE_PASSWORD');
    }

    getDatabaseName(): string {
        return this.configService.get<string>('DATABASE_NAME');
    }

    getDatabaseSchema(): string {
        return this.configService.get<string>('DATABASE_SCHEMA');
    }

    getDatabaseSync(): boolean {
        return this.configService.get<boolean>('DATABASE_SYNCHRONIZE') ?? false;
    }

    type(): Env {
        const nodeEnv = this.configService.get<string>('NODE_ENV');
        return Env[nodeEnv];
    }

    name(): string {
        return this.configService.get<string>('NODE_ENV');
    }

    isEnv(type: Env): boolean {
        const nodeEnv = this.configService.get<string>('NODE_ENV');
        return Env[nodeEnv] == type;
    }
}