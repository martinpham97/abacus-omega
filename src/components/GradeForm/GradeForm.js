import React from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { Field, withFormik, FieldArray, Form, useFormikContext } from "formik";
import {
  InputAdornment,
  Grid,
  Button,
  Divider,
  Typography,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { useTranslation, withTranslation } from "react-i18next";

import { MAX_ASSESSMENTS_PER_COURSE } from "config/constants";
import { useSmallScreen } from "hooks/useSmallScreen";
import { course as courseType } from "types";

import ResponsiveAddButton from "./components/ResponsiveAddButton/ResponsiveAddButton";
import ResponsiveDeleteButton from "./components/ResponsiveDeleteButton/ResponsiveDeleteButton";
import useStyles from "./styles";

const defaultGrade = () => ({
  id: uuidv4(),
  description: "",
  grade: "",
  maxGrade: "",
  weight: "",
});

const AutoSave = ({ handleSave }) => {
  const { values } = useFormikContext();
  React.useEffect(() => {
    handleSave(values);
  }, [values, handleSave]);
  return null;
};

export const GradeForm = ({ values, handleSave }) => {
  const classes = useStyles();
  const isSmallScreen = useSmallScreen();
  const { t } = useTranslation("app");

  const [showAssessmentsError, setShowAssessmentError] = React.useState(false);

  const assessmentMargin = isSmallScreen ? "dense" : "normal";

  return (
    <Form>
      <FormControl fullWidth>
        <FormLabel htmlFor="assessments">
          {t("grade_form.assessments.label", "Assessments")}
        </FormLabel>
        <FieldArray
          id="assessments"
          name="assessments"
          render={(arrayHelpers) => {
            const handleAddAssessment = () => {
              if (values.assessments.length < MAX_ASSESSMENTS_PER_COURSE) {
                return arrayHelpers.push(defaultGrade());
              }
              return setShowAssessmentError(true);
            };

            return values.assessments && values.assessments.length > 0 ? (
              values.assessments.map((assessment, index) => {
                const isOnlyOne = values.assessments.length === 1;
                const isLast = index === values.assessments.length - 1;
                const handleDeleteAssessment = () => arrayHelpers.remove(index);

                return (
                  <React.Fragment key={assessment.id}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} md={5}>
                        <Field
                          name={`assessments.${index}.description`}
                          type="text"
                          label={t(
                            "grade_form.description.label",
                            "Description",
                          )}
                          margin={assessmentMargin}
                          fullWidth
                          variant="outlined"
                          inputProps={{
                            "aria-label": "description",
                            maxLength: "255",
                          }}
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={6} md={2}>
                        <Field
                          name={`assessments.${index}.grade`}
                          type="number"
                          label={t("grade_form.grade.label", "Grade")}
                          margin={assessmentMargin}
                          fullWidth
                          variant="outlined"
                          inputProps={{
                            "aria-label": "grade",
                            min: "0",
                            step: "1",
                          }}
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={6} md={2}>
                        <Field
                          name={`assessments.${index}.maxGrade`}
                          type="number"
                          label={t("grade_form.max_grade.label", "Max grade")}
                          margin={assessmentMargin}
                          fullWidth
                          variant="outlined"
                          inputProps={{
                            "aria-label": "max-grade",
                            min: "1",
                            step: "1",
                          }}
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <Field
                          name={`assessments.${index}.weight`}
                          type="number"
                          label={`${t("grade_form.weight.label", "Weight")}*`}
                          margin={assessmentMargin}
                          fullWidth
                          inputProps={{
                            "aria-label": "weight",
                            min: "0",
                            max: "100",
                            step: "1",
                          }}
                          // eslint-disable-next-line react/jsx-no-duplicate-props
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">%</InputAdornment>
                            ),
                          }}
                          variant="outlined"
                          component={TextField}
                        />
                      </Grid>
                      <Grid item container xs={12} md={1} align="center">
                        <Grid
                          item
                          xs={isLast ? 6 : 12}
                          md={12}
                          align={isSmallScreen ? "left" : "center"}
                        >
                          <ResponsiveDeleteButton
                            disabled={isOnlyOne}
                            handleClick={handleDeleteAssessment}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          md={12}
                          align={isSmallScreen ? "right" : "center"}
                        >
                          {isLast && (
                            <ResponsiveAddButton
                              handleClick={handleAddAssessment}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    {isSmallScreen && <Divider className={classes.divider} />}
                  </React.Fragment>
                );
              })
            ) : (
              <>
                <Divider className={classes.divider} />
                <Grid item container xs={12} align="center" justify="center">
                  <Grid item xs={12}>
                    <Typography variant="body2" gutterBottom>
                      {t("grade_form.no_assessment", {
                        button: t("button.add", "Add"),
                        defaultValue:
                          "There is currently no assessment. Click the 'Add' button to add a new assessment",
                      })}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <ResponsiveAddButton handleClick={handleAddAssessment} />
                  </Grid>
                </Grid>
                <Divider className={classes.divider} />
              </>
            );
          }}
        />
        {showAssessmentsError && (
          <FormHelperText id="assessments-help-text" error>
            {t("grade_form.assessments.max", {
              num: MAX_ASSESSMENTS_PER_COURSE,
              defaultValue: `Number of assessments must not exceed ${MAX_ASSESSMENTS_PER_COURSE}`,
            })}
          </FormHelperText>
        )}
      </FormControl>
      {!isSmallScreen && <Divider className={classes.divider} />}
      <Grid container spacing={1} alignItems="flex-start">
        <Grid item xs={12} md={6}>
          <Field
            key="desiredGrade"
            name="desiredGrade"
            type="number"
            label={`${t("grade_form.desired_grade.label", "Desired grade")}*`}
            fullWidth
            inputProps={{
              "aria-label": "desired-grade",
              min: "0",
              max: "100",
              step: "1",
            }}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            variant="outlined"
            component={TextField}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            className={classes.calculateButton}
            variant="contained"
            color="primary"
            aria-label="calculate-button"
            fullWidth
            type="submit"
            size="large"
          >
            {t("button.calculate", "Calculate")}
          </Button>
        </Grid>
      </Grid>
      <AutoSave handleSave={handleSave} />
    </Form>
  );
};

