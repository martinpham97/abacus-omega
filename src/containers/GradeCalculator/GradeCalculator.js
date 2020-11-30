import PropTypes from "prop-types";

import GradeForm from "components/GradeForm/GradeForm";

export const GradeCalculator = ({ handleSave }) => {
  const handleSubmitAssessments = ({ assessments, desiredGrade }) =>
    console.log(assessments, desiredGrade);

  return (
    <GradeForm handleSubmit={handleSubmitAssessments} handleSave={handleSave} />
  );
};

GradeCalculator.propTypes = {
  handleSave: PropTypes.func,
};

export default GradeCalculator;
