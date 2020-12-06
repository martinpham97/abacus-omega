export const coursesWithoutIds = [
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

export const courseWithId = {
  id: "some-id",
  name: "COMP1511",
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
    {
      description: "Mid-term Exam",
      weight: 30,
      maxGrade: 80,
      grade: 56,
    },
  ],
  desiredGrade: 60,
};

export default coursesWithoutIds;
