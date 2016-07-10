import React, { Component } from 'react';
import Plate from './Plate';
import Position from './helper/Position.js';
import Dom from './helper/Dom.js';

export default class ToolTip extends Component {
  constructor(props) {
    super(props);
    this.setTime = null;
    this.float = true;
    this.direction = 'top';
    this.timeOut = this.float ? 0 : 300;
    this.state = this.initialState();
    // call setThepropsValues() to override the props val
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
  initialState() {
    return {
      mouseIsOver: false,
      pos: {x: -1000, y: -1000}
    };
  }
  getPosition(referenceXY) {
    const PlateDom = new Dom(this.refs.plateComp);
    const plateDimensions = PlateDom.getDimensions();
    return {
      x: referenceXY.x - plateDimensions.width/2,
      y: referenceXY.y - plateDimensions.height - 10
    }
  }
  handleMouseEnter(event) {
    const position = new Position(event);
    const fixedXY = position.getFixedCoordinates();
    this.setTime = setTimeout(() => {
      this.setState({
      mouseIsOver: true,
      pos: this.getPosition(fixedXY)
    });
    }, this.timeOut);
  }

  handleMouseLeave() {
    clearTimeout(this.setTime);
    this.setTime = setTimeout(() => {
      this.setState(this.initialState())
    }, this.timeOut);
  }

  handleMouseMove(event) {
    if (!this.float) {
      return;
    }
    const position = new Position(event);
    const mousePosition = position.getFloatCoordinates();
    this.setState({
      pos: this.getPosition(mousePosition)
    })
  }
}
