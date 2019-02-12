import { ValidationError } from "./validateName";

export const nameValidationErrorMessage = (error: ValidationError) => {
    switch (error) {
        case 'weird name':
            return 'are you sure this is your real name?'
        case 'special characters':
            return 'names may only include letters, spaces, and hypens'
        case 'too long':
            return 'please use a shorter name'
        default:
            assertNever(error)
    }
}

const assertNever = (never: never): never => {
    throw new Error('you said this would never happen')
}