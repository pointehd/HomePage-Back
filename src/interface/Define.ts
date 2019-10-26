export const enum ERROR_CODE {
    SUCCESS = 1,
    WRONG_REQUEST = 2,
    QUERY_ERROR = 3,
    UNKNOWN = 4,
    FAIL = 5
};

export interface IResponse<T> {
    success: ERROR_CODE;
    error?: ERROR_CODE;
    result: T;
};

export interface Dictionary<T> {
    [id: string]: T
}