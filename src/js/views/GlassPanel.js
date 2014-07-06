/**
 * GlassPanel
 * Date: 04.06.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _ = require('lodash'),
    Backbone = require('backbone'),
    master = require('../master'),
    router;


var PopupMenuItemsView = require('./PopupMenuItemsView');

var MenuButtonView = Backbone.View.extend({

    tagName: 'div'

}