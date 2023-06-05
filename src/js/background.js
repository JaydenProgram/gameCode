import { Actor, Vector, GraphicsGroup} from "excalibur";
import { Resources } from "./resources.js";

export class Background extends Actor{
    image

    constructor() {
        super()
        //use background image and anchor to center the background
        this.image = Resources.background.toSprite()
        this.anchor = new Vector(0, 0)

        //create a group of two to use after one another
        const group = new GraphicsGroup({
            members: [
                {
                    graphic: this.image,
                    pos: new Vector(0, 0)
                },
                {
                    graphic: this.image,
                    //changed to - the image height to change directions
                    pos: new Vector(0, -(this.image.height))
                }
            ]
        })
        //add the two from the group
        this.graphics.add(group)
        //add position from anchor to center and velocity to move up
        this.pos = new Vector(0, 0)
        this.vel = new Vector(0, 100)

    }

    onPostUpdate() {
        //if the Y position is higher than the image height
        if (-this.pos.y < -this.image.height) {
            //add it back to center
            this.pos = new Vector(0, 0);

        }

    }

}