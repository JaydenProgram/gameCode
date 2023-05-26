import {Actor, Engine, Vector, Color, Debug, Timer, Label, SpriteSheet, SpriteFont, DisplayMode} from "excalibur";
import { Resources, ResourceLoader } from "./resources.js";
import { Enemy } from "./enemy.js";
import { Player } from "./player.js";
import { Background } from "./background.js";

let frame = 0;
let randomFrame = Math.floor(Math.random() * 500 + 500);

export class Game extends Engine {

    gameover = false;
    score = 0;
    player;
    enemy;
    statistics;
    spriteFont;
    backgroundMusic;
    background;

    constructor() {
        super({
            backgroundColor: Color.Black,
            width: 800,
            height: 600
        });


        this.start(ResourceLoader).then(() => this.startGame());
    }

    // onInitialize(engine) {
    //
    //     const timer = new Timer({
    //         fcn: () => this.spawnEnemy(),
    //         repeats: true,
    //         interval: 500,
    //     })
    //     engine.currentScene.add(timer);
    //     timer.start();
    // }
    //
    // spawnEnemy() {
    //     this.add(this.enemy);
    //     console.log()
    // }

    onPostUpdate(engine) {
        this.enemy = new Enemy(this);
        if (frame % randomFrame === 0) {
            this.add(this.enemy);

            randomFrame = Math.floor(Math.random() * 500 + 500);
            frame = 0;
            console.log(randomFrame);
        }
        frame++


    }

    startGame() {
        this.background = new Background();
        this.add(this.background);
        this.backgroundMusic = Resources.music.play(0.05);

        this.player = new Player(20, 100, this);

        this.add(this.player);


        const spriteFontSheet = SpriteSheet.fromImageSource({
            image: Resources.spriteFont,
            grid: {
                rows: 4,
                columns: 12,
                spriteWidth: 16,
                spriteHeight: 16,
            },
        })


        this.spriteFont = new SpriteFont({
            alphabet: '0123456789: ABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%+-*/=.',
            caseInsensitive: true,
            spriteSheet: spriteFontSheet,
            spacing: 0,
        })


        this.statistics = new Label({
            text: `Score:${Math.ceil(this.score)}`,
            pos: new Vector(5, 5),
            font: this.spriteFont
        });
        this.add(this.statistics);



    }


    gameOver() {
        this.gameover = true;
        this.score = 0;
        this.input.keyboard.off("press");
        this.input.keyboard.off("release");
    }

    onPostDraw() {
        if (this.gameover == false) {
            this.statistics.text = `Score:${Math.ceil(this.score)}`
        }
    }

}

new Game();
