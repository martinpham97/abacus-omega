import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";

export const FormInput = ({ name, transform, defaultValue, ...restProps }) => (
  <Controller
    name={name}
    defaultValue={defaultValue}
    render={({ onChange, onBlur, value, ref }) => (
      <TextField
        onChange={(e) =>
          transform ? onChange(transform.output(e)) : onChange(e.target.value)
        }
        onBlur={onBlur}
        value={transform ? transform.input(value) : value}
        inputRef={ref}
        {...restProps}
      />
    )}
  />
);

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  transform: PropTypes.shape({
    input: PropTypes.func.isRequired,
    output: PropTypes.func.isRequired,
  }),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default FormInput;
