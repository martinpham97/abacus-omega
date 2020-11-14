import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

import theme from "config/theme";

export const AppLayout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container maxWidth="md">{children}</Container>
  </ThemeProvider>
);

AppLayout.propTypes = {
  children: PropTypes.node,
};

export default AppLayout;
