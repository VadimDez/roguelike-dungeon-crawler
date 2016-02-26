/**
 * Created by Vadym Yatsyuk on 19/02/16
 */

import React from 'react';
import StatusBar from './StatusBar'
import Map from './Map'

class Game extends React.Component {
  constructor() {
    super()

    this.actions()
  }

  actions() {
    window.addEventListener('keyup', e => {
      switch (e.which) {
        case 37:
          this.moveLeft()
          break;
        case 38:
          this.moveUp()
          break;
        case 39:
          this.moveRight()
          break;
        case 40:
          this.moveDown()
          break;
      }
    })
  }

  moveUp() {
    this.move('MOVE_PLAYER_UP')
  }
  moveDown() {
    this.move('MOVE_PLAYER_DOWN')
  }
  moveLeft() {
    this.move('MOVE_PLAYER_LEFT')
  }
  moveRight() {
    this.move('MOVE_PLAYER_RIGHT')
  }

  move(type) {
    this.context.store.dispatch({
      type
    })
  }

  render() {
    return (
      <div>
        <StatusBar />
        <Map />
      </div>
    )
  }
}

Game.contextTypes = {
  store: React.PropTypes.object
}

export default Game