import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

export const useSmallScreen = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return isSmallScreen;
};

export default useSmallScreen;
