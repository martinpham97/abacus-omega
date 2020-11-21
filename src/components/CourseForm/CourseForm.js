import PropTypes from "prop-types";
import * as yup from "yup";
import { FastField, withFormik, Form } from "formik";
import { TextField } from "formik-material-ui";
import { useTranslation, withTranslation } from "react-i18next";

import { course as courseType } from "types";

export const CourseForm = ({ id }) => {
  const { t } = useTranslation("app");

  return (
    <Form id={id}>
      <FastField
        name="name"
        type="text"
        label={t("course_form.name.label", "Course name")}
        fullWidth
        inputProps={{
          "aria-label": "course-name",
          maxLength: "255",
          required: true,
        }}
        component={TextField}
      />
    </Form>
  );
};

export const FormikCourseForm = withTranslation("app")(
  withFormik({
    mapPropsToValues({ courseData = {} }) {
      const { name } = courseData;
      return {
        name: name || "",
      };
    },
    validationSchema: ({ t }) =>
      yup.object().shape({
        name: yup
          .string()
          .max(
            255,
            t("course_form.name.max", {
              num: 255,
              defaultValue: "Course name must not exceed 255 characters",
            }),
          )
          .required(t("course_form.name.required", "Course name is required")),
      }),
    handleSubmit: async (values, { props }) => {
      const { handleSubmit } = props;
      const { name } = values;
      await handleSubmit({ name });
    },
  })(CourseForm),
);

CourseForm.propTypes = {
  id: PropTypes.string,
};

FormikCourseForm.propTypes = {
  courseData: courseType,
  handleSubmit: PropTypes.func.isRequired,
};

export default FormikCourseForm;
