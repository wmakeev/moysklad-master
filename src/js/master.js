/**
 * Vitaliy V. Makeev
 * w.makeev@gmail.com
 * Date: 22.12.13
 */

//TODO Сбой при переходе в админку (нет хеша)

var _ = require('lodash'),
    domjs = require('domjs/lib/html5')(document),
    docEditorMenuBar = require('./injections/doc/editor/menu-bar/menu-bar');

var EventEmitter2 = require('eventemitter2').EventEmitter2;

var master;

module.exports = (function () {
    var taistUtils = null,
        log = null;


    return {

        start: function (utilities, entryPoint) {

            taistUtils = utilities;
            log = taistUtils.log;

            //TODO start запускается для каждого изменения hash?
            if (app.getMaster()) {
                log(app.getName() + ' уже инициализирован.');
                return;
            }

            log('[' + app.getName() + '] Инициализация ..');

            require('./../../vendor/superfish/superfish');
            require('./../../vendor/superfish/hoverIntent');

            master = createMaster();
            master.entryPoint = entryPoint;
            app.setMaster(master);

            hashChangeHandler(window.location.hash);
            taistUtils.wait.hashChange(hashChangeHandler);

            taistUtils.wait.once(isAppReady, function () {
                log('Интерфейс МойСклад готов');
                _initAddons();
            }, 1000);
        }
    };

});