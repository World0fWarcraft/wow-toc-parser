# wow-toc
[![Build Status](http://img.shields.io/travis/zekesonxx/wow-toc.svg)](https://travis-ci.org/zekesonxx/wow-toc)
World Of Warcraft addon `.toc` file parser. Written in Node.js.

Built on the documentation at [Wowpedia](http://wowpedia.org/TOC_format).

## Usage
`$ npm install wow-toc`

````js
var wowtoc = require('wow-toc');

var k = wowtoc.parse(fs.readFileSync('somefile.toc'));
wowtoc.stringify(k);
````

## Notes / Caveats
* Does not acknowledge `#@no-lib-strip@`/`#@end-no-lib-strip@`
* `Dependencies`/`OptionalDeps`/etc remain strings (easy to convert to arrays anyways)
* Doesn't validate tag names (`## Bacon: Strip` is valid to it but not to WoW)

## License
MIT. See `LICENSE`