let PIXI = require('pixi.js');

let Sprite = PIXI.Sprite;

class Dange {
    constructor(container) {
        this.container = container;
        this.arrayH = new Array();
    }

    SetupGameArea(TextureGrass, WindowWidth, WindowHeight) {

        let posY = 0;
        for (let y = 0; y < WindowHeight / new Sprite(TextureGrass).height; y++) {
            let arrayW = new Array();
            let posX = 0;
            for (let x = 0; x < WindowWidth / new Sprite(TextureGrass).width; x++) {
                let grass = new Sprite(TextureGrass);
                if (x > 0) {
                    posX += grass.width;

                    grass.x = posX;
                    grass.y = posY;

                    arrayW.push(grass);

                    continue;
                }
                grass.x = posX;
                grass.y = posY;

                arrayW.push(grass);
            }

            posX = 0;
            posY += new Sprite(TextureGrass).height;

            this.arrayH.push(arrayW);
        }
    }

    Render() {
        for (let i = 0; i < this.arrayH.length; i++) {
            for (let j = 0; j < this.arrayH[i].length; j++) {
                this.container.addChild(this.arrayH[i][j]);
                //console.log(arrayH[i][j]);
            }
        }
    }
}

module.exports = Dange;