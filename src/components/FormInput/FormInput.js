import { useFormContext, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";

export const FormInput = ({ ...restProps }) => {
  const { control } = useFormContext();

  return (
    <Controller
      as={TextField}
      control={control}
      defaultValue=""
      {...restProps}
    />
  );
};

export default FormInput;
