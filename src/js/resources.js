import {ImageSource, Sound, Resource, Loader, Rectangle, SpriteSheet} from 'excalibur'
import projectile from '../images/mainShot.png'
import playerImage from '../images/player.png'
import planet from '../images/basicPlanet.png'
import enemyOne from '../images/enemyOne.png'
import enemyTwo from '../images/EnemyTwo.png'
import hitSound from '../sounds/bruh fire force sound effect.mp3'
import deadSound from '../sounds/deadSound.mp3'
import music from '../sounds/Grimes - Genesis (Instrumental).mp3'
import spriteSheet from '../images/explosionSprite.png'
import spriteFont from '../images/font.png'
import secondForm from '../images/attackMode.png'
import background from '../images/background.png'

const Resources = {
    Hood: new ImageSource(playerImage),
    secondForm: new ImageSource(secondForm),
    Projectile: new ImageSource(projectile),
    Planet: new ImageSource(planet),
    enemyOne: new ImageSource(enemyOne),
    enemyTwo: new ImageSource(enemyTwo),
    spriteSheet: new ImageSource(spriteSheet),
    background: new ImageSource(background),

    spriteFont: new ImageSource(spriteFont),

    hitSound: new Sound(hitSound),
    deadSound: new Sound(deadSound),
    music: new Sound(music)

}
const resourceArray = []
for (const key in Resources) {
    resourceArray.push(Resources[key])
}


const ResourceLoader = new Loader(resourceArray)
export { Resources, ResourceLoader }