const FormikGradeForm = withTranslation("app")(
  withFormik({
    mapPropsToValues({ courseData = {} }) {
      const { assessments, desiredGrade } = courseData;
      return {
        assessments: assessments || [defaultGrade()],
        desiredGrade: desiredGrade || "",
      };
    },
    validationSchema: ({ t }) =>
      yup.object().shape({
        assessments: yup
          .array()
          .max(MAX_ASSESSMENTS_PER_COURSE)
          .of(
            yup.object().shape({
              description: yup.string().max(
                255,
                t("grade_form.description.max", {
                  num: 255,
                  defaultValue: "Description must not exceed 255 characters",
                }),
              ),
              grade: yup
                .number()
                .min(
                  0,
                  t(
                    "grade_form.grade.min",
                    "Grade must be greater or equal to zero",
                  ),
                ),
              maxGrade: yup
                .number()
                .min(
                  1,
                  t(
                    "grade_form.max_grade.min",
                    "Max grade must be greater than zero",
                  ),
                )
                .when("grade", {
                  is: (val) => !!val,
                  then: yup
                    .number()
                    .min(
                      yup.ref("grade"),
                      t(
                        "grade_form.max_grade.min_grade",
                        "Max grade must be greater or equal to grade",
                      ),
                    )
                    .required(
                      t(
                        "grade_form.max_grade.required_grade",
                        "Max grade is required for the specified grade",
                      ),
                    ),
                }),
              weight: yup
                .number()
                .min(
                  0,
                  t("grade_form.weight.limit", "Weight must be between 0-100"),
                )
                .max(
                  100,
                  t("grade_form.weight.limit", "Weight must be between 0-100"),
                )
                .required(t("grade_form.weight.required", "Weight is required"))
                .test(
                  "weightPercentageLimit",
                  t(
                    "grade_form.weight.total_limit",
                    "Total weight must not exceed 100%",
                  ),
                  function percentageLimit() {
                    const { assessments } = this.from[1].value;
                    const weightSum = assessments.reduce(
                      (acc, assessment) =>
                        acc +
                        (typeof assessment.weight === "number"
                          ? assessment.weight
                          : 0),
                      0,
                    );
                    return weightSum <= 100;
                  },
                ),
            }),
          ),
        desiredGrade: yup
          .number()
          .min(
            0,
            t(
              "grade_form.desired_grade.limit",
              "Desired grade must be between 0-100",
            ),
          )
          .max(
            100,
            t(
              "grade_form.desired_grade.limit",
              "Desired grade must be between 0-100",
            ),
          )
          .required(
            t("grade_form.desired_grade.required", "Desired grade is required"),
          ),
      }),
    handleSubmit: async (values, { props }) => {
      const { handleSubmit } = props;
      const { assessments, desiredGrade } = values;

      if (assessments.length > 0) {
        await handleSubmit({ assessments, desiredGrade });
      }
    },
  })(GradeForm),
);

GradeForm.propTypes = {
  values: courseType.isRequired,
  handleSave: PropTypes.func.isRequired,
};

FormikGradeForm.propTypes = {
  courseData: courseType,
  handleSubmit: PropTypes.func.isRequired,
};

export default FormikGradeForm;
