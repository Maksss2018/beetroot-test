import {createStore, applyMiddleware, compose} from "redux"
import reduxImmutableStateInvariant from "redux-immutable-state-invariant"
import reducers from "../reducers"
import mylog from "../middlewares/mylog"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

function configureStore(initialState) {
  return createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(mylog, reduxImmutableStateInvariant())),
  )
}

export default configureStore
