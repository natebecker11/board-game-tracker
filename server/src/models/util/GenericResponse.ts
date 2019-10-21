import { ExceptionResponse } from "./ExceptionResponse";

export class GenericResponse<T> extends ExceptionResponse {
    public Item: T;
}