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
import Modal from './Modal'
import * as actionTypes from './../ActionTypes';

class Game extends React.Component {
  constructor() {
    super()

    this.actions()
  }

  actions() {
    window.addEventListener('keydown', e => {
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
        type: actionTypes.UPDATE_PLAYER_WEAPON,
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
            type: actionTypes.UPDATE_PLAYER_LEVEL,
            level: state.game.player.level + 1
          })

          this.context.store.dispatch({
            type: actionTypes.UPDATE_PLAYER_MAX_EXPERIENCE,
            maxExp: state.game.player.maxExp * 2
          })
        }

        this.context.store.dispatch({
          type: actionTypes.UPDATE_PLAYER_EXPERIENCE,
          experience: xp
        })

        if (block.isBoss) {
          this.showModal('winModal')
        }
      } else {
        let health = state.game.player.health - block.attack()

        if (health <= 0) {
          this.restart()
          this.showModal('loseModal')
          return
        }

        this.updateHealth(health)

        this.context.store.dispatch({
          type: actionTypes.UPDATE_MAP_BLOCK,
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
        type: actionTypes.CHANGE_LEVEL,
        map: block.map
      })
      return
    }

    this.context.store.dispatch({
      type: actionTypes.UPDATE_PLAYER_POSITION,
      position: {
        x,
        y
      }
    })
  }

  updateHealth(health) {
    this.context.store.dispatch({
      type: actionTypes.UPDATE_PLAYER_HEALTH,
      health
    })
  }

  clearBlock(x, y) {
    this.context.store.dispatch({
      type: actionTypes.UPDATE_MAP_CLEAR,
      position: {
        x,
        y
      }
    })
  }

  restart() {
    this.updateHealth(100);
    this.context.store.dispatch({
      type: actionTypes.UPDATE_MAP_RESET
    })
  }

  closeModal(modalType) {
    return () => {
      this.updateModal(modalType, false)
    }
  }

  showModal(modalName) {
    this.updateModal(modalName, true)
  }

  updateModal(name, value) {
    this.context.store.dispatch({
      type: actionTypes.UPDATE_MODAL,
      modal: name,
      value: value
    });
    this.forceUpdate();
  }

  render() {
    let modal;
    const state = this.context.store.getState()

    if (state.modals.loseModal) {
      modal = <Modal text="You lose. Try again." onClick={this.closeModal('loseModal').bind(this)}/>;
    } else if (state.modals.winModal) {
      modal = <Modal text="You won!" onClick={this.closeModal('winModal').bind(this)}/>;
    }

    return (
      <div>
        <StatusBar />
        <div className="elements row">
          <div>
            <div className="wall"></div> Wall
          </div>
          <div>
            <div className="enemy"></div> Enemy
          </div>
          <div>
            <div className="boss"></div> Boss
          </div>
          <div>
            <div className="health"></div> Health
          </div>
          <div>
            <div className="player"></div> Player
          </div>
          <div>
            <div className="weapon"></div> Weapon
          </div>
          <div>
            <div className="teleport"></div> Teleport
          </div>
        </div>
        <Map />
        { modal }
      </div>
    )
  }
}

Game.contextTypes = {
  store: React.PropTypes.object
}

export default Game