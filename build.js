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
        Logger.log("Usage: node build.js <token>", "warn");
        Logger.log("If a token is not provided, this script will fail due to the API rate limit.", "warn");
    }
}

// Initialize the gh.js instance
var gh = new GitHub(token);

// Fetch GitHub members
Logger.log("Fetching the GitHub members.");
gh.get("orgs/github/members", { all: true }, function (err, data) {
    if (err) {
        return Logger.log(err, "error");
    }

    // Get names
    Logger.log("Fetching the names.");
    sameTime(data.map(function (c) {
        return function (next) {
            gh.get("users/" + c.login, function (err, data) {
                if (err) {
                    Logger.log("Failed to fetch the name for @" + data.login);
                } els