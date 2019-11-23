import {CannotParseToNumberError} from './error';

export const parseToNumber = (targetToChange: string) => {
    const parsedInt = parseInt(targetToChange);
    if (isNaN(parsedInt)) {
        throw new CannotParseToNumberError();
    }
    return parsedInt;
};