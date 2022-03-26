const globalValues = {}

document.body.addEventListener('mousemove', function(e){
    let x = e.screenX - (window.screen.width/2);
    let y = (window.screen.height/2) - e.screenY;
    globalValues.mouseX = x;
    globalValues.mouseY = y;
  
});

function getDirection(startX, startY, endX, endY){
  return ((Math.atan((endX-startX)/(endY-startY))*180)/Math.PI)-(180*(endY<startY));
};
