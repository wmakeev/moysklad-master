/**
 * ButtonPanel.MenuButtonsTmpl
 * Date: 25.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var domjs = require('../domjs-instance');

module.exports = {
    template: function (model) {
        return function () {
            table({ cellspacing: 0, cellpadding: 0, class: 'b-air-button-panel' },
                tbody(
                    tr({ class: 'menu_bar' })
                )
            );
        }
    },

    build: function (model) {
        return domjs.build(this.template(model))
    }
};
