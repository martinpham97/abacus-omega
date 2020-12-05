import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { course as courseType } from "types";

export const CourseForm = ({ id, course = {}, handleSubmit }) => {
  const { t } = useTranslation("app");

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .max(
        255,
        t("course_form.name.max", {
          count: 255,
          defaultValue: "Course name must not exceed 255 characters",
        }),
      )
      .required(t("course_form.name.required", "Course name is required")),
  });

  const { name } = course;
  const { register, errors, handleSubmit: handleFormSubmit } = useForm({
    defaultValues: {
      name: name || "",
    },
    resolver: yupResolver(validationSchema),
  });

  return (
    <form id={id} onSubmit={handleFormSubmit((data) => handleSubmit(data))}>
      <TextField
        name="name"
        type="text"
        label={t("course_form.name.label", "Course name")}
        fullWidth
        inputProps={{
          "aria-label": "course-name",
          maxLength: "255",
          required: true,
        }}
        inputRef={register()}
        error={!!errors?.name}
        helperText={errors?.name?.message}
      />
    </form>
  );
};

CourseForm.propTypes = {
  id: PropTypes.string,
  course: courseType,
  handleSubmit: PropTypes.func.isRequired,
};

export default CourseForm;
