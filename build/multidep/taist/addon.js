function init() {

  function startModule(taistApi, entryPoint) {
    /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var sa = __webpack_require__(1);
	var Sandbox = __webpack_require__(5).Sandbox;

	// plugins
	var moduleLocatorPlugin = __webpack_require__(6);
	var flowBindPlugin = __webpack_require__(9);

	var core = new sa.Core(Sandbox);

	core.on('error', function (err) {
	  var errList = err instanceof Array ? err : [err];
	  errList.forEach(function (errItem) {
	    console.log('%s', errItem.stack);
	  });
	});

	// TODO Временно!
	var flowBindPluginOptions = {
	  pipe: {
	    "{{instanceId}}/error": "error"
	  },
	  forward: {}
	};

	core
	  .use(flowBindPlugin, flowBindPluginOptions)
	  .use(moduleLocatorPlugin, {})
	  .boot(function (err) {
	    if (err) throw err;
	    core.start(function (err) {
	      if (err) {
	        if (err.moduleErrors) {
	          _.forOwn(err.moduleErrors, function (moduleError) {
	            console.log('%s\n', moduleError.stack);
	          })
	        } else {
	          throw err;
	        }
	      }
	      core.emit('app/start');
	    });
	  });




/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {/*!
	scaleapp - v0.5.0 - 2015-02-21
	This program is distributed under the terms of the MIT license.
	Copyright (c) 2011-2015 Markus Kohlhase <mail@markus-kohlhase.de>
	*/
	(function() {
	  var Core, Mediator, api, argRgx, checkType, doForAll, fnRgx, getArgumentNames, runFirst, runParallel, runSeries, runWaterfall, util,
	    __slice = [].slice;

	  fnRgx = /function[^(]*\(([^)]*)\)/;

	  argRgx = /([^\s,]+)/g;

	  getArgumentNames = function(fn) {
	    var _ref;
	    return ((fn != null ? (_ref = fn.toString().match(fnRgx)) != null ? _ref[1] : void 0 : void 0) || '').match(argRgx) || [];
	  };

	  runParallel = function(tasks, cb, force) {
	    var count, errors, hasErr, i, results, t, _i, _len, _results;
	    if (tasks == null) {
	      tasks = [];
	    }
	    if (cb == null) {
	      cb = (function() {});
	    }
	    count = tasks.length;
	    results = [];
	    if (count === 0) {
	      return cb(null, results);
	    }
	    errors = [];
	    hasErr = false;
	    _results = [];
	    for (i = _i = 0, _len = tasks.length; _i < _len; i = ++_i) {
	      t = tasks[i];
	      _results.push((function(t, i) {
	        var e, next;
	        next = function() {
	          var err, res;
	          err = arguments[0], res = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	          if (err) {
	            errors[i] = err;
	            hasErr = true;
	            if (!force) {
	              return cb(errors, results);
	            }
	          } else {
	            results[i] = res.length < 2 ? res[0] : res;
	          }
	          if (--count <= 0) {
	            if (hasErr) {
	              return cb(errors, results);
	            } else {
	              return cb(null, results);
	            }
	          }
	        };
	        try {
	          return t(next);
	        } catch (_error) {
	          e = _error;
	          return next(e);
	        }
	      })(t, i));
	    }
	    return _results;
	  };

	  runSeries = function(tasks, cb, force) {
	    var count, errors, hasErr, i, next, results;
	    if (tasks == null) {
	      tasks = [];
	    }
	    if (cb == null) {
	      cb = (function() {});
	    }
	    i = -1;
	    count = tasks.length;
	    results = [];
	    if (count === 0) {
	      return cb(null, results);
	    }
	    errors = [];
	    hasErr = false;
	    next = function() {
	      var e, err, res;
	      err = arguments[0], res = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	      if (err) {
	        errors[i] = err;
	        hasErr = true;
	        if (!force) {
	          return cb(errors, results);
	        }
	      } else {
	        if (i > -1) {
	          results[i] = res.length < 2 ? res[0] : res;
	        }
	      }
	      if (++i >= count) {
	        if (hasErr) {
	          return cb(errors, results);
	        } else {
	          return cb(null, results);
	        }
	      } else {
	        try {
	          return tasks[i](next);
	        } catch (_error) {
	          e = _error;
	          return next(e);
	        }
	      }
	    };
	    return next();
	  };

	  runFirst = function(tasks, cb, force) {
	    var count, errors, i, next, result;
	    if (tasks == null) {
	      tasks = [];
	    }
	    if (cb == null) {
	      cb = (function() {});
	    }
	    i = -1;
	    count = tasks.length;
	    result = null;
	    if (count === 0) {
	      return cb(null);
	    }
	    errors = [];
	    next = function() {
	      var e, err, res;
	      err = arguments[0], res = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	      if (err) {
	        errors[i] = err;
	        if (!force) {
	          return cb(errors);
	        }
	      } else {
	        if (i > -1) {
	          return cb(null, res.length < 2 ? res[0] : res);
	        }
	      }
	      if (++i >= count) {
	        return cb(errors);
	      } else {
	        try {
	          return tasks[i](next);
	        } catch (_error) {
	          e = _error;
	          return next(e);
	        }
	      }
	    };
	    return next();
	  };

	  runWaterfall = function(tasks, cb) {
	    var i, next;
	    i = -1;
	    if (tasks.length === 0) {
	      return cb();
	    }
	    next = function() {
	      var err, res;
	      err = arguments[0], res = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	      if (err != null) {
	        return cb(err);
	      }
	      if (++i >= tasks.length) {
	        return cb.apply(null, [null].concat(__slice.call(res)));
	      } else {
	        return tasks[i].apply(tasks, __slice.call(res).concat([next]));
	      }
	    };
	    return next();
	  };

	  doForAll = function(args, fn, cb, force) {
	    var a, tasks;
	    if (args == null) {
	      args = [];
	    }
	    tasks = (function() {
	      var _i, _len, _results;
	      _results = [];
	      for (_i = 0, _len = args.length; _i < _len; _i++) {
	        a = args[_i];
	        _results.push((function(a) {
	          return function(next) {
	            return fn(a, next);
	          };
	        })(a));
	      }
	      return _results;
	    })();
	    return util.runParallel(tasks, cb, force);
	  };

	  util = {
	    doForAll: doForAll,
	    runParallel: runParallel,
	    runSeries: runSeries,
	    runFirst: runFirst,
	    runWaterfall: runWaterfall,
	    getArgumentNames: getArgumentNames,
	    hasArgument: function(fn, idx) {
	      if (idx == null) {
	        idx = 1;
	      }
	      return util.getArgumentNames(fn).length >= idx;
	    }
	  };

	  Mediator = (function() {
	    function Mediator(obj, cascadeChannels) {
	      this.cascadeChannels = cascadeChannels != null ? cascadeChannels : false;
	      this.channels = {};
	      if (obj instanceof Object) {
	        this.installTo(obj);
	      } else if (obj === true) {
	        this.cascadeChannels = true;
	      }
	    }


	    /*
	    Section: Public methods
	     */

	    Mediator.prototype.on = function(channel, fn, context) {
	      var id, k, sub, that, v, _base, _i, _len, _results, _results1;
	      if (context == null) {
	        context = this;
	      }
	      if ((_base = this.channels)[channel] == null) {
	        _base[channel] = [];
	      }
	      that = this;
	      if (channel instanceof Array) {
	        _results = [];
	        for (_i = 0, _len = channel.length; _i < _len; _i++) {
	          id = channel[_i];
	          _results.push(this.on(id, fn, context));
	        }
	        return _results;
	      } else if (typeof channel === "object") {
	        _results1 = [];
	        for (k in channel) {
	          v = channel[k];
	          _results1.push(this.on(k, v, fn));
	        }
	        return _results1;
	      } else {
	        if (typeof channel !== "string") {
	          return false;
	        }
	        sub = {
	          context: context,
	          callback: fn
	        };
	        return {
	          attach: function() {
	            if (sub.callback) {
	              that.channels[channel].push(sub);
	            }
	            return this;
	          },
	          detach: function() {
	            if (sub.callback) {
	              Mediator._rm(that, channel, sub.callback);
	            }
	            return this;
	          },
	          pipe: function() {
	            that.pipe.apply(that, [channel].concat(__slice.call(arguments)));
	            return this;
	          },
	          forward: function() {
	            that.forward.apply(that, [channel].concat(__slice.call(arguments)));
	            return this;
	          }
	        }.attach();
	      }
	    };

	    Mediator.prototype.off = function(ch, cb) {
	      var id;
	      switch (typeof ch) {
	        case "string":
	          if (typeof cb === "function") {
	            Mediator._rm(this, ch, cb);
	          }
	          if (typeof cb === "undefined") {
	            Mediator._rm(this, ch);
	          }
	          break;
	        case "function":
	          for (id in this.channels) {
	            Mediator._rm(this, id, ch);
	          }
	          break;
	        case "undefined":
	          for (id in this.channels) {
	            Mediator._rm(this, id);
	          }
	          break;
	        case "object":
	          for (id in this.channels) {
	            Mediator._rm(this, id, null, ch);
	          }
	      }
	      return this;
	    };

	    Mediator.prototype.emit = function(channel, data, cb, originalChannel) {
	      var chnls, o, tasks;
	      if (cb == null) {
	        cb = (function() {});
	      }
	      if (originalChannel == null) {
	        originalChannel = channel;
	      }
	      if (typeof data === "function") {
	        cb = data;
	        data = void 0;
	      }
	      if (typeof channel !== "string") {
	        return false;
	      }
	      tasks = Mediator._getTasks(data, channel, originalChannel, this);
	      util.runSeries(tasks, (function(errors, results) {
	        var e, x;
	        if (errors) {
	          e = new Error(((function() {
	            var _i, _len, _results;
	            _results = [];
	            for (_i = 0, _len = errors.length; _i < _len; _i++) {
	              x = errors[_i];
	              if (x != null) {
	                _results.push(x.message);
	              }
	            }
	            return _results;
	          })()).join('; '));
	        }
	        return cb(e);
	      }), true);
	      if (this.cascadeChannels && (chnls = channel.split('/')).length > 1) {
	        if (this.emitOriginalChannels) {
	          o = originalChannel;
	        }
	        this.emit(chnls.slice(0, -1).join('/'), data, cb, o);
	      }
	      return this;
	    };

	    Mediator.prototype.send = function(channel, data, cb) {
	      var tasks;
	      if (cb == null) {
	        cb = function() {};
	      }
	      if (typeof data === "function") {
	        cb = data;
	        data = void 0;
	      }
	      if (typeof channel !== "string") {
	        return false;
	      }
	      tasks = Mediator._getTasks(data, channel, channel, this);
	      util.runFirst(tasks, (function(errors, result) {
	        var e, x;
	        if (errors) {
	          e = new Error(((function() {
	            var _i, _len, _results;
	            _results = [];
	            for (_i = 0, _len = errors.length; _i < _len; _i++) {
	              x = errors[_i];
	              if (x != null) {
	                _results.push(x.message);
	              }
	            }
	            return _results;
	          })()).join('; '));
	          return cb(e);
	        } else {
	          return cb(null, result);
	        }
	      }), true);
	      return this;
	    };

	    Mediator.prototype.installTo = function(obj, force) {
	      var k, v;
	      if (typeof obj === "object") {
	        for (k in this) {
	          v = this[k];
	          if (force) {
	            obj[k] = v;
	          } else {
	            if (obj[k] == null) {
	              obj[k] = v;
	            }
	          }
	        }
	      }
	      return this;
	    };

	    Mediator.prototype.pipe = function(src, target, mediator) {
	      return Mediator._redirect.apply(this, ['emit'].concat(__slice.call(arguments)));
	    };

	    Mediator.prototype.forward = function(src, target, mediator) {
	      return Mediator._redirect.apply(this, ['send'].concat(__slice.call(arguments)));
	    };


	    /*
	    Section: Private static methods
	     */

	    Mediator._redirect = function(method, src, target, mediator) {
	      if (target instanceof Mediator) {
	        mediator = target;
	        target = src;
	      }
	      if (mediator == null) {
	        return Mediator._redirect.call(this, method, src, target, this);
	      }
	      if (mediator === this && src === target) {
	        return this;
	      }
	      this.on(src, function(data, ch, cb) {
	        return mediator[method].call(mediator, target, data, cb);
	      });
	      return this;
	    };

	    Mediator._getTasks = function(data, channel, originalChannel, ctx) {
	      var sub, subscribers, _i, _len, _results;
	      subscribers = ctx.channels[channel] || [];
	      _results = [];
	      for (_i = 0, _len = subscribers.length; _i < _len; _i++) {
	        sub = subscribers[_i];
	        _results.push((function(sub) {
	          return function(next) {
	            var e;
	            try {
	              if (util.hasArgument(sub.callback, 3)) {
	                return sub.callback.apply(sub.context, [data, originalChannel, next]);
	              } else {
	                return next(null, sub.callback.apply(sub.context, [data, originalChannel]));
	              }
	            } catch (_error) {
	              e = _error;
	              return next(e);
	            }
	          };
	        })(sub));
	      }
	      return _results;
	    };

	    Mediator._rm = function(o, ch, cb, ctxt) {
	      var s;
	      if (o.channels[ch] == null) {
	        return;
	      }
	      return o.channels[ch] = (function() {
	        var _i, _len, _ref, _results;
	        _ref = o.channels[ch];
	        _results = [];
	        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	          s = _ref[_i];
	          if ((cb != null ? s.callback !== cb : ctxt != null ? s.context !== ctxt : s.context !== o)) {
	            _results.push(s);
	          }
	        }
	        return _results;
	      })();
	    };

	    return Mediator;

	  })();

	  checkType = function(type, val, name) {
	    if (typeof val !== type) {
	      return "" + name + " has to be a " + type;
	    }
	  };

	  Core = (function() {
	    function Core(Sandbox) {
	      var err;
	      this.Sandbox = Sandbox;
	      if (this.Sandbox != null) {
	        err = checkType('function', this.Sandbox, 'Sandbox');
	      }
	      if (err) {
	        throw new Error(err);
	      }
	      this._modules = {};
	      this._plugins = [];
	      this._instances = {};
	      this._sandboxes = {};
	      this._running = {};
	      this._mediator = new Mediator(this);
	      this.Mediator = Mediator;
	      if (this.Sandbox == null) {
	        this.Sandbox = function(core, instanceId, options, moduleId) {
	          this.instanceId = instanceId;
	          this.options = options != null ? options : {};
	          this.moduleId = moduleId;
	          core._mediator.installTo(this);
	          return this;
	        };
	      }
	    }

	    Core.prototype.log = {
	      error: function() {},
	      log: function() {},
	      info: function() {},
	      warn: function() {},
	      enable: function() {}
	    };

	    Core.prototype.register = function(id, creator, options) {
	      var err;
	      if (options == null) {
	        options = {};
	      }
	      err = checkType("string", id, "module ID") || checkType("function", creator, "creator") || checkType("object", options, "option parameter");
	      if (err) {
	        this.log.error("could not register module '" + id + "': " + err);
	        return this;
	      }
	      if (id in this._modules) {
	        this.log.warn("module " + id + " was already registered");
	        return this;
	      }
	      this._modules[id] = {
	        creator: creator,
	        options: options,
	        id: id
	      };
	      return this;
	    };

	    Core.prototype.start = function(moduleId, opt, cb) {
	      var e, id, initInst;
	      if (opt == null) {
	        opt = {};
	      }
	      if (cb == null) {
	        cb = function() {};
	      }
	      if (arguments.length === 0) {
	        return this._startAll();
	      }
	      if (moduleId instanceof Array) {
	        return this._startAll(moduleId, opt);
	      }
	      if (typeof moduleId === "function") {
	        return this._startAll(null, moduleId);
	      }
	      if (typeof opt === "function") {
	        cb = opt;
	        opt = {};
	      }
	      e = checkType("string", moduleId, "module ID") || checkType("object", opt, "second parameter") || (!this._modules[moduleId] ? "module doesn't exist" : void 0);
	      if (e) {
	        return this._startFail(e, cb);
	      }
	      id = opt.instanceId || moduleId;
	      if (this._running[id] === true) {
	        return this._startFail(new Error("module was already started"), cb);
	      }
	      initInst = (function(_this) {
	        return function(err, instance, opt) {
	          if (err) {
	            return _this._startFail(err, cb);
	          }
	          try {
	            if (util.hasArgument(instance.init, 2)) {
	              return instance.init(opt, function(err) {
	                if (!err) {
	                  _this._running[id] = true;
	                }
	                return cb(err);
	              });
	            } else {
	              instance.init(opt);
	              _this._running[id] = true;
	              return cb();
	            }
	          } catch (_error) {
	            e = _error;
	            return _this._startFail(e, cb);
	          }
	        };
	      })(this);
	      return this.boot((function(_this) {
	        return function(err) {
	          if (err) {
	            return _this._startFail(err, cb);
	          }
	          return _this._createInstance(moduleId, opt, initInst);
	        };
	      })(this));
	    };

	    Core.prototype._startFail = function(e, cb) {
	      this.log.error(e);
	      cb(new Error("could not start module: " + e.message));
	      return this;
	    };

	    Core.prototype._createInstance = function(moduleId, o, cb) {
	      var Sandbox, iOpts, id, key, module, obj, opt, sb, val, _i, _len, _ref;
	      id = o.instanceId || moduleId;
	      opt = o.options;
	      module = this._modules[moduleId];
	      if (this._instances[id]) {
	        return cb(this._instances[id]);
	      }
	      iOpts = {};
	      _ref = [module.options, opt];
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        obj = _ref[_i];
	        if (obj) {
	          for (key in obj) {
	            val = obj[key];
	            if (iOpts[key] == null) {
	              iOpts[key] = val;
	            }
	          }
	        }
	      }
	      Sandbox = typeof o.sandbox === 'function' ? o.sandbox : this.Sandbox;
	      sb = new Sandbox(this, id, iOpts, moduleId);
	      return this._runSandboxPlugins('init', sb, (function(_this) {
	        return function(err) {
	          var instance;
	          instance = new module.creator(sb);
	          if (typeof instance.init !== "function") {
	            return cb(new Error("module has no 'init' method"));
	          }
	          _this._instances[id] = instance;
	          _this._sandboxes[id] = sb;
	          return cb(null, instance, iOpts);
	        };
	      })(this));
	    };

	    Core.prototype._runSandboxPlugins = function(ev, sb, cb) {
	      var p, tasks;
	      tasks = (function() {
	        var _i, _len, _ref, _ref1, _results;
	        _ref = this._plugins;
	        _results = [];
	        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	          p = _ref[_i];
	          if (typeof ((_ref1 = p.plugin) != null ? _ref1[ev] : void 0) === "function") {
	            _results.push((function(p) {
	              var fn;
	              fn = p.plugin[ev];
	              return function(next) {
	                if (util.hasArgument(fn, 3)) {
	                  return fn(sb, p.options, next);
	                } else {
	                  fn(sb, p.options);
	                  return next();
	                }
	              };
	            })(p));
	          }
	        }
	        return _results;
	      }).call(this);
	      return util.runSeries(tasks, cb, true);
	    };

	    Core.prototype._startAll = function(mods, cb) {
	      var done, m, startAction;
	      if (mods == null) {
	        mods = (function() {
	          var _results;
	          _results = [];
	          for (m in this._modules) {
	            _results.push(m);
	          }
	          return _results;
	        }).call(this);
	      }
	      startAction = (function(_this) {
	        return function(m, next) {
	          return _this.start(m, _this._modules[m].options, next);
	        };
	      })(this);
	      done = function(err) {
	        var e, i, k, mdls, modErrors, x, _i, _len;
	        if ((err != null ? err.length : void 0) > 0) {
	          modErrors = {};
	          for (i = _i = 0, _len = err.length; _i < _len; i = ++_i) {
	            x = err[i];
	            if (x != null) {
	              modErrors[mods[i]] = x;
	            }
	          }
	          mdls = (function() {
	            var _results;
	            _results = [];
	            for (k in modErrors) {
	              _results.push("'" + k + "'");
	            }
	            return _results;
	          })();
	          e = new Error("errors occurred in the following modules: " + mdls);
	          e.moduleErrors = modErrors;
	        }
	        return typeof cb === "function" ? cb(e) : void 0;
	      };
	      util.doForAll(mods, startAction, done, true);
	      return this;
	    };

	    Core.prototype.stop = function(id, cb) {
	      var instance, x;
	      if (cb == null) {
	        cb = function() {};
	      }
	      if (arguments.length === 0 || typeof id === "function") {
	        util.doForAll((function() {
	          var _results;
	          _results = [];
	          for (x in this._instances) {
	            _results.push(x);
	          }
	          return _results;
	        }).call(this), ((function(_this) {
	          return function() {
	            return _this.stop.apply(_this, arguments);
	          };
	        })(this)), id, true);
	      } else if (instance = this._instances[id]) {
	        delete this._instances[id];
	        this._mediator.off(instance);
	        this._runSandboxPlugins('destroy', this._sandboxes[id], (function(_this) {
	          return function(err) {
	            if (util.hasArgument(instance.destroy)) {
	              return instance.destroy(function(err2) {
	                delete _this._running[id];
	                return cb(err || err2);
	              });
	            } else {
	              if (typeof instance.destroy === "function") {
	                instance.destroy();
	              }
	              delete _this._running[id];
	              return cb(err);
	            }
	          };
	        })(this));
	      }
	      return this;
	    };

	    Core.prototype.use = function(plugin, opt) {
	      var p, _i, _len;
	      if (plugin instanceof Array) {
	        for (_i = 0, _len = plugin.length; _i < _len; _i++) {
	          p = plugin[_i];
	          switch (typeof p) {
	            case "function":
	              this.use(p);
	              break;
	            case "object":
	              this.use(p.plugin, p.options);
	          }
	        }
	      } else {
	        if (typeof plugin !== "function") {
	          return this;
	        }
	        this._plugins.push({
	          creator: plugin,
	          options: opt
	        });
	      }
	      return this;
	    };

	    Core.prototype.boot = function(cb) {
	      var core, p, tasks;
	      core = this;
	      tasks = (function() {
	        var _i, _len, _ref, _results;
	        _ref = this._plugins;
	        _results = [];
	        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	          p = _ref[_i];
	          if (p.booted !== true) {
	            _results.push((function(p) {
	              if (util.hasArgument(p.creator, 3)) {
	                return function(next) {
	                  var plugin;
	                  return plugin = p.creator(core, p.options, function(err) {
	                    if (!err) {
	                      p.booted = true;
	                      p.plugin = plugin;
	                    }
	                    return next();
	                  });
	                };
	              } else {
	                return function(next) {
	                  p.plugin = p.creator(core, p.options);
	                  p.booted = true;
	                  return next();
	                };
	              }
	            })(p));
	          }
	        }
	        return _results;
	      }).call(this);
	      util.runSeries(tasks, cb, true);
	      return this;
	    };

	    return Core;

	  })();

	  api = {
	    VERSION: "0.5.0",
	    util: util,
	    Mediator: Mediator,
	    Core: Core,
	    plugins: {},
	    modules: {}
	  };

	  if (("function" !== "undefined" && __webpack_require__(3) !== null ? __webpack_require__(4) : void 0) != null) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return api;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof window !== "undefined" && window !== null) {
	    if (window.scaleApp == null) {
	      window.scaleApp = api;
	    }
	  } else if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
	    module.exports = api;
	  }

	}).call(this);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 4 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 5 */
