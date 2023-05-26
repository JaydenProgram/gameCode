import { Actor, Vector, CollisionType, Util } from "excalibur";
import { Resources, ResourceLoader } from "./resources.js";
import {Enemy} from "./enemy.js";

export class Projectile extends Actor  {
    game;

    constructor(x, y, dx, dy, colGroup, game) {
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
        this.body.group = colGroup;
    }


    onInitialize(engine) {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        this.on('collisionstart', (event) => this.onCollide(event));


        this.on('exitviewport', () => this.killProjectile());
    }

    onCollide(event) {

        if (!(event.other instanceof Projectile)) {
            this.killProjectile();
            this.game.score += 100;
            event.other.kill();
            event.other.explode();
        }
    }

    killProjectile() {
        this.kill();
    }





}