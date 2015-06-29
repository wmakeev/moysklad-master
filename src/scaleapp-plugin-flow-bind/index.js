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