/**
 * Created by Vadym Yatsyuk on 29/08/16
 */
import React from 'react';
import { connect } from 'react-redux';

class HealthComponent extends React.Component {
  render() {
    return (
      <div className="bar-container health">
        <div>Health</div>
        <div className="bar-indicator-container">
          <div className="bar-indicator">{ this.props.health }</div>
          <div className="bar" style={{width: `${ this.props.health <= 100 ? this.props.health : 100 }%`}}></div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    health: state.game.player.health
  }
};

export default connect(mapStateToProps)(HealthComponent);
