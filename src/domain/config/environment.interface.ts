export enum Env {
    local = 0,
    development = 0,
    staging = 1,
    hotfix = 2,
    production = 3
}

export enum EnvString {
    local = 'local',
    development = 'development',
    staging = 'staging',
    hotfix = 'hotfix',
    production = 'production'
}

export interface IEnvConfig {
    type(): Env;
    name(): string;
    isEnv(type: Env): boolean;
    getServeUrl(): string;
    getServePort(): number;
}