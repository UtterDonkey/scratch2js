
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

Example:
```
// move sprite to mouse pointer
mySprite = createSprite();
spriteObject = getSprite(mySprite);
spriteObject.run(go_to_mouse);
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

#### `pause`
Pause all scripts for `n` seconds.

#### `yield`
In loops, wait one frame before next repeat. Must be at end of function.

#### `repeat`
Loop script `n` times. Same parameters as `run`.

Example:
```
getSprite(mySprite).run(function(){
repeat(90, function(){
    rotate_right(2);
});
});
// same us rotate_right(180)

getSprite(mySprite).run(function(){
repeat(90, function(){
    rotate_right(2);
    yield();
});
});

// rotate 180 degrees over 90 frames
```

#### `forever`
Loop script forever. Always Yields.

Example:
```
getSprite(mySprite).run(forever, function(){rotate_right(1)});
// rotate 1 degree continuously

getSprite(mySprite).run(forever, function(){
repeat(20, function(){rotate_right(1/20)})
});
// rotate 1 degree continuously, but only yield every 20 frames - forever loop only yield after scripts have run
// rotates 1/20 to prevent rotating 20 times fatser
```

### Global Values

Global values can be accessed from the `globalValues` object.

#### `mouseX`, `mouseY`
Returns mouse X and Y position.


### Sprite Data

The sprite's object can be accessed through `spriteData` in a function or script.
