import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

import { store } from "store/store";

export const renderWithWrappers = (component) => {
  const AppWrapper = ({ children }) => (
    <Provider store={store}>
      <BrowserRouter>
        <SnackbarProvider>{children}</SnackbarProvider>
      </BrowserRouter>
    </Provider>
  );

  AppWrapper.propTypes = {
    children: PropTypes.node,
  };

  return {
    ...render(component, { wrapper: AppWrapper }),
  };
};
