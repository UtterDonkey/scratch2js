
document.body.insertAdjacentHTML('beforeEnd', `<h1 style="
    position: fixed;
">Test</h1><img src="https://cdn.assets.scratch.mit.edu/internalapi/asset/7e24c99c1b853e52f8e7f9004416fa34.png/get" id="sprite1" style="position: fixed; left: 693px; top: 367px;"></img>`)
sprite = document.getElementById('sprite1');

initSprite(sprite, spriteData);
