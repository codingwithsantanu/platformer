// Canvas configurations.
const canvas = document.getElementById("mainCanvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth - 40;
canvas.height = window.innerHeight - 40;

/* NOTE: canvasRect is an instance of DOMRect. We are using
 | it to ensure the clicks are relative to the canvas and
 | not the viewport. This is only if the canvas's size is
 | not equal to the viewport size, i.e, fullscreen. */
const canvasRect = canvas.getBoundingClientRect();


// Import all the images and sounds from the DOM.
const playerSpritesheet = document.getElementById("playerSpritesheet");


// Spritesheets Info.
const PlayerAnimations = Object.freeze({
    IDLE: [0, 5],
    RUN: [1, 6],
    JUMP: [2, 3],
    FALL: [3, 1],
    ATTACK: [4, 3],
    HIT: [5, 4],
    DEAD: [6, 8]
    // FORMAT: AnimationName: [Index, TotalSprites (MaxVaid + 1)]
});


// Game enums.
const Direction = Object.freeze({
    NONE: 0,
    UP: 1,
    LEFT: 2,
    DOWN: 3,
    RIGHT: 4
});


// Create a map for every keys we care about.
const keysPressed = {
    up: false,
    left: false,
    down: false,
    right: false
};


// Save all the game settings inside a dictionary.
const settings = {
    fps: {
        capped: false,
        counter: 0,
        interval: 1 / 60, // We use it as: 1.0 / FPS.
        /* NOTE: Usually requestAnimationFrame() calls our
         | animate() function based on the refresh-rate of
         | the USER's monitor or display. So, no matter if
         | you use 1 / 120 or 0 as interval even when the
         | monitor only supports 60Hz refresh rate, it
         | would never lead to screen tear.
         */

        check: false,
        framesCounter: 0,
        lastCheck: 0
    }
};