/**
 * PopupMenuItems
 * Date: 25.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var domjs = require('../domjs-instance');

module.exports = {
    template: function (obj) {
        return function () {
            div({ class: 'popupContent' },
                div(
                    {
                        tabindex: 0,
                        role: 'menubar',
                        class: 'popup-button-menu-bar print-popup-menu-bar',
                        hidefocus: 'true',
                        style: 'outline: 0px;'
                    },
                    input({
                        type: 'text',
                        tabindex: -1,
                        style: 'opacity: 0; height: 1px; width: 1px; z-index: -1; overflow: hidden; position: absolute;'}),
                    table(
                        tbody({ class: 'menu-items-list'}

                        )
                    )
                )
            );
        }
    },

    build: function (obj) {
        return domjs.build(this.template(obj))
    }
};