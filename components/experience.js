/**
 * Created by Vadym Yatsyuk on 29/08/16
 */
import React from 'react';
import { connect } from 'react-redux';

class ExperienceComponent extends React.Component {
  render() {
    return (
      <div className="bar-container experience">
        <div>Experience</div>
        <div className="bar-indicator-container">
          <div className="bar-indicator">{ this.props.experience } / { this.props.maxExp }</div>
          <div className="bar" style={{width: `${ this.props.experience * 100 / this.props.maxExp }%`}}></div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    experience: state.game.player.experience,
    maxExp: state.game.player.maxExp
  }
};

export default connect(mapStateToProps)(ExperienceComponent);
