import { FailFastSuccess, FailFastFailure } from './FailFastResult'

type ValidationErrors = 'weird name' | 'cant type' | 'martian'
type Driver = { name: string, state: string }

const validateWeirdName = (driver: Driver) => driver.name.indexOf('ochocinco') > -1 ? new FailFastFailure<Driver, ValidationErrors>('weird name') : new FailFastSuccess<Driver, ValidationErrors>(driver)
const validateState = (driver: Driver) => driver.state.indexOf('*') > -1 ? new FailFastFailure<Driver, ValidationErrors>('cant type') : new FailFastSuccess<Driver, ValidationErrors>(driver)

describe('FailFastResult', () => {
  it('works', () => {
    const result = validateWeirdName({name: 'chad ochocinco', state: 'A*Z'}).map(validateState)
    expect(result.fold((x) => x, (x) => x)).toEqual('weird name')
  })
})
