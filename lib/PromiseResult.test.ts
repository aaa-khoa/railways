import { PromiseFailure, of } from './PromiseResult'

type ValidationErrors = 'weird name' | 'special characters' | 'too long'

const validateWeirdness = (name: string): string => {
  if(name.indexOf('ochocinco') > -1) {
    throw new Error('weird name')
  } else {
    return name
  }
}

const validateSpecialCharacters = (name) => {
  if(name.indexOf('*') > -1) {
    throw new Error('special characters')
  } else {
    return name
  }
}
  
const validateLength = (name) => {
  if(name.length > 20) {
    throw new Error('too long')
  } else {
    return name
  }
}

const handleError = (error: ValidationErrors): string => {
  switch (error) {
    case 'weird name':
      return '*****'
    default:
      return 'default name'
  }
}

describe('PromiseResult', () => {
  it('works', () => {
    const result = of<string, ValidationErrors>('ch*d ochocinco')
                    .then(validateWeirdness)
                    .then(validateLength)
                    .catch(handleError)
                    .then(validateSpecialCharacters)
    const assumedFailure = <PromiseFailure<string, ValidationErrors>>result
    
    expect(assumedFailure.error).toEqual('special characters')
  })
})
