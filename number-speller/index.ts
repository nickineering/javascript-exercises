import {numberNamesEn, numberSeparatorsEn} from "./numbers.en.ts";
import {getHighestIndexMatch, UnsupportedArgumentException} from "./util.ts";

/**
 * Given a number as a parameter
 * When that number is unsupported
 * Then throw a useful error explaining that
 *
 * @param num the number to be validated
 * @throws {UnsupportedArgumentException} when number is outside 1-1000 or decimal
 */
function validateNumberSupport(num: number): void {
    if (num < 1 || num > 1000) {
        throw new UnsupportedArgumentException(
            `Number ${num} is not within supported range (1-1000)`,
        );
    }
    if (num % 1 != 0) {
        throw new UnsupportedArgumentException(`Number ${num} is not a whole number`);
    }
}

/**
 * Given an object of separators
 * When two numbers are supplied
 * Then return the appropriate separator to place between the two numbers
 *
 * @param previousNumber the number before the separator
 * @param nextNumber the number after the separator
 * @param separators a Map of separator strings indexed by the minimum number they can
 * be used after
 * @returns the appropriate separator for the given numbers
 */
function getSeparator(
    previousNumber: number,
    nextNumber: number,
    separators: Map<number, string>,
): string {
    if (previousNumber) {
        const separatorIndex = getHighestIndexMatch(
            previousNumber + nextNumber,
            separators,
        );
        return separators.get(separatorIndex) ?? "";
    }
    return "";
}

/**
 * Given a number
 * When the number is a whole number between 1 and 1000 inclusive
 * Then return its English language spelling
 *
 * @param num the number to be spelt
 * @returns the English language spelling of the number
 * @throws {UnsupportedArgumentException} when number is outside 1-1000 or decimal
 */
export function spellNumber(num: number): string {
    // Throw error when num is not supported
    validateNumberSupport(num);

    let remaining = num;
    let words = "";
    // Each number pronounced from highest to lowest (excluding smaller numbers used to
    // multiply bigger numbers. E.g. "TWO thousand and one"). Essentially a Roman
    // numeral representation of any number.
    const compositeNumbers = [];

    while (remaining > 0) {
        // Get the next number for which there is a word
        const nextNumber = getHighestIndexMatch(remaining, numberNamesEn);
        const previousNumber = compositeNumbers.at(-1) ?? 0;
        // Calculate anything needed between this and the previous number
        words += getSeparator(previousNumber, nextNumber, numberSeparatorsEn);

        // Calculate any coefficients (THREE hundred) so that the full product can be
        // subtracted. In English coefficient is always 1 below 200.
        const coefficient = Math.floor(remaining / nextNumber);
        remaining -= nextNumber * coefficient;
        // In English we say "ONE hundred" or "ONE thousand" so add that here
        if (nextNumber >= 100) {
            words += numberNamesEn.get(coefficient) + " ";
        }

        // Add the finished number to the output
        words += numberNamesEn.get(nextNumber);
        compositeNumbers.push(nextNumber);
    }
    return words;
}
