import { CumulativeFailure, CumulativeSuccess, ValidationErrors } from "./CumulativeResult";

export const validateWeirdness = (name) => 
  name.indexOf('ochocinco') > -1 
    ? new CumulativeFailure<string, ValidationErrors>(name, ['weird name']) 
    : new CumulativeSuccess<string, ValidationErrors>(name)

export const validateSpecialCharacters = (name) => 
  name.indexOf('*') > -1 
    ? new CumulativeFailure<string, ValidationErrors>(name, ['special characters']) 
    : new CumulativeSuccess<string, ValidationErrors>(name)

export const validateLength = (name) => 
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