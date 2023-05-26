import { Actor, Vector, GraphicsGroup} from "excalibur";
import { Resources } from "./resources.js";

export class Background extends Actor{
    image

    constructor() {
        super()

        this.image = Resources.background.toSprite()
        this.anchor = new Vector(0, 0)

        const group = new GraphicsGroup({
            members: [
                {
                    graphic: this.image,
                    pos: new Vector(0, 0)
                },
                {
                    graphic: this.image,
                    pos: new Vector(0, this.image.height)
                }
            ]
        })

        this.graphics.add(group)
        this.pos = new Vector(0, 0)
        this.vel = new Vector(0, -100)

    }

    onPostUpdate() {
        if (this.pos.y < -this.image.height) {
            this.pos = new Vector(0, 0);
        }

    }

}