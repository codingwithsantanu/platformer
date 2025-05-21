class Player {
    constructor() {
        this.x = 100;
        this.y = 100;

        this.movementSpeed = 300;
        this.jumpSpeed = -500;
        this.velocity = {
            x: 0,
            y: 0
        };

        this.width = 64;
        this.height = 40;
        this.scale = 3;

        this.spriteX;
        this.spriteY;
        this.animation;
        this.rotateX = false;
        this.setAnimation(PlayerAnimations.IDLE);

        this.animationCounter = 0;
        this.animationInterval = 0.1; // 100ms.
    }

    // Main methods.
    update(dt) {
        this.updateVelocity();
        this.x += dt * this.velocity.x;
        this.y += dt * this.velocity.y;
        
        this.updateAnimation(dt);
    }

    draw(context) {
        if (this.rotateX) {
            context.save();

            // Translate to the flipped x position
            context.translate(this.x + this.width * this.scale, this.y);

            // Flip the context horizontally
            context.scale(-1, 1);

            context.drawImage(
                playerSpritesheet,

                this.spriteX * this.width,
                this.spriteY * this.height,
                this.width, this.height,

                0, 0,
                this.width * this.scale,
                this.height * this.scale
            );

            context.restore();
        } else {
            context.drawImage(
                playerSpritesheet,

                this.spriteX * this.width,
                this.spriteY * this.height,
                this.width, this.height,

                this.x, this.y,
                this.width * this.scale,
                this.height * this.scale
            );
        }
    }


    // Helper methods.
    updateVelocity() {
        if (keysPressed.left && !keysPressed.right) {
            this.velocity.x = -this.movementSpeed;
        } else if (keysPressed.right && !keysPressed.left) {
            this.velocity.x = this.movementSpeed;
        } else {
            this.velocity.x = 0;
        }
        
        if (keysPressed.up && !keysPressed.down) {
            this.velocity.y = -this.movementSpeed;
        } else if (keysPressed.down && !keysPressed.up) {
            this.velocity.y = this.movementSpeed;
        } else {
            this.velocity.y = 0;
        }
    }

    updateAnimation(dt) {
        // Ensure the correct animation is set.
        if (this.velocity.y === 0) {
            if (this.velocity.x < 0) {
                this.rotateX = true;
                this.setAnimation(PlayerAnimations.RUN);
            } else if (this.velocity.x > 0) {
                this.rotateX = false;
                this.setAnimation(PlayerAnimations.RUN);
            } else {
                this.setAnimation(PlayerAnimations.IDLE);
            }
        } else if (this.velocity.y < 0) {
            this.setAnimation(PlayerAnimations.JUMP);
        } else {
            this.setAnimation(PlayerAnimations.FALL);
        }

        // Update animation.
        this.animationCounter += dt;
        if (this.animationCounter >= this.animationInterval) {
            if (dt > this.animationInterval) {
                this.animationCounter = 0;
            } else {
                this.animationCounter -= this.animationInterval;
            }
            // NOTE: Reseting to zero looses some of the dt. 
            // You may want to substract the interval instead.
            
            this.spriteX++;
            if (this.spriteX >= this.animation[1]) {
                if (this.animation === PlayerAnimations.JUMP) {
                    this.spriteX--;
                } else {
                    this.spriteX = 0;
                    this.handleAnimationEnd();
                }
            }
        }
    }

    handleAnimationEnd() {
        if (
            this.animation === PlayerAnimations.RUN ||
            this.animation === PlayerAnimations.FALL
        ) {
            return;
        } else {
            this.setAnimation(PlayerAnimations.IDLE);
        }
    }

    setAnimation(animation) {
        if (this.animation === animation) return;
        // This prevents updateVelocity from creating very
        // interesting animations to say the least.

        this.animation = animation;
        // TODO: Handle corrputed setAnimation() calls.

        this.spriteX = 0;
        this.spriteY = this.animation[0];
    }
}