/***/ function(module, exports) {

	exports.Sandbox = function (core, instanceId, options, moduleId) {
	  // e.g. provide the Mediator methods 'on', 'emit', etc.
	  core._mediator.installTo(this);

	  // maybe you'd like to expose the instance ID
	  this.id = instanceId;

	  this.log = core.log;

	  return this;
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var discover = __webpack_require__(7);

	module.exports = function (core, options) {
	  discover('amd:define', function (data) {
	    var name = data.name;
	    if (name && name.slice(0, 15) === 'scaleapp-module') {
	      requirejs([name], function (module) {
	        // extract module name and version // TODO move outside
	        var nameVersion = name.split((/(.+)@(.+)/));
	        if (nameVersion.length > 1) nameVersion = nameVersion.slice(1, 3);
	        var moduleName = nameVersion[0];
	        // var moduleVersion = nameVersion[1] || 'default';

	        // get user module options
	        taistApi.userData.get(moduleName + ':options', function (err, options) {
	          options = options || {};
	          core.register(name, module, options);
	        });
	      })
	    }
	  })
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var guid = __webpack_require__(8);

	module.exports = function discover(key, handler) {
	  var discoveredEventsIds = {};
	  var publishEventName = guid + ':publish';
	  var discoverEventName = guid + ':discover';

	  var stop = function () {
	    window.removeEventListener(publishEventName, listener);
	  };

	  var listener = function (ev) {
	    ev = ev.detail;
	    if (ev && ev.id && ev.key === key && !discoveredEventsIds.hasOwnProperty(ev.id)) {
	      discoveredEventsIds[ev.id] = true;
	      handler(ev.value, stop);
	    }
	  };
	  window.addEventListener(publishEventName, listener);

	  var event = new CustomEvent(discoverEventName, {
	    detail: {
	      key: key
	    }
	  });
	  window.dispatchEvent(event);

	  return {
	    stop: stop
	  }
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "70152108-2745-4c6a-b529-c4fe10e488a7";

/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * index
	 * Date: 19.02.15
	 * Vitaliy V. Makeev (w.makeev@gmail.com)
	 */

	var flowBindPlugin = function (core, options) {
	    // wildcard bindings on module init
	    var wildcards = {
	        pipe: {},
	        forward: {}
	    };

	    if (options) {
	        ['forward', 'pipe'].forEach(function (flow) {
	            if (options[flow]) {
	                for (var fw in options[flow]) {
	                    if (options[flow].hasOwnProperty(fw)) {
	                        // suspend bind on module init
	                        if (fw.indexOf('{{') != -1 || options[flow][fw].indexOf('{{') != -1) {
	                            wildcards[flow][fw] = options[flow][fw] instanceof Array
	                                ? options[flow][fw]
	                                : [options[flow][fw]];
	                        } else {
	                            // instant bind
	                            var targets = options[flow][fw];
	                            if (!(targets instanceof Array)) targets = [targets];
	                            targets.forEach(function (target) {
	                                // suspend bind on module init
	                                if (target.indexOf('{{') != -1) {
	                                    wildcards[flow][fw] = wildcards[flow][fw] || [];
	                                    wildcards[flow][fw].push(target);
	                                } else {
	                                    core[flow](fw, target);
	                                }
	                            });
	                        }
	                    }
	                }
	            }
	        });
	    }
	    
	    return {
	        init: function (instanceSandbox) {
	            ['forward', 'pipe'].forEach(function (flow) {
	                if (wildcards[flow]) {
	                    for (var fw in wildcards[flow]) {
	                        if (wildcards[flow].hasOwnProperty(fw)) {
	                            var sourceCh = fw.indexOf('{{instanceId}}') != -1
	                                ? fw.replace(/\{\{instanceId\}\}/g, instanceSandbox.id)
	                                : fw;

	                            wildcards[flow][fw].forEach(function (target) {
	                                var targetCh = target.indexOf('{{instanceId}}') != -1
	                                    ? target.replace(/\{\{instanceId\}\}/g, instanceSandbox.id)
	                                    : target;

	                                core[flow](sourceCh, targetCh)
	                            });
	                        }
	                    }
	                }
	            });
	        }
	        //TODO destroy (off events)
	    }
	};

	module.exports = flowBindPlugin;

/***/ }
/******/ ]);

  }
  
  return {
    start: function(taistApi, entryPoint) {
      startModule(taistApi, entryPoint);
    }
  };
}