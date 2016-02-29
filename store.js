/**
 * Created by Vadym Yatsyuk on 24/02/16
 */

import {createStore, combineReducers} from 'redux'
import map1 from './maps/map-1'
import Enemy from './Entities/Enemy'
import Weapon from './Entities/Weapon'
import Health from './Entities/Health'
import Teleport from './Entities/Teleport'
import {getRandomEmptyPointOnMap} from './utils'

let dataMap = reset()
const player = {
  health: 100,
  weapon: new Weapon('Hands', 5),
  experience: 0,
  maxExp: 10,
  level: 0
}

const game = (state = {map: dataMap.map, position: dataMap.startPosition, player: player}, action) => {

  if (action.type === 'UPDATE_PLAYER_POSITION') {
    return Object.assign({}, state, {
      position: action.position
    })
  }

  if (action.type === 'UPDATE_MAP_CLEAR') {
    let map = state.map.slice(0)
    map[action.position.y][action.position.x] = 0
    return Object.assign({}, state, {
      map: map
    })
  }

  if (action.type === 'UPDATE_PLAYER_HEALTH') {
    return Object.assign({}, state, {
      player: Object.assign({}, state.player, {
        health: action.health
      })
    })
  }

  if (action.type === 'UPDATE_PLAYER_WEAPON') {
    return Object.assign({}, state, {
      player: Object.assign({}, state.player, {
        weapon: action.weapon
      })
    })
  }

  if (action.type === 'UPDATE_PLAYER_EXPERIENCE') {
    return Object.assign({}, state, {
      player: Object.assign({}, state.player, {
        experience: action.experience
      })
    })
  }

  if (action.type === 'UPDATE_PLAYER_LEVEL') {
    return Object.assign({}, state, {
      player: Object.assign({}, state.player, {
        level: action.level
      })
    })
  }

  if (action.type === 'UPDATE_PLAYER_MAX_EXPERIENCE') {
    return Object.assign({}, state, {
      player: Object.assign({}, state.player, {
        maxExp: action.maxExp
      })
    })
  }

  if (action.type === 'UPDATE_MAP_BLOCK') {
    let map = state.map.slice(0)
    map[action.position.y][action.position.x] = action.block
    return Object.assign({}, state, {
      map: map
    })
  }


  if (action.type === 'UPDATE_MAP_RESET') {
    const data = reset()
    const newState = Object.assign({}, state, {map: []})
    return Object.assign({}, newState, {
      map: data.map,
      position: data.startPosition
    });
  }

  return state
}

/**
 * Reset state
 * @returns {{map: Array, position: (data.startPosition|{x, y}), player: {health: number, weapon: Weapon, experience: number, maxExp: number, level: number}}}
 */
function reset() {
  var objects = [
    new Enemy(1, 30),
    new Enemy(1, 40),
    new Enemy(2, 50),
    new Enemy(3, 60),
    new Enemy(4, 100, true),
    new Weapon('Knife', 10),
    new Health(),
    new Teleport()
  ];
  let randomPoint
  let data = Object.assign({map: []}, map1);

  // set objects on map
  objects.forEach(function (object) {
    randomPoint = getRandomEmptyPointOnMap(data.map)
    data.map[randomPoint.y][randomPoint.x] = object
  })

  return data
}

export default createStore(combineReducers({
  game
}))