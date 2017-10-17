import { getHighlights, getSourcePath, getOptions } from './matchers';

describe('matchers', () => {
  describe('getHighlights', () => {
    it('finds highlights from url with highlights', () => {
      const highlights = getHighlights('source:examples/test/test.js{6,7,8}');

      expect(highlights).toBe('6,7,8');
    });

    it('finds highlights from url with options', () => {
      const highlights = getHighlights(
        'source:examples/test/test.js{6,7,8}?editorsize=70'
      );

      expect(highlights).toBe('6,7,8');
    });

    it('finds no highlights from url with no highlights', () => {
      const highlights = getHighlights('source:examples/test/test.js');

      expect(highlights).toBeUndefined();
    });
  });

  describe('getOptions', () => {
    it('finds options from url with options', () => {
      const options = getOptions('source:examples/test/test.js?editorsize=70');

      expect(options).toBe('editorsize=70');
    });

    it('finds options from url with highlights + options', () => {
      const options = getOptions(
        'source:examples/test/test.js{6,7,8}?editorsize=70'
      );

      expect(options).toBe('editorsize=70');
    });

    it('finds no options from url with no options', () => {
      const options = getOptions('source:examples/test/test.js');

      expect(options).toBeUndefined();
    });
  });

  describe('getSourcePath', () => {
    it('finds path from url with options', () => {
      const path = getSourcePath('source:examples/test/test.js?editorsize=70');

      expect(path).toBe('examples/test/test.js');
    });

    it('finds path from url with highlights + options', () => {
      const path = getSourcePath(
        'source:examples/test/test.js{6,7,8}?editorsize=70'
      );

      expect(path).toBe('examples/test/test.js');
    });

    it('finds path from url with no options/highlights', () => {
      const path = getSourcePath('source:examples/test/test.js');

      expect(path).toBe('examples/test/test.js');
    });
  });
});
