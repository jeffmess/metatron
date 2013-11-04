/*

metatron
https://github.com/jeffmess/metatron

Copyright (c) 2013 Jeffrey van Aswegen
Licensed under the MIT license.
*/

var _this = this;

(function(root) {
  var exports;
  exports = {};
  exports.fetch = function(url) {
    return url;
  };
  exports.pattern = function() {
    return '(([a-zA-Z0-9]+:\\/\\/)?' + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + '((\\d{1,3}\\.){3}\\d{1,3}))' + '(\\:\\d+)?(\\/[-a-z\\d%_.~+,]*)*' + '(\\?[;&a-z\\d%_.~+=-,]*)?' + '(\\#[-a-z\\d_,]*)?)';
  };
  exports.validateUrl = function(url) {
    var regex;
    regex = new RegExp("^" + (this.pattern()) + "$", 'i');
    if (!regex.test(url)) {
      return false;
    }
    return true;
  };
  exports.stringContainsUrl = function(str) {
    var regex;
    regex = new RegExp(this.pattern(), 'gi');
    if (!regex.test(str)) {
      return false;
    }
    return true;
  };
  exports.prefixWord = function(word) {
    var regex;
    regex = new RegExp('^([a-zA-Z0-9]+:\\/\\/)');
    if (regex.test(word)) {
      return word;
    } else {
      return "http://" + word;
    }
  };
  exports.convertWord = function(word, target) {
    if (target == null) {
      target = "";
    }
    if (!this.validateUrl(word)) {
      return word;
    }
    return "<a href='" + (this.prefixWord(word)) + "' target='" + target + "'>" + word + "</a>";
  };
  exports.convertString = function(options) {
    var word;
    if (options == null) {
      options = {};
    }
    if (options.text == null) {
      throw new Error("Required: options.text does not exist.");
    }
    if (!this.stringContainsUrl(options.text)) {
      return options.text;
    }
    if (options.target == null) {
      options.target = "";
    }
    return ((function() {
      var _i, _len, _ref, _results;
      _ref = options.text.split(/([\s]+|[^\s]+)/);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        word = _ref[_i];
        _results.push(this.convertWord(word, options.target));
      }
      return _results;
    }).call(this)).join("");
  };
  return root['metatron'] = exports;
})(this);
