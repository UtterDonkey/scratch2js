
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

## Scripts

### `move_steps`
Move sprite n pixels in current direction.

Example:
```
spriteObject.run(`move_steps(10)`);
// will move sprite to 0, 10 presuming its  direction is 90
```


