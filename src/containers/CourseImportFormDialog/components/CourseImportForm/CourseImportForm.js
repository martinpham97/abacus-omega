import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Chip,
  Grid,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useTranslation } from "react-i18next";

import ugrd from "config/ugrd.json";
import pgrd from "config/pgrd.json";

export const CourseImportForm = ({ id, handleSubmit }) => {
  const { t } = useTranslation("app");

  const handbookPrograms = [...ugrd, ...pgrd];

  const validationSchema = yup.object().shape({
    university: yup
      .string()
      .required(
        t("course_import_form.university.required", "University is required"),
      ),
    specialisation: yup
      .object()
      .required(
        t(
          "course_import_form.specialisation.required",
          "Specialisation is required",
        ),
      ),
    courses: yup
      .array()
      .min(
        1,
        t("course_import_form.courses.min", {
          count: 1,
          defaultValue: "A minimum of 1 course is required",
        }),
      )
      .required(t("course_import_form.courses.required", "Course is required"))
      .of(yup.string()),
  });

  const {
    errors,
    control,
    setValue,
    handleSubmit: handleFormSubmit,
    watch,
  } = useForm({
    defaultValues: {
      university: "unsw",
      specialisation: handbookPrograms[0],
      courses: [],
    },
    resolver: yupResolver(validationSchema),
  });

  const specialisation = watch("specialisation", undefined);

  const getOpObj = (option) => {
    if (!option.code) {
      return handbookPrograms.find((op) => op.code === option);
    }
    return option;
  };

  return (
    <form id={id} onSubmit={handleFormSubmit((data) => handleSubmit(data))}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="university"
            control={control}
            render={({ onChange, onBlur, value }) => (
              <FormControl fullWidth>
                <InputLabel id="university-select-label">
                  {t("course_import_form.university.label", "University")}
                </InputLabel>
                <Select
                  labelId="university-select-label"
                  id="university-select"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  disabled
                >
                  <MenuItem value="unsw">
                    University of New South Wales (UNSW)
                  </MenuItem>
                </Select>
                {!!errors?.university && (
                  <FormHelperText error>
                    {errors.university.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="specialisation"
            render={({ onChange, ...props }) => (
              <Autocomplete
                options={handbookPrograms}
                getOptionLabel={(option) => {
                  const opt = getOpObj(option);
                  return `${opt.code} - ${opt.title} (${opt.level})`;
                }}
                getOptionSelected={(option, value) =>
                  option.code === getOpObj(value).code
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t(
                      "course_import_form.specialisation.label",
                      "Program/Specialisation",
                    )}
                    fullWidth
                    error={!!errors?.specialisation}
                    helperText={errors?.specialisation?.message}
                  />
                )}
                onChange={(e, data) => {
                  setValue("courses", []);
                  onChange(data);
                }}
                {...props}
              />
            )}
            onChange={([, obj]) => obj}
            control={control}
            defaultValue={handbookPrograms[0]}
          />
        </Grid>
        <Grid item xs={12}>
          {specialisation && (
            <Controller
              name="courses"
              control={control}
              render={({ onBlur, onChange, value }) => (
                <FormControl fullWidth>
                  <InputLabel id="courses-label">
                    {t("course_import_form.courses.label", "Courses")}
                  </InputLabel>
                  <Select
                    labelId="courses-label"
                    id="courses"
                    multiple
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    renderValue={(selected) => (
                      <Grid container spacing={1}>
                        {selected.map((value) => (
                          <Grid item key={value}>
                            <Chip label={value.slice(0, 8)} />
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  >
                    {specialisation.courses &&
                    specialisation.courses.length > 0 ? (
                      specialisation.courses.map((course) => (
                        <MenuItem key={course} value={course}>
                          {course}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled value="">
                        <em>
                          {t(
                            "course_import_form.courses.none",
                            "No courses available, please refer to the official Handbook",
                          )}
                        </em>
                      </MenuItem>
                    )}
                  </Select>
                  {!!errors?.courses && (
                    <FormHelperText error>
                      {errors.courses.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          )}
        </Grid>
      </Grid>
    </form>
  );
};

CourseImportForm.propTypes = {
  id: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
};

export default CourseImportForm;