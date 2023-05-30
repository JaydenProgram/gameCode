import {
    Actor,
    Vector,
    Color,
    Engine,
    Random,
    CollisionType,
    CollisionGroupManager,
    ParticleEmitter,
    EmitterType,
    Timer,
    SpriteSheet,
    range,
    Animation,
    Input
} from "excalibur";
import { Resources } from "./resources";
import { Projectile } from "./projectile.js";
import { Player } from "./player.js";

let frame = 0;


export class Enemy extends Actor {
    static group = CollisionGroupManager.create('enemy');
    game;
    particles;
    player;
    shooter;
    constructor(player, type, shooter, b, e) {
        super({
            width: Resources.enemyOne.width,
            height: Resources.enemyOne.height
        });
        this.particle = new ParticleEmitter({
            emitterType: EmitterType.Rectangle,
            radius: 5,
            minVel: 100,
            maxVel: 200,
            minAngle: 0,
            maxAngle: Math.PI * 2,
            emitRate: 1000,
            opacity: 1,
            fadeFlag: true,
            particleLife: 1000,
            maxSize: 5,
            minSize: 1,
            beginColor: b,
            endColor: e,
            isEmitting: false
        })
        this.player = player;
        this.sprite = type;
        this.shooter = shooter;
        this.body.group = Enemy.group;
        let sheet = SpriteSheet.fromImageSource({
            image: Resources.spriteSheet,
            grid: { rows: 3, columns: 5, spriteWidth: 627, spriteHeight: 627 }
        })

        let explode = Animation.fromSpriteSheet(sheet, range(1, 14), 80);

        this.graphics.add("explode", explode);

    }

    onInitialize(engine) {
        this.game = engine;
        this.game.add(this.particle);

        this.rand = new Random();
        this.graphics.use(this.sprite);
        this.w = Resources.enemyOne.width;
        this.h = Resources.enemyOne.height;
        this.rotation = Math.PI * 1;
        this.pos = new Vector(
            this.rand.integer(this.w, engine.drawWidth - this.w),
            0
        );
        this.vel = new Vector(Math.random() * 80 - 40, Math.random() * 80  + 40);
        // flip


        //this.angularVelocity = Math.random() + 0.2;
        //this.rotation = 12;




    }
    onPostUpdate(engine) {
        if(frame % 200 === 0) {
            this.enemyShooter();
            frame = 0;
        }

        this.particle.pos = this.pos;
        if (this.pos.x < 0 || this.pos.x + this.w > engine.drawWidth) {
            this.vel.x = -this.vel.x;

        }
        if (this.pos.y < 0 || this.pos.y + this.h > engine.drawHeight ) {
            this.kill();
            this.game.score -= 100;
            this.player.hp -= 10;
            this.player.actions.blink(300, 300, 3);

            if (this.player.hp == 0 || this.game.score < 0) {
                this.game.gameOver();
                console.log('gameover');
            }
        }
        frame++
    }


    explode() {
        this.particle.isEmitting = true;
        this.timeAlive = new Timer({
            fcn: () => this.removeParticles(),
            repeats: false,
            interval: 200,
        })
        this.game.add(this.timeAlive);
        this.timeAlive.start()
        Resources.deadSound.play();

    }

    enemyShooter() {
        if (this.shooter === true) {

            Resources.hitSound.play(0.3);
            let projectile = new Projectile(this.pos.x, this.pos.y - 1000, 0, 1000, Enemy.group, this.game, true);
            projectile.rotation = Math.PI * 1;
            this.game.add(projectile);
            console.log('thisisshooter');
        }
    }

    removeParticles() {
        this.particle.isEmitting = false;
        this.particle.kill();
    }

}