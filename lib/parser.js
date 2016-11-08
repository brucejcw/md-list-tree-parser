/* ================================================================
 * md-list-tree-parser by bruce_jcw[at]gmail.com
 *
 * first created at : Mon Nov 07 2016 17:34:37 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright 2016 bruce_jcw
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */


'use strict';

function parse2Json(pathOrContent, type) {
  var mdTree = getMdTree.apply(null, arguments)
  return doParse(mdTree)
}

function getMdTree(pathOrContent, type) {
  var mdTree;
  if (type === 'text') {
    mdTree = pathOrContent
  } else {
    mdTree = require('fs-extra').readFileSync(pathOrContent, 'utf-8')
  }

  return mdTree
}

function doParse(mdTree) {
  var jsonTree = []
  var lines = mdTree.split('\n')
  var regex = /^(\s*)-\s\[(.*)\](\((.*)\))?/
  lines.forEach(function(line, i) {
    var matchs = line.match(regex)
    if (matchs) {
      var level = matchs[1].length / 2
      var title = matchs[2]
      var link = matchs[4]
      var node = new Node(title, link)

      if (level === 0) {
        jsonTree.push(node)
      } else {
        var p = getParentNode(level, jsonTree)
        p.childNodes.push(node)
      }
    }
  })
  return jsonTree
}

function getParentNode(level, jsonTree) {
  var i = 0
  var node = jsonTree[jsonTree.length -1]
  while(i < level - 1) {
    var childNodes = node.childNodes
    node = childNodes[childNodes.length - 1]
    i++
  }

  if (!node.childNodes) {
    node.childNodes = []
  }
  return node
}

function Node(title, link) {
  this.title = title
  this.link = link
}

module.exports = parse2Json;
