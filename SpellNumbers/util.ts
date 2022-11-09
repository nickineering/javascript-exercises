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
 * Given a Map indexed by a number
 * When queried by another number
 * Then return the index with the highest number that is still less than the query
 */
export function getHighestIndexMatch(
    query: number,
    names: Map<number, string>,
): number {
    let highest = 0;
    names.forEach((_value: string, key: number): void => {
        if (key <= query && key > highest) {
            highest = key;
        }
    });
    return highest;
}
