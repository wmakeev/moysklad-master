/**
 * appender
 * Date: 27.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash');

var appenders = [
    {
        type: 'ButtonPanel.MenuButtonsView',
        bind: [
            'customerorder/edit',
            'demand/edit' //TODO Использовать шаблоны - "demand(/edit)?$" ?
        ],
        waitFor: function () {
            //TODO Теоретически может сработать на другой странице. Нужно проверять дополнительно роут.
            return $('.b-editor-toolbar>tbody>tr>td').length > 0;
        },
        append: function (el) {
            console.debug('appending el:'); //TODO **DEBUG**
            console.debug(el);
            var $getElementBefore = function () {
                //TODO Оптимизировать селектор
                //TODO Проверять на то, что элемент уже присоединен
                return $('.b-editor-toolbar>tbody>tr>td')
                    .filter(function () {
                        return $('.b-air-button-panel', this).length > 0;
                    })
                    .filter(':last');
            };
            $getElementBefore().after(el);
        }
    }
];


var getAppendersForTargets = function (type, targetRoutes, el) {
    var appendersForTargets = [];

    _(targetRoutes).each(function (targetRoute) {
        var appender = _.first(appenders, {
            type: type,
            bind: [targetRoute]
        });
        // make functions to trigger on specific target route event
        if (appender[0]) {
            appendersForTargets.push({
                route: targetRoute,
                waitFor: appender[0].waitFor,
                append: (function (elem) {
                    return function () {
                        appender[0].append(elem);
                    }
                })(el)
            });
        }
    });

    return appendersForTargets;
};

module.exports = {
    getAppendersForTargets: getAppendersForTargets
};