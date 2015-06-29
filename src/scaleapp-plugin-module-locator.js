var discover = require('@wmakeev/locator/discover');

module.exports = function (core, options) {
  discover('amd:define', function (data) {
    var name = data.name;
    if (name && name.slice(0, 15) === 'scaleapp-module') {
      requirejs([name], function (module) {
        // extract module name and version // TODO move outside
        var nameVersion = name.split((/(.+)@(.+)/));
        if (nameVersion.length > 1) nameVersion = nameVersion.slice(1, 3);
        var moduleName = nameVersion[0];
        // var moduleVersion = nameVersion[1] || 'default';

        // get user module options
        taistApi.userData.get(moduleName + ':options', function (err, options) {
          options = options || {};
          core.register(name, module, options);
        });
      })
    }
  })
};