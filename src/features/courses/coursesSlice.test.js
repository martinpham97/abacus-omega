import coursesReducer, { addCourse } from "./coursesSlice";

const courses = [
  {
    name: "MATH1081",
    assessments: [
      {
        description: "Assignment 1",
        weight: 20,
        maxGrade: 50,
        grade: 41,
      },
      {
        description: "Assignment 2",
        weight: 10,
        maxGrade: 25,
        grade: 15,
      },
    ],
    desiredGrade: 60,
  },
  {
    name: "COMP1511",
    assessments: [],
    desiredGrade: null,
  },
  {
    name: "COMP4920",
    assessments: [
      {
        description: "Assignment 1",
        weight: 10,
        maxGrade: 20,
        grade: 12,
      },
    ],
    desiredGrade: 90,
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
