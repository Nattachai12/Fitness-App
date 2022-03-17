import React from "react";
import { render } from "react-dom";
import App from "./components/App.jsx";
import styles from "./scss/application.scss";
// uncomment so that webpack can bundle styles


render(<App />, document.getElementById("root"));
