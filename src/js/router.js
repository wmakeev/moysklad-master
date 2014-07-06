/**
 * Vitaliy V. Makeev
 * w.makeev@gmail.com
 * Date: 06.01.14
 */

var _ = require('lodash'),
    Backbone = require('backbone');

// Private
//

var _routeInfo;


// Router
//

var Router = Backbone.Router.extend({

    routes: {
        ':section(/:action)(?:query)': 'routeHandler'
    },

    queryPattern: /([\w-]+)(\?(.+))?/,

    routeHandler: function (section, action, query) {

        //console.log(arguments); //TODO DEBUG

        var routeInfo = {
                section: section,
                action: action,
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
            _.extend(routeInfo.query, queryParams);
        }

/*
        function extractQueryParams(hashSection, sectionType) {
            if (hashSection) {
                var match = that.queryPattern.exec(hashSection);
                if (match && match.length == 4) {
                    routeInfo[sectionType] = match[1];
                    _.extend(routeInfo.query, parseQueryString(match[3]));
                } else {
                    routeInfo[sectionType] = hashSection;
                }
            } else {
                routeInfo[sectionType] = null;
            }
        }
*/

        /*extractQueryParams(section, 'section');
        extractQueryParams(action, 'action');*/

        parseQueryString(query);

        _routeInfo = routeInfo;
        _routeInfo.name = this.getRouteName();

        //// [ Debug message --
        //
        var routeInfoMsg = [
            'Router:',
            'Event: "' + this.getRouteName() + '"'
        ];
        var qItems = ['Query: '];
        _.forOwn(routeInfo.query, function (queryItem, key) {
            qItems.push('  ' + key + '=' + queryItem);
        });
        if (qItems.length > 1) routeInfoMsg = routeInfoMsg.concat(qItems);
        this.log.debug(routeInfoMsg.join('\n'));
        //
        //// -- Debug message ]

        this.trigger(this.getRouteName(), _routeInfo, this);
        // for listeners listen to all Moysklad route changes
        this.trigger('route:moysklad', this.getRouteName());
    },

    getRouteName: function () {
        return _routeInfo.section + (_routeInfo.action ? '/' + _routeInfo.action : '');
    },

    getRouteInfo: function () {
        return _routeInfo;
    }

});

module.exports = Router;