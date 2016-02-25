/**
 * Created by Vadym Yatsyuk on 24/02/16
 */
import React from 'react'

class Player extends React.Component {
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
      <span>P</span>
    )
  }
}

Player.contextTypes = {
  store: React.PropTypes.object
}

export default Player