const sprites = []

function updateSprite(spriteID, data){
    let x = data.x + (window.screen.width/2);
    let y = -data.y + (window.screen.height/2);
    spriteID.style.left = x - (spriteID.width/2);
    spriteID.style.top = y - (spriteID.height/2);
    spriteID.style.transform = `rotate(${data.direction-90}deg) scale(${data.size/100})`;
};

function initSprite(spriteID, data){
    updateSprite(spriteID, data);
    setTimeout(function(){initSprite(spriteID, data);}, 10);
};

function createSprite(){
  sprites.push({});
  id = sprites.length - 1;
  sprite = sprites[id];
  sprite.direction = 90;
  sprite.x = 0;
  sprite.y = 0;
  sprite.size = 100;
  sprite.run = function(script){
    spriteData = this;
    eval(script)
  };
  return id;
};

function getSprite(id){
  return sprites[id];
};


