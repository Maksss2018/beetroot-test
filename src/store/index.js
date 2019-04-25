import {createStore, applyMiddleware, compose} from "redux"
import reduxImmutableStateInvariant from "redux-immutable-state-invariant"
import reducers from "../reducers"
import {createLogger} from "redux-logger"
import thunk from "redux-thunk"

const logger = createLogger({
  collapsed: true,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

function configureStore(initialState) {
  return createStore(
    reducers,
    initialState,
    composeEnhancers(
      applyMiddleware(thunk, logger, reduxImmutableStateInvariant()),
    ),
  )
}

export default configureStore
