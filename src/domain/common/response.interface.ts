export interface IResponseFormat<T = any> {
    statusCode: number;
    data?: T;
    errors?: IExceptionMessage[];
    metadata: IMetadataFormat;
}

export interface IMetadataFormat {
    request: IRequestMetadata;
    response: IResponseMetadata;
    pagination?: IPaginationMetadata;
}

export interface IRequestMetadata {
    timestamp: string;
    method: string;
    path: string;
    params?: object;
    query?: object;
    body?: object;
}

export interface IResponseMetadata {
    isArray: boolean;
    isPaginated: boolean;
    duration: string;
}

export interface IPaginationMetadata {
    limit: number;
    offset: number;
    nextUrl: string;
    prevUrl: string;
}

export interface IExceptionMessage {
    code: string;
    message: string;
    stack: string;
}