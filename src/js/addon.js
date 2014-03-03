/**
 * Vitaliy V. Makeev
 * w.makeev@gmail.com
 * Date: 22.12.13
 */

var Master = require('./master'),
    constants = require('./const');

module.exports = (function () {
    var taistUtils = null,
        log = null,
        Router, router,
        moysklad;


    return {

        start: function (utilities, entryPoint) {

            taistUtils = utilities;
            log = taistUtils.log;

            if (Master.getInstance()) {
                log(constants.ADDON_NAME + ' already initialized.');
                return;
            }

            log(constants.ADDON_NAME + ' addon is starting ..');

            Master.createMaster({
                utils: taistUtils,
                entryPoint: entryPoint
            }, function (err, moysklad) {
                if (err) throw err;
                moysklad.app.history.start();
            });

        }
    };

});