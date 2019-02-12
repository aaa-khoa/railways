import { FailFastSuccess, FailFastFailure, ValidationError } from './FailFastResult'

const validateWeirdness = (name) => 
  name.indexOf('ochocinco') > -1 
    ? new FailFastFailure<string, ValidationError>('weird name') 
    : new FailFastSuccess<string, ValidationError>(name)

const validateSpecialCharacters = (name) => 
  name.indexOf('*') > -1 
    ? new FailFastFailure<string, ValidationError>('special characters') 
    : new FailFastSuccess<string, ValidationError>(name)

const validateLength = (name) => 
  name.length > 20 
    ? new FailFastFailure<string, ValidationError>('too long') 
    : new FailFastSuccess<string, ValidationError>(name)

describe('FailFastResult', () => {
  it('works', () => {
    const result = validateWeirdness('ch*d ochocinco')
                    .map(validateSpecialCharacters)
                    .map(validateLength)
    expect(result.fold((x) => x, (x) => x)).toEqual('weird name')
  })
})
