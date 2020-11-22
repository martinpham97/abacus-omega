import PropTypes from "prop-types";
import { useFormContext, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";

export const FormInput = ({ name, transform, ...restProps }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
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
      control={control}
      defaultValue=""
    />
  );
};

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  transform: PropTypes.shape({
    input: PropTypes.func.isRequired,
    output: PropTypes.func.isRequired,
  }),
};

export default FormInput;
