import { transformStringToNum } from "./form";

describe("transformStringToNum", () => {
  it("should convert number string to number", () => {
    expect(transformStringToNum("10")).toEqual(10);
  });

  it("should convert alphabetic string to null", () => {
    expect(transformStringToNum("abc")).toEqual(null);
  });

  it("should convert empty string to null", () => {
    expect(transformStringToNum("")).toEqual(null);
  });

  it("should convert non-number type value to null", () => {
    expect(transformStringToNum({})).toEqual(null);
  });
});
