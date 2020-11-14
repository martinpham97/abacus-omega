import coursesReducer, { addCourse } from "./coursesSlice";

const courses = [
  {
    name: "MATH1081",
    id: 0,
  },
  {
    name: "COMP1511",
    id: 1,
  },
  {
    name: "COMP4920",
    id: 2,
  },
];

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
  it("should generate course IDs", () => {
    const action1 = addCourse(courses[0].name);
    const action2 = addCourse(courses[1].name);

    expect(action1.payload.id).toEqual(expect.any(String));
    expect(action1.payload.name).toEqual(courses[0].name);
    expect(action2.payload.id).toEqual(expect.any(String));
    expect(action2.payload.name).toEqual(courses[1].name);
  });
});
