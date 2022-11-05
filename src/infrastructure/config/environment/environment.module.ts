import { Module } from '@nestjs/common';
import { Global } from '@nestjs/common/decorators';
import { ConfigModule } from '@nestjs/config';
import { EnvService } from './environment.service';
import { validate } from './environment.validation';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [
                `./.env`,
                `./env/${process.env?.NODE_ENV ?? 'development'}.env`,
            ],
            validate: validate,
        }),
    ],
    controllers: [],
    providers: [EnvService],
    exports: [EnvService],
})
export class EnvModule {}
