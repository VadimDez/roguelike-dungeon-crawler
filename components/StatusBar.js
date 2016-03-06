/**
 * Created by Vadym Yatsyuk on 23/02/16
 */

import React from 'react'

class StatusBar extends React.Component {
  componentDidMount() {
    const store = this.context.store

    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate()
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const state = this.context.store.getState()

    return (
      <div className="status-bar">
        Health: {state.game.player.health }, Lvl: { state.game.player.level }, XP: { state.game.player.experience } / { state.game.player.maxExp } Weapon: { state.game.player.weapon.name }
      </div>
    )
  }
}

StatusBar.contextTypes = {
  store: React.PropTypes.object
}

export default StatusBar