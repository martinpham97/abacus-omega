import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";

import CourseImportForm from "./components/CourseImportForm/CourseImportForm";

export const CourseImportFormDialog = ({
  title,
  isOpen,
  handleClose,
  handleSubmit,
}) => {
  const { t } = useTranslation("app");

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="course-import-dialog-title"
    >
      <DialogTitle id="course-import-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <CourseImportForm id="course-import-form" handleSubmit={handleSubmit} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} aria-label="cancel-button">
          {t("button.cancel", "Cancel")}
        </Button>
        <Button
          type="submit"
          form="course-import-form"
          color="primary"
          aria-label="create-button"
        >
          {t("button.create", "Create")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CourseImportFormDialog.propTypes = {
  title: PropTypes.node,
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default CourseImportFormDialog;
