let PIXI = require('pixi.js');
let Dange = require('./GameLevel/Location/dange');
let Player = require('./Character/Player/player');


let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle;

let WindowWidth = window.innerWidth / 1.02,
    WindowHeight = window.innerHeight / 1.04;

let app = new Application({
    width: WindowWidth,
    height: WindowHeight,
    antialias: true,
    transparent: false,
    resolution: 1
});

let state;
let PlayerObj;
let GameContainer;


document.body.appendChild(app.view);
loader
    .add('public/assets/tiles/TextureMap.json')
    .load(setup);

function setup() {
    GameContainer = new Container();


    let TextureGrass = TextureCache['tile_01.png'];
    let TexturePlayer = TextureCache['soldier1_gun.png'];

    let DangeObj = new Dange(GameContainer);
    DangeObj.SetupGameArea(TextureGrass, WindowWidth, WindowHeight);
    DangeObj.Render();

    PlayerObj = new Player(GameContainer, TexturePlayer);
    PlayerObj.Render();

    app.stage.addChild(GameContainer);

    let keys = {
        left: keyboard("a") ,
        right: keyboard("d"),
        up: keyboard("w"),
        down: keyboard('s')
    };


    state = play;
    PlayerObj.Update(state, keys);

    app.ticker.add(delta => gameLoop(delta))
}

function gameLoop(delta) {
    PlayerObj.gameLoop(delta);
}

function play(delta) {
    PlayerObj.GamePlay(delta);
}

function keyboard(value) {
    let key = {
        value: value,
        isDown: false,
        isUp: true,
        press: undefined,
        release: undefined
    };

    key.downHandler = event => {
        if (event.key === key.value) {
            if (key.isUp && key.press)
                key.press();
            key.isDown = true;
            key.isUp = false;
            event.preventDefault();
        }
    };

    key.upHandler = event => {
        if (event.key === key.value) {
            if (key.isDown && key.press)
                key.release();
            key.isDown = false;
            key.isUp = true;
            event.preventDefault();
        }
    };

    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);

    window.addEventListener('keydown', downListener, false);
    window.addEventListener('keyup', upListener, false);

    key.unsubscribe = () => {
        window.removeEventListener("keydown", downListener);
        window.removeEventListener("keyup", upListener);
    };

    return key;
}
