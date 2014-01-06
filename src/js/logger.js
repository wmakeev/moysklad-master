/**
 * Vitaliy V. Makeev
 * w.makeev@gmail.com
 * Date: 05.01.14
 */

// http://www.diveintojavascript.com/projects/javascript-sprintf

var _ = require('lodash'),
    constants = require('./const');

    //TODO Не совместимо с Taist (проверить в браузере дополнительно) или пробовать другую библиотеку
    //vsprintf = require('sprintf-js').vsprintf;

//TODO Temp dummy vsprintf

function replacePattern(pattern, str, values, index) {
    if (index > values.length - 1) return str;
    var position = str.search(pattern);
    if (position != -1) {
        var right = str.substring(0, position);
        var left = str.substring(position + pattern.length);
        return right + values[index] + replacePattern(pattern, left, values, ++index) ;
    }
    return str;
}

var vsprintf = function (format, argsArr) {
    return replacePattern('%s', format, argsArr || [], 0);
};

var _log = function (type, log, args) {
    var format = _.first(args),
        argArr = _.rest(args);

    var prefix = log ? '' : '[' + constants.ADDON_NAME + '] ',
        msg = vsprintf(prefix + format, argArr);

    if (log)
        log(msg);
    else
        console[type](msg);

};

module.exports = {

    createLogger: function (log) {

        var logger = function () {
            var args = Array.prototype.slice.call(arguments);
            _log('log', log, args);
        };

        // TODO move to prototype?

        _.forEach(['info', 'debug', 'warn', 'error'], function (type) {

            (function (logType) {
                logger[logType] = function () {
                    var args = Array.prototype.slice.call(arguments);
                    _log(logType, null, args);
                }
            })(type);

        });

        return logger;
    }

};