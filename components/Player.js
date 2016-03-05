/**
 * Created by Vadym Yatsyuk on 24/02/16
 */
import React from 'react'

class Player extends React.Component {
  render() {
    return (
      <div className="player"></div>
    )
  }
}

Player.contextTypes = {
  store: React.PropTypes.object
}

export default Player