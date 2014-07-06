/**
 * MenuButtonModel
 * Vitaliy V. Makeev
 * w.makeev@gmail.com
 * Date: 08.01.14
 */

var _ = require('lodash'),
    Backbone = require('backbone'),
    actionsAppenders = require('../actionsAppenders');

var PopupMenuItemsCollection = require('../collections/PopupMenuItemsCollection');

var MenuButton = Backbone.Model.extend({

    constructor: function () {
        this.menuItems = new PopupMenuItemsCollection();
        Backbone.Model.apply(this, arguments);
    },

    parse: function (data, options) {
        _(data.items).each(function (item) {
            //TODO Подумать
            // Восстанавливаем метод действия меню из описания
            //debugger;
            var actionsAppenderFactory = actionsAppenders[item.actionInfo.type];
            if (item.actionInfo) {
                item.action = actionsAppenderFactory(item.actionInfo)
            }
        });

        this.menuItems.reset(data.items);
        //TODO Возможно сделать через set (и динамически менять разрешение и привязку)
        //this.allowAccess = data.allowAccess;

        if (!data.bindRoutes) {
            data.bindRoutes = _(data.items)
                .flatten(function (item) {
                    if (item.bindRoutes instanceof Array) {
                        return item.bindRoutes;
                    } else {
                        return '*';
                    }
                })
                .sort()
                .uniq().value();
        }

        this.set('bindRoutes', data.bindRoutes[0] == '*' ? '*' : data.bindRoutes);

        return _.omit(data, [
            'items',
            //'allowAccess',
            'bindRoutes'
        ]);
    }

});

// Menu model
module.exports = MenuButton;