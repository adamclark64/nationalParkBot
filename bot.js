var Twit = require('twit');
// test
var T = new Twit(require('./config.js'));

var nationalParkSearch = {q: "national park filter:images", count: 10, result_type: "recent"};

function retweetLatest() {
	T.get('search/tweets', nationalParkSearch, function (error, data) {
	  if (!error) {
		var retweetId = data.statuses[0].id_str;
		T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
			if (response) {
				console.log(data.statuses[0]);
				console.log('Success! Check your bot, it should have retweeted something.')
			}
			if (error) {
				console.log('There was an error with Twitter:', error);
			}
		})
	  }
	  else {
	  	console.log('There was an error with your hashtag search:', error);
	  }
	});
}

retweetLatest();
setInterval(retweetLatest, 1000 * 60 * 60);
