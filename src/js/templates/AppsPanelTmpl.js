/**
 * AppsPanelTmpl
 * Date: 09.03.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var domjs = require('../domjs-instance');

module.exports = {
    template: function (model) {
        return function () {
            div({ class: 'gwt-Label header orange-title line-header' }, model.get('name'));
            div({ class: 'gwt-Label appTipLabel line-footer' }, model.get('description'));

        }
    },

    build: function (model) {
        return domjs.build(this.template(model))
    }
};
