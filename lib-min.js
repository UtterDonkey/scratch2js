/* Please note - this file is not updated as often as the main scripts, so when using this script, you may have to wait longer for new updates. */
/* Copyright: Pixelbulb 2022 https://pixelbulb.online */
/* You may use this script without prior permission as long as nothing, including comments, is omitted */


const globalValues={},globalFunctions={},project={sprites:[],options:{stageSize:{width:1600,height:900,maintainAspectRatio:!0}},running:!0,stop:()=>{for(let a=0;a<project.sprites.length;a++)project.sprites[a].terminate(!1);project.running=!1},start:(a,b)=>{if(a){project.options=a.options;for(let b=0;b<a.sprites.length;b++){const c=createSprite(a.sprites[b].costume);getSprite(c).name=a.sprites[b].name,getSprite(c).scripts=a.sprites[b].scripts,getSprite(c).global=a.sprites[b].global}}if(!b){project.idle=!1;for(let a=0;a<project.sprites.length;a++){const b=project.sprites[a].scripts;for(let c=0;c<b.length;c++)if(b[c]&&"start"==b[c].event)try{project.sprites[a].run(b[c].code)}catch(d){project.console.push({text:d.toString(),sprite:project.sprites[a].name,err:d,type:"error",script:b[c].name})}}}},console:[],idle:!0};if(window.parent){window.__defineGetter__("project",()=>project),window.__defineSetter__("project",a=>project=a),window.__defineGetter__("globalValues",()=>globalValues),window.__defineSetter__("globalValues",a=>globalValues=a),window.__defineGetter__("getSprite",()=>getSprite),window.__defineSetter__("getSprite",a=>getSprite=a),window.__defineGetter__("createSprite",()=>createSprite),window.__defineSetter__("createSprite",a=>createSprite=a)};function protectParent(){const a={engineLoaded:parent.engineLoaded};window.__defineGetter__("parent",()=>a)}parent&&!!parent.protect&&protectParent(),globalValues.FPS=60,globalValues.CPS=100,globalValues.touches=[],globalValues.fixedWidth=null,globalValues.fixedHeight=null,globalValues.touchTimeout=0,globalFunctions.getFixedValue=function(){return null==globalValues.fixedWidth?1:globalFunctions.stage().clientWidth/globalValues.fixedWidth},globalFunctions.are_sprites_touching=function(a,b){const c=(a.ref.height*(a.height/100)+a.ref.width*(a.width/100))/2*(a.size/100),d=(b.ref.height*(b.height/100)+b.ref.width*(b.width/100))/2*(b.size/100),e=Math.sqrt((b.ref.x-a.ref.x)**2+(b.ref.y-a.ref.y)**2);return isTouching},globalFunctions.stage=()=>document.querySelector("pillor")?document.querySelector("pillor").querySelector("div"):document.body,window.addEventListener("load",function(){globalFunctions.stage().addEventListener("mousemove",function(a){let b=a.clientX-globalFunctions.stage().getBoundingClientRect().left-globalFunctions.stage().clientWidth/2,c=globalFunctions.stage().getBoundingClientRect().top+globalFunctions.stage().clientHeight/2-a.clientY;globalValues.mouseX=b/globalFunctions.getFixedValue("width"),globalValues.mouseY=c/globalFunctions.getFixedValue("height")}),globalFunctions.stage().addEventListener("touchstart",function(a){clearTimeout(globalValues.touchTimeout);for(let b=0;b<a.touches.length;b++){let c=a.touches[b].clientX-globalFunctions.stage().clientWidth/2,d=globalFunctions.stage().clientHeight/2-a.touches[b].clientY,e={};e.mouseX=c*globalFunctions.getFixedValue("width"),e.mouseY=d*globalFunctions.getFixedValue("height"),globalValues.touches.push(e)}}),globalFunctions.stage().addEventListener("touchend",function(){globalValues.touchTimeout=setTimeout(function(){globalValues.touches=[]},300)})}),globalFunctions.getDirection=function(a,b,c,d){return 180*Math.atan((c-a)/(d-b))/Math.PI-180*(d<b)},globalFunctions.getMaxLayer=function(){const a=project.sprites;let b=0;for(i=0;i<a.length;i++)a[i].layer>b&&(b=a[i].layer);return b},globalFunctions.moveSpritesUp=function(){const a=project.sprites;for(i=0;i<a.length;i++)++a[i].layer},globalFunctions.updateDirection=function(){spriteData.direction%=360,spriteData["3d"].rotateX%=360,spriteData["3d"].rotateY%=360,(90!=spriteData["3d"].rotateX||90!=spriteData["3d"].rotateY)&&(spriteData["3d"].isEnabled=!0)};function move_steps(){change_x(Math.sin(spriteData.direction-90)),change_y(Math.cos(spriteData.direction-90))}function set_x(a){spriteData.x=a}function change_x(a){spriteData.x+=a}function change_y(a){spriteData.y+=a}function set_y(a){spriteData.y=a}function go_to(a,b){set_x(a),set_y(b)}function go_to_mouse(){go_to(globalValues.mouseX,globalValues.mouseY)}function rotate_left(a){point_in_direction(spriteData.direction-a)}function rotate_x_left(a){set_x_rotation(spriteData["3d"].rotateX-a)}function rotate_y_left(a){set_y_rotation(spriteData["3d"].rotateY-a)}function rotate_z_left(a){point_in_direction(spriteData.direction-a)}function rotate_right(a){point_in_direction(spriteData.direction+a)}function rotate_x_right(a){set_x_rotation(spriteData["3d"].rotateX+a)}function rotate_y_right(a){set_y_rotation(spriteData["3d"].rotateY+a)}function rotate_z_right(a){point_in_direction(spriteData.direction+a)}function point_in_direction(a){spriteData.direction=a,globalFunctions.updateDirection()}function set_x_rotation(a){spriteData["3d"].rotateX=a,globalFunctions.updateDirection()}function set_y_rotation(a){spriteData["3d"].rotateY=a,globalFunctions.updateDirection()}function set_z_rotation(a){point_in_direction(a)}function point_towards_mouse(){point_in_direction(globalFunctions.getDirection(spriteData.x,spriteData.y,globalValues.mouseX,globalValues.mouseY))}function define_camera_distance(a){spriteData["3d"].cameraDistance=a}function set_costume(a){spriteData.costume=a}function set_size(a){spriteData.size=a}function change_size(a){set_size(spriteData.size+a)}function set_height(a){spriteData.height=a}function change_height(a){set_height(spriteData.height+a)}function set_width(a){spriteData.width=a}function change_width(a){set_width(spriteData.width+a)}function show(){spriteData.hidden=!1}function hide(){spriteData.hidden=!0}function go_to_front(){spriteData.layer=globalFunctions.getMaxLayer()+1}function go_to_back(){globalFunctions.moveSpritesUp(),spriteData.layer=0}function go_forward(a){spriteData.layer+=a}function go_backward(a){spriteData.layer-=a}function go_to_layer(a){spriteData.layer=a}function set_opacity(a){spriteData.opacity=a}function change_opacity(a){spriteData.opacity+=a}function clone(){const a=spriteData.original.ref.insertAdjacentElement("AfterEnd",spriteData.original.ref.cloneNode(!0)),b=createSprite(a);getSprite(b).ref.id="sprite#"+getSprite(b).id,getSprite(b).original=spriteData.original,getSprite(b).isOriginal=!1;const c=["clones","freeze","id","isOriginal","layer","original","ref","renderProcess","run","terminate"];for(i in spriteData)c.includes(i)||(getSprite(b)[i]=spriteData[i]);return spriteData.original.clones.push(b),b}wait=a=>new Promise(b=>{setTimeout(b,a)});async function pause(a){await wait(1e3*a)}function repeat(a,b,c,d,e){for(void 0===e?e=spriteData:spriteData=e,i=0;i<a;i++)c?setTimeout(b(),10*i,e):b();d&&(c?setTimeout(d,1e3/globalValues.CPS*(a+1),e):d())}function do_repeat(a,b,c,d,e){e===void 0?e=spriteData:spriteData=e,d===void 0&&(d=1),d>a?c&&c():(b(),setTimeout(do_repeat,1e3/globalValues.CPS,a,b,c,d+1,e))}function forever(a,b){b===void 0?b=spriteData:spriteData=b,a(),setTimeout(forever,1e3/globalValues.CPS,a,b)}function updateSprite(a,b){if(null==a||b.global)return;a.src=null==b.costume?a.src:b.costume,a.style.zIndex=b.layer;let c=b.x*globalFunctions.getFixedValue("width")+globalFunctions.stage().clientWidth/2,d=-(b.y*globalFunctions.getFixedValue("height"))+globalFunctions.stage().clientHeight/2;a.style.position="absolute",a.style.pointerEvents="none",a.style.left=c-a.clientWidth/2+"px",a.style.top=d-a.clientHeight/2+"px",a.style.display=b.hidden?"none":"",a.style.transform=`${b["3d"].isEnabled?`perspective(${10*b["3d"].cameraDistance}px) rotateX(${b["3d"].rotateY-90}deg) rotateY(${b["3d"].rotateX-90}deg)`:""} rotate(${b.direction-90}deg) scale(${b.size/100*globalFunctions.getFixedValue("scale")}) scaleX(${b.width/100}) scaleY(${b.height/100})`,a.style.opacity=b.opacity/100}function initSprite(a,b){if(!0==b.global){try{a.remove()}catch(a){}return}updateSprite(a,b),b.renderProcess=setTimeout(function(){initSprite(a,b)},1e3/globalValues.FPS)}function createSprite(image,name,isDefault){project.sprites.push({});const id=project.sprites.length-1,assignElement="object"==typeof image;return assignElement||(element=document.createElement("img"),element.id="sprite#"+id,globalFunctions.stage().appendChild(element)),sprite=project.sprites[id],sprite.name=name?name:"Object"+id,sprite.costume=assignElement?null:image,sprite.ref=assignElement?image:document.getElementById("sprite#"+id),sprite.id=parseFloat(id),sprite.isDefault=!!isDefault,sprite.isDemo=!1,sprite.scripts=[],sprite.isOriginal=!0,sprite.original=sprite,sprite.clones=[],sprite.direction=90,sprite.x=0,sprite.y=0,sprite.hidden=!1,sprite.size=100,sprite.height=100,sprite.width=100,sprite.layer=globalFunctions.getMaxLayer()+1,sprite.opacity=100,sprite["3d"]={},sprite["3d"].rotateX=90,sprite["3d"].rotateY=90,sprite["3d"].isEnabled=!1,sprite["3d"].cameraDistance=800,sprite.run=function(script,param,param0,param1,param2,param3,param4,param5,param6,param7,param8,param9){return this.spriteData=this,spriteData=this.spriteData,spriteData,"string"==typeof script?eval(script):script(param,param0,param1,param2,param3,param4,param5,param6,param7,param8,param9)},sprite.terminate=function(a){clearTimeout(this.renderProcess),this.isOriginal||this.original.clones.splice(this.id,0),project.sprites[this.id]={},a&&null!==this.ref&&this.ref.remove()},sprite.freeze=function(){clearTimeout(this.renderProcess)},initSprite(sprite.ref,sprite),id}function getSprite(a){return project.sprites[a]}function forceSpriteUpdate(a){updateSprite(getSprite(a).ref,getSprite(a))}function trace(a){return getSprite(a.id)}parent.engineLoaded&&setTimeout(parent.engineLoaded,0);
