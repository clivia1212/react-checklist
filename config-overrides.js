/* config-override.js */

// const rewireTypescript = require('react-app-rewire-typescript');

// module.exports = function override(config, env) {
//   // do stuff with the webpack config ...
//   config = rewireTypescript(config, env);
//   return config;
// }

const { override, addDecoratorsLegacy } = require('customize-cra');
module.exports = override(
  addDecoratorsLegacy()
);
