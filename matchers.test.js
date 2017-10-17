'use strict';

var _matchers = require('./matchers');

describe('matchers', function () {
  describe('getHighlights', function () {
    it('finds highlights from url with highlights', function () {
      var highlights = (0, _matchers.getHighlights)('source:examples/test/test.js{6,7,8}');

      expect(highlights).toBe('6,7,8');
    });

    it('finds highlights from url with options', function () {
      var highlights = (0, _matchers.getHighlights)('source:examples/test/test.js{6,7,8}?editorsize=70');

      expect(highlights).toBe('6,7,8');
    });

    it('finds no highlights from url with no highlights', function () {
      var highlights = (0, _matchers.getHighlights)('source:examples/test/test.js');

      expect(highlights).toBeUndefined();
    });
  });

  describe('getOptions', function () {
    it('finds options from url with options', function () {
      var options = (0, _matchers.getOptions)('source:examples/test/test.js?editorsize=70');

      expect(options).toBe('editorsize=70');
    });

    it('finds options from url with highlights + options', function () {
      var options = (0, _matchers.getOptions)('source:examples/test/test.js{6,7,8}?editorsize=70');

      expect(options).toBe('editorsize=70');
    });

    it('finds no options from url with no options', function () {
      var options = (0, _matchers.getOptions)('source:examples/test/test.js');

      expect(options).toBeUndefined();
    });
  });

  describe('getSourcePath', function () {
    it('finds path from url with options', function () {
      var path = (0, _matchers.getSourcePath)('source:examples/test/test.js?editorsize=70');

      expect(path).toBe('examples/test/test.js');
    });

    it('finds path from url with highlights + options', function () {
      var path = (0, _matchers.getSourcePath)('source:examples/test/test.js{6,7,8}?editorsize=70');

      expect(path).toBe('examples/test/test.js');
    });

    it('finds path from url with no options/highlights', function () {
      var path = (0, _matchers.getSourcePath)('source:examples/test/test.js');

      expect(path).toBe('examples/test/test.js');
    });
  });
});