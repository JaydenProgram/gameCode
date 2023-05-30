import { Actor, Vector, Input, CollisionType, CollisionGroupManager } from "excalibur";
import { Resources } from "./resources.js";
import { Projectile } from "./projectile.js";
import {Enemy} from "./enemy.js";

export class Player extends Actor  {
    static group = CollisionGroupManager.create('player');
    game;
    hp = 100;
    flying;

    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: Resources.Hood.width,
            height: Resources.Hood.height
        });
        this.sprite = Resources.Hood.toSprite();
        this.graphics.use(this.sprite);

        this.flying = Resources.secondForm.toSprite();

        this.scale = new Vector(1, 1)
        this.body.group = Player.group;

    }

    onPreUpdate(engine) {
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

        if (engine.input.keyboard.wasPressed((Input.Keys.Space))) {
            Resources.hitSound.play(0.3);
            let projectile = new Projectile(this.pos.x, this.pos.y + 1000, 0, -1000, Player.group, this.game, false);

            engine.add(projectile);



        }



    }

    onInitialize(engine) {
        this.game = engine;
        this.on('collisionstart', (event) => this.getHit(event));

    }

    getHit(event) {
        if (!(event.other instanceof Player) && !(event.other instanceof Projectile)) {
            event.other.kill();
            event.other.explode();
            this.game.score += 100;
            this.hp -= 10;
            this.actions.blink(300, 300, 2);
        }

        if (event.other instanceof Projectile) {
            this.hp -= 10;
            this.actions.blink(300, 300, 2);
        }


        if (!(event.other instanceof Player) && this.hp == 0 || this.game.score < 0) {
            this.game.gameOver();
            console.log('gameover');
        }
    }


}