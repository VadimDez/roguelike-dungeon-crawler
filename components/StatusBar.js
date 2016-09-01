/**
 * Created by Vadym Yatsyuk on 23/02/16
 */

import React from 'react';
import { connect } from 'react-redux';

import HUDBar from './hud/bar';

class StatusBar extends React.Component {
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <div className="status-bar">
          <HUDBar name={ 'Health' }
                  value={ this.props.player.health }
                  percentage={ this.props.player.health <= 100 ? this.props.player.health : 100 }
                  barClass={ 'health' }
          />
          <div>
            <div>LVL</div>
            <div className="indicator">{ this.props.player.level }</div>
          </div>
          <HUDBar name={ 'Experience' }
                  value={ `${ this.props.player.experience } / ${ this.props.player.maxExp }`}
                  percentage={ this.props.player.experience * 100 / this.props.player.maxExp }
                  barClass={ 'experience' }
          />
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