import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AppLayout from "containers/AppLayout/AppLayout";
import NotFoundPage from "containers/NotFoundPage/NotFoundPage";
import HomePage from "containers/HomePage/HomePage";
import CourseListPage from "containers/CourseListPage/CourseListPage";
import CourseDetailPage from "containers/CourseDetailPage/CourseDetailPage";
import SettingsPage from "containers/SettingsPage/SettingsPage";
import AboutPage from "containers/AboutPage/AboutPage";

import useGoogleAnalytics from "hooks/useGoogleAnalytics";

const Routes = () => {
  useGoogleAnalytics();

  return (
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/courses" exact>
        <CourseListPage />
      </Route>
      <Route path="/courses/:courseId">
        <CourseDetailPage />
      </Route>
      <Route path="/settings">
        <SettingsPage />
      </Route>
      <Route path="/about">
        <AboutPage />
      </Route>
      <Route path="*">
        <NotFoundPage />
      </Route>
    </Switch>
  );
};

export const App = () => (
  <Router>
    <AppLayout>
      <Routes />
    </AppLayout>
  </Router>
);

export default App;
