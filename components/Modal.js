/**
 * Created by Vadym Yatsyuk on 02/03/16
 */

import React from 'react'

export default class Modal extends React.Component {
  render() {
    return (
      <div className="modal-container">
        <div className="modal">
          <h3>{ this.props.text }</h3>
          <button onClick={ this.props.onClick }>Ok</button>
          <button onClick={ this.props.restart }>Restart</button>
        </div>
      </div>
    );
  }
}