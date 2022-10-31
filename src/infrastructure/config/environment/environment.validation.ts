import { plainToClass } from "class-transformer";
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, IsUrl, validateSync } from "class-validator";
import { EnvString } from "../../../domain/config/environment.interface";

export class EnvValidation {
    @IsEnum(EnvString)
    NODE_ENV: EnvString;

    @IsUrl({ require_tld: false })
    SERVE_URL: string;

    @IsNumber()
    SERVE_PORT: number;

    @IsString()
    DATABASE_HOST: string;

    @IsNumber()
    DATABASE_PORT: number;

    @IsString()
    DATABASE_USER: string;

    @IsString()
    DATABASE_PASSWORD: string;

    @IsString()
    DATABASE_NAME: string;

    @IsString()
    DATABASE_SCHEMA: string;

    @IsOptional()
    @IsBoolean()
    DATABASE_SYNCHRONIZE: boolean;

    @IsString()
    ROLLBAR_ACCESS_TOKEN: string;
}

export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToClass(EnvValidation, config, {
        // enableImplicitConversion is buggy on data type boolean : 
        // PR https://github.com/typestack/class-transformer/pull/1329
        enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, { skipMissingProperties: false });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return config;
}