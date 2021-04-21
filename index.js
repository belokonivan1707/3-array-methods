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
