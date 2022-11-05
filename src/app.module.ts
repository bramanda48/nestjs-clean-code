import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EnvModule } from './infrastructure/config/environment/environment.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { RepoModule } from './infrastructure/repositories/repo.module';
import { TodoModule } from './presentation/controllers/todo/todo.module';
import { UseCaseProxyModule } from './usecases/usecase-proxy.module';

@Module({
    imports: [
        EnvModule,
        RepoModule,
        LoggerModule,
        UseCaseProxyModule,
        TodoModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
