// Create game objects.
const player = new Player();


// Add event listeners.
document.addEventListener("click", (event) => {
    // Calculate the clicked position for ensuring robust
    // and precise functioning of our game. It's not only
    // modular for allowing "touchstart", "touchmove",
    // "touchend", "mousedown", "mousemove", "mouseup",
    // and so on, but also helps improve precision.
    const clickX = event.clientX - canvasRect.left;
    const clickY = event.clientY - canvasRect.top;

    handleClick(clickX, clickY);
});

function handleClick(clickX, clickY) {
    // x = clickX - 100;
    // y = clickY - 100;
}


// Main game loop.
let lastTime = 0;

function animate(currentTime = performance.now()) {
    requestAnimationFrame(animate);
    
    // Calculate delta time.
    const dt = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    
    settings.fps.lastCheck += dt;

    // IMPORTANT: Enable the USERs to cap the FPS.
    if (settings.fps.capped) {
        settings.fps.counter += dt;
        if (settings.fps.counter < settings.fps.interval) {
            return;
            // Else we will continue the game.
        }
        settings.fps.counter -= settings.fps.interval;
        // NOTE: We only reset if there was no return.
    }

    // Calculate the FPS if necessary.
    if (settings.fps.check) {
        settings.fps.framesCounter++;
        if (settings.fps.lastCheck >= 1) {
            console.log(`FPS: ${Math.round(settings.fps.framesCounter / settings.fps.lastCheck)}`);
            settings.fps.lastCheck = 0;
            settings.fps.framesCounter = 0;
        }
    }

    // Clear the previous frame and draw the background.
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the player.
    player.update(dt);
    player.draw(context);
}

animate();