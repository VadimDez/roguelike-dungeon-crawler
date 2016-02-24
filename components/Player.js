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
    document.addEventListener('keyup', e => {
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
  }
  moveDown() {
  }
  moveLeft() {
  }
  moveRight() {
  }

  render() {
    return (
      <div>Player</div>
    )
  }
}

export default Player