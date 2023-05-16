import {ImageSource, Sound, Resource, Loader, Rectangle} from 'excalibur'
import projectile from '../images/mainShot.png'
import playerImage from '../images/player.png'

const Resources = {
    Hood: new ImageSource(playerImage),
    Projectile: new ImageSource(projectile)

}
const ResourceLoader = new Loader([Resources.Hood, Resources.Projectile])

export { Resources, ResourceLoader }