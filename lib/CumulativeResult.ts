
export type CumulativeResult<Value, Error> = CumulativeSuccess<Value, Error> | CumulativeFailure<Value, Error>

export const CumulativeSuccess<Value, Error> = (value: Value) => {
    map(transform: (success: Value) => CumulativeResult<Value,Error>) {
        return transform(value)
    }

    fold<S,E>(onSuccess: (success: Value) => S, onFailure: (error: Error) => E) {
        return onSuccess(value)
    }
}
    
export const CumulativeFailure<Value, Error> = (alongForTheRide: Value, errors: Error[]) => {
    map(transform: (value: Value) => CumulativeResult<Value,Error>) {
        return transform(alongForTheRide).fold((irrelevantSuccess) => CumulativeFailure(errors), (moreErrors) => errors.concat(moreErrors))
    }

    fold<S,E>(onSuccess: (success: Value) => S, onFailure: (error: Error) => E) {
        return onFailure(error)
    }
}


