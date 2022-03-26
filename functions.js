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
