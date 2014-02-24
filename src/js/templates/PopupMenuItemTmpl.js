/**
 * PopupMenuItemView
 * Date: 25.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var domjs = require('../domjs-instance');

module.exports = {
    template: function (model) {
        return function () {
            td(
                {
                    class: 'gwt-MenuItem',
                    role: 'menuitem',
                    colspan: 2
                },
                model.get('name')
            );
        }
    },

    build: function (model) {
        return domjs.build(this.template(model))
    }
};