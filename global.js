const globalValues = {}

document.body.addEventListener('mousemove', function(e){
  globalValues.mouseX = e.clientX+(window.screenX/2);
  globalValues.mouseY = e.clientY+(window.screenY/2);
});

function getDirection(startX, startY, endX, endY){
  return ((Math.atan((endX-startX)/(endY-startY))*180)/Math.PI)-(180*(endY<startY));
};
