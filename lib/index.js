/**
 * World Of Warcraft Addon .toc file parser
 * Based on the documentation at http://wowpedia.org/TOC_format
 * @author Zeke Sonxx <github.com/zekesonxx>
 * @license MIT
 */

'use strict';
var debug = require('debug')('wow-toc');

exports.parse = function(input) {
  if (typeof input !== 'string') {
    throw new Error('wowtoc.parse input must be a string, got '+typeof input);
  }
  var lines = input.split(/\r*\n/); //allow Windows newlines
  debug('Got input, '+lines.length+' lines');
  var out = {
    tags: {},
    files: []
  };
  lines.forEach(function(line) {
    if (line.length > 1024) {
      //WoW only reads the first 1024 lines
      debug('Line is longer than 1024 characters, trunicating to be like WoW');
      line = line.substr(0, 1024);
    }

    if (line.substr(0, 2) === '##') { //## Title: Recount
      debug('Line is tag: '+line);
      var tag = line.substr(2, line.indexOf(':')).trim().replace(':', '');
      var value = line.substr(line.indexOf(':')+1, line.length).trim();
      debug('`'+tag+'` : `'+value+'`');
      out.tags[tag] = value;
    } else if (line.substr(0, 1) === '#') { //#bug not feature
      debug('Line is comment: '+line);
    } else { // recount.lua
      //file loading
      debug('Line is file: '+line);
      if (line.trim() !== '') {
        out.files.push(line.trim());
      }
    }
  });
  return out;
};

exports.stringify = function(input) {
  if (typeof input !== 'object') {
    throw new TypeError('wowtoc.stringify input must be an object, got '+typeof input);
  }

  var out = [];
  for(var tag in input.tags) {
    if(input.tags.hasOwnProperty(tag)) {
      out.push('## '+tag+': '+input.tags[tag]);
    }
  }
  (input.files || []).forEach(function(file) {
    out.push(file);
  });
  return out.join('\n');
};