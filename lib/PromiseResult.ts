export type PromiseResult<Value, Error> = PromiseSuccess<Value, Error> | PromiseFailure<Value, Error>

export const of = <Value, Error>(value) => new PromiseSuccess<Value, Error>(value)

export class PromiseSuccess<Value, Error> {

    readonly value: Value

    constructor(value: Value) {
        this.value = value
    }

    then<Success>(transform: (success: Value) => Success): PromiseResult<Success | Value, Error> {
        try {
            return new PromiseSuccess(transform(this.value))
        } catch (error) {
            return new PromiseFailure(error.message)
        }
    }

    catch<E>(onFailure: (error: Error) => E): PromiseResult<E | Value, Error> {
        return new PromiseSuccess(this.value)
    }
}

export class PromiseFailure<Value, Error> {

    readonly error: Error

    constructor(error: Error) {
        this.error = error
    }

    then<Success>(transform: (success: Value) => Success): PromiseResult<Success | Value, Error> {
        return new PromiseFailure<Value, Error>(this.error)
    }

    catch<E>(onFailure: (error: Error) => E): PromiseResult<E | Value, Error> {
        try {
            return new PromiseSuccess(onFailure(this.error))
        } catch (error) {
            return new PromiseFailure(error.message)
        }     
    }
}




