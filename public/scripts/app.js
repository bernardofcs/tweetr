/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(){
  event.preventDefault();
  $('#tweet-form').submit(function(e){
    const url = "/tweets";
    $.ajax({
      type:"POST",
      url: url,
      data:$('#tweet-form').serialize(),
      success: function data(){

      }
    })
    e.preventDefault();
  });


  // Fake data taken from tweets.json
var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1487634755063
  }
];

function renderTweets(tweets) {          //loops through a list of tweets, and creates the markup for each of them
    for(let tweet in tweets){
      let $tweet = createTweetElement(tweets[tweet]);
      $('#tweets-container').append($tweet);
    }

}

function createTweetElement(tweet){                    //creates the html markup for each tweet
  let timeAgo = timeFromNow(tweet.created_at);
  let tweetFormat = $('<article class="tweet">');
  tweetFormat.append('<header><img class="avatar" src="' + tweet.user.avatars.regular + '"><span class="name">' +
    tweet.user.name + '</span><span class="atUser">' + tweet.user.handle + '</span></header>');
  tweetFormat.append('<p>' + tweet.content.text + '</p>');
  tweetFormat.append('<footer><span class="daysAgo">' + timeAgo.time + ' ' + timeAgo.unit +' ago</span><div class ="helperIconsDiv noDisplay"><img class="helperIcon" src="/images/flag.png"> <img class="helperIcon" src="/images/retweet.png"> <img class="helperIcon" src="/images/heart.png"></div></footer>')
  tweetFormat.append('</article>');
  tweetFormat.append('');
  return tweetFormat;
}

function timeFromNow(mls){
  let time = Math.floor(Date.now() / (1000*60*60*24)) - Math.floor(mls / (1000*60*60*24));
  if(time >= 1){
    return {time: time, unit: 'days' };
  }else{
    time = Math.floor(Date.now() / (1000*60*60)) - Math.floor(mls / (1000*60*60));
  }
  if(time >= 1){
    return {time: time, unit: 'hours'};
  }else{
    time = Math.floor(Date.now() / (1000*60)) - Math.floor(mls / (1000*60));
  }
  if(time >=1){
    return {time: time, unit: 'minutes'};
  }else{
    time = Math.floor(Date.now() / (1000)) - Math.floor(mls / 1000);
  }
  return {time: time, unit: 'seconds'}
}

renderTweets(data);

  $('.tweet').on('mouseenter', function(){
    $(this).find('footer').find('.helperIconsDiv').removeClass('noDisplay');
  });
  $('.tweet').on('mouseleave', function(){
    $(this).find('footer').find('.helperIconsDiv').addClass('noDisplay');
  });
});
