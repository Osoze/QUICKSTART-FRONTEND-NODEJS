// Dependencies
var GitHub = require("gh.js")
  , sameTime = require("same-time")
  , Logger = require("bug-killer")
  , fs = require("fs")
  , readJson = require("r-json")
  , abs = require("abs")
  ;


var token = process.argv[2];