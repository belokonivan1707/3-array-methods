function MyArray(...arg) {
  for (let i = 0; i < arg.length; i++) {
    this[i] = arg[i];
  }

  Object.defineProperty(this, "length", {
    get: function () {
      return Object.keys(this).length;
    },
  });
}

MyArray.prototype.push = function (...arg) {
  if (arg) {
    for (let i = 0; i < arg.length; i++) {
      this[this.length] = arg[i];
    }
    return this.length;
  }
};

MyArray.prototype.forEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
};

MyArray.prototype.map = function (callback) {
  let res = new MyArray();

  for (let i = 0; i < this.length; i++) {
    res[i] = callback(this[i], i, this);
  }

  return res;
};

MyArray.prototype.filter = function (callback) {
  let res = new MyArray();

  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      res[res.length] = this[i];
    }
  }

  return res;
};
