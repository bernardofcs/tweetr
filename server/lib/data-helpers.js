"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");
const MongoClient = require("mongodb").MongoClient;
const bcrypt        = require('bcrypt');

// Defines helper functions for saving and getting tweets, using the database `db`

module.exports = function makeDataHelpers(db) {

  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet);
      callback(null, true);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      const sortNewestFirst = (a, b) => b.created_at - a.created_at;
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
    },

    saveUser: function(newUser, callback) {                        //creates user
      db.collection("users").insertOne(newUser);
      callback(null, true);
    },

    getUser: function(loggedUser, callback){                          //checks if user exists
      db.collection("users").find().toArray(function(err, users){
        if(err) throw error;
        for(let user of users){
          if(user.email === loggedUser.email && bcrypt.compareSync(loggedUser.password, user.password)){
            callback(null, true, user.id);
            return;
          }
        }
        callback(null, false);
      });
    }
  };
}

