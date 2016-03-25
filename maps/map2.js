/**
 * Created by vadimdez on 01/03/16.
 */
import Enemy from './../Entities/Enemy'
import Health from './../Entities/Health'
import Weapon from './../Entities/Weapon'
import {getRandomEmptyPointOnMap} from './../utils'

export default function () {
  let objects = [
    new Enemy(4, 100, true),
    new Enemy(2, 100),
    new Health(50),
    new Health(20),
    new Weapon('Sword', 20)
  ]
  return function () {
    let randomPoint
    let data = {
      startPosition: {
        x: 1,
        y: 1
      },
      map: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      ]
    }

    // set objects on map
    objects.forEach(function (object) {
      randomPoint = getRandomEmptyPointOnMap(data.map)
      data.map[randomPoint.y][randomPoint.x] = object
    })

    return data;
  }
}