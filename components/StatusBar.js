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
        <span>Health: {state.game.player.health }</span>
        <span>Lvl: { state.game.player.level }</span>
        <span>XP: { state.game.player.experience } / { state.game.player.maxExp }</span>
        <span>Weapon: { state.game.player.weapon.name }</span>
        <span>Attack: { state.game.player.weapon.damage + state.game.player.level }</span>
      </div>
    )
  }
}

StatusBar.contextTypes = {
  store: React.PropTypes.object
}

export default StatusBar