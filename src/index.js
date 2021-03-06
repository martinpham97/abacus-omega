import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "fontsource-roboto";

import "./config/i18n";
import "./styles/styles.scss";

import Loading from "components/Loading/Loading";
import { store, persistor } from "store/store";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

const render = () => {
  const App = require("containers/App/App").default;

  ReactDOM.render(
    <React.StrictMode>
      <React.Suspense fallback={<Loading />}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </React.Suspense>
    </React.StrictMode>,
    document.getElementById("root"),
  );
};

render();

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("containers/App/App", render);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
