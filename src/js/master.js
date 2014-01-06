/**
 * Vitaliy V. Makeev
 * w.makeev@gmail.com
 * Date: 04.01.14
 */

var constants = require('./const');

var _ = require('lodash'),
    Backbone = require('backbone');

var Logger = require('./logger'),
    Router = require('./router');

var Master = {},
    router,
    log;




module.exports = {

    createMaster: function (opt) {

        require('./../../vendor/superfish/superfish');
        require('./../../vendor/superfish/hoverIntent');

        log = Logger.createLogger(opt.log);

        _.extend(Master, {
            log: log
        });

        // Save Master object to global
        window[constants.NS_NAME] = Master;

        // Bind jQuery
        Backbone.$ = $;

        // Router
        router = new Router();

        _.extend(router, Backbone.Events, {
            log: log
        });

        // Start
        Backbone.history.start();

        return Master;
    },

    getInstance: function () {
        return window[constants.NS_NAME];
    }


};