window.onload = function(){
  var bodyWidth = document.body.clientWidth;
  var bodyHeight = document.body.clientHeight;
  var randPosX = Math.floor((Math.random()*bodyWidth/2));
  var randPosY = Math.floor((Math.random()*bodyHeight/2));
  
  $('#rand_pos').css('left', randPosX);
  $('#rand_pos').css('top', randPosY);
  
  posLog.innerHTML = posXY
};