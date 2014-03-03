/**
 * PopupMenuItemsView
 * Date: 24.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash'),
    Backbone = require('backbone');


var PopupMenuItemView = require('./PopupMenuItemView');


var PopupMenuItemsView = Backbone.View.extend({

    tagName: 'div',

    attributes: {
        class: 'popup-button-popup popup-button-popup-menu ma-popup',
        style: 'left: 550px; top: 200px; z-index: 20; position: absolute; overflow: visible;'
    },

    events: {
        'click': 'clickHandler'
    },

    initialize: function () {
        var that = this;

        _.bindAll(this, 'render', 'clickHandler', 'show', 'hide', 'unrender', 'remove', 'isVisible');

        //this.collection = new PopupMenuItemsCollection();
        this.collection.bind('add', this.appendItem);
        this.collection.bind('reset', function (items) {
            _(items).each(function (item) {
                that.appendItem(item);
            })
        });

        this.render();
    },

    isVisible: function () {
        return this.$el.is(':visible');
    },

    render: function () {
        var that = this,
            elTemplate;

        elTemplate = require('../templates/PopupMenuItemsTmpl');
        this.$el.append(elTemplate.build());

        _(this.collection.models).each(function (menuItemModel) {
            that.appendItem(menuItemModel);
        }, this);

        this.$el.hide();

        return this;
    },

    appendItem: function (menuItemModel) {
        var itemView = new PopupMenuItemView({
            model: menuItemModel
        });

        $('tbody.menu-items-list', this.el).append(itemView.render().el);
    },

    unrender: function () {
        $(this.el).remove();
    },

    remove: function () {
        this.model.destroy();
    },

    clickHandler: function () {
        // Hide on any menu item click
        this.hide();
    },

    show: function () {
        var that = this;

        // Проверка на клик за пределами меню
        $(document).bind('mousedown.ma-popup', function (e) {
            $(document).unbind('mousedown.ma-popup');
            var el = e.target;
            var popup = $('.ma-popup:visible')[0];
            if (popup) {
                while (true) {
                    if (el == popup) {
                        // клик внутри меню
                        break;
                    } else if (el == that.menuButton.el) {
                        // клик по кнопке этого меню
                        break;
                    } else if (el == document) {
                        // клик за пределами меню
                        $('.ma-popup').hide();
                        break;
                    } else {
                        el = $(el).parent()[0];
                    }
                }
            }
        });

        var menuOffset = this.menuButton.$el.offset(),
            menuHeight = this.menuButton.getHeight();

        this.$el
            .show()
            .offset({
                top: menuOffset.top + menuHeight + 2,
                left: menuOffset.left
            });
    },

    hide: function () {
        this.$el.hide();
    }
});

module.exports = PopupMenuItemsView;