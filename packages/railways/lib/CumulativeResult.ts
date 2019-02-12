export type CumulativeResult<Value, Error> = CumulativeSuccess<Value, Error> | CumulativeFailure<Value, Error>
export type ValidationError = 'weird name' | 'special characters' | 'too long'

export class CumulativeSuccess<Value, Error> {

    readonly value: Value

    constructor(value: Value) {
        this.value = value
    }

    map(transform: (success: Value) => CumulativeResult<Value, Error>): CumulativeResult<Value, Error> {
        return transform(this.value)
    }

    fold<S, E>(onSuccess: (s: Value) => S, onFailure: (e: Error[]) => E): S | E {
        return onSuccess(this.value)
    }
}

export class CumulativeFailure<Value, Error> {

    readonly alongForTheRide: Value
    readonly errors: Error[]

    constructor(alongForTheRide: Value, errors: Error[]) {
        this.alongForTheRide = alongForTheRide
        this.errors = errors
    }

    map(transform: (value: Value) => CumulativeResult<Value, Error>): CumulativeResult<Value, Error> {
        const firstResult: CumulativeResult<Value, Error> = transform(this.alongForTheRide)
        return firstResult
            .fold<CumulativeFailure<Value, Error>, CumulativeFailure<Value, Error>>(
                (_) => new CumulativeFailure(this.alongForTheRide, this.errors),
                (moreErrors) => new CumulativeFailure(this.alongForTheRide, this.errors.concat(moreErrors)))
    }

    fold<S, E>(onSuccess: (s: Value) => S, onFailure: (e: Error[]) => E): S | E {
        return onFailure(this.errors)
    }
}


