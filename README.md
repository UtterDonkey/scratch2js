
# scratch2js
Convert Scratch Projects To JavaScript

## Docs

🧪 Experiment

🛠️ Not Fully Implemented

🧊 Initiates 3D Engine (🛠️)

📖 Intended for Read-only

🌟 New Feature

⚠️ Deprecated


### Creating Sprites

To create a sprite, use `createSprite()`. It requires 1 parameter which is either an element to assign it to or an image URL to set as the costume. It will return an id that can be used to run scripts. To run scripts or read data from a sprite, use <code>getSprite()</code>. It will return the sprite object. It requires 1 parameter which is the id returned from the <code>createSprite()</code> function.

Example:
```js
mySprite = createSprite('https://www.google.co.uk/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png');
spriteObject = getSprite(mySprite);
```
#### ⚠️ Remove Demo Sprite

`demo.js` includes a function to remove the demo sprite. Using `removeDemoSprite()` will delete the demo sprite element, clear its render process, and delete the variable `demoSprite`

Deprecated - use `getSprite(demoSprite).terminate(true)` instead.



### Executing Scripts

To execute a script, use the `run()` function in a sprite object. It requires 2 parameters, the first is the name of the script, the second is the parameter. The `run` function supports up to 11 parameters. If the script requires more than 11 parameters or needs to run multiple scripts, use a function.

Example:
```js
spriteObject.run(function(){go_to(0, 0)});
// will centre sprite

spriteObject.run(go_to, 0, 0);
// will centre sprite

spriteObject.run(function(){
// go to mouse
go_to_mouse();
// point towards centre
point_in_direction(getDirection(spriteData.x, spriteData.y, 0, 0));
});
// will go to mouse pointer and point towards centre

spriteObject.run(hide);
// will hide sprite

spriteObject.run(go_forward, 2);
// will move the sprite forward 2 layers

```
NOTE: `spriteObject.run(...)` will return the value returned from the executed script.

Example:
```js
/* Before Update */
spriteObject.run(function(){return true}) // undefined

/* After Update */
spriteObject.run(function(){return true}) // true
```



### Deleting Sprites

#### `terminate(deleteElement)`
To delete a sprite, use the `terminate()` function in a sprite object. It ends the sprite's render process and removes it from the sprite index. It requires 1 parameter, this parameter is a boolean telling the function whether or not to delete the element from the DOM as well.

Example:
```js
spriteObject.terminate()
// will terminate the sprite process but the element will still exist.

spriteObject.terminate(true)
//will terminate sprite process and delete element
```


#### `freeze()`
To freeze a sprite, use the `freeze()` function in a sprite object. It ends the sprite's render process but does not remove it from the sprite index. After freezing, the only way to update it is eaither to terminate and recreate the sprite, or use `forceSpriteUpdate()`.

Example:
```js
spriteObject.freeze();
// will terminate the render process but the sprite will still remain indexed, allowing for forceSpriteUpdate() to work.

// bring the sprite back
const element = spriteObject.ref;
spriteObject.terminate();
mySprite = createSprite(element);
spriteObject = getSprite(mySprite);
```


### Forcing Sprite Updates

`forceSpriteUpdate()` requires 1 parameter - the id of the sprite to update. It is the same id that is used in `getSprite()`. This script will immediately update the sprite without waiting until the next frame.


### 🌟Tracing Sprite Objects

`trace(spriteObject)` will return the original sprite object.


### 🌟Packaging

NOTE: Importing projects from a string is for Pillor. You can only create projects like this using the Pillor Game Engine.

The following keys in the `project` object are only for use with Pillor: `sprites`, `options`, `start`, `console`, `idle`, `running`.

#### `project.stop()`
Will stop render processes of all sprites.

#### `<pillor>`
To contain the scratch2js engine in an element, use a `div` inside a `<pillor>` element.

Example:

```html

<pillor>
  <div id="canvas">
    <!-- Sprites will be created here -->
  </div>
</pillor>
```

The `div` will also need styling.

```css
div#canvas{
    overflow: clip;
    height: 100%;
    width: 100%;
    position: relative;
}
```

### Deployment

You can deploy your scripts on another site/HTML application using 4 different methods.

#### Download Scripts

Download `global.js`, `functions.js` and `sprites.js` then put them in the same folder as the HTML file you're running your script from. Then put the following in your HTML.

