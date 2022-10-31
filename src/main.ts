import { ClassSerializerInterceptor, INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Env } from './domain/config/environment.interface';
import { AllExceptionFilter } from './infrastructure/common/filters/exceptions.filter';
import { LoggingInterceptor } from './infrastructure/common/interceptors/logging.interceptor';
import { ResponseInterceptor } from './infrastructure/common/interceptors/response.interceptor';
import { EnvService } from './infrastructure/config/environment/environment.service';
import { LoggerService } from './infrastructure/logger/logger.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // define service and some variable
    const loggerService = app.get(LoggerService);
    const envService = app.get(EnvService);
    const servePort = envService.getServePort();

    // set logger
    app.useLogger(loggerService)

    // set global prefix
    app.setGlobalPrefix('api', {
        exclude: ['/'],
    });

    // enable api versioning
    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
    });

    // pipes
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(app.get(Reflector))
    );

    // interceptors
    app.useGlobalInterceptors(new LoggingInterceptor(loggerService));
    app.useGlobalInterceptors(new ResponseInterceptor());

    // excpetion filter
    app.useGlobalFilters(new AllExceptionFilter(loggerService));

    // enable cors and setup swagger docs
    if (envService.type() >= Env.staging) {
        app.enableCors();
    } else {
        setupSwaggerDocs(app);
    }

    loggerService.log('NestFactory', `Application is running in "${envService.name()}" mode`);
    loggerService.log('NestFactory', `Application listening on port ${servePort}`);
    await app.listen(servePort);
}

async function setupSwaggerDocs(app: INestApplication) {
    const document = new DocumentBuilder()
        .setTitle('Nestjs Clean Architecture')
        .setVersion('1.0')
        .setContact('John Doe', 'http://www.example.com', 'example@mailinator.com')
        .setDescription(
            `<p>Documentation for the Nestjs Clean Architecture <p/>` +
            `<p>Official website: <a target="_blank" href="https://example.com">https://example.com</a><br/>` +
            `Additional documentation: <a target="_blank" href="https://docs.example.com">https://docs.example.com</a> <br/>` +
            `Source code: <a target="_blank" href="hhttps://github.com/bramanda48/nestjs-clean-code">https://github.com/bramanda48/nestjs-boilerplate</a></p>`,
        )

    const swagger = SwaggerModule.createDocument(app, document.build());
    SwaggerModule.setup('/docs', app, swagger);
}

bootstrap();
