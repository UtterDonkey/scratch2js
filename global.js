const globalValues = {}

document.body.addEventListener('mousemove', function(e){
  globalValues.mouseX = e.clientX-(window.screenX/2);
    globalValues.mouseY = e.clientY-(window.screenY/2);
});
