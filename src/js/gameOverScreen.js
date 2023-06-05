import {Vector, Label, Actor, CollisionType} from "excalibur";
import { Resources } from "./resources.js";
import { Fonts } from "./fonts.js";
//extending as a Font so i can use my fonts, i can use everthing from the Font class this way
export class GameOverScreen extends Fonts {
    //gameover screen needs score game button and label
    score;
    engine;
    button;
    label;

    constructor(score) {
        super()
        //score is given with the parameter
        this.score = score
    }

    onInitialize(Engine) {
        this.engine = Engine
        //create the whole label
        //this also saves everything in localstorage
        this.label = new Label({
            text: `Game Over. Your score was:
    ${Math.ceil(this.score)}`,
            pos: new Vector(250, 80),
            font: this.spriteFont
        });
        //check if there is a highscore already so it can show a different message
        //if there is one itll show the highscore and score now
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
        //this button is the reset button, this will start the resetGame() function
        //this function is from the game so it uses this.engine
        this.button = new Actor({
            //it is placed under the text
            x: 290,
            y: 180,
            width: Resources.reset.width,
            height: Resources.reset.height,
            //it needs collisionType since its an actor, otherwise you will get an error when the player hits it!
            collisionType: CollisionType.PreventCollision
        })
        this.button.graphics.use(Resources.reset.toSprite())
        this.button.on('pointerup', () => {this.engine.resetGame()})

        //add to the game
        this.addChild(this.button);
        this.addChild(this.label);
    }



}