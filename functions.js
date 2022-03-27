

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

function go_to(x, y){
  set_x(x);
  set_y(y);
};

function rotate_left(deg){
  point_in_direction(spriteData.direction - deg);
};

function rotate_right(deg){
  point_in_direction(spriteData.direction + deg);
};

function point_in_direction(dir){
  spriteData.direction = dir;
  updateDirection();
};
 function point_towards_mouse(){
  point_in_direction(getDirection(spriteData.x, spriteData.y, globalValues.mouseX, globalValues.mouseY));
 };

function set_costume(src){
    spriteData.costume = src;
};

function set_size(size){
  spriteData.size = size;
};

function change_size(size){
  setSize(spriteData.size + size);
};

function show(){
  spriteData.show = true;
};

function hide(){
  spriteData.hide = false;
};

function go_to_front(){
  spriteData.layer = getMaxLayer()+1
};

function go_to_back(){
  moveSpritesUp();
  spriteData.layer = 0;
};
