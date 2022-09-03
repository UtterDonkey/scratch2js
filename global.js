const globalValues = {};
globalValues.FPS = 60;
globalValues.CPS = 100;
globalValues.touches = [];
globalValues.fixedWidth = null;
globalValues.fixedHeight = null;
globalValues.touchTimeout = 0;
globalValues.getFixedValue = function(dimension){
    if(dimension == 'height'){
        if(globalValues.fixedHeight == null){
            return 1;
        }else{
            return window.innerHeight/globalValues.fixedHeight;
        }
    }else{
        if(globalValues.fixedWidth == null){
            return 1;
        }else{
            return window.innerWidth/globalValues.fixedWidth;
        }
    }
}
window.addEventListener('load', function(){
    document.body.addEventListener('mousemove', function(e){
        let x = (e.clientX - (window.innerWidth/2));
        let y = ((window.innerHeight/2) - e.clientY);
        globalValues.mouseX = x*globalValues.getFixedValue('width');
        globalValues.mouseY = y*globalValues.getFixedValue('height');
        
    });
    document.body.addEventListener('touchstart', function(e){
        clearTimeout(globalValues.touchTimeout);
        for(let i=0; i<e.touches.length; i++){
            let x = (e.touches[i].clientX - (window.innerWidth/2));
            let y = ((window.innerHeight/2) - e.touches[i].clientY);
            let pushData = {};
            pushData.mouseX = x*globalValues.getFixedValue('width');
            pushData.mouseY = y*globalValues.getFixedValue('height');
            globalValues.touches.push(pushData);
        }
    });
    document.body.addEventListener('touchend', function(e){
        globalValues.touchTimeout = setTimeout(function(){globalValues.touches = [];}, 125);
    });
});


function getDirection(startX, startY, endX, endY){
  return ((Math.atan((endX-startX)/(endY-startY))*180)/Math.PI)-(180*(endY<startY));
};

function getMaxLayer(){
    const temp = sprites;
    let max = 0;
    for(i = 0; i < temp.length; i++){
      if(temp[i].layer > max){
        max = temp[i].layer;  
      };
    };
    return max;
};

function moveSpritesUp(){
    const temp = sprites;
    for(i = 0; i < temp.length; i++){
        temp[i].layer = temp[i].layer+1;
    };
};
