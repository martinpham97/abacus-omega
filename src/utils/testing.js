import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";

import store from "store/store";

const AppWrapper = ({ children }) => (
  <Provider store={store}>
    <BrowserRouter>{children}</BrowserRouter>
  </Provider>
);

AppWrapper.propTypes = {
  children: PropTypes.node,
};

export const renderWithWrappers = (component) =>
  render(component, { wrapper: AppWrapper });
