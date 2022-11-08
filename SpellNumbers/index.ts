import {numberNamesEn, numberSeparatorsEn} from "./numbers.en.ts";
import {
    getHighestIndexMatch,
    IndexedStrings,
    InvalidArgumentException,
} from "./util.ts";

function validateNumberSupport(num: number): void {
    if (num < 1 || num > 1000) {
        throw new InvalidArgumentException(
            `Number ${num} is not within supported range (1-1000)`,
        );
    }
    if (num % 1 != 0) {
        throw new InvalidArgumentException(`Number ${num} is not an integer`);
    }
}

function getSeparator(
    lastWordIndex: number,
    nextIndex: number,
    separators: IndexedStrings,
): string {
    if (lastWordIndex) {
        const separatorIndex = getHighestIndexMatch(
            lastWordIndex + nextIndex,
            separators,
        );
        return separators[separatorIndex];
    }
    return "";
}

function adjustHundreds(
    remaining: number,
    nextIndex: number,
    names: IndexedStrings,
): {words: string; subtrahend: number} {
    const adjustments = {words: "", subtrahend: 0};
    if (nextIndex >= 100) {
        const coefficient = Math.floor(remaining / nextIndex);
        adjustments.words = names[coefficient] + " ";
        adjustments.subtrahend = nextIndex * coefficient;
    } else {
        adjustments.subtrahend = nextIndex;
    }
    return adjustments;
}

export function spellNumber(num: number): string {
    validateNumberSupport(num);

    let remaining = num;
    let words = "";
    const wordIndexes = [];
    while (remaining > 0) {
        const nextIndex = getHighestIndexMatch(remaining, numberNamesEn);
        const lastWordIndex = wordIndexes.at(-1) ?? 0;
        words += getSeparator(lastWordIndex, nextIndex, numberSeparatorsEn);
        const adjustments = adjustHundreds(remaining, nextIndex, numberNamesEn);
        words += adjustments.words;
        remaining -= adjustments.subtrahend;
        words += numberNamesEn[nextIndex];
        wordIndexes.push(nextIndex);
    }
    return words;
}
