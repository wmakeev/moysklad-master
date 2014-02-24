/**
 * ButtonPanel.MenuButtonTmpl
 * Date: 25.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var domjs = require('../domjs-instance');

module.exports = {
    template: function (model) {
        return function () {
            div({ class: 'btn btn-enabled btn-gray', tabindex: 0 },
                table(
                    colgroup(),
                    tbody(
                        tr(
                            td(),
                            td(
                                span({ class: 'text' }, model.get('name'))
                            ),
                            td(
                                span({ class: 'arrow'})
                            )
                        )
                    )
                )
            );
        }
    },

    build: function (model) {
        return domjs.build(this.template(model))
    }
};
