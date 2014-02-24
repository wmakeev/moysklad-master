/**
 * ButtonPanel.MenuButtonView
 * Vitaliy V. Makeev
 * w.makeev@gmail.com
 * Date: 08.01.14
 */

var _ = require('lodash'),
    Backbone = require('backbone'),
    router = require('../master').getInstance().app.router;

var PopupMenuItemsView = require('./PopupMenuItemsView');

var MenuButtonView = Backbone.View.extend({

    tagName: 'td',

    attributes: {
        align: 'left',
        style: 'vertical-align: top;'
    },

    events: {
        'click': 'clickHandler'
    },

    initialize: function () {
        var that = this;

        _.bindAll(this, 'render', 'unrender', 'remove', 'clickHandler'); //, 'show', 'hide');

        //this.model.bind('change', this.render); //TODO Пока не подписываемся на изменения
        //this.model.bind('remove', this.unrender);

        if (that.model.bindRoutes instanceof Array) {
            router.on('route:moysklad', function (routeInfo) {
                that.model.bindRoutes.indexOf(routeInfo.name) == -1 ?
                    that.hide() :
                    that.show();
            });
        }
    },

    render: function () {
        var that = this,
            menuButtonTempl;

        menuButtonTempl = require('../templates/ButtonPanel.MenuButtonTmpl');
        $(this.el).append(menuButtonTempl.build(this.model));

        this.popupMenuItemsView = new PopupMenuItemsView({
            collection: this.model.menuItems
        });

        // link this menu button view to related menu items list view
        this.popupMenuItemsView.menuButton = this;

        $('body').append(this.popupMenuItemsView.el);

        return this;
    },

    unrender: function () {
        $(this.el).remove();
        //TODO Удалить PopupMenuItemsView по id
    },

    remove: function () {
        this.model.destroy();
    },

    clickHandler: function () {
        this.popupMenuItemsView.isVisible() ?
            this.popupMenuItemsView.hide() :
            this.popupMenuItemsView.show();
    },

    getHeight: function () {
        return $('.btn', this.el).height();
    },

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

module.exports = MenuButtonView;