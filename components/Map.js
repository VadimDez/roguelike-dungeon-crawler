/**
 * Created by Vadym Yatsyuk on 23/02/16
 */

import React from 'react'
import Player from './Player'

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

              if (playerPosition.x === x && playerPosition.y === y) {
                return <Player key={`${x}-${y}`} />
              }

              return <span key={`${x}-${y}`}>{block}</span>
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