/*!
 * transform-cache <https://github.com/doowb/transform-cache>
 *
 * Copyright (c) 2015 Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var get = require('get-value');
var set = require('set-object');


/**
 * Create a cache that transforms values when setting.
 *
 * ```js
 * function makeKey = function (key) { return key.toUpperCase(); };
 * function transform = function (value) { return value.toUpperCase(); };
 *
 * var cache = new Cache(makeKey, tranform);
 * ```
 *
 * @param {Function} `cache` Optional object to store the cache on.
 * @param {Function} `normalizeKey` Optional function used to normalize the key.
 * @param {Function} `transform` Optional function used to transform the value.
 * @api public
 */

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

/**
 * Set a value on the cache. The value will be passed through the transform function before setting.
 *
 * ```js
 * cache.set('foo', 'bar');
 * //=> { 'FOO': 'BAR' }
 * ```
 *
 * @param {String} `key` Key used to set the value on the cache.
 * @param {Mixed} `value` Value that gets set on the cache after being transformed.
 * @api public
 */

Cache.prototype.set = function(key, value) {
  return set(this.cache, this.normalizeKey(key), this.transform(value));
};

/**
 * Get a value from the cache.
 *
 * ```js
 * var bar = cache.get('foo');
 * \\=> BAR
 * ```
 *
 * @param  {String} `key` Key used to lookup the value.
 * @return {Mixed} Value returned by the key.
 * @api public
 */

Cache.prototype.get = function (key) {
  return get(this.cache, this.normalizeKey(key));
};

module.exports = Cache;
