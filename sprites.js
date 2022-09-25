const sprites = []

function updateSprite(spriteID, data){
    spriteID.src = data.costume == null ? spriteID.src : data.costume;
    spriteID.style.zIndex = data.layer;
    let x = (data.x*globalFunctions.getFixedValue('width')) + (window.innerWidth/2);
    let y = -(data.y*globalFunctions.getFixedValue('height')) + (window.innerHeight/2);
    spriteID.style.position = 'fixed';
    spriteID.style.left = x - (spriteID.clientWidth/2) + 'px';
    spriteID.style.top = y - (spriteID.clientHeight/2) + 'px';
    spriteID.style.display = data.hidden ? 'none' : '';
    spriteID.style.transform = `${data['3d'].isEnabled ? `perspective(${data['3d'].cameraDistance*10}px) rotateX(${data['3d'].rotateY-90}deg) rotateY(${data['3d'].rotateX-90}deg)` : ''} rotate(${data.direction-90}deg) scale(${(data.size/100)}) scaleX(${(data.width/100)}) scaleY(${(data.height/100)})`;
    spriteID.style.opacity = data.opacity/100;
};

function initSprite(spriteID, data){
    updateSprite(spriteID, data);
    data.renderProcess = setTimeout(function(){initSprite(spriteID, data);}, 1000/globalValues.FPS);
};

function createSprite(image){
  sprites.push({});
  const id = sprites.length - 1;
  const assignElement = typeof image == 'object';
  if(!assignElement){
     element = document.createElement('img');
     element.id = 'sprite#' + id;
     document.body.appendChild(element); 
  };
  sprite = sprites[id];
  sprite.costume = assignElement ? null : image;
  sprite.ref = assignElement ? image : document.getElementById('sprite#' + id)
  sprite.id = parseFloat(id);
  sprite.isOriginal = true;
  sprite.original = sprite.id;
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
    return script(param, param0, param1, param2, param3, param4, param5, param6, param7, param8, param9);
    spriteData = undefined;
  };
  sprite.terminate = function(removeElement){
    clearTimeout(this.renderProcess);
    sprites.splice(this.id, 0);
    if(removeElement) this.ref.remove();
  }
  sprite.freeze = function(){
    clearTimeout(this.renderProcess);
  }
  initSprite(sprite.ref, sprite);
  return id;
};

function getSprite(id){
  return sprites[id];
};
function forceSpriteUpdate(id){
    updateSprite(getSprite(id).ref, getSprite(id));
}

