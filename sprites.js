const sprites = []

function updateSprite(spriteID, data){
    spriteID.src = data.costume;
    spriteID.style.zIndex = data.layer;
    let x = data.x + (window.screen.width/2);
    let y = -data.y + (window.screen.height/2);
    spriteID.style.left = x - (spriteID.width/2);
    spriteID.style.top = y - (spriteID.height/2);
    spriteID.style.display = data.show ? '' : 'none';
    spriteID.style.transform = `rotate(${data.direction-90}deg) scale(${data.size/100})`;
};

function initSprite(spriteID, data){
    updateSprite(spriteID, data);
    setTimeout(function(){initSprite(spriteID, data);}, 10);
};

function createSprite(){
  sprites.push({});
  id = sprites.length - 1;
  element = document.createElement('img');
  element.id = 'sprite#' + id;
  element.style.position = 'fixed';
  document.body.appendChild(element);
  sprite = sprites[id];
  sprite.direction = 90;
  sprite.x = 0;
  sprite.y = 0;
  sprite.show = true;
  sprite.size = 100;
  sprite.layer = getMaxLayer()+1;
  sprite.costume = 'https://cdn.assets.scratch.mit.edu/internalapi/asset/7e24c99c1b853e52f8e7f9004416fa34.png/get';
  sprite.run = function(script){
    spriteData = this;
    eval(script)
  };
  initSprite(document.getElementById('sprite#' + id), sprite);
  return id;
};

function getSprite(id){
  return sprites[id];
};


