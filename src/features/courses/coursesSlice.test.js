import { coursesWithoutIds as courses } from "__fixtures__/courses";

import coursesReducer, { addCourse } from "./coursesSlice";

describe("courses reducer", () => {
  it("should handle initial state", () => {
    expect(coursesReducer(undefined, {})).toEqual([]);
  });

  it("should handle addCourse", () => {
    expect(
      coursesReducer([], {
        type: addCourse.type,
        payload: {
          ...courses[0],
        },
      }),
    ).toEqual([courses[0]]);

    expect(
      coursesReducer([courses[0]], {
        type: addCourse.type,
        payload: {
          ...courses[1],
        },
      }),
    ).toEqual([courses[0], courses[1]]);
  });
});

describe("addCourse", () => {
  it("should return correct payload", () => {
    const action = addCourse({ ...courses[0] });

    expect(action.payload).toEqual({
      id: expect.any(String),
      createdAt: expect.any(String),
      ...courses[0],
    });
  });

  it("should generate unique course IDs", () => {
    const action1 = addCourse({ ...courses[0] });
    const action2 = addCourse({ ...courses[1] });

    expect(action1.payload.id).not.toEqual(action2.payload.id);
  });
});
