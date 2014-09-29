'use strict';
var fs = require('fs');
var path = require('path');
var should = require('should');
var wowtoc = require('../lib');

describe('wow-toc.stringify', function() {
  it ('should work with basic data', function() {
    var fixture = fs.readFileSync(path.join(__dirname, 'fixtures', 'basic-output.toc'), { encoding: 'utf8' });
    wowtoc.stringify({
      tags: {
        'Title': 'Bacon',
        'Interface': '50400',
        'Notes': 'I hate everyone',
        'Version': '4.3.2.1'
      },
      files: ['load.xml', 'bacon.lua']
    }).should.equal(fixture);
  });
});