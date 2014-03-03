/**
 * ButtonPanel.MenuButtonsView
 * Vitaliy V. Makeev
 * w.makeev@gmail.com
 * Date: 07.01.14
 */

var _ = require('lodash'),
    Backbone = require('backbone');

var master = require('../master').getInstance(),
    router;

// Models
var MenuButtonsCollection = require('../collections/ButtonPanel.MenuButtonsCollection.js');

// Views
var MenuButtonView = require('./ButtonPanel.MenuButtonView.js');

// MenuBar View
var MenuButtonsView = Backbone.View.extend({

    tagName: 'td',

    attributes: function () {
        return {
            align: 'left',
            style: 'vertical-align: top;'
        }
    },

    initialize: function () {
        _.bindAll(this, 'render', 'addMenu', 'removeMenu');

        router = master.app.router;

        this.collection = new MenuButtonsCollection();
        this.collection.on('add', this.addMenu);
        this.collection.on('remove', this.removeMenu);

        this.render();
    },

    render: function () {
        var that = this,
            menuBarTemplate;

        menuBarTemplate = require('../templates/ButtonPanel.MenuButtonsTmpl');

        $(this.el).append(menuBarTemplate.build());

        _(this.collection.models).each(function (menuModel) {
            that.addMenu(menuModel);
        }, this);

        // Ensure menu panel appended for each suitable place
        // Слушаем событие появления панели с кнопками
        master.on('UI:ButtonPanel', function ($selector) {
            if ($selector.filter('#ma_id_' + that.cid).length == 0) {
                $selector
                    .filter(function () {
                        return $('.b-air-button-panel', this).length > 0;
                    })
                    .filter(':last')
                    .after(that.el);
                console.debug('ButtonPanel.MenuButtonView appended to page "' + router.getRouteName() + '"'); //DEBUG log
            }
        });

        return this;
    },

    // Обновляет список меню при скрытии и отображении кнопок
    refresh: function () {
        var $table = $('>table', this.el),
            $menus = $table.find('.menu_bar .menu');

        $menus.length > 1 ?
            $table.addClass('b-air-button-panel-many') :
            $table.removeClass('b-air-button-panel-many');

        $menus.each(function (index) {
            index === 0 ?
                $(this).addClass('first') :
                $(this).removeClass('first');
        });
    },

    addMenu: function (menuModel) {
        var that = this;

        // Создаем кнопку меню
        var menuView = new MenuButtonView({
            model: menuModel,
            id: 'ma_id_' + menuModel.cid,
            className: 'menu'
        });
        menuView.render();

        router.on('route:moysklad', function (routeName) {
            //debugger;
            //TODO menuModel.get('bindRoutes')?
            var bindRoutes = menuModel.get('bindRoutes');
            if (bindRoutes == '*' || bindRoutes.indexOf(routeName) != -1) {
                $('tr.menu_bar', that.el).append(menuView.el);
            } else {
                menuView.$el.detach();
            }
            that.refresh();
        });

        return menuView;
    },

    removeMenu: function (menuModel) {
        $(this.el).remove('#ma_id_' + this.model.cid);
        console.log('removed ' + this.model.cid);
    }

});

module.exports = MenuButtonsView;