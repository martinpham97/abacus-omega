import { getPercentage, getPercentageOf } from "./math";

describe("getPercentage", () => {
  it("should return correct percentage value", () => {
    expect(getPercentage(30, 100)).toEqual(30);
    expect(getPercentage(50, 150)).toEqual(33.33);
  });
});

describe("getPercentageOf", () => {
  it("should return correct value from percentage", () => {
    expect(getPercentageOf(100, 20)).toEqual(20);
    expect(getPercentageOf(150, 50)).toEqual(75);
    expect(getPercentageOf(10, 3)).toEqual(0.3);
  });
});
