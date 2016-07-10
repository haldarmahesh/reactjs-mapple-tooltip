import React, { Component } from 'react';
import Plate from './Plate';
import Position from './helper/Position.js';
import Dom from './helper/Dom.js';

export default class ToolTip extends Component {
  constructor(props) {
    super(props);
    this.setTime = null;
    this.float = true;
    this.direction = 'left';
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
        <span style={style}
          onMouseEnter={event => ::this.handleMouseEnter(event)}
          onMouseLeave={::this.handleMouseLeave}
          onMouseMove={event => ::this.handleMouseMove(event)}>
          <Plate
          visible={this.state.mouseIsOver}
          ref={'plateComp'}
          pos={this.state.pos}
          direction={this.direction}/>
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
    let distanceX = 0;
    let distanceY = 0;
    let posX = 0;
    let posY = 0;
    if (this.direction === 'top') {
      distanceX = 0;
      distanceY = -10;
      posX = referenceXY.x - plateDimensions.width / 2 + distanceX;
      posY = referenceXY.y - plateDimensions.height + distanceY;
    } else if (this.direction === 'right') {
      distanceX = 10;
      distanceY = -10;
      posX = referenceXY.x + distanceX;
      posY = referenceXY.y - plateDimensions.height / 2 + distanceY;
    } else if (this.direction === 'bottom') {
      distanceX = 10;
      distanceY = 20;
      posX = referenceXY.x - plateDimensions.width / 2 + distanceX;
      posY = referenceXY.y + distanceY;
    } else if (this.direction === 'left') {
      distanceX = -10;
      distanceY = 0;
      posX = referenceXY.x - plateDimensions.width  + distanceX
      posY = referenceXY.y - plateDimensions.height / 2 + distanceY;
    }
    return {
      x: posX,
      y: posY
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
