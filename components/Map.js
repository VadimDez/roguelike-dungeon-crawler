/**
 * Created by Vadym Yatsyuk on 23/02/16
 */

import React from 'react';
import { connect } from 'react-redux';

import Player from './Player';
import Enemy from './../Entities/Enemy';
import Weapon from './../Entities/Weapon';
import Health from './../Entities/Health';
import Teleport from './../Entities/Teleport';

class Map extends React.Component {
  render() {
    return (
      <section>
        { this.renderMap() }
      </section>
    )
  }

  /**
   * Render row
   * @param row
   * @param y
   * @returns {*}
   */
  renderColumn(row, y) {
    return row.map((block, x) => {

      const xDiff = Math.abs(x - this.props.game.position.x);
      const yDiff = Math.abs(y - this.props.game.position.y);
      // hide
      if (
        this.props.game.darkness
        && (
          xDiff > 3
          || yDiff > 3
          || (xDiff == 3 && yDiff === 2)
          || (xDiff === 2 && yDiff === 3)
          || (xDiff === 3 && yDiff === 3)
        )
      ) {
        return <div key={`${x}-${y}`} className="darkness"></div>
      }

      if (this.props.game.position.x === x && this.props.game.position.y === y) {
        return <Player key={`${x}-${y}`} />
      }

      if (block instanceof Enemy) {
        return <div key={`${x}-${y}`} className={block.isBoss ? 'boss' : 'enemy'}></div>
      }

      if (block instanceof Weapon || block instanceof Health || block instanceof Teleport) {
        return <div key={`${x}-${y}`} className={block.constructor.name.toLowerCase()}></div>
      }

      return <div key={`${x}-${y}`} className={block ? 'wall' : 'grass'}></div>
    })
  }

  /**
   * Render map
   * @returns {*}
   */
  renderMap() {
    return this.props.game.map.map((row, y) => {
      return (
        <div className="row" key={y}>
          { this.renderColumn(row, y) }
        </div>
      )
    })
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.game
  };
};

export default connect(mapStateToProps)(Map);