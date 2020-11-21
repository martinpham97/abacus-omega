// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

const mockI18n = {
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => ({
    t: (str, options) =>
      options?.defaultValue ? options.defaultValue : options,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
      language: "en",
    },
  }),
  // eslint-disable-next-line react/display-name
  withTranslation: () => (Component) => (props) => (
    <Component
      t={(str, options) =>
        options?.defaultValue ? options.defaultValue : options
      }
      {...props}
    />
  ),
};

jest.mock("react-i18next", () => mockI18n);
