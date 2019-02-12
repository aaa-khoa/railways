import { CumulativeFailure, CumulativeSuccess } from 'railways'

export const validate = <Value, Error> (value: Value, condition: (Value) => boolean, error: Error) => 
    condition(value) 
        ? new CumulativeFailure<Value, Error>(value, [error]) 
        : new CumulativeSuccess<Value, Error>(value)