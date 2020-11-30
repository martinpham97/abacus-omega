import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Card,
  CardHeader,
  CardActions,
  CardActionArea,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import {
  CheckCircleOutline as CheckCircleOutlineIcon,
  CheckCircle as CheckCircleIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@material-ui/icons";
import { useTranslation } from "react-i18next";

import { course as courseType } from "types";

import useStyles from "./styles";

export const CourseCard = ({
  course,
  handleEdit,
  handleDelete,
  handleSelect,
  selectMode,
  selected,
}) => {
  const classes = useStyles();
  const { t } = useTranslation("app");

  const nAssessments = course.assessments?.length || 0;

  return (
    <Card className={classes.root}>
      <div
        className={clsx(classes.cardSelectOverlay, {
          [classes.hidden]: !selectMode,
        })}
      >
        <FormControlLabel
          control={
            <Checkbox
              icon={<CheckCircleOutlineIcon fontSize="large" />}
              checkedIcon={<CheckCircleIcon fontSize="large" />}
              color="primary"
              name="select"
              onChange={(e) => handleSelect(course.id, e.target.checked)}
              checked={selected}
            />
          }
          label={t("course_card.select_checkbox.label", "Select")}
        />
      </div>
      <div
        className={clsx({
          [classes.disableClick]: selectMode,
        })}
      >
        <CardActionArea
          data-testid="card-action-area"
          onClick={() => handleEdit(course.id)}
        >
          <CardHeader
            title={course.name}
            subheader={t("course_card.description", {
              count: nAssessments,
              defaultValue: `No. assessments: ${nAssessments}`,
            })}
          />
        </CardActionArea>
        <CardActions className={classes.cardActions}>
          <Button
            size="small"
            color="primary"
            aria-label="edit-course"
            startIcon={<EditIcon />}
            onClick={() => handleEdit(course.id)}
          >
            {t("button.edit", "Edit")}
          </Button>
          <Button
            size="small"
            aria-label="delete-course"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(course.id)}
          >
            {t("button.delete", "Delete")}
          </Button>
        </CardActions>
      </div>
    </Card>
  );
};

CourseCard.propTypes = {
  course: courseType.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  selectMode: PropTypes.bool,
  selected: PropTypes.bool,
};

export default CourseCard;
