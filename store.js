/**
 * Created by Vadym Yatsyuk on 24/02/16
 */

import {createStore, combineReducers} from 'redux'
import map1 from './maps/map-1'

const player = (state = {}, action) => {
  return state
}

const game = (state = {map: map1.map, position: map1.startPosition, player: {health: 100, weapon: 'weapon1'}}, action) => {

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

function move(state, x, y) {
  const block = state.map[y][x]
  let update

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
  if (block === 2) {
    update.map = clearBlock(state.map, x, y)
    update.player = Object.assign({}, state.player, {
      health: state.player.health + 20
    });
  }

  // weapon
  if (block === 3) {
    update.map = clearBlock(state.map, x, y)
    update.player = Object.assign({}, state.player, {
      weapon: 'weapon2'
    });
  }

  return Object.assign({}, state, update)
}

function clearBlock(map, x, y) {
  let updated = map.slice(0)
  updated[y][x] = 0
  return updated
}

export default createStore(combineReducers({
  player,
  game
}))