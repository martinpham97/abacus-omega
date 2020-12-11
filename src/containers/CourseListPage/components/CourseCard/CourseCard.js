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
  Tooltip,
  Typography,
} from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  CheckCircleOutline as CheckCircleOutlineIcon,
  CheckCircle as CheckCircleIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@material-ui/icons";
import { parseISO, format } from "date-fns";
import { useTranslation } from "react-i18next";

import { course as courseType } from "types";
import { deleteButtonTheme } from "config/theme";

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
        <Tooltip title={course.name} placement="top">
          <CardActionArea
            aria-label="view-course"
            onClick={() => handleEdit(course.id)}
          >
            <CardHeader
              classes={{
                content: classes.content,
              }}
              title={course.name}
              titleTypographyProps={{
                noWrap: true,
                className: classes.cardHeaderTitle,
              }}
              subheader={
                <>
                  <Typography>
                    {t("course_card.date_added", {
                      date: format(parseISO(course.createdAt), "dd/MM/yyyy"),
                      defaultValue: `Date added: ${format(
                        parseISO(course.createdAt),
                        "dd/MM/yyyy",
                      )}`,
                    })}
                  </Typography>
                  <Typography>
                    {t("course_card.num_assessments", {
                      count: nAssessments,
                      defaultValue: `No. assessments: ${nAssessments}`,
                    })}
                  </Typography>
                </>
              }
            />
          </CardActionArea>
        </Tooltip>
        <CardActions className={classes.cardActions}>
          <Button
            size="small"
            aria-label="edit-course"
            startIcon={<EditIcon />}
            onClick={() => handleEdit(course.id)}
          >
            {t("button.edit", "Edit")}
          </Button>
          <ThemeProvider theme={createMuiTheme(deleteButtonTheme)}>
            <Button
              size="small"
              color="primary"
              aria-label="delete-course"
              startIcon={<DeleteIcon />}
              onClick={() => handleDelete(course.id)}
            >
              {t("button.delete", "Delete")}
            </Button>
          </ThemeProvider>
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
