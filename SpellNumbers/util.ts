export type IndexedStrings = {[index: number]: string};

export class UnsupportedArgumentException extends Error {
    /**
     * Thrown when an argument is supplied which is not supported
     */
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export function getHighestIndexMatch(query: number, names: IndexedStrings): number {
    /**
     * Given an object indexed by a number of type IndexedStrings
     * When queried by another number
     * Then return the index with the highest number that is still less than the query
     */
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
