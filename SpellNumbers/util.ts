export type IndexedStrings = {[index: number]: string};

export class InvalidArgumentException extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export function getHighestIndexMatch(num: number, names: IndexedStrings): number {
    const keys = Object.keys(names);
    const closest = keys.reduce((previous: number, current: string): number => {
        const currentInt = parseInt(current);
        if (currentInt <= num && currentInt > previous) {
            return currentInt;
        }
        return previous;
    }, 0);
    return closest;
}
