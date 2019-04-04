let PIXI = require('pixi.js');

let Sprite = PIXI.Sprite;

class Player {
    constructor(container, Texture) {
        this.container = container;
        this.Texture = Texture;

    }

    Render() {
        this.player = new Sprite(this.Texture);
        this.player.position.set(24, 24);
        this.player.vx = 0;
        this.player.vy = 0;

        this.container.addChild(this.player);
    }


    Update(state, objKeygen) {

        this.state = state;

        objKeygen.left.press = () => {
            this.player.vx = -5;
            this.player.vy = 0;
        };
        objKeygen.left.release = () => {
            if (!objKeygen.right.isDown && this.player.vy === 0) {
                this.player.vx = 0;
            }
        };
        objKeygen.right.press = () => {
            this.player.vx = 5;
            this.player.vy = 0;
        };
        objKeygen.right.release = () => {
            if (!objKeygen.left.isDown && this.player.vy === 0) {
                this.player.vx = 0;
            }
        };

        objKeygen.up.press = () => {
            this.player.vy = -5;
            this.player.vx = 0;
        };
        objKeygen.up.release = () => {
            if (!objKeygen.down.isDown && this.player.vx === 0) {
                this.player.vy = 0;
            }
        };

        objKeygen.down.press = () => {
            this.player.vy = 5;
            this.player.vx = 0;
        };
        objKeygen.down.release = () => {
            if (!objKeygen.up.isDown && this.player.vx === 0) {
                this.player.vy = 0;
            }
        };

    }

    GamePlay(delta) {
        this.player.x += this.player.vx;
        this.player.y += this.player.vy;
    }

    gameLoop(delta) {
        this.state(delta);
    }


}


module.exports = Player;