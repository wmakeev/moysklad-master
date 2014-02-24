/**
 * actionsAppenders
 * Date: 20.02.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

module.exports = {

    'window.open': function (actionInfo) {
        return function (master) {
            //debugger;
            window.open(
                _.template(actionInfo.url, master),
                actionInfo.title,
                actionInfo.options
            );
        }
    },

    'alert': function (actionInfo) {
        return function (master) {
            alert(_.template(actionInfo.message, master));
        }
    }

};