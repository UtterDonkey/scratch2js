
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

To execute a script, use the `run()` function in a sprite object. It requires 1 parameter which is a the string of the script to be executed. Multiple scripts can also be run, seperated by semicolons.

Example:
```
// move sprite to mouse pointer
mySprite = createSprite();
spriteObject = getSprite(mySprite);
spriteObject.run(`go_to(globalValues.mouseX, globalValues.mouseY)`);
```

### Scripts

#### `move_steps`
Move sprite `n` pixels in current direction.

Example:
```
spriteObject.run(`move_steps(10)`);
// will move sprite to 0, 10 presuming its direction is 90
```

#### `change_x`, `change_y`, `set_x`, `set_x`
Set/change X/Y position.

#### `go_to`
Requires 2 parameters, first for X, second for Y. Sets sprite's Position.

#### `rotate_left`, `rotate_right`
Rotate left/right `n` degrees.

Example:
```
spriteObject.run(`rotate_right(45)`);
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
spriteObject.run(`point_in_direction(getDirection(spriteData.x, spriteData.y, 0, 0))`);
// will point towards centre
```

#### `set_costume`
NOTE: Behaviour may change in the future.
Set sprite's costume (display image) to url.

#### `set_size`
Set sprite's size to `n%`.

#### `change_size`
Change sprite's size by `n%`.

### Global Values

Global values can be accessed from the `globalValues` object.

#### `mouseX`, `mouseY`
Returns mouse X and Y position.