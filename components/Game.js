/**
 * Created by Vadym Yatsyuk on 19/02/16
 */

import React from 'react';
import StatusBar from './StatusBar'
import Map from './Map'

class Game extends React.Component {
  render() {
    return (
      <div>
        <StatusBar />
        <Map />
      </div>
    )
  }
}

export default Game