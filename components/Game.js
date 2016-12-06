/**
 * Created by Vadym Yatsyuk on 19/02/16
 */

import React from 'react';
import { connect } from 'react-redux';

import StatusBar from './StatusBar'
import Map from './Map'
import Health from './../Entities/Health'
import Weapon from './../Entities/Weapon'
import Enemy from './../Entities/Enemy'
import Teleport from './../Entities/Teleport'
import Modal from './Modal'
import * as actionTypes from './../ActionTypes';
import * as playerDirections from './../PlayerDirections';

class Game extends React.Component {
  constructor() {
    super();

    this.actions();
  }

  actions() {
    window.addEventListener('keydown', e => {
      switch (e.which) {
        case 37:
          this.moveLeft();
          break;
        case 65:
          this.moveLeft();
          break;
        case 38:
          this.moveUp();
          break;
        case 87:
          this.moveUp();
          break;
        case 39:
          this.moveRight();
          break;
        case 68:
          this.moveRight();
          break;
        case 40:
          this.moveDown();
          break;
        case 83:
          this.moveDown();
          break;
      }
    })
  }

  moveUp() {
    this.props.updatePlayerDirection(playerDirections.PLAYER_DIRECTION_UP);
    this.move(this.props.game.position.x, this.props.game.position.y - 1);
  }
  moveDown() {
    this.props.updatePlayerDirection(playerDirections.PLAYER_DIRECTION_DOWN);
    this.move(this.props.game.position.x, this.props.game.position.y + 1);
  }
  moveLeft() {
    this.props.updatePlayerDirection(playerDirections.PLAYER_DIRECTION_LEFT);
    this.move(this.props.game.position.x - 1, this.props.game.position.y);
  }
  moveRight() {
    this.props.updatePlayerDirection(playerDirections.PLAYER_DIRECTION_RIGHT);
    this.move(this.props.game.position.x + 1, this.props.game.position.y);
  }

  move(x, y) {
    const block = this.props.game.map[y][x];

    if (block === 1) {
      return;
    }

    // health
    if (block instanceof Health) {
      this.props.clearBlock(x, y);
      this.props.updateHealth(this.props.game.player.health + block.value);
    }

    // weapon
    if (block instanceof Weapon) {
      this.props.clearBlock(x, y);

      this.props.updateWeapon(block);
    }

    // enemy
    if (block instanceof Enemy) {
      block.health -= (this.props.game.player.weapon.damage + this.props.game.player.level) * Math.floor(Math.random() + 2);

      if (block.health <= 0) {
        this.props.clearBlock(x, y);
        let xp = this.props.game.player.experience + block.level * 5;

        // increase level
        if (this.props.game.player.maxExp < xp) {
          xp -= this.props.game.player.maxExp;

          this.props.updateLVL(this.props.game.player.level + 1);

          this.props.updateMaxXP(this.props.game.player.maxExp * 2);

        }

        this.props.updateXP(xp);

        if (block.isBoss) {
          this.showModal('winModal');
        }
      } else {
        let health = this.props.game.player.health - block.attack();

        if (health <= 0) {
          this.restart();
          this.showModal('loseModal');
          return;
        }

        this.props.updateHealth(health);

        this.props.updateMapBlock(block, x, y);

        this.props.updateBlock(block, x, y);

        return;
      }
    }

    if (block instanceof Teleport) {
      this.props.changeLevel(block.map);
      return;
    }

    this.props.updatePlayerPosition(x, y);
  }

  restart() {
    this.props.updatePlayerSetDefault();
    this.props.restart();
  }

  closeModal(modalType) {
    return () => {
      this.props.updateModal(modalType, false)
    };
  }

  showModal(modalName) {
    this.props.updateModal(modalName, true);
  }

  toggleDarkness() {
    this.props.toggleDarkness(!this.props.game.darkness);
  }

  modalRestartAction() {
    this.closeModal('winModal')();
    this.restart();
  }

  render() {
    let modal;

    if (this.props.modals.loseModal) {
      modal = <Modal
        text="You lose. Try again."
        onClick={this.closeModal('loseModal').bind(this)}
        restart={ this.modalRestartAction.bind(this) }
      />;
    } else if (this.props.modals.winModal) {
      modal = <Modal
        text="You won!"
        onClick={ this.closeModal('winModal').bind(this) }
        restart={ this.modalRestartAction.bind(this) }
      />;
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
        <div className="actions">
          <button onClick={this.restart.bind(this)}>Restart</button>
          <button onClick={this.toggleDarkness.bind(this)}>Toggle darkness</button>
        </div>
        <Map />
        { modal }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.game,
    modals: state.modals
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateModal: (name, value) => {
      dispatch({
        type: actionTypes.UPDATE_MODAL,
        modal: name,
        value: value
      });
    },
    toggleDarkness: (value) => {
      dispatch({
        type: actionTypes.UPDATE_DARKNESS,
        value
      });
    },
    updateWeapon: (weapon) => {
      dispatch({
        type: actionTypes.UPDATE_PLAYER_WEAPON,
        weapon
      });
    },
    updateLVL: (level) => {
      dispatch({
        type: actionTypes.UPDATE_PLAYER_LEVEL,
        level
      });
    },
    updateXP: (experience) => {
      dispatch({
        type: actionTypes.UPDATE_PLAYER_EXPERIENCE,
        experience
      });
    },
    updateMaxXP: (maxExp) => {
      dispatch({
        type: actionTypes.UPDATE_PLAYER_MAX_EXPERIENCE,
        maxExp
      });
    },
    updateMapBlock: (block, x, y) => {
      dispatch({
        type: actionTypes.UPDATE_MAP_BLOCK,
        block,
        position: {
          x,
          y
        }
      });
    },
    updatePlayerPosition: (x, y) => {
      dispatch({
        type: actionTypes.UPDATE_PLAYER_POSITION,
        position: {
          x,
          y
        }
      });
    },
    changeLevel: (map) => {
      dispatch({
        type: actionTypes.CHANGE_LEVEL,
        map
      })
    },
    updateHealth: (health) => {
      dispatch({
        type: actionTypes.UPDATE_PLAYER_HEALTH,
        health
      });
    },
    updateBlock: (block, x, y) => {
      dispatch({
        type: actionTypes.UPDATE_MAP_BLOCK,
        block: block,
        position: {
          x,
          y
        }
      });
    },
    clearBlock: (x, y) => {
      dispatch({
        type: actionTypes.UPDATE_MAP_CLEAR,
        position: {
          x,
          y
        }
      });
    },
    restart: () => {
      dispatch({
        type: actionTypes.UPDATE_MAP_RESET
      });
      dispatch({
        type: actionTypes.UPDATE_MODAL,
        modal: 'loseModal',
        value: false
      });
    },
    updatePlayerDirection: (direction) => {
      dispatch({
        type: actionTypes.UPDATE_PLAYER_DIRECTION,
        direction
      });
    },
    updatePlayerSetDefault: () => {
      dispatch({
        type: actionTypes.UPDATE_PLAYER_SET_DEFAUL
      });
    }
  }

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);