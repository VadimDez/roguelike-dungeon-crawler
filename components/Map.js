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
        MAP
        <Player />

        { this.renderMap(state.game.map) }
      </div>
    )
  }

  /**
   * Render map
   * @param map
   * @returns {*}
   */
  renderMap(map) {
    return map.map.map((row, i) => {
      return (
        <div className="row" key={i}>
          {
            row.map((block, c) => {
              return (
                <span key={c}>{block}</span>
              )
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