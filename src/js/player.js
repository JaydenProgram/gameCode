import { Actor, Vector, Input, CollisionType, CollisionGroupManager } from "excalibur";
import { Resources } from "./resources.js";
import { Projectile } from "./projectile.js";
import {Enemy} from "./enemy.js";


export class Player extends Actor  {
    //different collision group, its used for the projectiles and the player itself
    static group = CollisionGroupManager.create('player');
    //getting the game, using Hp and flying for the animations
    game;
    hp = 100;
    flying;
    superProjectile = false;

    //only parameters used are location since its only a player
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: Resources.Hood.width,
            height: Resources.Hood.height

        });
        this.sprite = Resources.Hood.toSprite();
        this.graphics.use(this.sprite);
        //flying uses the different graphic
        this.flying = Resources.secondForm.toSprite();
        this.scale = new Vector(1, 1)
        this.body.group = Player.group;

    }

    //movement, uses WASD and changes the speed, when changing it also uses different graphics
    //rotation is also added when it goes left or right
    //idle animation is just the ship
    onPreUpdate(engine) {
        if (this.game.gameover === false && this.game.noRetry === false) {
            let xspeed = 0
            let yspeed = 0


            if (engine.input.keyboard.isHeld(Input.Keys.W) || engine.input.keyboard.isHeld(Input.Keys.Up)) {
                yspeed = -400
                this.graphics.use(this.flying);
            }

            if (engine.input.keyboard.isHeld(Input.Keys.S) || engine.input.keyboard.isHeld(Input.Keys.Down)) {
                yspeed = 400
                this.graphics.use(this.flying);
            }
            if (engine.input.keyboard.isHeld(Input.Keys.A)) {
                xspeed = -400
                this.rotation = Math.PI * -0.1;
                this.graphics.use(this.flying);
            }
            if (engine.input.keyboard.isHeld(Input.Keys.D)) {
                xspeed = 400
                this.rotation = Math.PI * 0.1;
                this.graphics.use(this.flying);
            }

            if (engine.input.keyboard.wasReleased(Input.Keys.W) || engine.input.keyboard.wasReleased(Input.Keys.Up)) {
                this.graphics.use(this.sprite);
            }

            if (engine.input.keyboard.wasReleased(Input.Keys.S) || engine.input.keyboard.wasReleased(Input.Keys.Down)) {
                this.graphics.use(this.sprite);
            }

            if (engine.input.keyboard.wasReleased(Input.Keys.A)) {
                this.rotation = 0;
                this.graphics.use(this.sprite);
            }
            if (engine.input.keyboard.wasReleased(Input.Keys.D)) {
                this.rotation = 0;
                this.graphics.use(this.sprite);
            }

            this.vel = new Vector(xspeed, yspeed)
            //this is used to fire projectiles
            //same as enemies, it spawns and checks what type of projectil it is
            if (engine.input.keyboard.wasPressed((Input.Keys.Space))) {
                Resources.hitSound.play(0.2);
                let projectile = new Projectile(this.pos.x, this.pos.y + 1000, 0, -1000, Player.group, this.game, false);
                engine.add(projectile);

            }
        }




    }

    onInitialize(engine) {
        //adding the collision events at the start of adding the player
        this.game = engine;
        this.on('collisionstart', (event) => this.getHit(event));

    }

    getHit(event) {
        //checks if it is an enemy
        //it deletes and adds points based off the kind of enemy
        if (!(event.other instanceof Player) && !(event.other instanceof Projectile)) {
            event.other.kill();
            event.other.explode();
            if (this.game.enemy.planet === false) {
                this.game.score += 100;
            } else {
                this.game.score += 50;
                if (this.hp < 100) {
                    this.hp += 5;
                }
            }
            if (this.game.enemy.planet === false) {
                this.hp -= 10;
                //if you are hit you will create an action
                this.actions.blink(300, 300, 2);
            }


        }

        //these are projectiles for the enemies and will hurt the player based on if you are hit
        if (event.other instanceof Projectile) {
            Resources.damage.play(0.5);
            event.other.kill();
            this.hp -= 10;
            this.actions.blink(300, 300, 2);
        }

        //game over event
        if (this.hp == 0 || this.game.score < 0) {
            this.game.gameOver();
            console.log('gameover');
        }
    }


}