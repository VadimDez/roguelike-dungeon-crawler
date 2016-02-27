/**
 * Created by Vadym Yatsyuk on 23/02/16
 */

import React from 'react'

class StatusBar extends React.Component {
  render() {
    const state = this.context.store.getState()

    return (
      <div>
        Health: {state.player.health }, Lvl: 0, Weapon: None
      </div>
    )
  }
}

StatusBar.contextTypes = {
  store: React.PropTypes.object
}

export default StatusBar