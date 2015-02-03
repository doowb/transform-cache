'use strict';

var assert = require('assert');
var Cache = require('./');

describe('transform-cache', function () {
  describe('defaults', function () {
    it('should create a new instance', function () {
      var cache = new Cache();
      assert(cache, 'Cache should be an object.');
    });

    it('should add an item to the cache', function () {
      var cache = new Cache();
      cache.set('foo', 'bar');
      assert(cache.cache.foo === 'bar', 'foo should equal bar');
    });

    it('should get an item from the cache', function () {
      var cache = new Cache();
      cache.set('foo', 'bar');
      assert(cache.get('foo') === 'bar', 'foo should equal bar');
    });

    it('should add a deep item to the cache', function () {
      var cache = new Cache();
      cache.set('foo.bar', 'baz');
      assert(cache.cache.foo.bar === 'baz', 'bar should equal baz');
    });

    it('should get a deep item from the cache', function () {
      var cache = new Cache();
      cache.set('foo.bar', 'baz');
      assert(cache.get('foo.bar') === 'baz', 'bar should equal baz');
    });
  });

  describe('with referenced object', function () {
    var locals = { foo: 'bar' };
    it('should create a new instance', function () {
      var cache = new Cache(locals);
      assert(cache, 'Cache should be an object.');
      assert(cache.cache === locals, 'cache should equal locals');
      assert(cache.cache.foo === locals.foo, 'cache.foo should equal locals.foo');
    });

    it('should add an item to the cache', function () {
      var cache = new Cache(locals);
      cache.set('beep', 'boop');
      assert(cache.cache.beep === 'boop', 'beep should equal boop');
      assert(locals.beep === 'boop', 'beep should equal boop');
    });

    it('should get an item from the cache', function () {
      var cache = new Cache(locals);
      assert(cache.get('foo') === 'bar', 'foo should equal bar');
    });

    it('should add a deep item to the cache', function () {
      var cache = new Cache(locals);
      cache.set('beep.bar', 'baz');
      assert(cache.cache.beep.bar === 'baz', 'bar should equal baz');
      assert(locals.beep.bar === 'baz', 'bar should equal baz');
    });

    it('should get a deep item from the cache', function () {
      var cache = new Cache(locals);
      assert(cache.get('beep.bar') === 'baz', 'bar should equal baz');
    });
  });

  describe('with custom transform', function () {
    it('should add a transformed value to the cache', function () {
      var cache = new Cache(function (value) {
        return value.toUpperCase();
      });

      cache.set('foo', 'bar');
      assert(cache.get('foo') === 'BAR', 'foo should equal BAR');
    });
  });

  describe('with custom normalizeKey and transform', function () {
    it('should add a transformed value to the cache', function () {
      var cache = new Cache(function (key) {
        return key.toUpperCase();
      },function (value) {
        return value.toUpperCase();
      });

      cache.set('foo', 'bar');
      assert(cache.get('foo') === 'BAR', 'foo should equal BAR');
      assert(cache.get('FOO') === 'BAR', 'FOO should equal BAR');
      assert(cache.get('FOO') === cache.get('foo'), 'FOO should equal foo');
    });
  });
});
