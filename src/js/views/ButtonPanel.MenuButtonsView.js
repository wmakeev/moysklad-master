/**
 * ButtonPanel.MenuButtonsGroupView
 * Vitaliy V. Makeev
 * w.makeev@gmail.com
 * Date: 07.01.14
 */

var _ = require('lodash'),
    Backbone = require('backbone');

var master = require('../master').getInstance();

// Models
var MenuButtonsCollection = require('../collections/ButtonPanel.MenuButtonsCollection.js');

// Views
var MenuButtonView = require('./ButtonPanel.MenuButtonView.js');

var id_prefix = 'ma_buttonpanel_';

// MenuBar View
var MenuButtonsView = Backbone.View.extend({

    tagName: 'td',

    attributes: function () {
        return {
            id: id_prefix + this.cid,
            align: 'left',
            style: 'vertical-align: top;'
        }
    },

    initialize: function () {
        _.bindAll(this, 'render', 'addMenu', 'ensureAppended');

        this.collection = new MenuButtonsCollection();
        this.collection.on('add', this.addMenu);

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
        this.ensureAppended();

        return this;
    },

    addMenu: function (menuModel) {
        if (this.collection.length > 1) {
            $('>table', this.el).addClass('b-air-button-panel-many');
        }
        var menuView = new MenuButtonView({
            model: menuModel,
            className: 'menu' + (this.collection.at(0) === menuModel ? ' first' : '')
        });
        $('tr.menu_bar', this.el).append(menuView.render().el);
    },

    // Ensure menu panel appended for each suitable place
    ensureAppended: function () {
        var that = this;

        master.on('UI:ButtonPanel', function ($selector) {
            var routeName = master.app.router.getRouteName();
            if ($selector.filter('#' + id_prefix + that.cid).length == 0) {
                $selector
                    .filter(function () {
                        return $('.b-air-button-panel', this).length > 0;
                    })
                    .filter(':last')
                    .after(that.el);
                console.debug('ButtonPanel.MenuButtonView appended to page "' + routeName + '"'); //DEBUG log
            }
        });
    }

});

module.exports = MenuButtonsView;