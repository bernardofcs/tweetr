$(document).ready(function(){
  $('.new-tweet').find('textarea').on('keyup',function(){
    const charsLeft = 140 - $(this).val().length;
    const counter = $(this).parent().find('.counter');
    counter.text(charsLeft);
    if(charsLeft < 0){
      counter.addClass('redify');
    }else{
      counter.removeClass('redify');
    }
  });
});