/**
 * Created by Vadym Yatsyuk on 19/02/16
 */

import React from 'react';
import StatusBar from './StatusBar'
import Map from './Map'
import Health from './../Entities/Health'
import Weapon from './../Entities/Weapon'
import Enemy from './../Entities/Enemy'
import Teleport from './../Entities/Teleport'
import map1 from './../maps/map1'

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
    this.move(this.context.store.getState().game.position.x, this.context.store.getState().game.position.y - 1)
  }
  moveDown() {
    this.move(this.context.store.getState().game.position.x, this.context.store.getState().game.position.y + 1)
  }
  moveLeft() {
    this.move(this.context.store.getState().game.position.x - 1, this.context.store.getState().game.position.y)
  }
  moveRight() {
    this.move(this.context.store.getState().game.position.x + 1, this.context.store.getState().game.position.y)
  }

  move(x, y) {
    const state = this.context.store.getState()
    const block = state.game.map[y][x]

    if (block === 1) {
      return;
    }

    // health
    if (block instanceof Health) {
      this.clearBlock(x, y)
      this.updateHealth(state.game.player.health + block.value)
    }

    // weapon
    if (block instanceof Weapon) {
      this.clearBlock(x, y)

      this.context.store.dispatch({
        type: 'UPDATE_PLAYER_WEAPON',
        weapon: block
      })
    }

    // enemy
    if (block instanceof Enemy) {
      block.health -= (state.game.player.weapon.damage + state.game.player.level) * Math.floor(Math.random() + 2)

      if (block.health <= 0) {
        this.clearBlock(x, y)
        let xp = state.game.player.experience + block.level * 5


        // increase level
        if (state.game.player.maxExp < xp) {
          xp -= state.game.player.maxExp

          this.context.store.dispatch({
            type: 'UPDATE_PLAYER_LEVEL',
            level: state.game.player.level + 1
          })

          this.context.store.dispatch({
            type: 'UPDATE_PLAYER_MAX_EXPERIENCE',
            maxExp: state.game.player.maxExp * 2
          })
        }

        this.context.store.dispatch({
          type: 'UPDATE_PLAYER_EXPERIENCE',
          experience: xp
        })
      } else {
        let health = state.game.player.health - block.attack()

        if (health <= 0) {
          this.restart()
          return
        }

        this.updateHealth(health)

        this.context.store.dispatch({
          type: 'UPDATE_MAP_BLOCK',
          block: block,
          position: {
            x,
            y
          }
        })

        return
      }
    }

    if (block instanceof Teleport) {
      this.context.store.dispatch({
        type: 'CHANGE_LEVEL',
        map: block.map
      })
      return
    }

    this.context.store.dispatch({
      type: 'UPDATE_PLAYER_POSITION',
      position: {
        x,
        y
      }
    })
  }

  updateHealth(health) {
    this.context.store.dispatch({
      type: 'UPDATE_PLAYER_HEALTH',
      health
    })
  }

  clearBlock(x, y) {
    this.context.store.dispatch({
      type: 'UPDATE_MAP_CLEAR',
      position: {
        x,
        y
      }
    })
  }

  restart() {
    this.updateHealth(100)
    this.context.store.dispatch({
      type: 'UPDATE_MAP_RESET'
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