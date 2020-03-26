
// Router.sx

import { ConnectedRouter } from 'connected-react-router'
import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
// tslint:disable-next-line: no-submodule-imports
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import Edit from './Edit'
import { persistor, store } from './store'
import history from './store/history'


export default () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <>
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/edit/new" component={Edit} />
            <Route path="/edit/:id" component={Edit} />
          </Switch>
        </>
      </ConnectedRouter>
    </PersistGate>
  </Provider>
)