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
      <div>
        <div className="status-bar">
          <div className="health-container">
            <div>Health</div>
            <div className="health"><div style={{width: `${ this.props.player.health }%`}}></div></div>
          </div>
          <span>Lvl: { this.props.player.level }</span>
          <span>XP: { this.props.player.experience } / { this.props.player.maxExp }</span>
          <span>Weapon: { this.props.player.weapon.name }</span>
          <span>Attack: { this.props.player.weapon.damage + this.props.player.level }</span>
        </div>
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