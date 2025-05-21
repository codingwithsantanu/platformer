// Add keyboard event listeners.
document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "w":
        case "W":
        case "ArrowUp":
            keysPressed.up = true;
            break;

        case "a":
        case "A":
        case "ArrowLeft":
            keysPressed.left = true;
            break;

        case "s":
        case "S":
        case "ArrowDown":
            keysPressed.down = true;
            break;

        case "d":
        case "D":
        case "ArrowRight":
            keysPressed.right = true;
            break;
    };
});

document.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "w":
        case "W":
        case "ArrowUp":
            keysPressed.up = false;
            break;

        case "a":
        case "A":
        case "ArrowLeft":
            keysPressed.left = false;
            break;

        case "s":
        case "S":
        case "ArrowDown":
            keysPressed.down = false;
            break;

        case "d":
        case "D":
        case "ArrowRight":
            keysPressed.right = false;
            break;
    };
});