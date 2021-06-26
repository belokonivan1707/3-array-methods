function MyArray(...args) {
  for (let i = 0; i < args.length; i++) {
    if (args[i] != undefined) {
      this[i] = args[i];
    }
  }

  Object.defineProperty(this, "length", {
    get: function () {
      return Object.keys(this).length;
    },
  });
}

MyArray.prototype.push = function (...args) {
  if (args) {
    for (let i = 0; i < args.length; i++) {
      this[this.length] = args[i];
    }
  }
  return this.length;
};

MyArray.prototype.forEach = function (callback, thisArg) {
  if (typeof callback !== "function")
    throw new Error(`${callback} is not a function`);

  for (let i = 0; i < this.length; i++) {
    callback.call(thisArg, this[i], i, this);
  }

  return undefined;
};

MyArray.prototype.map = function (callback, thisArg) {
  if (typeof callback !== "function")
    throw new Error(`${callback} is not a function`);

  const res = new MyArray();

  for (let i = 0; i < this.length; i++) {
    res[i] = callback.call(thisArg, this[i], i, this);
  }

  return res;
};

MyArray.prototype.filter = function (callback, thisArg) {
  if (typeof callback !== "function")
    throw new Error(`${callback} is not a function`);
  let res = new MyArray();

  for (let i = 0; i < this.length; i++) {
    if (callback.call(thisArg, this[i], i, this)) {
      res[res.length] = this[i];
    }
  }

  return res;
};

MyArray.prototype.toString = function () {
  let str = "";

  for (let i = 0; i < this.length; i++) {
    str += this[i] + ",";
  }

  return str.slice(0, str.length - 1);
};

MyArray.prototype.pop = function () {
  let lastItem = this[this.length - 1];

  delete this[this.length - 1];

  return lastItem;
};

MyArray.prototype.reduce = function (callback, initialValue) {
  let accumulator = initialValue || this[0];

  let index = initialValue === undefined ? 1 : 0; //*

  if (typeof callback !== "function")
    throw new Error(`${callback} is not a function`);

  for (; index < this.length; index++) {
    accumulator = callback(accumulator, this[index], index, this);
  }

  return accumulator;
};

MyArray.prototype.sort = function (callback) {
  if (callback) {
    for (let i = 0; i < this.length; i++) {
      for (let j = 0; j < this.length; j++) {
        if (callback(this[j], this[j + 1]) > 0) {
          /// второй объект меньше чем первыйs
          let temp = this[j];
          this[j] = this[j + 1];
          this[j + 1] = temp;
        }
      }
    }
  } else {
    for (let i = 0; i < this.length - 1; i++) {
      let min = i;
      for (let j = i + 1; j < this.length; j++) {
        if (String(this[j]) < String(this[min])) min = j; // воспринимайте этот объект как строку
      }
      let t = this[min];
      this[min] = this[i];
      this[i] = t;
    }
  }
  return this;
};

MyArray.prototype.from = function (array, callback, thisArg) {
  const newArray = new MyArray();
  let i = 0;

  if (typeof array[Symbol.iterator]) {
    for (let value of array) {
      if (callback) {
        newArray.push(callback.call(thisArg, value, i, array));
      } else {
        newArray.push(value);
      }
      i++;
    }
  }
  return newArray;
};
