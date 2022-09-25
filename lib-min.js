/* Please note - this file is not updated as often as the main scripts, so when using this script, you may have to wait longer for new updates. */
/* Copyright: Pixelbulb 2022 https://pixelbulb.online */
/* You may use this script without prior permission or credit as long as nothing, including comments, is omitted */


const globalValues={};globalValues.FPS=60,globalValues.CPS=100,globalValues.touches=[],globalValues.fixedWidth=null,globalValues.fixedHeight=null,globalValues.touchTimeout=0,globalValues.getFixedValue=function(a){return"height"==a?null==globalValues.fixedHeight?1:window.innerHeight/globalValues.fixedHeight:null==globalValues.fixedWidth?1:window.innerWidth/globalValues.fixedWidth},window.addEventListener("load",function(){document.body.addEventListener("mousemove",function(a){let b=a.clientX-window.innerWidth/2,c=window.innerHeight/2-a.clientY;globalValues.mouseX=b*globalValues.getFixedValue("width"),globalValues.mouseY=c*globalValues.getFixedValue("height")}),document.body.addEventListener("touchstart",function(a){clearTimeout(globalValues.touchTimeout);for(let b=0;b<a.touches.length;b++){let c=a.touches[b].clientX-window.innerWidth/2,d=window.innerHeight/2-a.touches[b].clientY,e={};e.mouseX=c*globalValues.getFixedValue("width"),e.mouseY=d*globalValues.getFixedValue("height"),globalValues.touches.push(e)}}),document.body.addEventListener("touchend",function(){globalValues.touchTimeout=setTimeout(function(){globalValues.touches=[]},300)})});function getDirection(a,b,c,d){return 180*Math.atan((c-a)/(d-b))/Math.PI-180*(d<b)}function getMaxLayer(){const a=sprites;let b=0;for(i=0;i<a.length;i++)a[i].layer>b&&(b=a[i].layer);return b}function moveSpritesUp(){const a=sprites;for(i=0;i<a.length;i++)++a[i].layer}function updateDirection(){spriteData.direction%=360,spriteData["3d"].rotateX%=360,spriteData["3d"].rotateY%=360,(90!=spriteData["3d"].rotateX||90!=spriteData["3d"].rotateY)&&(spriteData["3d"].isEnabled=!0)}function move_steps(){change_x(Math.sin(spriteData.direction-90)),change_y(Math.cos(spriteData.direction-90))}function set_x(a){spriteData.x=a}function change_x(a){spriteData.x+=a}function change_y(a){spriteData.y+=a}function set_y(a){spriteData.y=a}function go_to(a,b){set_x(a),set_y(b)}function go_to_mouse(){go_to(globalValues.mouseX,globalValues.mouseY)}function rotate_left(a){point_in_direction(spriteData.direction-a)}function rotate_x_left(a){set_x_rotation(spriteData["3d"].rotateX-a)}function rotate_y_left(a){set_y_rotation(spriteData["3d"].rotateY-a)}function rotate_right(a){point_in_direction(spriteData.direction+a)}function rotate_x_right(a){set_x_rotation(spriteData["3d"].rotateX+a)}function rotate_y_right(a){set_y_rotation(spriteData["3d"].rotateY+a)}function point_in_direction(a){spriteData.direction=a,updateDirection()}function set_x_rotation(a){spriteData["3d"].rotateX=a,updateDirection()}function set_y_rotation(a){spriteData["3d"].rotateY=a,updateDirection()}function point_towards_mouse(){point_in_direction(getDirection(spriteData.x,spriteData.y,globalValues.mouseX,globalValues.mouseY))}function define_camera_distance(a){spriteData["3d"].cameraDistance=a}function set_costume(a){spriteData.costume=a}function set_size(a){spriteData.size=a}function change_size(a){set_size(spriteData.size+a)}function set_height(a){spriteData.height=a}function change_height(a){set_height(spriteData.height+a)}function set_width(a){spriteData.width=a}function change_width(a){set_width(spriteData.width+a)}function show(){spriteData.hidden=!1}function hide(){spriteData.hidden=!0}function go_to_front(){spriteData.layer=getMaxLayer()+1}function go_to_back(){moveSpritesUp(),spriteData.layer=0}function go_forward(a){spriteData.layer+=a}function go_backward(a){spriteData.layer-=a}function go_to_layer(a){spriteData.layer=a}function set_opacity(a){spriteData.opacity=a}function change_opacity(a){spriteData.opacity+=a}wait=a=>new Promise(b=>{setTimeout(b,a)});async function pause(a){await wait(1e3*a)}function repeat(a,b,c,d){for(i=0;i<a;i++)c?setTimeout(function(){b()},10*i):b();d&&(c?setTimeout(function(){d()},1e3/globalValues.CPS*(a+1)):d())}function do_repeat(a,b,c,d){d===void 0&&(d=1),d>a?c&&c():(b(),setTimeout(doLoop,1e3/globalValues.CPS,a,b,c,d+1))}function forever(a){a(),setTimeout(function(){forever(a)},1e3/globalValues.CPS)}const sprites=[];function updateSprite(a,b){a.src=null==b.costume?a.src:b.costume,a.style.zIndex=b.layer;let c=b.x*globalValues.getFixedValue("width")+window.innerWidth/2,d=-(b.y*globalValues.getFixedValue("height"))+window.innerHeight/2;a.style.position="fixed",a.style.left=c-a.clientWidth/2+"px",a.style.top=d-a.clientHeight/2+"px",a.style.display=b.hidden?"none":"",a.style.transform=`${b["3d"].isEnabled?`perspective(${10*b["3d"].cameraDistance}px) rotateX(${b["3d"].rotateY-90}deg) rotateY(${b["3d"].rotateX-90}deg)`:""} rotate(${b.direction-90}deg) scale(${b.size/100}) scaleX(${b.width/100}) scaleY(${b.height/100})`,a.style.opacity=b.opacity/100}function initSprite(a,b){updateSprite(a,b),b.renderProcess=setTimeout(function(){initSprite(a,b)},1e3/globalValues.FPS)}function createSprite(a){sprites.push({});const b=sprites.length-1,c="object"==typeof a;return c||(element=document.createElement("img"),element.id="sprite#"+b,document.body.appendChild(element)),sprite=sprites[b],sprite.costume=c?null:a,sprite.ref=c?a:document.getElementById("sprite#"+b),sprite.id=parseFloat(b),sprite.direction=90,sprite.x=0,sprite.y=0,sprite.hidden=!1,sprite.size=100,sprite.height=100,sprite.width=100,sprite.layer=getMaxLayer()+1,sprite.opacity=100,sprite["3d"]={},sprite["3d"].rotateX=90,sprite["3d"].rotateY=90,sprite["3d"].isEnabled=!1,sprite["3d"].cameraDistance=800,sprite.run=function(a,b,c,d,e,f,g,h,j,k,l,m){this.spriteData=this,spriteData=this.spriteData,spriteData,a(b,c,d,e,f,g,h,j,k,l,m),spriteData=void 0},sprite.terminate=function(a){clearTimeout(this.renderProcess),sprites.splice(this.id,0),a&&this.ref.remove()},sprite.freeze=function(){clearTimeout(this.renderProcess)},initSprite(sprite.ref,sprite),b}function getSprite(a){return sprites[a]}function forceSpriteUpdate(a){updateSprite(getSprite(a).ref,getSprite(a))}
