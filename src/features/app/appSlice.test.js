import appReducer, { setThemeType } from "./appSlice";

describe("app reducer", () => {
  it("should handle initial state", () => {
    expect(appReducer(undefined, {})).toEqual({
      themeType: "dark",
    });
  });

  it("should handle setThemeType", () => {
    const type = "dark";
    expect(
      appReducer(
        { themeType: "light" },
        {
          type: setThemeType.type,
          payload: {
            type,
          },
        },
      ),
    ).toEqual({ themeType: type });
  });
});
