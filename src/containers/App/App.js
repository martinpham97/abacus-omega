import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AppLayout from "containers/AppLayout/AppLayout";
import NotFoundPage from "containers/NotFoundPage/NotFoundPage";
import HomePage from "containers/HomePage/HomePage";
import CourseListPage from "containers/CourseListPage/CourseListPage";

export const App = () => (
  <Router>
    <AppLayout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/courses">
          <CourseListPage />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </AppLayout>
  </Router>
);

export default App;
