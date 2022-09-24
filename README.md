
# scratch2js
Convert Scratch Projects To JavaScript

## Docs

### Creating Sprites

To create a sprite, use <code>createSprite()</code>. It requires 1 parameter which is either an element to assign it to or an image URL to set as the costume. It will return an id that can be used to run scripts. To run scripts or read data from a sprite, use <code>getSprite()</code>. It will return the sprite object. It requires 1 parameter which is the id returned from the <code>createSprite()</code> function.

Example:
```
mySprite = createSprite(https://www.google.co.uk/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png);
spriteObject = getSprite(mySprite);
```
#### Remove Demo Sprite

`demo.js` includes a function to remove the demo sprite. Using `removeDemoSprite()` will delete the demo sprite element, clear its render process, and delete the variable `demoSprite`

### Executing Scripts

To execute a script, use the `run()` function in a sprite object. It requires 2 parameters, the first is the name of the script, the second is the parameter. The `run` function supports up to 11 parameters. If the script requires more than 11 parameters or needs to run multiple scripts, use a function.

Example:
```
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

### Deleting Sprites

#### `terminate`
To delete a sprite, use the `terminate()` function in a sprite object. It ends the sprite's render process and removes it from the sprite index. It requires 1 parameter, this parameter is a boolean telling the function whether or not to delete the element from the DOM as well.

Example:
```
spriteObject.terminate()
// will terminate the sprite process but the element will still exist.

spriteObject.terminate(true)
//will terminate sprite process and delete element
```

#### `freeze`
To freeze a sprite, use the `freeze()` function in a sprite object. It ends the sprite's render process but does not remove it from the sprite index. After freezing, the only way to update it is eaither to terminate and recreate the sprite, or use `forceSpriteUpdate()`.

Example:
```
spriteObject.freeze();
// will terminate the render process but the sprite will still remain indexed, allowing for forceSpriteUpdate() to work.

// bring the sprite back
const element = spriteObject.ref;
spriteObject.terminate();
mySprite = createSprite(element);
spriteObject = getSprite(mySprite);
```


#### Forcing Sprite Updates

`forceSpriteUpdate()` requires 1 parameter - the id of the sprite to update. It is the same id that is used in `getSprite()`. This script will immediately update the sprite without waiting until the next frame;

### Scripts

🧪 Experiment

🧊 Initiates 3D Engine

📖 Intended for Read-only


#### `move_steps`
Move sprite `n` pixels in current direction.

Example:
```
spriteObject.run(move_steps, 10);
// will move sprite to 0, 10 presuming its direction is 90
```

#### `change_x`, `change_y`, `set_x`, `set_x`
Set/change X/Y position.

#### `go_to`
Requires 2 parameters, first for X, second for Y. Sets sprite's Position.

#### `go_to_mouse`
Moves sprite to mouse pointer.

Example:
```
getSprite(mySprite).run(forever, go_to_mouse);
```

#### `rotate_left`, `rotate_right`
Rotate left/right `n` degrees.

Example:
```
spriteObject.run(rotate_right, 45);
// will rotate sprite to 135° presuming its direction is 90°
```

#### 🧊`rotate_x_left`, `rotate_x_right`
Rotate X axis left/right `n` degrees.

#### 🧊`rotate_y_left`, `rotate_y_right`
Rotate Y axis left/right `n` degrees.

#### `point_in_direction`
Set sprite's direction.

#### 🧊`set_x_rotation`
Set sprite's X rotation.

#### 🧊`set_y_rotation`
Set sprite's Y rotation.

#### `point_towards_mouse`
Point sprite towards mouse pointer.

#### `getDirection`
NOTE: this is a function, not a script.
Requires 4 inputs, first for start X (usually sprite X), second for start Y (usually sprite Y), third for target X, fourth for target Y. Will return direction for if a sprite at start X and start Y was facing target X and target Y.

Example:
```
spriteObject.run(function(){point_in_direction(getDirection(spriteData.x, spriteData.y, 0, 0))});
// will point towards centre
```

#### 🧊`define_camera_distance`
Usually a value between 0 and 100. Defines the camera's perspective when using 3D effects.
#### `set_costume`
NOTE: Behaviour may change in the future.
Set sprite's costume (display image) to url.

#### `set_size`, `change_size`
Sets/changes sprite's size to `n%`.

#### `set_height`, `change_height`
Sets/changes sprite'sheight to `n%`.

#### `set_width`,  `change_width`
Sets/changes sprite's width to `n%`.

#### `go_forward`, `go_backward`
Move forward/backward `n` layers.

#### `go_to_front`, `go_to_back`
Go infront of/behind all other sprites.

#### 🧪`go_to_layer`
Move to specific layer.

#### `set_opacity`, `change_opacity`
Value from 0-100. Sets/changes opacity of sprite.

#### `await pause`
Pause current thread for `n` seconds.

### Loops
Loops can be used for any script and are not run from `spriteObject.run`.

#### `repeat`
Loop script `n` times. Requires 2 parameters, first for amount of times to repeat, second for the function to run. Has a third optional parameter, boolean, for whether or not to animate the frames. Has a fourth optional parameter, function, a callback to be run 1 frame after repeat loop is scheduled to end.

Example:
```

repeat(90, function(){
getSprite(mySprite).run(function(){
    rotate_right(2);
});
});
// same us rotate_right(180)

repeat(90, function(){
getSprite(mySprite).run(function(){
    rotate_right(2);
}, true);
});

// rotate 180 degrees over 90 frames
```

#### `forever`
Loop script forever. Requires 1 parameter, the function to run.
TIP: Forever loops will always yield, but the yielding can be delayed by adding repeat loops inside the forever loop.

Example:
```
forever(function(){getSprite(mySprite).run(function(){
rotate_right(1);
})});
// rotate 1 degree continuously
```

#### 🧪`doLoop`
Similar to an animated repeat loop, however all scripts are executed before next loop begins.
NOTE: First loop is executed immediately instead of after 1 frame.

### Sprite Values

#### 📖`id`
Will return the sprite's id.
eg.
```
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

#### 📖`['3d']`
Will return sprite's 3D object.

##### 📖`isEnabled`
Will return boolean indicating whether or not the sprite is running in a 3D context.
WARNING: Do not change this value, it is automatically set by the engine and is used to save resources when 3D is not needed.

##### `cameraDistance`
Will return the 3D camera distance.

#### 📖`rotateX`, `rotateY`
Will return sprite's X/Y rotation.

### Global Values

Global values can be accessed from the `globalValues` object.

#### `fixedHeight`, `fixedWidth`
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
