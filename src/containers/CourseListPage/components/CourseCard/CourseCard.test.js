import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";

import CourseCard from "./CourseCard";

describe("<CourseCard />", () => {
  let mockHandleEdit;
  let mockHandleDelete;
  let mockHandleSelect;
  let course;

  beforeEach(() => {
    mockHandleEdit = jest.fn();
    mockHandleDelete = jest.fn();
    mockHandleSelect = jest.fn();
    course = {
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
  });

  it("should display course name", () => {
    render(
      <CourseCard
        course={course}
        handleEdit={mockHandleEdit}
        handleDelete={mockHandleDelete}
        handleSelect={mockHandleSelect}
      />,
    );

    expect(screen.queryByText(course.name)).not.toBeNull();
  });

  it("should display number of assessments", () => {
    render(
      <CourseCard
        course={course}
        handleEdit={mockHandleEdit}
        handleDelete={mockHandleDelete}
        handleSelect={mockHandleSelect}
      />,
    );

    expect(screen.queryByText(/no\. assessments: 3/i)).not.toBeNull();
  });

  it("should call handleEdit with correct id on card click", () => {
    render(
      <CourseCard
        course={course}
        handleEdit={mockHandleEdit}
        handleDelete={mockHandleDelete}
        handleSelect={mockHandleSelect}
      />,
    );

    fireEvent.click(screen.getByTestId(/card-action-area/i));

    expect(mockHandleEdit).toHaveBeenCalledWith(course.id);
  });

  it("should call handleEdit with correct id on edit button click", () => {
    render(
      <CourseCard
        course={course}
        handleEdit={mockHandleEdit}
        handleDelete={mockHandleDelete}
        handleSelect={mockHandleSelect}
      />,
    );

    fireEvent.click(screen.getByText(/edit/i));

    expect(mockHandleEdit).toHaveBeenCalledWith(course.id);
  });

  it("should call handleDelete with correct id on delete button click", () => {
    render(
      <CourseCard
        course={course}
        handleEdit={mockHandleEdit}
        handleDelete={mockHandleDelete}
        handleSelect={mockHandleSelect}
      />,
    );

    fireEvent.click(screen.getByText(/delete/i));

    expect(mockHandleDelete).toHaveBeenCalledWith(course.id);
  });

  it("should display select overlay if selectMode is true", () => {
    render(
      <CourseCard
        course={course}
        handleEdit={mockHandleEdit}
        handleDelete={mockHandleDelete}
        handleSelect={mockHandleSelect}
        selectMode
      />,
    );

    expect(screen.queryByRole("checkbox", { checked: false })).not.toBeNull();
  });

  it("should set checked value in selectMode", () => {
    render(
      <CourseCard
        course={course}
        handleEdit={mockHandleEdit}
        handleDelete={mockHandleDelete}
        handleSelect={mockHandleSelect}
        selectMode
        selected
      />,
    );

    expect(screen.queryByRole("checkbox", { checked: true })).not.toBeNull();
  });

  it("should call handleSelect with course id and checked status when select checkbox is clicked", () => {
    render(
      <CourseCard
        course={course}
        handleEdit={mockHandleEdit}
        handleDelete={mockHandleDelete}
        handleSelect={mockHandleSelect}
        selectMode
      />,
    );

    fireEvent.click(screen.queryByRole("checkbox"));
    expect(mockHandleSelect).toHaveBeenCalledWith(course.id, true);

    fireEvent.click(screen.queryByRole("checkbox"));
    expect(mockHandleSelect).toHaveBeenCalledWith(course.id, false);
  });

  it("should be accessible", async () => {
    const { container } = render(
      <CourseCard
        course={course}
        handleEdit={mockHandleEdit}
        handleDelete={mockHandleDelete}
        handleSelect={mockHandleSelect}
      />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
