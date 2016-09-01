/**
 * Created by Vadym Yatsyuk on 24/02/16
 */
import React from 'react';
import { connect } from 'react-redux';

class Player extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className={ `player ${ this.props.direction }`}></div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    direction: state.game.player.direction
  };
};

export default connect(mapStateToProps)(Player);