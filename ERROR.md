
1. 引入redux后报 Cannot read property 'dispatch' of undefined
node_modules/react-router-redux/es/ConnectedRouter.js:26
 _this.store.dispatch({
     | ^  27 |     type: LOCATION_CHANGE,
  28 |     payload: location
  29 |   });

  用connected-react-router 替换 react-router-redux

  2. When specified, "proxy" in package.json must be a string.
Instead, the type of "proxy" was "object".

  用http-proxy-middleware处理
  且用es5语法/createProxyMiddleware

