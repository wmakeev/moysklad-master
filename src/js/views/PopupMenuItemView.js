/**
 * PopupMenuItemView
 * Date: 24.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _           = require('lodash'),
    Backbone    = require('backbone'),
    master      = require('../master').getInstance(),
    router;


// PopupMenuItem
//
var PopupMenuItemView = Backbone.View.extend({

    tagName: 'tr',

    attributes: {

    },

    initialize: function () {
        var that = this;
        router = master.app.router;

        _.bindAll(this, 'render'); //, 'unrender', 'remove');

        this.model.bind('change', this.render);
        //this.model.bind('remove', this.unrender);

        var bindRoutes = that.model.get('bindRoutes');
        router.on('route:moysklad', function (routeName) {
            !bindRoutes || (bindRoutes == '*' || bindRoutes.indexOf(routeName) != -1) ?
                that.show() :
                that.hide();
        });
    },

    render: function () {
        var that = this,
            elTempl;

        elTempl = require('../templates/PopupMenuItemTmpl');
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
        return this.$el.is(':visible'); //this.$el.css('display') != 'none';
    },

    show: function () {
        //console.log('Показываем ' + this.model.get('name')); //DEBUG log
        this.$el.show(); //.css('display', 'block');
    },

    hide: function () {
        //console.log('Прячем ' + this.model.get('name')); //DEBUG log
        this.$el.hide(); //('display', 'none');
    }

});

module.exports = PopupMenuItemView;