import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { render } from "@testing-library/react";

import { store } from "store/store";

export const renderWithReactHookForm = (
  component,
  { defaultValues = {} } = {},
) => {
  const FormWrapper = ({ children }) => {
    const methods = useForm({ defaultValues });
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  FormWrapper.propTypes = {
    children: PropTypes.node,
  };

  return {
    ...render(component, { wrapper: FormWrapper }),
  };
};

export const renderWithWrappers = (component) => {
  const AppWrapper = ({ children }) => (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );

  AppWrapper.propTypes = {
    children: PropTypes.node,
  };

  return {
    ...render(component, { wrapper: AppWrapper }),
  };
};
