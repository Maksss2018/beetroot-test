import {createStore, applyMiddleware, compose} from "redux"
import reduxImmutableStateInvariant from "redux-immutable-state-invariant"
import reducers from "../reducers"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

function configureStore(initialState) {
  return createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(reduxImmutableStateInvariant())),
  )
}

export default configureStore
