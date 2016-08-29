/**
 * Created by Vadym Yatsyuk on 23/02/16
 */

import React from 'react';
import { connect } from 'react-redux';

import Health from './health';
import Experience from './experience';

class StatusBar extends React.Component {
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <div className="status-bar">
          <Health/>
          <div>
            <div>LVL</div>
            <div className="indicator">{ this.props.player.level }</div>
          </div>
          <Experience/>
          <div>
            <div>Weapon</div>
            <div>{ this.props.player.weapon.name }</div>
          </div>
          <div>
            <div>Attack</div>
            <div>{ this.props.player.weapon.damage + this.props.player.level }</div>
          </div>
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