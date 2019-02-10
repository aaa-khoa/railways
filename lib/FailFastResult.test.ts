import { Success, Failure } from './FailFastResult.ts'

type ValidationErrors = 'weird name' | 'cant type' | 'martian'

const validateWeirdName = ({ name } as driver) => name.indexOf('ochocinco') > -1 ? Failure<ValidationErrors>('weird name') : Success(driver)
const validateState = ({ state } as driver) => state.indexOf('*') > -1 ? Failure<ValidationErrors>('cant type') : Success(driver)

describe('FailFastResult', () => {
  it('works', () => {
    const result = validateWeirdName({name: 'chad ochocinco', state: 'A*Z'}).map(validateState)
    expect(result.fold((x) => x, (x) => x)).toEqual('weird name')
  })
})
