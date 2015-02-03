/*!
 * transform-cache <https://github.com/doowb/transform-cache>
 *
 * Copyright (c) 2015 Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var get = require('get-value');
var set = require('set-object');

function Cache (cache, normalizeKey, transform) {
  if (typeof cache !== 'object') {
    transform = normalizeKey;
    normalizeKey = cache;
    cache = {};
  }

  if (typeof transform !== 'function') {
    transform = normalizeKey;
    normalizeKey = function (key) { return key; };
  }

  if (typeof transform !== 'function') {
    transform = function (value) { return value; };
  }

  this.cache = cache;
  this.normalizeKey = normalizeKey;
  this.transform = transform;
};


Cache.prototype.get = function (key) {
  return get(this.cache, this.normalizeKey(key));
};

Cache.prototype.set = function(key, value) {
  return set(this.cache, this.normalizeKey(key), this.transform(value));
};

module.exports = Cache;
