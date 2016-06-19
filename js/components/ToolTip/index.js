import React, { Component } from 'react';
import Plate from './Plate';

export default class ToolTip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseIsOver: false,
      pos: {x: 0, y: 0}
    }
  }
  render() {
    const { mouseIsOver } = this.state;
    const style = {
      display: 'table'
    }
    return (
      <span>
        { mouseIsOver ? <Plate pos={this.state.pos}/> : null }
        <span style={style} onMouseEnter={::this.handleMouseEnter}
          onMouseLeave={::this.handleMouseLeave}
          onMouseMove={event => ::this.handleMouseMove(event)}>
          { this.props.children }
        </span>
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

  handleMouseMove(event) {
    console.log('pos', event.currentTarget.getBoundingClientRect());
    this.setState({
      pos: {
        x: event.clientX,
        y: event.clientY - 50
      }
    })
  }
}
