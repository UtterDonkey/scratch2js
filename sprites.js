

function updateSprite(spriteID, data){
    if(spriteID == null || data.global){return};
    spriteID.src = data.costume == null ? spriteID.src : data.costume;
    spriteID.style.zIndex = data.layer;
    let x = (data.x*globalFunctions.getFixedValue('width')) + (globalFunctions.stage().clientWidth/2);
    let y = -(data.y*globalFunctions.getFixedValue('height')) + (globalFunctions.stage().clientHeight/2);
    spriteID.style.position = 'absolute';
    spriteID.style.pointerEvents = 'none';
    spriteID.style.left = x - (spriteID.clientWidth/2) + 'px';
    spriteID.style.top = y - (spriteID.clientHeight/2) + 'px';
    spriteID.style.display = data.hidden ? 'none' : '';
    spriteID.style.transform = `${data['3d'].isEnabled ? `perspective(${data['3d'].cameraDistance*10}px) rotateX(${data['3d'].rotateY-90}deg) rotateY(${data['3d'].rotateX-90}deg)` : ''} rotate(${data.direction-90}deg) scale(${(data.size/100)*globalFunctions.getFixedValue('scale')}) scaleX(${(data.width/100)}) scaleY(${(data.height/100)})`;
    spriteID.style.opacity = data.opacity/100;
};

function initSprite(spriteID, data){
    if(data.global == true) {
      try{spriteID.remove()}catch(e){}
      return;
    };
    updateSprite(spriteID, data);
    data.renderProcess = setTimeout(function(){initSprite(spriteID, data);}, 1000/globalValues.FPS);
};

function createSprite(image, name, isDefault){
  project.sprites.push({});
  const id = project.sprites.length - 1;
  const assignElement = typeof image == 'object';
  if(!assignElement){
     element = document.createElement('img');
     element.id = 'sprite#' + id;
     globalFunctions.stage().appendChild(element); 
  };
  sprite = project.sprites[id];
  sprite.name = name ? name : 'Object' + id;
  sprite.costume = assignElement ? null : image;
  sprite.ref = assignElement ? image : document.getElementById('sprite#' + id)
  sprite.id = parseFloat(id);
  sprite.isDefault = !!isDefault;
  sprite.isDemo = false;
  sprite.scripts = [];
  sprite.isOriginal = true;
  sprite.original = sprite;
  sprite.clones = [];
  sprite.direction = 90;
  sprite.x = 0;
  sprite.y = 0;
  sprite.hidden = false
  sprite.size = 100;
  sprite.height = 100;
  sprite.width = 100;
  sprite.layer = globalFunctions.getMaxLayer()+1;
  sprite.opacity = 100;
  sprite['3d'] = {};
  sprite['3d'].rotateX = 90;
  sprite['3d'].rotateY = 90;
  sprite['3d'].isEnabled = false;
  sprite['3d'].cameraDistance = 800;
  sprite.run = function(script, param, param0, param1, param2, param3, param4, param5, param6, param7, param8, param9){
    this.spriteData = this;
    spriteData = this.spriteData;
    spriteData;
    if(typeof script == 'string'){
      return eval(script);
    }else{
      return script(param, param0, param1, param2, param3, param4, param5, param6, param7, param8, param9);
    }
    spriteData = undefined;
  };
  sprite.terminate = function(removeElement){
    clearTimeout(this.renderProcess);
    if(!this.isOriginal) this.original.clones.splice(this.id, 0);
    project.sprites[this.id] = {};
    if(removeElement && this.ref !== null) this.ref.remove();
  }
  sprite.freeze = function(){
    clearTimeout(this.renderProcess);
  }
  initSprite(sprite.ref, sprite);
  return id;
};

function getSprite(id){
  return project.sprites[id];
};
function forceSpriteUpdate(id){
    updateSprite(getSprite(id).ref, getSprite(id));
}

function trace(spriteData){
    return getSprite(spriteData.id);
}

if(parent.engineLoaded) setTimeout(parent.engineLoaded, 0);
