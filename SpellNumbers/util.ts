export type IndexedStrings = {[index: number]: string};

/**
 * Thrown when an argument is supplied which is not supported
 */
export class UnsupportedArgumentException extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

/**
 * Given an object indexed by a number of type IndexedStrings
 * When queried by another number
 * Then return the index with the highest number that is still less than the query
 */
export function getHighestIndexMatch(query: number, names: IndexedStrings): number {
    const keys = Object.keys(names);
    const highest = keys.reduce((previous: number, currentString: string): number => {
        // TypeScript object keys are saved as strings, so we parse them back
        const current = parseInt(currentString);
        if (current <= query && current > previous) {
            return current;
        }
        return previous;
    }, 0);
    return highest;
}
