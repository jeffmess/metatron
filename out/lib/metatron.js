/*

metatron
https://github.com/jeffmess/metatron

Copyright (c) 2013 Jeffrey van Aswegen
Licensed under the MIT license.
*/

var _this = this;

(function(root) {
  var Embed, exports;
  exports = {};
  Embed = (function() {
    function Embed() {}

    Embed.prototype.instagram = function(options) {
      var instagram_url, regex;
      if (!options.width) {
        options.width = 400;
      }
      if (!options.height) {
        options.height = 498;
      }
      regex = new RegExp("^https?:\\/\\/(instagr(am\\.com|\\.am)\\/p\\/[a-zA-Z0-9]+)\\/?$", 'i');
      instagram_url = options.url.match(regex);
      return "<iframe src=\"//" + instagram_url[1] + "/embed/\" width=\"" + options.width + "\" height=\"" + options.height + "\" frameborder=\"0\" scrolling=\"no\" allowtransparency=\"true\"></iframe>";
    };

    Embed.prototype.isInstagramImage = function(url) {
      var regex;
      regex = new RegExp("^https?:\\/\\/(instagr(am\\.com|\\.am)\\/p\\/[a-zA-Z0-9]+)\\/?$", 'i');
      if (!regex.test(url)) {
        return false;
      }
      return true;
    };

    return Embed;

  })();
  exports.embed = new Embed;
  exports.fetch = function(url) {
    return url;
  };
  exports.pattern = function() {
    return '(([a-zA-Z0-9]+:\\/\\/)?' + '((([a-z\\d]+(-[a-z\\d]+)*)\\.)+[a-z]{2,}|' + '((\\d{1,3}\\.){3}\\d{1,3}))' + '(\\:\\d+)?(\\/[-a-z\\d%_.~+,]*)*' + '(\\?[\\/:,;&a-z\\d%_.~+=-]*)?' + '(\\#[,-a-z\\d_]*)?)';
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
  exports.convertWord = function(word, target, embed) {
    if (target == null) {
      target = "";
    }
    if (embed == null) {
      embed = false;
    }
    if (!this.validateUrl(word)) {
      return word;
    }
    if (embed) {
      if (this.embed.isInstagramImage(word)) {
        return this.embed.instagram({
          url: word
        });
      }
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
    if (!options.embed) {
      options.embed = false;
    }
    return ((function() {
      var _i, _len, _ref, _results;
      _ref = options.text.split(/([\s]+|[^\s]+)/);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        word = _ref[_i];
        _results.push(this.convertWord(word, options.target, options.embed));
      }
      return _results;
    }).call(this)).join("");
  };
  return root['metatron'] = exports;
})(this);
