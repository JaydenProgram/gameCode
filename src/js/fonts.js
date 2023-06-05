import { SpriteSheet, SpriteFont, ScreenElement } from "excalibur";
import { Resources } from "./resources.js";


export class Fonts extends ScreenElement {

    spriteFont;

    constructor() {
        super({
            z: 0
        })
        this.z =  0

        //create my spritefontsheet using a sprite sheet from internet
        const spriteFontSheet = SpriteSheet.fromImageSource({
            image: Resources.spriteFont,
            grid: {
                rows: 4,
                columns: 12,
                spriteWidth: 16,
                spriteHeight: 16,
            },
        })

        //creating every letter and number that im going to use
        this.spriteFont = new SpriteFont({
            alphabet: '0123456789: ABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%+-*/=.',
            caseInsensitive: true,
            //using spritesheet from before
            spriteSheet: spriteFontSheet,
            spacing: 0,
        })
    }
}