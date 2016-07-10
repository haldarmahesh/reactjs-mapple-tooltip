import React, { Component } from 'react';
import Plate from './Plate';
import Position from './helper/Position.js';
import Dom from './helper/Dom.js';

export default class ToolTip extends Component {
  constructor(props) {
    super(props);
    this.setTime = null;
    this.float = false;
    this.timeOut = this.float ? 0 : 300;
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
        <Plate
          visible={this.state.mouseIsOver}
          ref={'plateComp'}
          pos={this.state.pos}/>
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
    const position = new Position(event);
    const fixedXY = position.getFixedCoordinates();
    const PlateDom = new Dom(this.refs.plateComp);
    const plateDimensions = PlateDom.getDimensions();
    this.setTime = setTimeout(() => {
      this.setState({
      mouseIsOver: true,
      pos: {
        x: fixedXY.x - plateDimensions.width/2,
        y: fixedXY.y - plateDimensions.height - 10
      }
    });
    }, this.timeOut);
  }

  handleMouseLeave() {
    clearTimeout(this.setTime);
    this.setTime = setTimeout(() => {
      this.setState({
        mouseIsOver: false
      })
    }, this.timeOut);
  }

  handleMouseMove(event) {
    if (!this.float) {
      return;
    }
    const position = new Position(event);
    const mousePosition = position.getFloatCoordinates();
    const PlateDom = new Dom(this.refs.plateComp)
    const plateDimensions = PlateDom.getDimensions();
    this.setState({
      pos: {
        x: mousePosition.x - plateDimensions.width / 2,
        y: mousePosition.y - plateDimensions.height - 10
      }
    })
  }
}
