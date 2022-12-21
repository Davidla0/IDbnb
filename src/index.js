import React from "react";
import ReactDOM from "react-dom";
import {RootCmp} from "./root-cmp";
import {store} from "./store/store";
import { Provider } from "react-redux";
import { HashRouter as Router } from 'react-router-dom';
import './assets/styles/main.scss'

// import 'bootstrap/dist/css/bootstrap.min.css';

// import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router >
        <RootCmp />
      </Router >
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorkerRegistration.unregister();
