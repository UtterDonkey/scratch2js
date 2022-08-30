const sprites = []

function updateSprite(spriteID, data){
    spriteID.src = data.costume == null ? spriteID.src : data.costume;
    spriteID.style.zIndex = data.layer;
    let x = data.x + (window.innerWidth/2);
    let y = -data.y + (window.innerHeight/2);
    spriteID.style.postion = 'fixed';
    spriteID.style.left = x - (spriteID.clientWidth/2);
    spriteID.style.top = y - (spriteID.clientHeight/2);
    spriteID.style.display = data.show ? '' : 'none';
    spriteID.style.transform = `rotate(${data.direction-90}deg) rotateX(${data['3d'].rotateY-90}deg) rotateY(${data['3d'].rotateX-90}deg) scale(${data.size/100})`;
    spriteID.style.opacity = data.opacity/100;
};

function initSprite(spriteID, data){
    updateSprite(spriteID, data);
    data.renderProcess = setTimeout(function(){initSprite(spriteID, data);}, 1000/globalValues.FPS);
};

function createSprite(image){
  sprites.push({});
  id = sprites.length - 1;
  const assignElement = typeof image == 'object';
  if(!assignElement){
     element = document.createElement('img');
     element.id = 'sprite#' + id;
     document.body.appendChild(element); 
  };
  sprite = sprites[id];
  sprite.costume = assignElement ? null : image;
  sprite.direction = 90;
  sprite.x = 0;
  sprite.y = 0;
  sprite.show = true;
  sprite.size = 100;
  sprite.layer = getMaxLayer()+1;
  sprite.opacity = 100;
  sprite['3d'] = {};
  sprite['3d'].rotateX = 90;
  sprite['3d'].rotateY = 90;
  sprite.run = function(script, param){
    this.spriteData = this;
    spriteData = this.spriteData;
    spriteData;
    script(param);
    spriteData = undefined;
  };
  initSprite(assignElement ? image : document.getElementById('sprite#' + id), sprite);
  return id;
};

function getSprite(id){
  return sprites[id];
};


