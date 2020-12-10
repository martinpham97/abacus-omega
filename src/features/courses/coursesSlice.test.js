import { coursesWithoutIds, coursesWithIds } from "__fixtures__/courses";

import coursesReducer, {
  addCourse,
  editCourse,
  deleteCourse,
  deleteMultipleCourses,
} from "./coursesSlice";

describe("courses reducer", () => {
  it("should handle initial state", () => {
    expect(coursesReducer(undefined, {})).toEqual([]);
  });

  it("should handle addCourse", () => {
    expect(
      coursesReducer([], {
        type: addCourse.type,
        payload: {
          ...coursesWithoutIds[0],
        },
      }),
    ).toEqual([coursesWithoutIds[0]]);

    expect(
      coursesReducer([coursesWithoutIds[0]], {
        type: addCourse.type,
        payload: {
          ...coursesWithoutIds[1],
        },
      }),
    ).toEqual([coursesWithoutIds[0], coursesWithoutIds[1]]);
  });

  it("should handle editCourse", () => {
    expect(
      coursesReducer([coursesWithIds[0], coursesWithIds[1]], {
        type: editCourse.type,
        payload: {
          id: coursesWithIds[1].id,
          name: "New name",
        },
      }),
    ).toEqual([
      coursesWithIds[0],
      {
        ...coursesWithIds[1],
        name: "New name",
      },
    ]);

    expect(
      coursesReducer(coursesWithIds, {
        type: editCourse.type,
        payload: {
          id: "not-found-in-state",
          name: "New name",
        },
      }),
    ).toEqual(coursesWithIds);
  });

  it("should handle deleteCourse", () => {
    expect(
      coursesReducer([coursesWithIds[0], coursesWithIds[1]], {
        type: deleteCourse.type,
        payload: {
          id: coursesWithIds[1].id,
        },
      }),
    ).toEqual([coursesWithIds[0]]);

    expect(
      coursesReducer(coursesWithIds, {
        type: deleteCourse.type,
        payload: {
          id: "not-found-in-state",
        },
      }),
    ).toEqual(coursesWithIds);
  });

  it("should handle deleteMultipleCourses", () => {
    expect(
      coursesReducer(coursesWithIds, {
        type: deleteMultipleCourses.type,
        payload: {
          ids: [coursesWithIds[1].id, coursesWithIds[0].id],
        },
      }),
    ).toEqual([coursesWithIds[2]]);

    expect(
      coursesReducer(coursesWithIds, {
        type: deleteMultipleCourses.type,
        payload: {
          ids: ["not-found-in-state", coursesWithIds[0].id],
        },
      }),
    ).toEqual([coursesWithIds[1], coursesWithIds[2]]);
  });
});

describe("addCourse", () => {
  it("should return correct payload", () => {
    const action = addCourse({ ...coursesWithoutIds[0] });

    expect(action.payload).toEqual({
      id: expect.any(String),
      createdAt: expect.any(String),
      ...coursesWithoutIds[0],
    });
  });

  it("should generate unique course IDs", () => {
    const action1 = addCourse({ ...coursesWithoutIds[0] });
    const action2 = addCourse({ ...coursesWithoutIds[1] });

    expect(action1.payload.id).not.toEqual(action2.payload.id);
  });
});
