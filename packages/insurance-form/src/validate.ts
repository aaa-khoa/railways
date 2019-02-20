import { CumulativeFailure, CumulativeSuccess } from 'railways'

/**
 * @param input the value to check for errors
 * @param condition the function to validate the input with
 * @param error the error to return if condition is true
 * Returns a CumulativeFailure OR a CumulativeSuccess
 */
export const checkForErrors = <Value, Error> (input: Value, condition: (Value) => boolean, error: Error) => 
    condition(input) 
        ? new CumulativeFailure<Value, Error>(input, [error]) 
        : new CumulativeSuccess<Value, Error>(input)