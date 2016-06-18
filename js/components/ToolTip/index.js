import React, { Component } from 'react';
import Plate from './Plate';

export default class ToolTip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseIsOver: false
    }
  }
  render() {
    const { mouseIsOver } = this.state;
    return (
      <span onMouseEnter={::this.handleMouseEnter}
        onMouseLeave={::this.handleMouseLeave}>
        { this.props.children }
        { mouseIsOver ? <Plate/> : null }
      </span>
    );
  }

  handleMouseEnter() {
    this.setState({
      mouseIsOver: true
    });
  }

  handleMouseLeave() {
    this.setState({
      mouseIsOver: false
    });
  }
}
