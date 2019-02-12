import {validate} from '../validate'

export type ValidationError = 'weird name' | 'special characters' | 'too long'

const contains = search => subject => subject.indexOf(search) > -1
const longerThan = limit => subject => subject.length > limit

export const validateWeirdness = (name) => 
    validate<string, ValidationError>(name, contains('ochocinco'), 'weird name')

export const validateSpecialCharacters = (name) => 
    validate<string, ValidationError>(name, contains('*'), 'special characters')


export const validateLength = (name) => 
   validate<string, ValidationError>(name, longerThan(20), 'too long')