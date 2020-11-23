import { screen, fireEvent, render, waitFor } from "@testing-library/react";
import { axe } from "jest-axe";

import { MAX_ASSESSMENTS_PER_COURSE } from "config/constants";
import * as useSmallScreenHook from "hooks/useSmallScreen";

import GradeForm from "./GradeForm";

jest.setTimeout(10000);

describe("<GradeForm />", () => {
  let mockHandleSubmit;
  let mockHandleSave;
  let courseData;

  beforeEach(() => {
    jest.spyOn(useSmallScreenHook, "useSmallScreen").mockReturnValue(false);
    mockHandleSubmit = jest.fn();
    mockHandleSave = jest.fn();
    courseData = {
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
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fill default values", async () => {
    render(
      <GradeForm
        courseData={courseData}
        handleSubmit={mockHandleSubmit}
        handleSave={mockHandleSave}
      />,
    );

    expect(
      screen.queryByDisplayValue(courseData.assessments[0].description),
    ).not.toBeNull();
  });

  it("should display add and delete buttons on small screens", () => {
    jest.spyOn(useSmallScreenHook, "useSmallScreen").mockReturnValue(true);
    render(
      <GradeForm handleSubmit={mockHandleSubmit} handleSave={mockHandleSave} />,
    );

    expect(screen.queryByLabelText(/add-button/)).not.toBeNull();
    expect(screen.queryByLabelText(/delete-button/)).not.toBeNull();
  });

  it("should auto-save input values", async () => {
    const description = "Assignment 10";
    const grade = 10;

    render(
      <GradeForm handleSubmit={mockHandleSubmit} handleSave={mockHandleSave} />,
    );

    await waitFor(async () => {
      await fireEvent.change(
        screen.getByRole("textbox", { name: "description" }),
        {
          target: { value: description },
        },
      );
      await fireEvent.change(
        screen.getByRole("spinbutton", { name: "grade" }),
        {
          target: { value: grade.toString() },
        },
      );
    });

    expect(mockHandleSave).toHaveBeenLastCalledWith({
      assessments: [
        {
          description,
          weight: "",
          maxGrade: "",
          grade,
        },
      ],
      desiredGrade: "",
    });
  });

  it("should not call handleSubmit when assessments array is empty", async () => {
    const { desiredGrade } = courseData;

    render(
      <GradeForm
        courseData={{
          assessments: [],
          desiredGrade,
        }}
        handleSubmit={mockHandleSubmit}
        handleSave={mockHandleSave}
      />,
    );

    await waitFor(async () => {
      await fireEvent.submit(screen.getByLabelText(/calculate-button/i));
    });

    expect(mockHandleSubmit).not.toHaveBeenCalled();
  });

  it("should call handleSubmit with correct values", async () => {
    const { weight, grade, maxGrade, description } = courseData.assessments[0];
    const { desiredGrade } = courseData;

    render(
      <GradeForm handleSubmit={mockHandleSubmit} handleSave={mockHandleSave} />,
    );

    await waitFor(async () => {
      await fireEvent.change(
        screen.getByRole("textbox", { name: "description" }),
        {
          target: { value: description },
        },
      );
      await fireEvent.change(
        screen.getByRole("spinbutton", { name: "grade" }),
        {
          target: { value: grade },
        },
      );
      await fireEvent.change(
        screen.getByRole("spinbutton", { name: "max-grade" }),
        {
          target: { value: maxGrade },
        },
      );
      await fireEvent.change(
        screen.getByRole("spinbutton", { name: "weight" }),
        {
          target: { value: weight },
        },
      );
      await fireEvent.change(
        screen.getByRole("spinbutton", { name: "desired-grade" }),
        {
          target: { value: desiredGrade },
        },
      );
      await fireEvent.submit(screen.getByLabelText(/calculate-button/i));
    });

    expect(mockHandleSubmit).toHaveBeenLastCalledWith({
      assessments: [
        {
          description,
          weight,
          maxGrade,
          grade,
        },
      ],
      desiredGrade,
    });
  });

  it("should disable delete button when there is only one assessment", async () => {
    render(
      <GradeForm handleSubmit={mockHandleSubmit} handleSave={mockHandleSave} />,
    );

    expect(
      screen.getByLabelText(/delete-[icon,button]/i).closest("button"),
    ).toBeDisabled();
  });

  it("should show add button on empty assessments", async () => {
    render(
      <GradeForm
        courseData={{ assessments: [] }}
        handleSubmit={mockHandleSubmit}
        handleSave={mockHandleSave}
      />,
    );

    await waitFor(async () => {
      await fireEvent.click(screen.getByLabelText(/add-[icon,button]/i));
    });

    expect(
      screen.queryAllByRole("textbox", { name: "description" }),
    ).toHaveLength(1);
  });

  it("should add new assessment when clicking on the add button", async () => {
    render(
      <GradeForm handleSubmit={mockHandleSubmit} handleSave={mockHandleSave} />,
    );

    await waitFor(async () => {
      await fireEvent.click(screen.getByLabelText(/add-[icon,button]/i));
      await fireEvent.click(screen.getByLabelText(/add-[icon,button]/i));

      expect(
        screen.queryAllByRole("textbox", { name: "description" }),
      ).toHaveLength(3);
    });
  });

  it("should show errors when number of assessments exceeds limit", async () => {
    render(
      <GradeForm handleSubmit={mockHandleSubmit} handleSave={mockHandleSave} />,
    );

    await waitFor(async () => {
      for (let i = 0; i <= MAX_ASSESSMENTS_PER_COURSE; i++) {
        await fireEvent.click(screen.getByLabelText(/add-[icon,button]/i));
      }
    });

    expect(
      screen.queryByText(/number of assessments must not exceed.*/i),
    ).not.toBeNull();
  });

  it("should remove assessments when clicking on the delete button", async () => {
    render(
      <GradeForm handleSubmit={mockHandleSubmit} handleSave={mockHandleSave} />,
    );

    await waitFor(async () => {
      await fireEvent.click(screen.getByLabelText(/add-[icon,button]/i));
      await fireEvent.click(screen.getByLabelText(/add-[icon,button]/i));
      await fireEvent.click(
        screen.queryAllByLabelText(/delete-[icon,button]/i)[0],
      );
    });

    expect(
      screen.queryAllByRole("textbox", { name: "description" }),
    ).toHaveLength(2);
  });

  it("should show errors on empty weight field", async () => {
    render(
      <GradeForm handleSubmit={mockHandleSubmit} handleSave={mockHandleSave} />,
    );

    await waitFor(async () => {
      await fireEvent.submit(screen.getByLabelText(/calculate-button/i));
    });

    expect(screen.queryByText(/weight is required/i)).not.toBeNull();
  });

  it("should show errors on empty desired grade field", async () => {
    render(
      <GradeForm handleSubmit={mockHandleSubmit} handleSave={mockHandleSave} />,
    );

    await waitFor(async () => {
      await fireEvent.submit(screen.getByLabelText(/calculate-button/i));
    });

    expect(screen.queryByText(/desired grade is required/i)).not.toBeNull();
  });

  it("should show errors when weight value is more than 100%", async () => {
    render(
      <GradeForm handleSubmit={mockHandleSubmit} handleSave={mockHandleSave} />,
    );

    await waitFor(async () => {
      await fireEvent.change(
        screen.getByRole("spinbutton", { name: "weight" }),
        {
          target: { value: "120" },
        },
      );
      await fireEvent.submit(screen.getByLabelText(/calculate-button/i));
    });

    expect(screen.queryByText(/weight must be between 0-100/i)).not.toBeNull();
  });

  it("should show errors when total weight value is more than 100%", async () => {
    render(
      <GradeForm handleSubmit={mockHandleSubmit} handleSave={mockHandleSave} />,
    );

    await waitFor(async () => {
      await fireEvent.click(screen.getByLabelText(/add-[icon,button]/i));
      await fireEvent.click(screen.getByLabelText(/add-[icon,button]/i));

      await fireEvent.change(
        screen.queryAllByRole("spinbutton", { name: "weight" })[0],
        {
          target: { value: "50" },
        },
      );
      await fireEvent.change(
        screen.queryAllByRole("spinbutton", { name: "weight" })[1],
        {
          target: { value: "50" },
        },
      );
      await fireEvent.change(
        screen.queryAllByRole("spinbutton", { name: "weight" })[2],
        {
          target: { value: "10" },
        },
      );
      await fireEvent.submit(screen.getByLabelText(/calculate-button/i));
    });

    expect(
      screen.queryAllByText(/total weight must not exceed 100%/i),
    ).not.toBeNull();
  });

  it("should show errors when grade is greater than max grade", async () => {
    render(
      <GradeForm handleSubmit={mockHandleSubmit} handleSave={mockHandleSave} />,
    );

    await waitFor(async () => {
      await fireEvent.change(
        screen.getByRole("spinbutton", { name: "grade" }),
        {
          target: { value: "10" },
        },
      );
      await fireEvent.change(
        screen.getByRole("spinbutton", { name: "max-grade" }),
        {
          target: { value: "5" },
        },
      );
      await fireEvent.submit(screen.getByLabelText(/calculate-button/i));
    });

    expect(
      screen.queryByText(/max grade must be greater or equal to grade/i),
    ).not.toBeNull();
  });

  it("should show errors when grade is defined but max grade is blank", async () => {
    render(
      <GradeForm handleSubmit={mockHandleSubmit} handleSave={mockHandleSave} />,
    );

    await waitFor(async () => {
      await fireEvent.change(
        screen.getByRole("spinbutton", { name: "grade" }),
        {
          target: { value: "10" },
        },
      );
      await fireEvent.submit(screen.getByLabelText(/calculate-button/i));
    });

    expect(
      screen.queryByText(/max grade is required for the specified grade/i),
    ).not.toBeNull();
  });

  it("should be accessible", async () => {
    const { container } = render(
      <GradeForm handleSubmit={mockHandleSubmit} handleSave={mockHandleSave} />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
