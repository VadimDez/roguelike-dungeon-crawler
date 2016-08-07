/**
 * Created by Vadym Yatsyuk on 23/02/16
 */

import React from 'react';
import { connect } from 'react-redux';

class StatusBar extends React.Component {
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="status-bar">
        <span>Health: {this.props.player.health }</span>
        <span>Lvl: { this.props.player.level }</span>
        <span>XP: { this.props.player.experience } / { this.props.player.maxExp }</span>
        <span>Weapon: { this.props.player.weapon.name }</span>
        <span>Attack: { this.props.player.weapon.damage + this.props.player.level }</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    player: state.game.player
  }
};

export default connect(mapStateToProps)(StatusBar);