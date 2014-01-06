/**
 * Vitaliy V. Makeev
 * w.makeev@gmail.com
 * Date: 06.01.14
 */

var _ = require('lodash'),
    Backbone = require('backbone');

// Router

var Router = Backbone.Router.extend({

    routes: {
        ':section(/:action)': 'routeHandler'
    },

    queryPattern: /([\w-]+)(\?(.+))?/,

    routeHandler: function (section, action) {

        var routeInfo = {
                query: {}
            },
            that = this;

        function parseQueryString(queryString) {
            var queryParams = {};
            if (queryString) {
                var queryParts = queryString.split('&');
                _.each(queryParts, function (queryPart) {
                    var kv = queryPart.split('=');
                    if (kv && kv.length == 2) {
                        queryParams[kv[0]] = decodeURIComponent(kv[1]);
                    }
                });
            }
            return queryParams;
        }

        function extractQueryParams(hashSection, sectionType) {
            var match = that.queryPattern.exec(hashSection);
            if (match && match.length == 4) {
                routeInfo[sectionType] = match[1];
                _.extend(routeInfo.query, parseQueryString(match[3]));
            } else {
                routeInfo[sectionType] = hashSection;
            }
        }

        extractQueryParams(section, 'section');
        extractQueryParams(action, 'action');

        var routeInfoMsg = [
            'Router event:',
            'section=' + routeInfo.section,
            'action=' + routeInfo.action,
            '  QueryString:'
        ];
        _.forOwn(routeInfo.query, function (queryItem, key) {
            routeInfoMsg.push(key + '=' + queryItem);
        });

        this.log.debug(routeInfoMsg.join('\n'));
    }

});

module.exports = Router;