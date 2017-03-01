/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(){
  $('.new-tweet').slideUp();
  $('#nav-bar').find('.compose').on('click', () => {
    $('.new-tweet').slideToggle();
    $('#tweet-form').find('textarea').focus();
  });
  event.preventDefault();
  $('#tweet-form').submit(function(e){
    const url = "/tweets";
    if($('textarea').val().length <= 140){
      $.ajax({
        type:"POST",
        url: url,
        data:$('#tweet-form').serialize(),
        success: () => {
          loadTweets();
          clearForm();
        }
      });
    }else{
      alert('Tweet too long!');
    }

    e.preventDefault();
  });

  function clearForm(){
    $('textarea').val('');
    $('.new-tweet').find('.counter').text('140');
  }


  function loadTweets(){                   //form submission for new tweet
    $.ajax({
      url:"/tweets",
      type:"GET",
      success: (data) => {
        renderTweets(data);
      }
    })
  }

 loadTweets();

  function renderTweets(tweets) {          //loops through a list of tweets, and creates the markup for each of them
      $('#tweets-container').html('');
      for(let tweet in tweets){
        let $tweet = createTweetElement(tweets[tweet]);
        $('#tweets-container').append($tweet);
      }
      $('.tweet').on('mouseenter', function(){            //icons when hovering - has to be inside the function or .tweet doesn't exist yet
        $(this).find('footer').find('.helperIconsDiv').removeClass('noDisplay');
      });
      $('.tweet').on('mouseleave', function(){
        $(this).find('footer').find('.helperIconsDiv').addClass('noDisplay');
      });

  }

  function createTweetElement(tweet){                    //creates the html markup for each tweet
    const timeAgoObj = timeFromNow(tweet.created_at);
    const timeAgo = timeAgoObj.time;
    let unitTimeAgo = timeAgoObj.unit;
    if(timeAgo === 1){
      unitTimeAgo = unitTimeAgo.slice(0, -1);
    }
    let tweetFormat = $(`<article class="tweet">
                          <header><img class="avatar" src="${tweet.user.avatars.regular}"><span class="name">${tweet.user.name}</span><span class="atUser">${tweet.user.handle}</span></header>
                          <p>${tweet.content.text}</p>
                          <footer><span class="daysAgo">${timeAgo} ${unitTimeAgo} ago</span><div class ="helperIconsDiv noDisplay"><img class="helperIcon" src="/images/flag.png"> <img class="helperIcon" src="/images/retweet.png"> <img class="helperIcon" src="/images/heart.png"></div></footer>
                        </article>`);
    return tweetFormat;
  }

  function timeFromNow(mls){                                     //calculates how long ago was the tweet
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

  // $('#tweetcontainer').on('mouseenter', '.tweet', function(){            (this) refers to the #containers instead
  //   $(this).find('footer').find('.helperIconsDiv').removeClass('noDisplay');
  // });
  // $('#tweetcontainer').on('mouseleave', '.tweet', function(){
  //   $(this).find('footer').find('.helperIconsDiv').addClass('noDisplay');
  // });

});
