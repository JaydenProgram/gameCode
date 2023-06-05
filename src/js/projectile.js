import { Actor, Vector, CollisionType, Util } from "excalibur";
import { Resources, ResourceLoader } from "./resources.js";
import {Enemy} from "./enemy.js";

export class Projectile extends Actor  {
    //projectile actor for enemies and normal player
    game;
    isEnemy;
    //to see if it is an enemy projectile it is given with parameters again
    constructor(x, y, dx, dy, colGroup, game, isEnemy) {
        super({
            pos: new Vector(x, y),
            vel: new Vector(dx, dy),
            width: Resources.Projectile.width,
            height: Resources.Projectile.height
        });

        this.sprite = Resources.Projectile.toSprite();
        this.graphics.use(this.sprite);
        this.w = Resources.Projectile.width;
        this.h = Resources.Projectile.height;
        this.game = game;
        this.isEnemy = isEnemy;
        this.body.group = colGroup;
    }



    onInitialize(engine) {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        //collision events and viewport, viewport is used to see if it is out of frame and delete it
        this.on('collisionstart', (event) => this.onCollide(event));


        this.on('exitviewport', () => this.killProjectile());
    }

    onCollide(event) {
        //again it will check what it hits and if it hits something it will give points based of that
        if (!(event.other instanceof Projectile) && this.isEnemy === false) {
            this.killProjectile();
            if (this.game.enemy.planet === false) {
                this.game.score += 100;
            } else {
                this.game.score += 50;
                if (this.game.player.hp < 100) {
                    this.game.player.hp += 5;
                }

            }

            event.other.kill();
            event.other.explode();
        } else {

        }
    }





    //kill the own projectile
    killProjectile() {
        this.kill();
    }





}