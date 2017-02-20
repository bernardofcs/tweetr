/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(){
  $('.tweet').on('mouseenter', function(){
    $(this).find('footer').find('.helperIconsDiv').removeClass('noDisplay');
    console.log('lul')
  });
  $('.tweet').on('mouseleave', function(){
    $(this).find('footer').find('.helperIconsDiv').addClass('noDisplay');
  });
});
