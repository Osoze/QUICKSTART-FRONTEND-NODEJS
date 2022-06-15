
var matchingGame = {
    elapsedTime: 0
  , github: new GitHub()
};

matchingGame.deck = []

function getHubbers(callback) {
    function done (err, hubbers) {