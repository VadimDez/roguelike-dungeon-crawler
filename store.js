/**
 * Created by Vadym Yatsyuk on 24/02/16
 */

import {createStore, combineReducers} from 'redux'

const player = (state = {}, action) => {
  return state
}

export default createStore(combineReducers({
  player
}))