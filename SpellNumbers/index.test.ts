import {
    assertEquals,
    assertThrows,
} from "https://deno.land/std@0.162.0/testing/asserts.ts";
import {spellNumber} from "./index.ts";
import {InvalidArgumentException} from "./util.ts";

Deno.test("-1 throws error", () => {
    assertThrows(
        () => spellNumber(-1),
        InvalidArgumentException,
        "Number -1 is not within supported range (1-1000)",
    );
});

Deno.test("1001 throws error", () => {
    assertThrows(
        () => spellNumber(1001),
        InvalidArgumentException,
        "Number 1001 is not within supported range (1-1000)",
    );
});

Deno.test("1.1 throws error", () => {
    assertThrows(
        () => spellNumber(1.1),
        InvalidArgumentException,
        "Number 1.1 is not an integer",
    );
});

Deno.test("Get value of 1", () => {
    const name = spellNumber(1);
    assertEquals(name, "one");
});

Deno.test("Get value of 11", () => {
    const name = spellNumber(11);
    assertEquals(name, "eleven");
});

Deno.test("Get value of 20", () => {
    const name = spellNumber(20);
    assertEquals(name, "twenty");
});

Deno.test("Get value of 21", () => {
    const name = spellNumber(21);
    assertEquals(name, "twenty-one");
});

Deno.test("Get value of 100", () => {
    const name = spellNumber(100);
    assertEquals(name, "one hundred");
});

Deno.test("Get value of 101", () => {
    const name = spellNumber(101);
    assertEquals(name, "one hundred and one");
});

Deno.test("Get value of 162", () => {
    const name = spellNumber(162);
    assertEquals(name, "one hundred sixty-two");
});

Deno.test("Get value of 212", () => {
    const name = spellNumber(212);
    assertEquals(name, "two hundred twelve");
});

Deno.test("Get value of 302", () => {
    const name = spellNumber(302);
    assertEquals(name, "three hundred and two");
});

Deno.test("Get value of 999", () => {
    const name = spellNumber(999);
    assertEquals(name, "nine hundred ninety-nine");
});

Deno.test("Get value of 1000", () => {
    const name = spellNumber(1000);
    assertEquals(name, "one thousand");
});
