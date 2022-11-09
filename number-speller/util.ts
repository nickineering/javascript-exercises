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
 *
 * @param query the max number acceptable
 * @param names a Map of strings indexed by the minimum number they can be used after
 * @returns the highest index still less than query
 */
export function getHighestIndexMatch(
    query: number,
    names: Map<number, string>,
): number {
    let highestFound = 0;
    names.forEach((_value: string, key: number): void => {
        if (key <= query && key > highestFound) {
            highestFound = key;
        }
    });
    return highestFound;
}
