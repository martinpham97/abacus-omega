import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AppLayout from "containers/AppLayout/AppLayout";
import HomePage from "containers/HomePage/HomePage";

export const App = () => (
  <Router>
    <AppLayout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
      </Switch>
    </AppLayout>
  </Router>
);

export default App;
