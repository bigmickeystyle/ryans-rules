module.exports = new Proxy({}, {
  get: function (target, property) {
    return property;
  }
});
