setTimeout(function () {
  testEle = $("#info");
  testEle.fadeOut();
}, 600);

(function() {
  const canvas = document.getElementById('defaultCanvas0');
  const context = canvas.getContext('2d');

  // resize the canvas to fill browser window dynamically
  window.addEventListener('resize', resizeCanvas, false);
        
  function resizeCanvas() {
    defaultCanvas0.width = window.innerWidth;
    defaultCanvas0.height = window.innerHeight;
                
    drawStuff(); 
  }
  
  resizeCanvas();
        
  function drawStuff() {
    // do your drawing stuff here
  }
})();


// ...random

