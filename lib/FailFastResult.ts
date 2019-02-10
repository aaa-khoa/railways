
export type FailFastResult<Value, Error> = FailFastSuccess<Value, Error> | FailFastFailure<Value, Error>

export class FailFastSuccess<Value, Error> {
    value

    constructor(value: Value) {
        this.value = value
    }
    map(transform: (success: Value) => FailFastResult<Value,Error>) {
        return transform(this.value)
    }

    fold<S,E>(onSuccess: (success: Value) => S, onFailure: (error: Error) => E) {
        return onSuccess(this.value)
    }
}
    
export class FailFastFailure<Value, Error> {
    error

    constructor(error: Error) {
        this.error = error
    }
    map(transform: (success: Value) => FailFastResult<Value,Error>): FailFastResult<Value, Error> {
        return new FailFastFailure(this.error)
    }

    fold<S,E>(onSuccess: (success: Value) => S, onFailure: (error: Error) => E) {
        return onFailure(this.error)
    }
}




