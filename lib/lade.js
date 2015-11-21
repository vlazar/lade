/* global define */
(function (root) {
  function lade (obj, name, value) {
    var callable = typeof value === 'function'

    prop(obj, name, {
      get: function () {
        /* eslint-disable no-return-assign */
        return obj[name] = callable ? value.call(obj) : value
      },
      set: function (value) {
        prop(obj, name, { value: value, writable: true })
      }
    })
    return obj
  }

  function prop (obj, name, customOptions) {
    var options = {
      configurable: true,
      enumerable: true
    }
    for (var i in customOptions) {
      options[i] = customOptions[i]
    }
    Object.defineProperty(obj, name, options)
  }

  // Exports: AMD, CommonJS, <script> tag
  if (typeof define === 'function' && define.amd) {
    define(function () { return lade })
  } else if (typeof exports === 'object') {
    module.exports = lade
  } else {
    root.lade = lade
  }
})(this)
