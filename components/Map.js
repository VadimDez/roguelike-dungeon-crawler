/**
 * Created by Vadym Yatsyuk on 23/02/16
 */

import React from 'react'
import Player from './Player'
import Enemy from './../Entities/Enemy'
import Weapon from './../Entities/Weapon'
import Health from './../Entities/Health'

class Map extends React.Component {
  render() {
    const state = this.context.store.getState();

    return (
      <div>
        { this.renderMap(state.game.map, state.game.position) }
      </div>
    )
  }

  componentDidMount() {
    const store = this.context.store

    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate()
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  /**
   * Render map
   * @param {array}   map
   * @param {Object}  playerPosition
   * @returns {*}
   */
  renderMap(map, playerPosition) {
    return map.map((row, y) => {
      return (
        <div className="row" key={y}>
          {
            row.map((block, x) => {

              // hide
              if (Math.abs(x - playerPosition.x) > 3 || Math.abs(y - playerPosition.y) > 3) {
                return <span key={`${x}-${y}`} className="wall"> </span>
              }

              if (playerPosition.x === x && playerPosition.y === y) {
                return <Player key={`${x}-${y}`} />
              }

              if (block instanceof Enemy) {
                return <span key={`${x}-${y}`} className="enemy"> </span>
              }

              if (block instanceof Weapon) {
                return <span key={`${x}-${y}`} className="weapon"> </span>
              }

              if (block instanceof Health) {
                return <span key={`${x}-${y}`} className="health"> </span>
              }

              return <span key={`${x}-${y}`} className={block ? 'wall' : 'empty'}> </span>
            })
          }
        </div>
      )
    })
  }
}

Map.contextTypes =  {
  store: React.PropTypes.object
}

export default Map