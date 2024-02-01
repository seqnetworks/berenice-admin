import thunk from "redux-thunk"
import createDebounce from "redux-debounced"
import rootReducer from "./rootReducer"
import logger from "redux-logger"
import { persistStore } from "redux-persist"
import { createStore, applyMiddleware, compose } from "redux"

const middleware = [thunk, createDebounce()]
if (process.env.NODE_ENV === "development") {
  middleware.push(logger)
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(...middleware))
)

export const persistor = persistStore(store)
