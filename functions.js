function move_steps(steps){
  change_x(Math.cos((90-spriteData.direction)*Math.PI/180)*steps);
  change_y(Math.sin((90-spriteData.direction)*Math.PI/180)*steps);
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

function rotate_z_left(deg){
   point_in_direction(spriteData.direction - deg);
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

 function rotate_z_right(deg){
   point_in_direction(spriteData.direction + deg);
 };

 function point_in_direction(dir){
  spriteData.direction = dir;
  globalFunctions.updateDirection();
 };

 function set_x_rotation(dir){
   spriteData['3d'].rotateX = dir;
   globalFunctions.updateDirection();
 };

 function set_y_rotation(dir){
   spriteData['3d'].rotateY = dir;
   globalFunctions.updateDirection();
 };

function set_z_rotation(dir){
  point_in_direction(dir);
}
 function point_towards_mouse(){
  point_in_direction(globalFunctions.getDirection(spriteData.x, spriteData.y, globalValues.mouseX, globalValues.mouseY));
 };

function define_camera_distance(cameraDistance){
  spriteData['3d'].cameraDistance = cameraDistance;
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

function set_height(height){
  spriteData.height = height;
};

function change_height(height){
  set_height(spriteData.height + height);
};

function set_width(width){
  spriteData.width = width;
};

function change_width(width){
  set_width(spriteData.width + width);
};

function show(){
  spriteData.hidden = false;
};

function hide(){
  spriteData.hidden = true;
};

function go_to_front(){
  spriteData.layer = globalFunctions.getMaxLayer()+1
};

function go_to_back(){
  globalFunctions.moveSpritesUp();
  spriteData.layer = 0;
};

function go_forward(layers){
  spriteData.layer = spriteData.layer + layers;
};

function go_backward(layers){
  spriteData.layer = spriteData.layer - layers;
};

function go_to_layer(layer){
  spriteData.layer = layer;
};

function set_opacity(opacity){
  spriteData.opacity = opacity;
};

function change_opacity(opacity){
  spriteData.opacity = spriteData.opacity + opacity;
};

function clone(){
  const cloneElem = spriteData.original.ref.insertAdjacentElement('AfterEnd', spriteData.original.ref.cloneNode(true));
  const newClone = createSprite(cloneElem);
  getSprite(newClone).ref.id = 'sprite#' + getSprite(newClone).id;
  getSprite(newClone).original = spriteData.original;
  getSprite(newClone).isOriginal = false;
  const preventCopy = ['clones', 'freeze', 'id', 'isOriginal', 'layer', 'original', 'ref', 'renderProcess', 'run', 'terminate'];
  for(i in spriteData){
    if(!preventCopy.includes(i)){
      getSprite(newClone)[i] = spriteData[i];
    }
  }
  spriteData.original.clones.push(newClone);
  return newClone;
};
wait = (waitTime) => {
  return new Promise((resolve) => {
    setTimeout(resolve, waitTime);
  });
};

async function pause(seconds){
await wait(seconds*1000)
};


function repeat(n, callback, animate, callback2, dataCarry){
    if(dataCarry === undefined){
      dataCarry = spriteData;
    }else{
      spriteData = dataCarry;
    }
    for(i = 0; i < n; i++){
            if(animate){
              setTimeout(callback(), 10*i, dataCarry);
            }else{
                callback();
            };
    };
    if(callback2){
    if(animate){
      setTimeout(callback2, (1000/globalValues.CPS)*(n+1), dataCarry)
    }else{
      callback2()
    }
  }
};

function do_repeat(n, callback, callback2, m, dataCarry){
      if(dataCarry === undefined){
        dataCarry = spriteData;
      }else{
        spriteData = dataCarry;
      }
      if(m === undefined) m =1;
      if(m > n){
        if(callback2) callback2()
      }else{
        callback()
        setTimeout(do_repeat, 1000/globalValues.CPS, n, callback, callback2, m+1, dataCarry)
    }
};

function forever(callback, dataCarry){
    if(dataCarry === undefined){
      dataCarry = spriteData;
    }else{
      spriteData = dataCarry;
    }
    callback();
    setTimeout(forever, (1000/globalValues.CPS), callback, dataCarry)
}
