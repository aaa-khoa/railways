
export type FailFastResult<Value, Error> = Success<Value, Error> | Failure<Value, Error>

export const Success<Value, Error> = (value: Value) => {
    map(transform: (success: Value) => FailFastResult<Value,Error>) {
        return transform(value)
    }

    fold<S,E>(onSuccess: (success: Value) => S, onFailure: (error: Error) => E) {
        return onSuccess(value)
    }
}
    
export const Failure<Value, Error> = (error: Error) => {
    map(transform: (success: Value) => FailFastResult<Value,Error>) {
        return Failure(error)
    }

    fold<S,E>(onSuccess: (success: Value) => S, onFailure: (error: Error) => E) {
        return onFailure(error)
    }
}


