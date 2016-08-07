/**
 * Created by Vadym Yatsyuk on 24/02/16
 */
import React from 'react'

class Player extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="player"></div>
    );
  }
}

export default Player