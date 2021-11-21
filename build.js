// Dependencies
var GitHub = require("gh.js")
  , sameTime = require("same-time")
  , Logger = require("bug-killer")
  , fs = require("fs")
  , readJson = require("r-json")
  , abs = require("abs")
  ;


var token = process.argv[2];

// A token is almost mandatory
if (!token) {
    try {
        token = readJson(abs("~/.github-config.json")).token;
        Logger.log("Using the token found in ~/.github-config.json");
    } catch (e) {
        Logger.log(