```html
  <script src="global.js"></script>
  <script src="functions.js"></script>
  <script src="sprites.js"></script>
```
NOTE: Scripts must be out in that order.
Your code can then then go in another script tag below those.

Pros:
Works offline.
When downloading, all the latest features are included.

Cons:
After downloading, you will not receive any more updates. Scripts will have to be manually re-downloaded and updated.
3 different scripts and unminified code will increase storage usage.


#### Use Scripts from GitHub

Enter the following in your HTML.
```html
  <script src="https://utterdonkey.github.io/scratch2js/global.js"></script>
  <script src="https://utterdonkey.github.io/scratch2js/functions.js"></script>
  <script src="https://utterdonkey.github.io/scratch2js/sprites.js"></script>
```
NOTE: Scripts must be out in that order.
Your code can then then go in another script tag below those.

Pros:
Updated as soon as new features come out.
Will not take up storage space on server.

Cons:
3 different scripts and unminified code will increase loading times.
Does not work offline.


#### 🛠️ Download Minified Scripts

Download `lib-min.js` then put it in the same folder as the HTML file you're running your script from. Then put the following in your HTML.

```html
  <script src="lib-min.js"></script>
```
Your code can then then go in another script tag below that.

Pros:
Works offline.
1 single minified script will reduce loading times and save server storage.

Cons:
After downloading, you will not receive any more updates. Scripts will have to be manually re-downloaded and updated.
The minified version is not updated immediately when an update comes out.



#### 🛠️ Use Minified Scripts from GitHub

Enter the following in your HTML.
```html
  <script src="https://utterdonkey.github.io/scratch2js/lib-min.js"></script>
```
Your code can then then go in another script tag below that.

Pros:

1 single minified script will reduce loading times and save server storage.
Updated as soon as new features are released for the minified version.
Will not take up storage space on server.

Cons:
The minified version is not updated immediately when an update comes out.
Does not work offline.


### Scripts


#### `move_steps(steps)`
Move sprite `n` pixels in current direction.

Example:
```js
spriteObject.run(move_steps, 10);
// will move sprite to 0, 10 presuming its direction is 90
```


#### `change_x(value)`, `change_y(value)`, `set_x(value)`, `set_x(value)`
Set/change X/Y position.


#### `go_to(x, y)`
Requires 2 parameters, first for X, second for Y. Sets sprite's position.


#### `go_to_mouse()`
Moves sprite to mouse pointer.

Example:
```js
getSprite(mySprite).run(forever, go_to_mouse);
```


#### `rotate_left(degrees)`, `rotate_right(degrees)`
Rotate left/right `n` degrees.

Example:
```js
spriteObject.run(rotate_right, 45);
// will rotate sprite to 135° presuming its direction is 90°
```


#### 🧊`rotate_x_left(degrees)`, `rotate_x_right(degrees)`
Rotate X axis left/right `n` degrees.


#### 🧊`rotate_y_left(degrees)`, `rotate_y_right(degrees)`
Rotate Y axis left/right `n` degrees.

#### `rotate_z_left(degrees)`, `rotate_z_right(degrees)`
Rotate Z axis left/right `n` degrees.

#### `point_in_direction(degrees)`
Set sprite's direction.


#### 🧊`set_x_rotation(degrees)`
Set sprite's X rotation.


#### 🧊`set_y_rotation(degrees)`
Set sprite's Y rotation.

#### `set_z_rotation(degrees)`
Set sprite's Z rotation.


#### `point_towards_mouse()`
Point sprite towards mouse pointer.

#### 🧊`define_camera_distance(value)`
Usually a value between 0 and 100. Defines the camera's perspective when using 3D effects.


#### `set_costume(url)`
NOTE: Behaviour may change in the future.
Set sprite's costume (display image) to url.


#### `set_size(value)`, `change_size(value)`
Sets/changes sprite's size to `n%`.


#### `set_height(value)`, `change_height(value)`
Sets/changes sprite's height to `n%`.


#### `set_width(value)`,  `change_width(value)`
Sets/changes sprite's width to `n%`.


#### `go_forward(layers)`, `go_backward(layers)`
Move forward/backward `n` layers.


#### `go_to_front()`, `go_to_back()`
Go to front/back of all other sprites.


#### 🧪`go_to_layer(value)`
Move to specific layer.


#### `set_opacity(value)`, `change_opacity(value)`
Value from 0-100. Sets/changes opacity of sprite.


