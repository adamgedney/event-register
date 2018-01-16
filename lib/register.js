"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Event Register
 */
var Register = function Register() {
  var _this = this;

  this.register = {};

  this.isIn = function (name) {
    return _this.register.hasOwnProperty(name);
  };

  this.setItem = function (name) {
    if (!_this.isIn(name)) {
      _this.register[name] = name;
    }

    return _this.getItem(_this.register[name]);
  };

  this.removeItem = function (name) {
    if (!_this.isIn(name)) {
      delete _this.register[name];
    }
  };

  this.getItem = function (name) {
    if (_this.isIn(name)) {
      return _this.register[name];
    }

    return false;
  };

  this.clear = function () {
    return _this.register = {};
  };
  this.getAll = function () {
    return _this.register;
  };
};

var register = new Register();

exports.default = register;

// SAfe to clear storage on page reloads

if (window.performance.navigation.type == 1) {
  register.clear();
}