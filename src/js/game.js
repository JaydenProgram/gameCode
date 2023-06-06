import {Actor, Engine, Vector, Color, Debug, Random, Timer, Label, SpriteSheet, SpriteFont, DisplayMode} from "excalibur";
import { Resources, ResourceLoader } from "./resources.js";
import { Enemy } from "./enemy.js";
import { Player } from "./player.js";
import { Background } from "./background.js";
import { GameOverScreen } from "./gameOverScreen.js";
import { Fonts } from "./fonts.js";
import {StartScreen} from "./startScreen.js";
//making frames to spawn enemy's (want to change this using timer)
let frame = 0;
let randomFrame = Math.floor(Math.random() * 500 + 500);
let random = new Random(1337)

//make game extending as an engine
export class Game extends Engine {

    //adding all the objects i will use later
    gameover = false;
    noRetry = true;
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
    startScreen;
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
        //creating the this.game for easier use
        this.game = engine;
}



    //all these are different type of enemies, they use different spawn rates and different types of sprites
    //they all get pushed to the array, used to delete after gameOver
    spawnEnemy() {
        if (this.gameover === false && this.noRetry === false) {
            if (frame % 8 === 0) {
                this.enemy = new Enemy(this.player, Resources.Planet.toSprite(), true, false, Color.Orange, Color.Black);
                this.add(this.enemy);
                this.enemies.push(this.enemy);
            } else if (frame % 10 === 0) {
                this.enemy = new Enemy(this.player, Resources.Meteor.toSprite(), true, false, Color.Gray, Color.Black);
                this.add(this.enemy);
                this.enemies.push(this.enemy);
            } else if (frame % 5 === 0) {
                this.enemy = new Enemy(this.player, Resources.enemyOne.toSprite(), false, false, Color.Red, Color.Blue);
                this.add(this.enemy);
                this.enemies.push(this.enemy);
            } else {
                this.enemy = new Enemy(this.player, Resources.enemyTwo.toSprite(), false, true, Color.Chartreuse, Color.Magenta);
                this.add(this.enemy);
                this.enemies.push(this.enemy);
            }

            frame++
        }

    }
    //starting game
    startGame() {
        //check if gameover (if false) start the game
        if (this.gameover === false) {


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

            //this timer is used for spawning enemies at different rates, the interval is how fast they spawn
            this.timer = new Timer({
                fcn: () => this.spawnEnemy(),
                random,
                randomRange: [0, 1000],
                interval: 1000,
                repeats: true,
            })


            //used to add the timer to the game
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

            //use this to make the first start screen
            if (this.noRetry === true) {
                this.realStart();
            }

        }




    }

    //if gameover == true
    gameOver() {
        this.gameover = true;
        if (this.gameover === true) {
            //delete all enemies on screen using the lenght of the enemies.array
            this.enemies.forEach((enemy) => {
                this.remove(enemy);

            });
            //delete everything from the array
            this.enemies.splice(0, this.enemies.length);
            console.log(this.enemies);

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

    realStart() {
        //show the start screen with a start button
        this.startScreen = new StartScreen();
        this.add(this.startScreen);

        //stop the background from moving
        this.background.vel.y = 0;


    }
    //this is if you press the startbutton on startscreen
    startTheGame() {
        //it will stop showing the start screen untill you reset your browser
        this.noRetry = false;
        if (this.noRetry === false) {
            //it will also start the background and everything else
            this.remove(this.startScreen);
            this.background.vel.y = 100;

        }

    }

    resetGame() {
        //is used when retry button is pressed
        //it will delete the gameover screen and start spawning everything again, using gameover === false;
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
