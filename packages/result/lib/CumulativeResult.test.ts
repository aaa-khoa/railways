import { CumulativeFailure, CumulativeSuccess } from "./CumulativeResult";

type ValidationErrors = 'weird name' | 'special characters' | 'too long'

const validateWeirdness = (name) => 
  name.indexOf('ochocinco') > -1 
    ? new CumulativeFailure<string, ValidationErrors>(name, ['weird name']) 
    : new CumulativeSuccess<string, ValidationErrors>(name)

const validateSpecialCharacters = (name) => 
  name.indexOf('*') > -1 
    ? new CumulativeFailure<string, ValidationErrors>(name, ['special characters']) 
    : new CumulativeSuccess<string, ValidationErrors>(name)

const validateLength = (name) => 
  name.length > 20 
    ? new CumulativeFailure<string, ValidationErrors>(name, ['too long']) 
    : new CumulativeSuccess<string, ValidationErrors>(name)

describe('CumulativeResult', () => {
  it('works', () => {
    const result = validateWeirdness('ch*d ochocinco')
                    .map(validateSpecialCharacters)
                    .map(validateLength)
    expect(result.fold((x) => x, (x) => x)).toContain('weird name')
    expect(result.fold((x) => x, (x) => x)).toContain('special characters')
  })
})