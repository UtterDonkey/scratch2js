const globalValues = {};
const globalFunctions = {};
const project = {
    sprites: [],
    options: {
        stageSize: {
            width: 1600,
            height: 900,
            maintainAspectRatio: true
        }
    },
    events: [],
    running: true,
    stop: () =>{
            for(let i=0; i<project.sprites.length; i++){
                project.sprites[i].terminate(!1);
            };
            project.running = false;
    },
    start: (importFile, setupOnly) =>{
        if(importFile){
            project.options = importFile.options;
            for(let i=0; i<importFile.sprites.length; i++){
                const spriteImport = createSprite(importFile.sprites[i].costume);
                getSprite(spriteImport).name = importFile.sprites[i].name;
                getSprite(spriteImport).scripts = importFile.sprites[i].scripts;
                getSprite(spriteImport).global = importFile.sprites[i].global;
            }
        }
        if(!setupOnly){
            project.idle = false;
            for(let i=0; i<project.sprites.length; i++){
                const scripts = project.sprites[i].scripts;
                for(let j=0; j<scripts.length; j++){
                    if(!scripts[j]) continue;
                    if(scripts[j].event == 'start'){
                        try{
                            project.sprites[i].run(scripts[j].code);
                        }catch(e){
                            project.console.push({text: e.toString(), sprite: project.sprites[i].name, err: e, type: 'error', script: scripts[j].name});
                        }
                    }
                };
            };
        }
    },
    console: [],
    idle: true
};
window.__defineGetter__('project', () =>{
    return project;
})
window.__defineSetter__('project', (value) =>{
    return project = value;
})
window.__defineGetter__('globalValues', () =>{
    return globalValues;
})
window.__defineSetter__('globalValues', (value) =>{
    return globalValues = value;
})
window.__defineGetter__('getSprite', () =>{
    return getSprite;
})
window.__defineSetter__('getSprite', (value) =>{
    return getSprite = value;
})
window.__defineGetter__('createSprite', () =>{
    return createSprite;
})
window.__defineSetter__('createSprite', (value) =>{
    return createSprite = value;
})

function protectParent(){
    const parentClone = {engineLoaded: parent.engineLoaded};
        window.__defineGetter__('parent', () =>{
            return parentClone;
    })
}
if(parent && !!parent.protect) protectParent()
globalValues.FPS = 60;
globalValues.CPS = 100;
globalValues.touches = [];
globalValues.fixedWidth = null;
globalValues.fixedHeight = null;
globalValues.keysDown = [];
globalValues.keyData = {};
globalValues.touchTimeout = 0;
globalFunctions.getFixedValue = function(dimension){
    if(globalValues.fixedWidth == null){
        return 1;
    }else{
        return globalFunctions.stage().clientWidth/globalValues.fixedWidth
    }
}
globalFunctions.are_sprites_touching = function(sprite1, sprite2){
    const sprite1Radius = ((sprite1.ref.height*(sprite1.height/100)+sprite1.ref.width*(sprite1.width/100))/2)*(sprite1.size/100)
    const sprite2Radius = ((sprite2.ref.height*(sprite2.height/100)+sprite2.ref.width*(sprite2.width/100))/2)*(sprite2.size/100)
    const totalRadius = sprite1Radius/2+sprite2Radius/2
    const distanceBetweenSprites = Math.sqrt((sprite2.ref.x-sprite1.ref.x)**2+(sprite2.ref.y-sprite1.ref.y)**2)
    return isTouching
};
globalFunctions.stage = () => {
    return document.querySelector('pillor') ? document.querySelector('pillor').querySelector('div') : document.body;
}
globalFunctions.execEvent = (ID, eventData) =>{
    const event = project.events[ID];
    if(event.active) getSprite(event.sprite).run(event.function, eventData);
}
window.addEventListener('load', function(){
    globalFunctions.stage().addEventListener('mousemove', function(e){
        let x = (e.clientX - globalFunctions.stage().getBoundingClientRect().left - (globalFunctions.stage().clientWidth/2));
        let y = (globalFunctions.stage().getBoundingClientRect().top + (globalFunctions.stage().clientHeight/2) - e.clientY);
        globalValues.mouseX = x/globalFunctions.getFixedValue('width');
        globalValues.mouseY = y/globalFunctions.getFixedValue('height');
        
    });
    globalFunctions.stage().addEventListener('touchstart', function(e){
        clearTimeout(globalValues.touchTimeout);
        for(let i=0; i<e.touches.length; i++){
            let x = (e.touches[i].clientX - (globalFunctions.stage().clientWidth/2));
            let y = ((globalFunctions.stage().clientHeight/2) - e.touches[i].clientY);
            let pushData = {};
            pushData.mouseX = x*globalFunctions.getFixedValue('width');
            pushData.mouseY = y*globalFunctions.getFixedValue('height');
            globalValues.touches.push(pushData);
        }
    });
    globalFunctions.stage().addEventListener('touchend', function(e){
        globalValues.touchTimeout = setTimeout(function(){globalValues.touches = [];}, 300);
    });
    globalFunctions.stage().addEventListener('keydown', (e) =>{
        const keyData = {};
        const modifiers = {
            'ctrlKey': '^',
            'shiftKey': '+',
            'altKey': '%',
            'metaKey': '!'
        }
        const modKeys = ['control', 'shift', 'alt', 'meta'];
        const key = e.key.toLowerCase();
        keyData.down = true;
        if(globalValues.keysDown.includes(key)){
            return
        }else{
            globalValues.keysDown.push(key);
        }
        if(!modKeys.includes(key)){
        
        let mod = '';
        keyData.modifiers = [];
        for(m in modifiers){
            if(e[m]){
                mod += modifiers[m];
                keyData.modifiers.push(modifiers[m]);
            }
        };
        mod += key;
        keyData.modKey = mod;
        if(mod !== key && !globalValues.keysDown.includes(mod)) globalValues.keysDown.push(mod);
        }
        globalValues.keyData[key] = keyData;
    });

    globalFunctions.stage().addEventListener('keyup', (e) =>{
        const key = e.key.toLowerCase();
        const keyData = globalValues.keyData[key];
        if(globalValues.keysDown.includes(key)) globalValues.keysDown.splice(globalValues.keysDown.indexOf(key), 1);
        if(globalValues.keysDown.includes(keyData.modKey)) globalValues.keysDown.splice(globalValues.keysDown.indexOf(keyData.modKey), 1);
        keyData.down = false;
        keyData.modifiers = [];
        globalValues.keyData[key] = keyData;
    });
});


globalFunctions.getDirection = function(startX, startY, endX, endY){
  return ((Math.atan((endX-startX)/(endY-startY))*180)/Math.PI)-(180*(endY<startY));
};

globalFunctions.getMaxLayer = function(){
    const temp = project.sprites;
    let max = 0;
    for(i = 0; i < temp.length; i++){
      if(temp[i].layer > max){
        max = temp[i].layer;  
      };
    };
    return max;
};

globalFunctions.moveSpritesUp = function(){
    const temp = project.sprites;
    for(i = 0; i < temp.length; i++){
        temp[i].layer = temp[i].layer+1;
    };
};

globalFunctions.updateDirection = function(){
  spriteData.direction = spriteData.direction%360;
  spriteData['3d'].rotateX = spriteData['3d'].rotateX%360;
  spriteData['3d'].rotateY = spriteData['3d'].rotateY%360;
  if(spriteData['3d'].rotateX != 90 || spriteData['3d'].rotateY != 90) spriteData['3d'].isEnabled = true;
};
