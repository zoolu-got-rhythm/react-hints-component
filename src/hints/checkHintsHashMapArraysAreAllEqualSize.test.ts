import { Hints } from "./ActorHints";
import { checkHintsHashMapArraysAreAllEqualInSize, checkHintsHashMapContainsNoZeroLengthArrays } from "./checkHintsHashMapArraysAreAllEqualSize";

const hintsObjMapA: Hints = {
  english: ["a", "b", "c"],
  welsh: ["a", "b", "c"],
  spanish: ["a", "b", "c"],
};

const hintsObjMapB: Hints = {
  english: ["a", "b", "c"],
  welsh: ["a", "c"],
  spanish: ["a", "b", "c"],
};

const hintsObjMapC: Hints = {
  english: ["a"],
  welsh: ["a", "c"],
  spanish: [],
};

test("test hintsObjMapA arrays are all equal in size should === true", () => {
  expect(checkHintsHashMapArraysAreAllEqualInSize(hintsObjMapA)).toBeTruthy();
});

test("test hintsObjMapB arrays that are not all equal in size should === false", () => {
  expect(checkHintsHashMapArraysAreAllEqualInSize(hintsObjMapB)).toBeFalsy();
});

test("test hintsObjMapA arrays are all above size of zero === true", () => {
  expect(checkHintsHashMapContainsNoZeroLengthArrays(hintsObjMapB)).toBeTruthy();
});

test("test hintsObjMapC arrays (in which one of the arrs is zero in length) will === false", () => {
  expect(checkHintsHashMapContainsNoZeroLengthArrays(hintsObjMapC)).toBeFalsy();
});

//   test("hintsObjMapA arrays are all equal in size should === true", () => {
//     expect(checkHintsHashMapArraysAreAllEqualInSize(hintsObjMapA)).toBeTruthy();
//   });
