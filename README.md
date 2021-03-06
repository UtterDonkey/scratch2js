
# scratch2js
Convert Scratch Projects To JavaScript

## Docs

### Creating Sprites

To create a sprite, use <code>createSprite()</code>. It will return an id that can be used to run scripts. To run scripts or read data from a sprite, use <code>getSprite()</code>. It will return the sprite object. It requires 1 parameter which is the id returned from the <code>createSprite()</code> function.

Example:
```
mySprite = createSprite();
spriteObject = getSprite(mySprite);
```
#### Remove Demo Sprite

`demo.js` includes a function to remove the demo sprite. Using `removeDemoSprite()` will delete the demo sprite element, clear its render process, and delete the variable `demoSprite`

### Executing Scripts

To execute a script, use the `run()` function in a sprite object. It requires 2 parameters, the first is the name of the script, the second is the parameter. If the script requires multiple parameters or to run multiple scripts, use a function.

Example:
```
spriteObject.run(function(){go_to(0, 0)});
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

### Scripts

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

#### `point_in_direction`
Set sprite's direction.

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

#### `set_costume`
NOTE: Behaviour may change in the future.
Set sprite's costume (display image) to url.

#### `set_size`
Set sprite's size to `n%`.

#### `change_size`
Change sprite's size by `n%`.

#### `go_forward`, `go_backward`
Move forward/backward `n` layers.

#### `go_to_front`, `go_to_back`
Go infront of/behind all other sprites.

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

### Global Values

Global values can be accessed from the `globalValues` object.

#### `mouseX`, `mouseY`
Returns mouse X and Y position.

#### `FPS`
How many times per second the sprite's element should be updated.

#### `CPS`
How many script cycles should be run per second (applies to loops only).
NOTE: A `repeat` loop's CPS cannot be changed after execution has begun.

### Sprite Data

The sprite's object can be accessed through `spriteData` in a function or script.
