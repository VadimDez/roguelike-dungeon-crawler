/**
 * Created by Vadym Yatsyuk on 24/02/16
 */

import {createStore, combineReducers} from 'redux'
import map1 from './maps/map-1'

const player = (state = {}, action) => {
  return state
}

const game = (state = {map: map1.map, position: map1.startPosition}, action) => {

  if (action.type === 'MOVE_PLAYER_RIGHT' && state.map[state.position.x + 1][state.position.y] === 0) {
    return Object.assign({}, state, {
      position: {
        x: state.position.x + 1,
        y: state.position.y
      }
    })
  }

  if (action.type === 'MOVE_PLAYER_LEFT' && state.map[state.position.x - 1][state.position.y] === 0) {
    return Object.assign({}, state, {
      position: {
        x: state.position.x - 1,
        y: state.position.y
      }
    })
  }

  if (action.type === 'MOVE_PLAYER_UP' && state.map[state.position.x][state.position.y - 1] === 0) {
    return Object.assign({}, state, {
      position: {
        x: state.position.x,
        y: state.position.y - 1
      }
    })
  }

  if (action.type === 'MOVE_PLAYER_DOWN' && state.map[state.position.x][state.position.y + 1] === 0) {

    return Object.assign({}, state, {
      position: {
        x: state.position.x,
        y: state.position.y + 1
      }
    })
  }

  return state
}

export default createStore(combineReducers({
  player,
  game
}))