/**
 * Created by Vadym Yatsyuk on 24/02/16
 */

import {createStore, combineReducers} from 'redux'
import map1 from './maps/map-1'
import Enemy from './Entities/Enemy'
import Weapon from './Entities/Weapon'
import Health from './Entities/Health'

const player = {
  health: 100,
  weapon: new Weapon('Hands', 5),
  experience: 0,
  maxExp: 10,
  level: 0
}

const game = (state = {map: map1.map, position: map1.startPosition, player: player}, action) => {

  if (action.type === 'MOVE_PLAYER_RIGHT') {
    return move(state, state.position.x + 1, state.position.y)
  }

  if (action.type === 'MOVE_PLAYER_LEFT') {
    return move(state, state.position.x - 1, state.position.y)
  }

  if (action.type === 'MOVE_PLAYER_UP') {
    return move(state, state.position.x, state.position.y - 1)
  }

  if (action.type === 'MOVE_PLAYER_DOWN') {
    return move(state, state.position.x, state.position.y + 1)
  }

  return state
}

/**
 * Move
 *
 * @param {object}  state
 * @param {int}     x
 * @param {int}     y
 * @returns {*}
 */
function move(state, x, y) {
  const block = state.map[y][x]
  let update
  let player

  // wall
  if (block === 1) {
    return state;
  }

  update = {
    position: {
      x,
      y
    }
  }

  // health
  if (block instanceof Health) {
    update.map = clearBlock(state.map, x, y)
    update.player = Object.assign({}, state.player, {
      health: state.player.health + block.value
    });
  }

  // weapon
  if (block instanceof Weapon) {
    update.map = clearBlock(state.map, x, y)
    update.player = Object.assign({}, state.player, {
      weapon: block
    });
  }

  // enemy
  if (block instanceof Enemy) {
    block.health -= (state.player.weapon.damage + state.player.level) * Math.floor(Math.random() + 2)
    player = {}

    if (block.health <= 0) {
      // remove enemy from map
      update.map = clearBlock(state.map, x, y)

      // increase xp
      player.experience = state.player.experience + block.level * 5

      // increase level
      if (state.player.maxExp < player.experience) {
        player.experience = player.experience - state.player.maxExp
        player.level = state.player.level + 1
        player.maxExp = state.player.maxExp * 2
      }

    } else {
      update = {
        map: state.map.slice(0)
      }
      // update enemy stats
      update.map[y][x] = block

      // update player health after enemy attacked
      player.health = state.player.health - block.attack()
    }

    // update player
    update.player = Object.assign({}, state.player, player)
  }

  return Object.assign({}, state, update)
}

/**
 * Clear map's block
 *
 * @param {Array} map
 * @param {int}   x
 * @param {int}   y
 * @returns {Array}
 */
function clearBlock(map, x, y) {
  let updated = map.slice(0)
  updated[y][x] = 0
  return updated
}

export default createStore(combineReducers({
  game
}))