/**
 * AppsPanelView
 * Date: 09.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash'),
    Backbone = require('backbone');

var AppsPanel = Backbone.View.extend({

    initialize: function () {
        var that = this;

        _.bindAll(this, 'render', 'clickHandler', 'show', 'hide', 'unrender', 'remove', 'isVisible');

        this.collection.bind('add', this.appendItem);
        this.collection.bind('reset', function (items) {
            _(items).each(function (item) {
                that.appendItem(item);
            })
        });

        this.render();
    }

});