import {Vector, Label, Actor, Scene} from "excalibur";
import { Resources } from "./resources.js";
import { Fonts } from "./fonts.js";
import {GameOverScreen} from "./gameOverScreen.js";

export class StartScreen extends GameOverScreen {


    engine;
    button;
    label;

    constructor() {
        super()

    }
    //same as gameover it will show this screen with text and a button, if the button is pressed it will start a
    //n event from the game itself
    onInitialize(Engine) {
        this.engine = Engine
        this.label = new Label({
            text: `This is Space Fighters!
To move in this game use WASD
Press space to shoot an enemy
And get the highest score!`,
            pos: new Vector(200, 200),
            font: this.spriteFont
        });


        this.button = new Actor({
            x: 240,
            y: 300,
            width: Resources.Start.width,
            height: Resources.Start.height
        })
        this.button.graphics.use(Resources.Start.toSprite())
        this.button.on('pointerup', () => {this.engine.startTheGame()})

        this.addChild(this.button);
        this.addChild(this.label);
    }



}