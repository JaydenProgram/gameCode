import {ImageSource, Sound, Resource, Loader, Rectangle, SpriteSheet} from 'excalibur'
import projectile from '../images/mainShot.png'
import laser from '../images/laser.png'
import playerImage from '../images/player.png'
import planet from '../images/basicPlanet.png'
import meteor from '../images/basicMeteor.png'
import power from '../images/powerUp.png'
import enemyOne from '../images/enemyOne.png'
import enemyTwo from '../images/EnemyTwo.png'
import hitSound from '../sounds/bruh fire force sound effect.mp3'
import deadSound from '../sounds/deadSound.mp3'
import music from '../sounds/Grimes - Genesis (Instrumental).mp3'
import damaged from '../sounds/gethit.mp3'
import spriteSheet from '../images/explosionSprite.png'
import spriteFont from '../images/font.png'
import secondForm from '../images/attackMode.png'
import background from '../images/background.png'
import test from '../images/background-test.png'
import reset from '../images/retryButton.png'
import start from '../images/startButton.png'

const Resources = {
    Hood: new ImageSource(playerImage),
    secondForm: new ImageSource(secondForm),
    Projectile: new ImageSource(projectile),
    Laser: new ImageSource(laser),
    Planet: new ImageSource(planet),
    Meteor: new ImageSource(meteor),
    Power: new ImageSource(power),
    enemyOne: new ImageSource(enemyOne),
    enemyTwo: new ImageSource(enemyTwo),
    spriteSheet: new ImageSource(spriteSheet),
    background: new ImageSource(background),
    test: new ImageSource(test),
    reset: new ImageSource(reset),
    Start: new ImageSource(start),

    spriteFont: new ImageSource(spriteFont),

    hitSound: new Sound(hitSound),
    deadSound: new Sound(deadSound),
    music: new Sound(music),
    damage: new Sound(damaged)

}
const resourceArray = []
for (const key in Resources) {
    resourceArray.push(Resources[key])
}


const ResourceLoader = new Loader(resourceArray)
export { Resources, ResourceLoader }