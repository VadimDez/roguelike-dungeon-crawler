/**
 * Created by Vadym Yatsyuk on 24/02/16
 */
import React from 'react'

class Player extends React.Component {
  render() {
    return (
      <span className="player"> </span>
    )
  }
}

Player.contextTypes = {
  store: React.PropTypes.object
}

export default Player