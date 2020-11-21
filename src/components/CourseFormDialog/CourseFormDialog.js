import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";

import CourseForm from "components/CourseForm/CourseForm";
import { course as courseType } from "types";

export const CourseFormDialog = ({
  isOpen,
  handleClose,
  handleSubmit,
  courseData,
}) => {
  const { t } = useTranslation("app");

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="course-dialog-title"
    >
      <DialogTitle id="course-dialog-title">
        {t("course_form_dialog.title", "Save course")}
      </DialogTitle>
      <DialogContent>
        <CourseForm
          id="course-form"
          courseData={courseData}
          handleSubmit={handleSubmit}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} aria-label="cancel-button">
          {t("button.cancel", "Cancel")}
        </Button>
        <Button
          type="submit"
          form="course-form"
          color="primary"
          aria-label="save-button"
        >
          {t("button.save", "Save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CourseFormDialog.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  courseData: courseType,
};

export default CourseFormDialog;
