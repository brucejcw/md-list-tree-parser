'use strict';

var path = require('path')
var should = require('should')
var prettyjson = require('prettyjson')
var parse2Json = require('../lib/parser')

var regex = /^(\s*)-\s\[(.*)\]\s*(\((.*)\))?/

describe('test regex', function () {
  it('should pass all strings', function () {
    var testStringArray = [
      ['- [nospace]', 0, 'nospace', ''],
      ['- [with space]', 0, 'with space', ''],
      ['- [has[bracket]]', 0, 'has[bracket]', ''],
      ['- [has-left-single-[bracket]', 0, 'has-left-single-[bracket', ''],
      ['- [has-right-single-bracket]]', 0, 'has-right-single-bracket]', ''],
      ['- [has-(parentheses)]', 0, 'has-(parentheses)', ''],
      ['- [has-(multi)-(parentheses)]', 0, 'has-(multi)-(parentheses)', ''],
      ['- [has-(nested(parentheses))]', 0, 'has-(nested(parentheses))', ''],
      ['- [has-left-single-(parentheses]', 0, 'has-left-single-(parentheses', ''],
      ['- [has-right-single-parentheses)]', 0, 'has-right-single-parentheses)', ''],
      ['  - [second level]', 1, 'second level', ''],
      ['    - [third level]', 2, 'third level', ''],
      ['- [with link](./link)', 0, 'with link', './link'],
      ['- [with root link](/link)', 0, 'with root link', '/link'],
      ['- [with empty link]()', 0, 'with empty link', ''],
      ['- [with complex link](https://www.google.com)', 0, 'with complex link', 'https://www.google.com'],
      ['- [with one space between bracket and link] (https://www.google.com)', 0, 'with one space between bracket and link', 'https://www.google.com'],
      ['- [with more spaces between bracket and link]  (https://www.google.com)', 0, 'with more spaces between bracket and link', 'https://www.google.com'],
      ['- [with more spaces and link inner spaces]  (https://  www.google .com)', 0, 'with more spaces and link inner spaces', 'https://  www.google .com'],
    ]

    for (var i = 0; i < testStringArray.length; i++) {
      var entry = testStringArray[i]
      var testString = entry[0]
      console.log(testString)
      var matchs = testString.match(regex)
      var level = matchs[1].length / 2
      var title = matchs[2]
      var link = matchs[4] || ''
      level.should.be.equal(entry[1])
      title.should.be.equal(entry[2])
      link.should.be.equal(entry[3])
    }
  });
});
