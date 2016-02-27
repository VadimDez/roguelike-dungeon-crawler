/**
 * Created by Vadym Yatsyuk on 24/02/16
 */

import {createStore, combineReducers} from 'redux'
import map1 from './maps/map-1'

const player = (state = {}, action) => {
  return state
}

const game = (state = {map: map1.map, position: map1.startPosition, player: {health: 100}}, action) => {

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

  if (block === 2) { // health
    update.map = state.map.slice(0)
    update.map[y][x] = 0
    update.player = {health: state.player.health + 20}
  }

  return Object.assign({}, state, update)
}

export default createStore(combineReducers({
  player,
  game
}))