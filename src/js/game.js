import {Actor, Engine, Vector, Color, Debug, Random, Timer, Label, SpriteSheet, SpriteFont, DisplayMode} from "excalibur";
import { Resources, ResourceLoader } from "./resources.js";
import { Enemy } from "./enemy.js";
import { Player } from "./player.js";
import { Background } from "./background.js";
import { GameOverScreen } from "./gameOverScreen.js";
import { Fonts } from "./fonts.js";
//making frames to spawn enemy's (want to change this using timer)
let frame = 0;
let randomFrame = Math.floor(Math.random() * 500 + 500);
let random = new Random(1337)

//make game extending as an engine
export class Game extends Engine {

    //adding all the objects i will use later
    gameover = false;
    score = 0;
    player;
    enemy;
    enemies = [];
    timer;
    statistics;
    statisticsTwo;
    spriteFont;
    backgroundMusic;
    background;
    gameOverScreen;

    //constructor, only used for super. Creating height etc.
    constructor() {
        super({
            backgroundColor: Color.Black,
            width: 800,
            height: 600
        });

        //start the recourceloader and then start the game.
        this.start(ResourceLoader).then(() => this.startGame());
    }

    onInitialize(engine) {
        this.game = engine;
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
}

    //spawning enemies using frames
    // onPostUpdate(engine) {
    //     //check if gameover
    //     if (this.gameover == false) {
    //         //create enemy object using new Enemy
    //         this.enemy = new Enemy(this.player, Resources.enemyTwo.toSprite());
    //         //if statement frames to spawn every random moment
    //         if (frame % randomFrame === 0) {
    //             //add the enemy to game
    //             this.add(this.enemy);
    //             // enemies.push(this.enemy)
    //             //make new randomframe for next enemy
    //             randomFrame = Math.floor(Math.random() * 500 + 500);
    //             //set frame back to 0
    //             frame = 0;
    //             console.log(randomFrame);
    //         }
    //         //frames every update(post)
    //         frame++
    //     }
    //
    //
    //
    //
    // }
    spawnEnemy() {
        if (this.gameover === false) {
            if (frame % 5 === 0) {
                this.enemy = new Enemy(this.player, Resources.enemyOne.toSprite(), false, Color.Red, Color.Blue);
                this.add(this.enemy);
                this.enemies.push(this.enemy);
            } else {
                this.enemy = new Enemy(this.player, Resources.enemyTwo.toSprite(), true, Color.Chartreuse, Color.Magenta);
                this.add(this.enemy);
                this.enemies.push(this.enemy);

            }

            frame++
        }

    }
    //starting game
    startGame() {
        //check if gameover (if false) start the game
        if (this.gameover == false) {
            //create and add moving background to the game
            this.background = new Background();
            this.add(this.background);
            //add background music to the game
            // this.backgroundMusic = Resources.music.play(0.05);

            this.backgroundMusic = Resources.music.play(0.05);
            this.backgroundMusic.loop = true;


            //create and add player to the game
            this.player = new Player(this.screen.drawWidth / 2, 500);
            this.add(this.player);


            this.timer = new Timer({
                fcn: () => this.spawnEnemy(),
                random,
                randomRange: [0, 1500],
                interval: 1500,
                repeats: true,
            })



            this.game.currentScene.add(this.timer)
            this.timer.start();

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

            //label for score
            this.statistics = new Label({
                //add text pos and font from spritesheet
                text: `Score:${Math.ceil(this.score)}`,
                pos: new Vector(5, 5),
                font: this.spriteFont
            });
            //add the label to the game
            this.add(this.statistics);


            //label for HP
            this.statisticsTwo = new Label({
                //add text pos and font again
                text: `HP:${Math.ceil(this.player.hp)}`,
                pos: new Vector(5, 25),
                font: this.spriteFont
            });
            //add to the game
            this.add(this.statisticsTwo);
        }




    }

    //if gameover == true
    gameOver() {
        this.gameover = true;
        if (this.gameover === true) {
            this.enemies.forEach((enemy) => {
                this.remove(enemy);
            });



            //stop all player movements, rotation, and graphics
            this.player.vel.x = 0;
            this.player.vel.y = 0;
            this.player.rotation = 0;
            this.player.graphics.use(this.player.sprite);
            this.player.actions.clearActions();

            //stop background and add gameoverscreen
            this.background.vel.y = 0;
            this.gameOverScreen = new GameOverScreen(this.score, this)
            this.add(this.gameOverScreen)
            //set score to 0
            this.score = 0;
        }


    }

    resetGame() {
        this.gameover = false;
        if (this.gameover === false) {
            this.remove(this.gameOverScreen);
            this.player.pos = new Vector(this.screen.drawWidth / 2, 500);
            this.player.hp = 100;
            this.background.vel.y = 100;
        }

    }


    //use this to refill the points and hp counter
    onPostDraw() {
        this.statistics.text = `Score:${Math.ceil(this.score)}`
        this.statisticsTwo.text = `HP:${Math.ceil(this.player.hp)}`
    }

}

new Game();
