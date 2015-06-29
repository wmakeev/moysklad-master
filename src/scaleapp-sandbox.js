exports.Sandbox = function (core, instanceId, options, moduleId) {
  // e.g. provide the Mediator methods 'on', 'emit', etc.
  core._mediator.installTo(this);

  // maybe you'd like to expose the instance ID
  this.id = instanceId;

  this.log = core.log;

  return this;
};