import { Actor, Vector, Engine, Random } from "excalibur";
import { Resources } from "./resources";

export class Hood extends Actor {
    onInitialize(engine) {
        this.anchor = new Vector(0, 0);
        this.rand = new Random();
        this.sprite = Resources.Projectile.toSprite();
        this.graphics.use(this.sprite);
        this.w = Resources.Projectile.width;
        this.h = Resources.Projectile.height;
        this.pos = new Vector(
            this.rand.integer(this.w, engine.drawWidth - this.w),
            this.rand.integer(this.h, engine.drawHeight - this.h)
        );
        this.vel = new Vector(Math.random() * 80 - 40, Math.random() * 80 - 40);
        // flip
        this.scale = new Vector(-1, 1);
        this.anchor = new Vector(1, 0);
        //this.angularVelocity = Math.random() + 0.2;
        //this.rotation = 12;

    }

    onPostUpdate(engine) {
        if (this.pos.x < 0 || this.pos.x + this.w > engine.drawWidth) {
            this.vel.x = -this.vel.x;
        }
        if (this.pos.y < 0 || this.pos.y + this.h > engine.drawHeight ) {
            this.vel.y = -this.vel.y;
        }
    }
}