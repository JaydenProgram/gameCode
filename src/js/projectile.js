import { Actor, Vector } from "excalibur";
import { Resources } from "./resources.js";

export class Projectile extends Actor  {


    constructor() {
        super();
        this.sprite = Resources.Projectile.toSprite();
        this.graphics.use(this.sprite);
        this.pos = new Vector(200, 700);
        this.scale = new Vector(1, 1)

        this.w = Resources.Projectile.width;
        this.h = Resources.Projectile.height;
    }





}