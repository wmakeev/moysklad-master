/**
 * PopupMenuItemsCollection (Collection)
 * Date: 24.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash'),
    Backbone = require('backbone');

var PopupMenuItem = require('../models/PopupMenuItemModel.js');

var PopupMenuItemsCollection = Backbone.Collection.extend({
    model: PopupMenuItem
});


// MenuBar model
module.exports = PopupMenuItemsCollection;