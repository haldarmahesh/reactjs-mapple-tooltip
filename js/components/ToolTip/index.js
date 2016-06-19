import React, { Component } from 'react';
import Plate from './Plate';
import Position from './helper/Position.js';

export default class ToolTip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseIsOver: false,
      float: false,
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
        <span style={style}
          onMouseEnter={event => ::this.handleMouseEnter(event)}
          onMouseLeave={::this.handleMouseLeave}
          onMouseMove={event => ::this.handleMouseMove(event)}>
          { this.props.children }
        </span>
      </span>
    );
  }

  handleMouseEnter(event) {
    this.setState({
      mouseIsOver: true
    });
    const position = new Position(event);
    const fixedXY = position.getFixed();
    this.setState({
      pos: fixedXY
    })
  }

  handleMouseLeave() {
    this.setState({
      mouseIsOver: false
    });
  }

  handleMouseMove(event) {
    if (!this.state.float) {
      return;
    }
    const position = new Position(event);
    const mousePosition = position.getFloatCoordinates();
    this.setState({
      pos: {
        x: mousePosition.x,
        y: mousePosition.y - 50
      }
    })
  }
}
