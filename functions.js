spriteData = {};
spriteData.direction = 90;
spriteData.x = 0;
spriteData.y = 0;

function updateDirection(){

};
function move_steps(steps){
change_x(Math.sin(spriteData.direction - 90));
change_y(Math.cos(spriteData.direction - 90));
};

function set_x(x){
  spriteData.x = x;
};

function change_x(x){
  spriteData.x = spriteData.x + x;
};

function change_y(y){
  spriteData.y = spriteData.y + y;
};

function set_y(y){
  spriteData.y = y;
};

function rotate_left(deg){
  point_in_direction(spriteData.direction - deg);
};

function rotate_right(deg){
  point_in_direction(spriteData.direction + deg);
};

function go_to(x, y){
  set_x(x);
  set_y(y);
};

function point_in_direction(dir){
  spriteData.direction = dir;
  updateDirection();
};
 function point_towards_mouse(){
  point_in_direction(getDirection(spriteData.x, spriteData.y, globalValues.mouseX, globalValues.mouseY));
 };
function initSprite(spriteID, data){
    updateSprite(spriteID, data);
    setTimeout(function(){initSprite(spriteID, data);}, 10);
};

function updateSprite(spriteID, data){
    let x = data.x + (window.screen.width/2);
    let y = data.y + (window.screen.height/2);
    spriteID.style.left = x - (spriteID.width*Math.PI);
    spriteID.style.top = y - (spriteID.height*(Math.PI/1.25));
    spriteID.style.transform = `rotate(${data.direction-90}deg)`;
};
