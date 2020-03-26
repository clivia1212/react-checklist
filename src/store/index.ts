
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer, persistStore } from 'redux-persist'
// tslint:disable-next-line: no-submodule-imports
import storage from 'redux-persist/es/storage'
import thunk from 'redux-thunk'
import reducers from '../reducer'
import history from './history'

const rootReducer = combineReducers({
  ...reducers,
  router: connectRouter(history),
})

// const createRootReducer = (h) => combineReducers({
//   ...reducers,
//   router: connectRouter(h),
// })

const middleware = [thunk, routerMiddleware(history)]

// const persistConfig: PersistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['draft'],
// }
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['draft'],
}

// const persistedReducer:typeof rootReducer = persistReducer(persistConfig, rootReducer)
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
  // createRootReducer(history),
  persistedReducer,
  process.env.NODE_ENV === 'development'
  ? composeWithDevTools(
      compose(
        applyMiddleware(
          // routerMiddleware(history)
          ...middleware
        )
      )
    )
  : compose(
      applyMiddleware(
        // routerMiddleware(history)
        ...middleware
      )
    ),
)

const persistor = persistStore(store)

export {
  store,
  persistor,
}


