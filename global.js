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
globalValues.are_sprites_touching = function(sprite1, sprite2){
    const sprite1Radius = (sprite1.ref.height+sprite1.ref.width)/2
    const sprite2Radius = (sprite2.ref.height+sprite2.ref.width)/2
    const totalRadius = sprite1Radius/2+sprite2Radius/2
    const distanceBetweenSprites = Math.sqrt((sprite2.ref.x-sprite1.ref.x)**2+(sprite2.ref.y-sprite1.ref.y)**2)
    const isTouching = distanceBetweenSprites < totalRadius
    console.log('Distance: ' + distanceBetweenSprites)
    console.log('Total Radius: ' + totalRadius)
    console.log((!isTouching ? 'not' : '') + ' touching')
    return isTouching
};
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
        globalValues.touchTimeout = setTimeout(function(){globalValues.touches = [];}, 300);
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
