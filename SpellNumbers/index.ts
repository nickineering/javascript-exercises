import {numberNamesEn, numberSeparatorsEn} from "./numbers.en.ts";
import {
    getHighestIndexMatch,
    IndexedStrings,
    UnsupportedArgumentException,
} from "./util.ts";

/**
 * Given a number as a parameter
 * When that number is unsupported
 * Then throw a useful error explaining that
 */
function validateNumberSupport(num: number): void {
    if (num < 1 || num > 1000) {
        throw new UnsupportedArgumentException(
            `Number ${num} is not within supported range (1-1000)`,
        );
    }
    if (num % 1 != 0) {
        throw new UnsupportedArgumentException(`Number ${num} is not an integer`);
    }
}

/**
 * Given an object of separators
 * When two numbers are supplied
 * Then return the appropriate separator to place between the two numbers
 */
function getSeparator(
    lastNumber: number,
    nextNumber: number,
    separators: IndexedStrings,
): string {
    if (lastNumber) {
        const separatorIndex = getHighestIndexMatch(
            lastNumber + nextNumber,
            separators,
        );
        return separators[separatorIndex];
    }
    return "";
}

function getHundredsAdjustments(
    remaining: number,
    nextNumber: number,
    names: IndexedStrings,
): {words: string; subtrahend: number} {
    const adjustments = {words: "", subtrahend: 0};
    if (nextNumber >= 100) {
        const coefficient = Math.floor(remaining / nextNumber);
        adjustments.words = names[coefficient] + " ";
        adjustments.subtrahend = nextNumber * coefficient;
    } else {
        adjustments.subtrahend = nextNumber;
    }
    return adjustments;
}

export function spellNumber(num: number): string {
    validateNumberSupport(num);

    let remaining = num;
    let words = "";
    const compositeNumbers = [];
    while (remaining > 0) {
        const nextNumber = getHighestIndexMatch(remaining, numberNamesEn);
        const lastNumber = compositeNumbers.at(-1) ?? 0;
        words += getSeparator(lastNumber, nextNumber, numberSeparatorsEn);
        const adjustments = getHundredsAdjustments(
            remaining,
            nextNumber,
            numberNamesEn,
        );
        words += adjustments.words;
        remaining -= adjustments.subtrahend;
        words += numberNamesEn[nextNumber];
        compositeNumbers.push(nextNumber);
    }
    return words;
}
