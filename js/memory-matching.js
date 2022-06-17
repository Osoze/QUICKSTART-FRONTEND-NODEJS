
var matchingGame = {
    elapsedTime: 0
  , github: new GitHub()
};

matchingGame.deck = []

function getHubbers(callback) {
    function done (err, hubbers) {
        hubbers = shuffle(hubbers).slice(0, 8);

        if (err) {
            return callback({ hubbers: hubbers });
        }

        var complete = 0;
        for (var i = 0; i < hubbers.length; ++i) {
            (function (cHubber) {
                matchingGame.github.get("users/" + cHubber.login, function (err, user) {
                    if (err) {
                        console.warn(err);
                        if (++complete === hubbers.length) {
                            done(err, window.Hubbers);
                        }
                    } else {
                        cHubber.name = user.name;
                        if (++complete === hubbers.length) {
                            callback({ hubbers: hubbers });
                        }
                    }
                });
            })(hubbers[i]);
        }
    }

    matchingGame.github.get("orgs/github/members", { all: true }, function (err, data) {
        if (err) {
            console.warn(err);
            data = window.Hubbers;
        }
        done(err, data);
    });
}

// http://stackoverflow.com/a/2450976/1420197
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function selectCard() {
	if ($(".card-flipped").size() > 1) {
		return;
	}
	$(this).addClass("card-flipped");
	if ($(".card-flipped").size() == 2) {
		setTimeout(checkPattern,1400);
	}
}

function checkPattern() {
	if (isMatchPattern()) {
		$(".card-flipped").removeClass("card-flipped").addClass("card-removed");
		$(".card-removed").bind("webkitTransitionEnd",removeTookCards);
	} else {
		$(".card-flipped").removeClass("card-flipped");
	}
}

function isMatchPattern() {
	var cards = $(".card-flipped");
	var pattern = $(cards[0]).data("pattern");
	var anotherPattern = $(cards[1]).data("pattern");
	return (pattern == anotherPattern);
}

function removeTookCards() {
	$(".card-removed").remove();
	if ($(".card").length == 0) {