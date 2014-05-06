/**
 * Vitaliy V. Makeev
 * w.makeev@gmail.com
 * Date: 04.01.14
 */

var constants = require('./const');

var _ = require('lodash'),
    Backbone = require('backbone');

var Logger = require('./logger'),
    Router = require('./router'),
//appender          = require('./appender'),
    selectors = require('./selectors');

var moysklad = {
        initialized: false
    },

    router,
    utils,
    log;


var appendMenu = function (menus) {

    /*var appendersForTargets = appender.getAppendersForTargets(
     'ButtonPanel.MenuButtonsView',
     menus.bind,
     buttonMenu.el
     );*/

    console.debug('appendersForTargets:'); //TODO **DEBUG**
    console.debug(appendersForTargets);

    _(appendersForTargets).each(function (target) {
        router.once(target.route, function () {
            utils.wait.once(
                target.waitFor,
                target.append,
                500)
        });
    });

};

var testMenu = function () {
    appendMenu();
};


// Private methods
//

var _isAppReadyFlag = false,
    _extensions = {},
    _appElements = {},
    _views = []; // array of addons backbone views

/**
 * True if app is ready
 * @returns {boolean}
 * @private
 */
function _isAppReady() {
    //TODO Надо подумать как лучше определять готовность приложения к работе
    if (!_isAppReadyFlag) {
        if ($('.b-application-panel').length > 0 && $('#loading').css("display") === 'none')
            _isAppReadyFlag = true;
    }
    return _isAppReadyFlag;
}

/**
 * Initialize all extensions if app is ready
 * @param {Array} extensions
 * @private
 */
function _initExtensions(extensions) {
    if (_isAppReady()) {
        _.chain(extensions || _extensions)
            .filter(function (extension) {
                return !extension.initialized;
            })
            .each(function (extension) {
                //log('Инициализация аддона [' + extension.name + ']');
                extension.init(moysklad);
                extension.initialized = true;
                log('Extension [' + extension.name + '] initialized.');
            });
    }
}

// Public
//

var app = {

    views: [],

    history: Backbone.history,

    router: {},

    requireLib: requireLib,

    add: function (type, model) {
        // TODO Проверять корректность декларации аддона
        if (_appElements[type] && _appElements[type][model.id]) {
            log.warn('Extension [' + type + ': ' + model.id + '] has already been registered.');
            return false;
        }
        var typeSection = (_appElements[type] = _appElements[type] || {});
        typeSection[model.id] = model;

        _initExtensions([model]);
        return true;
    },

    getView: function (view_id) {
        return _.first(_views, { id: view_id });
    },

    setView: function (view) {
        if (!this.getView(view.id)) {
            _views.push(view);
        }
    },

    appendMenu: appendMenu,

    testMenu: testMenu

};

function requireLib(name) {
    //TODO switch
    //return require(name);
}

/**
 * Возбуждает событие когда становится доступнной разметка указанного блока
 * @param blockName Назване блока которому соответствует некоторая html-разметка
 * @private
 */
function _moyskladUiBlockEventTrigger(blockName) {
    var $selector;
    // После
    setTimeout(utils.wait.once(
        function () {
            $selector = selectors[blockName]();
            return $selector.length > 0;
        },
        function () {
            // trigger event if block is avaliable
            moysklad.trigger('UI:' + blockName, $selector);
            router.once('route:moysklad', function () {
                _moyskladUiBlockEventTrigger(blockName);
            });
        }, 1000),
        2000); // wait for main ui changed
}


module.exports = {

    /**
     * createMaster
     * @param {{ utils: Obj, entryPoint: String}} opt
     * @returns {{initialized: boolean}}
     */
    createMaster: function (opt, callback) {

        //debugger;
        // export addon global namespace
        window[constants.NS_NAME] = moysklad;

        utils = opt.utils;
        log = Logger.createLogger(opt.utils.log);

        _.extend(moysklad,
            {
                app: app,
                Taist: opt,
                log: log
            },
            Backbone.Events
        );

        Backbone.$ = $;
        // Overrides persistence storage with dummy function.
        Backbone.sync = function (method, model, success, error) {
            success();
        };

        // Router
        router = moysklad.app.router = new Router();
        _.extend(moysklad.app.router, Backbone.Events, { log: log }); //TODO remove log

        //Init base master addon Views
        // - default button menu panel
        var blockName = 'ButtonPanel',
            MenuButtonModel = require('./models/ButtonPanel.MenuButtonModel'),
            ButtonPanelMenuView = require('./views/ButtonPanel.MenuButtonsView'),
            buttonPanelMenuView = new ButtonPanelMenuView(); // {id: 'ma_button_panel_default'}

        utils.userData.get('masterMenuDescription', function (err, result) {
            if (err) return callback(err);

            //////
            // Retrive menu defenition from google script
            log('Retrive menu data by script [' + result.scriptId + ']'); //DEBUG log

            var host = 'https://script.google.com',
                scriptId = result.scriptId,
                path = '/macros/s/' + scriptId + '/exec';

            utils.proxy.jQueryAjax(host, path, {}, function (err, result) {
                if (err) return callback(err);

                if (result) {
                    console.log(result); //DEBUG log
                    if (result.error) throw result.error;
                    if (result.statusCode == 200) {

                        var masterInfo = JSON.parse(result.body);
                        console.log(masterInfo); //DEBUG log

                        // Создаем пользовательские меню по полученным описаниям
                        _(masterInfo.ButtonPanel).each(function (menu) {
                            buttonPanelMenuView.collection.add(menu, { parse: true });
                        });

                        //TODO Для каких целей?
                        moysklad.app.views.push(buttonPanelMenuView);

                        //
                        router.once('route:moysklad', function () {
                            _moyskladUiBlockEventTrigger(blockName);
                        });
                            //
                        //////

                        moysklad.initialized = true;
                        callback(null, moysklad);

                    } else {
                        throw new Error('Server error response code - ' + result.statusCode);
                    }
                } else {
                    return callback(new Error('createMaster: Result response is undefined'));
                }
            });
                //
            //////

        });
    },

    getInstance: function () {
        return window[constants.NS_NAME];
    }

};