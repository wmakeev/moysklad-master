/**
 * actionsAppenders
 * Date: 20.02.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

module.exports = {

    'window.open': function (actionInfo) {
        return function (master) {
            var templateContext = master,
                query;

            var queryParts = _.map(actionInfo.params, function (value, key) {
                return key + '=' + encodeURIComponent(_.template(value, templateContext))
            });
            queryParts.length > 0 ?
                query = '?' + queryParts.join('&') :
                query = '';

            //debugger;
            window.open(
                _.template(actionInfo.url, templateContext) + query,
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