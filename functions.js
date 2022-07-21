

function updateDirection(){
spriteData.direction = spriteData.direction%360;
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

function go_to_mouse(){
  go_to(globalValues.mouseX, globalValues.mouseY);
};

function rotate_left(deg){
  point_in_direction(spriteData.direction - deg);
};

 function rotate_x_left(deg){
   set_x_rotation(spriteData['3d'].rotateX - deg);
 };

 function rotate_y_left(deg){
   set_y_rotation(spriteData['3d'].rotateY - deg);
 };

function rotate_right(deg){
  point_in_direction(spriteData.direction + deg);
};

 function rotate_x_right(deg){
   set_x_rotation(spriteData['3d'].rotateX + deg);
 };

 function rotate_y_right(deg){
   set_y_rotation(spriteData['3d'].rotateY + deg);
 };

 function point_in_direction(dir){
  spriteData.direction = dir;
  updateDirection();
 };

 function set_x_rotation(dir){
   spriteData['3d'].rotateX = dir;
   updateDirection();
 };

 function set_y_rotation(dir){
   spriteData['3d'].rotateY = dir;
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
  set_size(spriteData.size + size);
};

function show(){
  spriteData.show = true;
};

function hide(){
  spriteData.show = false;
};

function go_to_front(){
  spriteData.layer = getMaxLayer()+1
};

function go_to_back(){
  moveSpritesUp();
  spriteData.layer = 0;
};

function go_forward(layers){
  spriteData.layer = spriteData.layer + layers;
};

function go_backward(layers){
  spriteData.layer = spriteData.layer - layers;
};

function set_opacity(opacity){
  spriteData.opacity = opacity;
};

function change_opacity(opacity){
  spriteData.opacity = spriteData.opacity + opacity;
};

wait = (waitTime) => {
  return new Promise((resolve) => {
    setTimeout(resolve, waitTime);
  });
};

async function pause(seconds){
await wait(seconds*1000)
};


function repeat(n, callback, animate, callback2){
    for(i = 0; i < n; i++){
            if(animate){
              setTimeout(function(){callback()}, 10*i);
            }else{
                callback();
            };
    };
    if(callback2){
    if(animate){
      setTimeout(function(){callback2()}, (1000/globalValues.CPS)*(n+1))
    }else{
      callback2()
    }
  }
};

function forever(callback){
    callback();
    setTimeout(function(){forever(callback);}, (1000/globalValues.CPS))
}
