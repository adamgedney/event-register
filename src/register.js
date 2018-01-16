/**
 * Event Register
 */
const Register = function () {
  this.register = {};

  this.isIn = name => this.register.hasOwnProperty(name);

  this.setItem = (name) => {
    if (!this.isIn(name)) {
      this.register[name] = name;
    }

    return this.getItem(this.register[name]);
  };

  this.removeItem = name => {
    if (!this.isIn(name)) {
      delete this.register[name];
    }
  };

  this.getItem = name => {
    if (this.isIn(name)) {
      return this.register[name];
    }

    return false;
  };

  this.clear = () => this.register = {};
  this.getAll = () => this.register;
};

const register = new Register();

export default register;

// SAfe to clear storage on page reloads
if (window.performance.navigation.type == 1) {
  register.clear();
}
