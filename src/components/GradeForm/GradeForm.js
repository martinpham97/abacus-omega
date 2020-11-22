import React from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
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
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";

import { MAX_ASSESSMENTS_PER_COURSE } from "config/constants";
import { useSmallScreen } from "hooks/useSmallScreen";
import { nullableNumberTransform } from "utils/form";
import { course as courseType } from "types";

import FormInput from "components/FormInput/FormInput";

import ResponsiveAddButton from "./components/ResponsiveAddButton/ResponsiveAddButton";
import ResponsiveDeleteButton from "./components/ResponsiveDeleteButton/ResponsiveDeleteButton";
import useStyles from "./styles";

const defaultGrade = () => ({
  description: "",
  grade: "",
  maxGrade: "",
  weight: "",
});

export const GradeForm = ({ courseData = {}, handleSave, handleSubmit }) => {
  const classes = useStyles();
  const isSmallScreen = useSmallScreen();
  const { t } = useTranslation("app");

  const [showAssessmentsError, setShowAssessmentError] = React.useState(false);

  const assessmentMargin = isSmallScreen ? "dense" : "normal";

  const validationSchema = yup.object().shape({
    assessments: yup
      .array()
      .required()
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
            .nullable()
            .transform(nullableNumberTransform)
            .min(
              0,
              t(
                "grade_form.grade.min",
                "Grade must be greater or equal to zero",
              ),
            ),
          maxGrade: yup
            .number()
            .nullable()
            .transform(nullableNumberTransform)
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
            .nullable()
            .transform(nullableNumberTransform)
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
                    (assessment.weight === ""
                      ? 0
                      : parseInt(assessment.weight, 10)),
                  0,
                );
                return weightSum <= 100;
              },
            ),
        }),
      ),
    desiredGrade: yup
      .number()
      .nullable()
      .transform(nullableNumberTransform)
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
  });

  const { assessments, desiredGrade } = courseData;
  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      assessments: assessments || [defaultGrade()],
      desiredGrade: desiredGrade || "",
    },
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit: handleFormSubmit, control, errors, watch } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "assessments",
  });
  const values = watch();
  React.useEffect(() => {
    handleSave(values);
  }, [handleSave, values]);

  const handleAddAssessment = () => {
    if (fields.length < MAX_ASSESSMENTS_PER_COURSE) {
      return append(defaultGrade());
    }
    return setShowAssessmentError(true);
  };

  const handleDeleteAssessment = (index) => remove(index);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleFormSubmit((data) => handleSubmit(data))}>
        <FormControl fullWidth>
          <FormLabel htmlFor="assessments">
            {t("grade_form.assessments.label", "Assessments")}
          </FormLabel>
          {fields && fields.length > 0 ? (
            fields.map((assessment, index) => {
              const isOnlyOne = fields.length === 1;
              const isLast = index === fields.length - 1;
              const isError = errors?.assessments?.hasOwnProperty(index);

              return (
                <React.Fragment key={assessment.id}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={5}>
                      <FormInput
                        name={`assessments[${index}].description`}
                        type="text"
                        label={t("grade_form.description.label", "Description")}
                        margin={assessmentMargin}
                        fullWidth
                        variant="outlined"
                        inputProps={{
                          "aria-label": "description",
                          maxLength: "255",
                        }}
                        error={
                          isError && !!errors.assessments[index]?.description
                        }
                        helperText={
                          isError &&
                          errors.assessments[index]?.description?.message
                        }
                      />
                    </Grid>
                    <Grid item xs={6} md={2}>
                      <FormInput
                        name={`assessments[${index}].grade`}
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
                        error={isError && !!errors.assessments[index]?.grade}
                        helperText={
                          isError && errors.assessments[index]?.grade?.message
                        }
                      />
                    </Grid>
                    <Grid item xs={6} md={2}>
                      <FormInput
                        name={`assessments[${index}].maxGrade`}
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
                        error={isError && !!errors.assessments[index]?.maxGrade}
                        helperText={
                          isError &&
                          errors.assessments[index]?.maxGrade?.message
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <FormInput
                        name={`assessments[${index}].weight`}
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
                        error={isError && !!errors.assessments[index]?.weight}
                        helperText={
                          isError && errors.assessments[index]?.weight?.message
                        }
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
                          handleClick={() => handleDeleteAssessment(index)}
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
          )}

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
            <FormInput
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
              error={!!errors?.desiredGrade}
              helperText={errors?.desiredGrade?.message}
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
      </form>
    </FormProvider>
  );
};

GradeForm.propTypes = {
  courseData: courseType,
  handleSave: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default GradeForm;
