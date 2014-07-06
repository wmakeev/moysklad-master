/**
 * getDocTableEntityUuids
 * Date: 18.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var selectors = require('./../selectors');

var idPattern = /\?id=([\w-]{36})/;

var getDocTableEntityUuids = function (entityType) {

    return selectors
        .DocumentTableLinks(entityType)
        .map(function () {
            var uuid,
                match = this.href.match(idPattern);

            if (match) {
                return match[1];
            }
        })
        .toArray();
};

module.exports = getDocTableEntityUuids;