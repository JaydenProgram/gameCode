import { Actor, Engine, Vector, Color, Debug } from "excalibur";
import { Resources, ResourceLoader } from "./resources.js";
import { Hood } from "./hood.js";
import { Player } from "./player.js";


export class Game extends Engine {
    constructor() {
        super();
        this.showDebug(true);
        this.debug.motion = {
            accelerationColor: Color.Azure,
            showAcceleration: true,
            showAll: true,
            showVelocity: true,
            velocityColor: Color.Green,
        };
        this.start(ResourceLoader).then(() => this.startGame());
    }


    startGame() {
        this.add(new Player())
        for (let i = 0; i < 5; i++) {
            this.add(new Hood());
        }
    }
}

new Game();
