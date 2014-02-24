/**
 * PopupMenuItemView
 * Date: 24.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _           = require('lodash'),
    Backbone    = require('backbone'),
    master      = require('../master').getInstance(),
    router      = master.app.router;


// PopupMenuItem
//
var PopupMenuItemView = Backbone.View.extend({

    tagName: 'tr',

    attributes: {

    },

    initialize: function () {
        var that = this;

        _.bindAll(this, 'render'); //, 'unrender', 'remove');

        this.model.bind('change', this.render);
        //this.model.bind('remove', this.unrender);

        var bindRoutes = that.model.get('bindRoutes');
        if (bindRoutes instanceof Array) {
            router.on('route:moysklad', function (routeInfo) {
                bindRoutes.indexOf(routeInfo.name) == -1 ?
                    that.hide() :
                    that.show();
            });
        }
    },

    render: function () {
        var that = this,
            elTempl;

        elTempl = require('../templates/PopupMenuItemTmpl');
        //TODO Правильно ли использовать append для обновления на onChange?
        $(this.el)
            .append(elTempl.build(this.model))
            .bind('click', function () {
                that.model.get('action')(master);
            });

        return this;
    },

    /*unrender: function () {
        $(this.el).remove();
    },

    remove: function () {
        this.model.destroy();
    },*/

    //TODO Вынести методы управления видимостью в отдельный родительский класс
    isVisible: function () {
        return this.$el.css('display') != 'none';
    },

    show: function () {
        this.$el.css('display', 'block');
    },

    hide: function () {
        this.$el.css('display', 'none');
    }

});

module.exports = PopupMenuItemView;