export interface ErrorDetail {
    timestamp: string;
    message: string;
    details: string;
    errors: Error
}

export interface Error {
    [index: string]: string;
}