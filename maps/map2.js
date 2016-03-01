/**
 * Created by vadimdez on 01/03/16.
 */
import Enemy from './../Entities/Enemy'
import {getRandomEmptyPointOnMap} from './../utils'

export default function () {
  let objects = [
    new Enemy(4, 100, true)
  ]
  return function () {
    let randomPoint
    let data = {
      startPosition: {
        x: 1,
        y: 1
      },
      map: [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1]
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