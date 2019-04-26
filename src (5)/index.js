import React from "react"
import {render} from "react-dom"
import {BrowserRouter as Router} from "react-router-dom"
import {Provider} from "react-redux"
import "bootstrap/dist/css/bootstrap.min.css"
import configureStore from "./store"
import App from "./components/App"

const store = configureStore()
window.store = store

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root"),
)
