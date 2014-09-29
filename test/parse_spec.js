'use strict';
var fs = require('fs');
var path = require('path');
var should = require('should');
var wowtoc = require('../lib');

describe('wow-toc.parse', function() {
  it ('should work on a basic file', function () {
    var fixture = fs.readFileSync(path.join(__dirname, 'fixtures', 'basic-file.toc'), { encoding: 'utf8' });
    wowtoc.parse(fixture).should.eql({
      tags: {
        'Interface': '50400',
        'Title': 'Waiting for Godot',
        'Notes': '"Nothing to be done."',
        'Version': '4.2'
      },
      files: [
        'Vladimir.xml',
        'Estragon.lua'
      ]
    });
  });
  it ('should trunicate lines over 1024', function() {
    var fixture = fs.readFileSync(path.join(__dirname, 'fixtures', 'trunicate.toc'), { encoding: 'utf8' });
    wowtoc.parse(fixture).tags['X-Long'].should.equal('d'.repeat(1024-11));
  });
  it ('should correctly parse Recount.toc', function() {
    /**
     * Recount was selected because it's well known has a fairly large toc,
     * and it has non-latin characters in some translations.
     * I can't find any data on the Recount license, so I'm attributing it
     * and leaving it unmodified in test/fixtures/Recount.toc
     */
    var fixture = fs.readFileSync(path.join(__dirname, 'fixtures', 'Recount.toc'), { encoding: 'utf8' });
    var correct = fs.readFileSync(path.join(__dirname, 'fixtures', 'Recount.json'), { encoding: 'utf8' });
    wowtoc.parse(fixture).should.eql(JSON.parse(correct));
  });
});

//polyfill from MDN
if (!String.prototype.repeat) {
  // jshint ignore:start
  String.prototype.repeat = function (count) {
    "use strict";
    if (this == null)
      throw new TypeError("can't convert " + this + " to object");
    var str = "" + this;
    count = +count;
    if (count != count)
      count = 0;
    if (count < 0)
      throw new RangeError("repeat count must be non-negative");
    if (count == Infinity)
      throw new RangeError("repeat count must be less than infinity");
    count = Math.floor(count);
    if (str.length == 0 || count == 0)
      return "";
    // Ensuring count is a 31-bit integer allows us to heavily optimize the
    // main part. But anyway, most current (august 2014) browsers can't handle
    // strings 1 << 28 chars or longer, so :
    if (str.length * count >= 1 << 28)
      throw new RangeError("repeat count must not overflow maximum string size");
    var rpt = "";
    for (;;) {
      if ((count & 1) == 1)
        rpt += str;
      count >>>= 1;
      if (count == 0)
        break;
      str += str;
    }
    return rpt;
  }
  // jshint ignore:end
}