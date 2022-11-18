# Number Speller

This project exports a simple number spelling utility that spells any whole number
between 1 and 1000 in English.

## Example usage

```typescript
import {spellNumber} from "./index.ts";

console.log(spellNumber(642));
// Output: six hundred forty-two
```

## Runtime

This project is written in [Deno](https://deno.land/), a Typescript native, secure by
design modern Node alternative. Run `brew install deno` to get started on Mac, or follow
[its installation instructions](https://deno.land/#installation) for your operating
system.

No additional installations are required to run this project.

## Testing

To run the test suite simple run `deno test`.

## Currently unsupported

1. Zero
1. Negative numbers
1. Decimal numbers
1. Numbers over 1000
1. Non-English localisation
