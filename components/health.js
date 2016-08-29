/**
 * Created by Vadym Yatsyuk on 29/08/16
 */
import React from 'react';
import { connect } from 'react-redux';

class HealthComponent extends React.Component {
  render() {
    return (
      <div className="health-container">
        <div>Health</div>
        <div className="health"><div style={{width: `${ this.props.health }%`}}></div></div>
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
