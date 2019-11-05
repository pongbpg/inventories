if (!global._babelPolyfill) {
  require('babel-polyfill');
}
import "regenerator-runtime/runtime";
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import axios from 'axios'
// import reducers from './reducers'
import { Provider } from 'react-redux'
import { configureStore } from "./redux/store";
// import { createStore, applyMiddleware, compose } from 'redux'
// import createSagaMiddleware from "redux-saga";
// import rootSaga from './sagas'
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/vendor/bootstrap.min.css";
// import "react-circular-progressbar/dist/styles.css";
// import "react-perfect-scrollbar/dist/css/styles.css";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "react-table/react-table.css";

import { isMultiColorActive, defaultColor } from "./constants/defaultValues";
const color =
  isMultiColorActive && localStorage.getItem("themeColor")
    ? localStorage.getItem("themeColor")
    : defaultColor;

localStorage.setItem("themeColor", color);

require("./assets/css/sass/themes/gogo." + color + ".scss");
axios.defaults.withCredentials = true;
// axios.defaults.baseURL = 'http://rem-rest-api.herokuapp.com/api'
axios.defaults.baseURL = '/api'

// const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
// const sagaMiddleware = createSagaMiddleware();
// const store = createStore(
//   reducers,
//   compose(applyMiddleware(sagaMiddleware), reduxDevTools)
// );

// sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={configureStore()}>
    <App/>
  </Provider>,
  document.getElementById("root")
);
