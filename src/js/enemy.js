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
    //create group so enemies dont collide
    static group = CollisionGroupManager.create('enemy');
    //objects used to get game and player for use in enemy
    game;
    particles;
    player;
    shooter;
    planet;
    //constructor sends player for colliding, and uses types to create different enemies
    constructor(player, type, planet, shooter, b, e) {
        super({
            width: Resources.enemyOne.width,
            height: Resources.enemyOne.height
        });
        //basic particles, get color by parameters in constructor
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
        //use the parameters to fill the objects
        this.player = player;
        this.sprite = type;
        this.shooter = shooter;
        this.planet = planet;

        this.body.group = Enemy.group;

        // let sheet = SpriteSheet.fromImageSource({
        //     image: Resources.spriteSheet,
        //     grid: { rows: 3, columns: 5, spriteWidth: 627, spriteHeight: 627 }
        // })
        //
        // let explode = Animation.fromSpriteSheet(sheet, range(1, 14), 80);
        //
        // this.graphics.add("explode", explode);

    }

    onInitialize(engine) {
        //use engine as game
        this.game = engine;
        //add the particles in game
        this.game.add(this.particle);
        //create random for velocity
        this.rand = new Random();
        //create graphics and W / H
        this.graphics.use(this.sprite);
        this.w = Resources.enemyOne.width;
        this.h = Resources.enemyOne.height;
        //rotate images, because they come from the top
        this.rotation = Math.PI * 1;
        //random pos, whole width and top spawn point
        this.pos = new Vector(
            this.rand.integer(this.w, engine.drawWidth - this.w),
            0
        );
        //change velocity based of planet or enemy
        if (this.planet === false) {
            this.vel = new Vector(Math.random() * 80 - 40, Math.random() * 80  + 40);
        } else {
            this.vel = new Vector(0, Math.random() * 500  + 100);
        }



        // flip


        //this.angularVelocity = Math.random() + 0.2;
        //this.rotation = 12;




    }
    //use these post update for frames
    onPostUpdate(engine) {
        //random shoot speed for shooter enemies
        if(frame % 200 === 0) {
            this.enemyShooter();
            frame = 0;
        }
        //rotate the planets/meteors
        if (this.planet === true) {
            this.rotation += 0.05;
        }
        //particle needs to be at enemy location
        this.particle.pos = this.pos;
        //used to not go out of screen
        if (this.pos.x < 0 || this.pos.x + this.w > engine.drawWidth) {
            this.vel.x = -this.vel.x;

        }
        //if it hits the bottom it dies/ changes if its enemy or planet
        //planets don't to damage to player
        if (this.pos.y < 0 || this.pos.y + this.h > engine.drawHeight ) {
            this.kill();
            if (this.planet === false) {
                this.game.score -= 100;
                this.player.hp -= 10;
                this.player.actions.blink(300, 300, 3);
            }

            //game over for when hp or score is low
            if (this.player.hp === 0 || this.game.score < 0) {
                this.game.gameOver();
                console.log('gameover');
            }
        }
        //for random enemy shots
        frame++
    }

    //explode function, this happens when it is shot down or hit by player
    explode() {
        //emits
        this.particle.isEmitting = true;
        //timer is used to make the lenght of the particle
        this.timeAlive = new Timer({
            fcn: () => this.removeParticles(),
            repeats: false,
            interval: 200,
        })
        //play a sound when its broken
        this.game.add(this.timeAlive);
        this.timeAlive.start()
        Resources.deadSound.play(0.5);

    }
    //this is the function to make the shooters shoot
    enemyShooter() {
        //check if it is a shooter(from the parameters)
        if (this.shooter === true) {
            //if you are hit you make a sound
            Resources.hitSound.play(0.2);
            //the projectile needs to spawn at the enemy pos and needs to be an enemy shot
            let projectile = new Projectile(this.pos.x, this.pos.y - 1000, 0, 1000, Enemy.group, this.game, true);
            projectile.rotation = Math.PI * 1;
            this.game.add(projectile);

        }
    }

    //this removes particles after the amout of time
    removeParticles() {
        this.particle.isEmitting = false;
        this.particle.kill();
    }

}