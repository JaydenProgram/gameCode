import { Actor, Vector, Input } from "excalibur";
import { Resources } from "./resources.js";

export class Player extends Actor  {


    constructor() {
        super();
        this.sprite = Resources.Hood.toSprite();
        this.graphics.use(this.sprite);
        this.pos = new Vector(100, 500);
        this.scale = new Vector(1, 1)

        this.w = Resources.Hood.width;
        this.h = Resources.Hood.height;

    }

    onPreUpdate(engine) {
        let xspeed = 0
        let yspeed = 0
        if (engine.input.keyboard.isHeld(Input.Keys.W) || engine.input.keyboard.isHeld(Input.Keys.Up)) {
            yspeed = -300
            this.rotation = Math.PI * 0;
        }


        if (engine.input.keyboard.isHeld(Input.Keys.S) || engine.input.keyboard.isHeld(Input.Keys.Down)) {
            yspeed = 300
            this.rotation = Math.PI * 1;
        }
        if (engine.input.keyboard.isHeld(Input.Keys.A) || engine.input.keyboard.isHeld(Input.Keys.Left)) {
            xspeed = -300
            this.rotation = Math.PI * -0.5;
        }
        if (engine.input.keyboard.isHeld(Input.Keys.D) || engine.input.keyboard.isHeld(Input.Keys.Right)) {
            xspeed = 300
            this.rotation = Math.PI * 0.5;
        }
        this.vel = new Vector(xspeed, yspeed)
    }

    


}