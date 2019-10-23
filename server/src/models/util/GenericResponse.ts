import { ExceptionResponse } from "./ExceptionResponse";

export class GenericResponse<T> extends ExceptionResponse {
    public Item: T;

    constructor(item: T, exception: string = null) {
        super(exception)
        this.Item = item;
    }
}