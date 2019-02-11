export type FailFastResult<Value, Error> = FailFastSuccess<Value, Error> | FailFastFailure<Value, Error>

export class FailFastSuccess<Value, Error> {

    readonly value: Value

    constructor(value: Value) {
        this.value = value
    }

    map(transform: (success: Value) => FailFastResult<Value, Error>): FailFastResult<Value, Error> {
        return transform(this.value)
    }

    fold<S, E>(onSuccess: (success: Value) => S, onFailure: (error: Error) => E): S | E {
        return onSuccess(this.value)
    }
}

export class FailFastFailure<Value, Error> {

    readonly error: Error

    constructor(error: Error) {
        this.error = error
    }

    map(transform: (success: Value) => FailFastResult<Value, Error>): FailFastResult<Value, Error> {
        return new FailFastFailure(this.error)
    }

    fold<S, E>(onSuccess: (success: Value) => S, onFailure: (error: Error) => E): S | E {
        return onFailure(this.error)
    }
}




