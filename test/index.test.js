'use strict';

var path = require('path')
var should = require('should')
var prettyjson = require('prettyjson')
var parse2Json = require('../lib/parser')

describe('test json', function () {
  it('should get json', function () {
    var json = parse2Json(path.resolve(__dirname, 'tree.md'));
    json[0].childNodes[1].childNodes[0].title.should.be.equal('three')
    console.log(prettyjson.render(json))
  });
});
