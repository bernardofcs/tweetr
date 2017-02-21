"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");
const MongoClient = require("mongodb").MongoClient;

// Defines helper functions for saving and getting tweets, using the database `db`

module.exports = function makeDataHelpers(db) {
  // function getTweets(callback){
  // console.log(db.collection("tweets").find());
  // }
  // getTweets(console.log);
  // getTweets((err, tweets) => {
  //   if (err) throw err;

  //   console.log("Logging each tweet:");
  //   for (let tweet of tweets) {
  //     console.log(tweet);
  //   }

  // });

  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      simulateDelay(() => {
        db.tweets.push(newTweet);
        callback(null, true);
      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      let tweetCollection = [];
      db.collection("tweets").find().toArray(function(err, tweets){
        if(err) throw error;
        for(let tweet of tweets){
          tweetCollection.push(tweet);
        }
        callback(null, tweetCollection);
      });

    }
  };
}
