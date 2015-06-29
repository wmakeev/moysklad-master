var sa = require('../vendor/scaleApp');
var Sandbox = require('./scaleapp-sandbox').Sandbox;

// plugins
var moduleLocatorPlugin = require('./scaleapp-plugin-module-locator');
var flowBindPlugin = require('./scaleapp-plugin-flow-bind');

var core = new sa.Core(Sandbox);

core.on('error', function (err) {
  var errList = err instanceof Array ? err : [err];
  errList.forEach(function (errItem) {
    console.log('%s', errItem.stack);
  });
});

// TODO Временно!
var flowBindPluginOptions = {
  pipe: {
    "{{instanceId}}/error": "error"
  },
  forward: {}
};

core
  .use(flowBindPlugin, flowBindPluginOptions)
  .use(moduleLocatorPlugin, {})
  .boot(function (err) {
    if (err) throw err;
    core.start(function (err) {
      if (err) {
        if (err.moduleErrors) {
          _.forOwn(err.moduleErrors, function (moduleError) {
            console.log('%s\n', moduleError.stack);
          })
        } else {
          throw err;
        }
      }
      core.emit('app/start');
    });
  });


