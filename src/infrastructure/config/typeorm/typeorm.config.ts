import {
    TypeOrmModuleAsyncOptions,
    TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { EnvModule } from '../environment/environment.module';
import { EnvService } from '../environment/environment.service';

export default class TypeOrmConfig {
    static getConfig(envService: EnvService): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: envService.getDatabaseHost(),
            port: envService.getDatabasePort(),
            username: envService.getDatabaseUser(),
            password: envService.getDatabasePassword(),
            database: envService.getDatabaseName(),
            synchronize: envService.getDatabaseSync(),
            migrationsRun: false,
            autoLoadEntities: true,
        };
    }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
    imports: [EnvModule],
    useFactory: async (
        envService: EnvService,
    ): Promise<TypeOrmModuleOptions> => {
        return TypeOrmConfig.getConfig(envService);
    },
    inject: [EnvService],
};
