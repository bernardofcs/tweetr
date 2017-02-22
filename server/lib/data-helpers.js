"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");
const MongoClient = require("mongodb").MongoClient;

// Defines helper functions for saving and getting tweets, using the database `db`

module.exports = function makeDataHelpers(db) {

  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      console.log(newTweet.created_at);
      db.collection("tweets").insertOne(newTweet);
      callback(null, true);
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
        tweetCollection.sort(sortNewestFirst);
       // console.log(tweetCollection);
        callback(null, tweetCollection);
      });

    }
  };
}

