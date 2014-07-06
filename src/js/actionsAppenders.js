/**
 * actionsAppenders
 * Date: 20.02.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

var getQueryPath = function (params) {
    var that = this;

    var queryParts = _.map(params, function (value, key) {
        return key + '=' + encodeURIComponent(_.template(value, that))
    });

    return queryParts.length > 0 ? '?' + queryParts.join('&') : '';
};


exports['window.open'] = function (actionInfo) {
    return function (master) {
        var templateContext = master;

        var query = getQueryPath.call(master, actionInfo.params);

        //debugger;
        window.open(
                _.template(actionInfo.url, templateContext) + query,
            actionInfo.title,
            actionInfo.options
        );
    }
};


exports['alert'] = function (actionInfo) {
    return function (master) {
        alert(_.template(actionInfo.message, master));
    }
};

exports['error'] = function (actionInfo) {
    return function (master) {
        var message = _.template(actionInfo.message, master);
        alert(message);
        console.debug(actionInfo.error);
    }
};

exports['console.log'] = function (actionInfo) {
    return function (master) {
        console.log(_.template(actionInfo.message, master));
    }
};

exports['redirect'] = function (actionInfo) {
    return function (master) {
        window.location = _.template(actionInfo.url, master);
    }
};

exports['service'] = function (actionInfo) {
    return function (master) {
        var utils = master.Taist.utils;

        var query = getQueryPath.call(master, actionInfo.params);

        var path = _.template(actionInfo.path, master) + query;

        console.log(path); //TODO DEBUG

        //TODO Временно! Исправить
        $('#loading').show();

        utils.proxy.jQueryAjax(actionInfo.host, path, {}, function (err, response) {
            if (err) throw err;

            console.log(response); //TODO DEBUG
            if (response.body) {
                var responseActionInfo = JSON.parse(response.body);
                console.log(responseActionInfo); //TODO DEBUG
                var action = exports[responseActionInfo.type];
                if (action) {
                    //TODO Вероятно в этой функциональности необходимо работать через callback
                    action(responseActionInfo)(master);

                    if (responseActionInfo.redirect) {
                        window.location = responseActionInfo.redirect;
                    }
                    //TODO Временно (
                    if (responseActionInfo.refresh) {
                        window.location = responseActionInfo.refresh;
                        setTimeout(function () {
                            history.back();
                        }, 1000);
                    }
                }

            }
            //TODO Временно! Исправить
            $('#loading').hide();

        });
    }
};