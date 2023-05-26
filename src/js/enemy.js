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
    range, Animation
} from "excalibur";
import { Resources } from "./resources";
import { Projectile } from "./projectile.js";


export class Enemy extends Actor {
    game;
    particles;
    constructor(game) {
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
            maxSize: 10,
            minSize: 1,
            particleColor: Color.Rose,
            isEmitting: false
        })
        this.game = game;


        let sheet = SpriteSheet.fromImageSource({
            image: Resources.spriteSheet,
            grid: { rows: 3, columns: 5, spriteWidth: 627, spriteHeight: 627 }
        })

        let explode = Animation.fromSpriteSheet(sheet, range(1, 14), 80);

        this.graphics.add("explode", explode);

    }

    onInitialize(engine) {
        this.game.add(this.particle);

        this.rand = new Random();
        this.sprite = Resources.enemyOne.toSprite();
        this.graphics.use(this.sprite);
        this.w = Resources.enemyOne.width;
        this.h = Resources.enemyOne.height;
        this.pos = new Vector(
            this.rand.integer(this.w, engine.drawWidth - this.w),
            25
        );
        this.vel = new Vector(Math.random() * 80 - 40, Math.random() * 80  + 40);
        // flip


        //this.angularVelocity = Math.random() + 0.2;
        //this.rotation = 12;




    }
    // onPostUpdate(engine) {
    //     if (this.pos.x < 0 || this.pos.x + this.w > engine.drawWidth) {
    //         this.vel.x = -this.vel.x;
    //     }
    //     if (this.pos.y < 0 || this.pos.y + this.h > engine.drawHeight ) {
    //         this.kill();
    //     }
    // }

    update() {
        this.particle.pos = this.pos;
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

    removeParticles() {
        this.particle.isEmitting = false;
        this.particle.kill();
    }

}