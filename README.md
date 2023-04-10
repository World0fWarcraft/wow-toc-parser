# wow-toc-parser
World Of Warcraft addon `.toc` file parser. Written in typescript.

## Ressources
This implementation is based on [wow-toc](https://github.com/zekesonxx/wow-toc) by [Zoey Mertes](https://github.com/zekesonxx).

Furthermore the following documentation was used to create this tool:
- http://wowpedia.org/TOC_format
- https://wowwiki-archive.fandom.com/wiki/TOC_format
- https://wowpedia.fandom.com/wiki/TOC_format

## Usage
// TODO publish

`$ npm install wow-toc`

````ts
import { open } from 'fs/promises';
import { parse } from 'wow-toc-parser'

const file = await open('/path/to/file.toc', 'r');
const toc = await parse(file)

console.log(toc)
````

## Notes / Caveats
* Does not acknowledge `#@no-lib-strip@`/`#@end-no-lib-strip@`

## License
// TODO Apache

MIT. See `LICENSE`