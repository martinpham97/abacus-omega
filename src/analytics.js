import ReactGA from "react-ga";

const TRACKING_ID = "UA-186214574-1";

function init() {
  // Enable debug mode on the local development environment
  const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";
  const isTest = process.env.NODE_ENV === "test";
  ReactGA.initialize(TRACKING_ID, { debug: isDev, testMode: isTest });
}

function sendEvent(payload) {
  ReactGA.event(payload);
}

function sendPageview(path) {
  ReactGA.set({ page: path });
  ReactGA.pageview(path);
}

const GA = {
  init,
  sendEvent,
  sendPageview,
};

export default GA;
