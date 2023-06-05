import { Vector, Label, Actor } from "excalibur";
import { Resources } from "./resources.js";
import { Fonts } from "./fonts.js";

export class GameOverScreen extends Fonts {

    score;
    engine;
    button;
    label;

    constructor(score) {
        super()
        this.score = score
    }

    onInitialize(Engine) {
        this.engine = Engine
        this.label = new Label({
            text: `Game Over. Your score was:
    ${Math.ceil(this.score)}`,
            pos: new Vector(250, 80),
            font: this.spriteFont
        });
        if (localStorage.getItem('highscore')){
            if (Math.ceil(this.score) > localStorage.getItem('highscore')) {
                localStorage.setItem('highscore', Math.ceil(this.score));
            }
            this.label.text = `Highscore:
${localStorage.getItem('highscore')}
    
Your score:
${Math.ceil(this.score)}`;
        } else {
            localStorage.setItem('highscore', Math.ceil(this.score));
        }

        this.button = new Actor({
            x: 290,
            y: 180,
            width: Resources.reset.width,
            height: Resources.reset.height
        })
        this.button.graphics.use(Resources.reset.toSprite())
        this.button.on('pointerup', () => {this.engine.resetGame()})

        this.addChild(this.button);
        this.addChild(this.label);
    }



}