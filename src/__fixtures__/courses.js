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

export const courseWithRecommended = {
  id: "some-id",
  name: "COMP1511",
  assessments: [
    {
      description: "",
      weight: 20,
      maxGrade: 50,
      grade: 41,
    },
    {
      description: "Assignment 2",
      weight: 10,
      maxGrade: 25,
      grade: null,
    },
    {
      description: "Mid-term Exam",
      weight: 30,
      maxGrade: null,
      grade: null,
    },
  ],
  desiredGrade: 60,
  recommendedGrade: 52,
};

export const courseWithRecommendedNoRemaining = {
  id: "some-id",
  name: "COMP1511",
  assessments: [
    {
      description: "Assignment 1",
      weight: 20,
      maxGrade: 100,
      grade: 80,
    },
    {
      description: "Assignment 2",
      weight: 80,
      maxGrade: 100,
      grade: 50,
    },
  ],
  desiredGrade: 65,
  recommendedGrade: 0,
};

export const courseWithRecommendedGreaterThan100 = {
  id: "some-id",
  name: "COMP2511",
  assessments: [
    {
      description: "Assignment 0",
      weight: 80,
      maxGrade: 100,
      grade: 20,
    },
  ],
  desiredGrade: 90,
  recommendedGrade: 370,
};

export default coursesWithoutIds;
