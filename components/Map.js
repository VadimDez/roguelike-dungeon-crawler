/**
 * Created by Vadym Yatsyuk on 23/02/16
 */

import React from 'react'
import Player from './Player'
import Enemy from './../Entities/Enemy'
import Weapon from './../Entities/Weapon'
import Health from './../Entities/Health'
import Teleport from './../Entities/Teleport'

class Map extends React.Component {
  render() {
    this.state = this.context.store.getState();

    return (
      <div>
        { this.renderMap() }
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
   * @returns {*}
   */
  renderMap() {
    return this.state.game.map.map((row, y) => {
      return (
        <div className="row" key={y}>
          {
            row.map((block, x) => {

              // hide
              if (
                this.state.game.darkness
                && (Math.abs(x - this.state.game.position.x) > 3
                || Math.abs(y - this.state.game.position.y) > 3)
              ) {
                return <div key={`${x}-${y}`} className="wall"></div>
              }

              if (this.state.game.position.x === x && this.state.game.position.y === y) {
                return <Player key={`${x}-${y}`} />
              }

              if (block instanceof Enemy) {
                return <div key={`${x}-${y}`} className={block.isBoss ? 'boss' : 'enemy'}></div>
              }

              if (block instanceof Weapon || block instanceof Health || block instanceof Teleport) {
                return <div key={`${x}-${y}`} className={block.constructor.name.toLowerCase()}></div>
              }

              return <div key={`${x}-${y}`} className={block ? 'wall' : 'empty'}></div>
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