#### 🌟`clone()`

Will create a new sprite with the same properties as the current sprite. It will return the ID of the new sprite.


#### 🛠️`await pause`
Pause current thread for `n` seconds.



### Loops
Loops can be used for any script and are not run from `spriteObject.run`.


#### `repeat(loops, script, animate, callback)`
Loop script `n` times. Requires 2 parameters, first for amount of times to repeat, second for the function to run. Has a third optional parameter, boolean, for whether or not to animate the frames. Has a fourth optional parameter, function, a callback to be run 1 frame after repeat loop is scheduled to end.

Example:
```js

repeat(90, function(){
getSprite(mySprite).run(function(){
    rotate_right(2);
});
});
// same as rotate_right(180)

repeat(90, function(){
getSprite(mySprite).run(function(){
    rotate_right(2);
}, true);
});

// rotate 180 degrees over 90 frames
```


#### `forever(script)`
Loop script forever. Requires 1 parameter, the function to run.
TIP: Forever loops will always animate.

Example:
```js
forever(function(){getSprite(mySprite).run(function(){
rotate_right(1);
})});
// rotate 1 degree continuously
```


#### 🧪`do_repeat(loops, script, callback)`
Similar to an animated repeat loop, however all scripts are executed before next loop begins. May become a replacement for `repeat`. Requires 2 parameters, first for amount of times to repeat, second for the function to run. Has a third optional parameter, function, a callback to be run 1 frame after the loop ends.
NOTE: First loop is executed immediately instead of after 1 frame.



### Sprite Values

#### 📖`id`
Will return the sprite's id.

Example:
```js
spriteObject.id
// will return ID
spriteObject == getSprite(spriteObject.id) // true
```


#### 📖`ref`
Will return the element the render process is rendering to.


#### 📖`direction`
Will return the sprite's direction.


#### `x`, `y`, `size`, `width`, `height`, `layer`, `opacity`
Will return X/Y/size/width/height/layer/opacity of sprite.
NOTE: changing these values is not recommended.


#### `hidden`
Will return boolean indicating whether or not the sprite is hidden.


#### 📖🌟`clones`
Will return array of clones' IDs.


### 📖🌟`isOriginal`

Will return bollean indicating whether or not that sprite is the original sprite or is a clone.


### 📖🌟`original`

Will return sprite object of original sprite.


#### 📖`['3d']`
Will return sprite's 3D object.


##### 📖`['3d'].isEnabled`
Will return boolean indicating whether or not the sprite is running in a 3D context.
WARNING: Do not change this value, it is automatically set by the engine and is used to save resources when 3D is not needed.


##### `['3d'].cameraDistance`
Will return the 3D camera distance.


##### 📖`['3d'].rotateX`, `['3d'].rotateY`
Will return sprite's X/Y rotation.



### Global Values

Global values can be accessed from the `globalValues` object.

#### ⚒️ `fixedHeight`, `fixedWidth`
Simulates the device screen being 'n' pixels. Default: `null`
#### `mouseX`, `mouseY`
Returns mouse X and Y position.


#### `FPS`
How many times per second the sprite's element should be updated.


#### `CPS`
How many script cycles should be run per second (applies to loops only).
NOTE: A `repeat` loop's CPS cannot be changed after execution has begun.


#### 📖🧪`touches`
Returns an array of objects. Each object has a `mouseX` and `mouseY` key. This is used for when a user on a mobile device taps in multiple places at once.
### Sprite Data


The sprite's object can be accessed through `spriteData` in a function or script.


### 🌟 Global Functions

Global functions can be accessed from the `globalFunctions` object.

#### `stage()`

Will return either `document.body` or the `div` inside the `pillor`.


#### `are_sprites_touching(sprite1, sprite2)`

Requires 2 parameters, both sprites objects. Will return whether the likleyhood of the 2 sprites overlapping is above 50%.


#### `getDirection(originX, originY, targetX, targetY)`

NOTE: This function is mainly for internal use only.
Requires 4 inputs, first for start X (usually sprite X), second for start Y (usually sprite Y), third for target X, fourth for target Y. Will return direction for if a sprite at start X and start Y was facing target X and target Y.

Example:
```js
spriteObject.run(point_in_direction, globalFunctions.getDirection(spriteData.x, spriteData.y, 0, 0));
// will point towards centre
```


