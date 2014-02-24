/**
 * MenuButtonsCollection (Collection)
 * Vitaliy V. Makeev
 * w.makeev@gmail.com
 * Date: 08.01.14
 */

var _ = require('lodash'),
    Backbone = require('backbone');

var MenuButtonModel = require('../models/ButtonPanel.MenuButtonModel');

var MenuButtonsCollection = Backbone.Collection.extend({
    model: MenuButtonModel
});


// MenuBar model
module.exports = MenuButtonsCollection;