import { FailFastSuccess, FailFastFailure } from './FailFastResult'

type ValidationErrors = 'weird name' | 'special characters' | 'too long'

const validateWeirdness = (name) => 
  name.indexOf('ochocinco') > -1 
    ? new FailFastFailure<string, ValidationErrors>('weird name') 
    : new FailFastSuccess<string, ValidationErrors>(name)

const validateSpecialCharacters = (name) => 
  name.indexOf('*') > -1 
    ? new FailFastFailure<string, ValidationErrors>('special characters') 
    : new FailFastSuccess<string, ValidationErrors>(name)

const validateLength = (name) => 
  name.length > 20 
    ? new FailFastFailure<string, ValidationErrors>('too long') 
    : new FailFastSuccess<string, ValidationErrors>(name)

describe('FailFastResult', () => {
  it('works', () => {
    const result = validateWeirdness('ch*d ochocinco')
                    .map(validateSpecialCharacters)
                    .map(validateLength)
    expect(result.fold((x) => x, (x) => x)).toEqual('weird name')
  })
})
