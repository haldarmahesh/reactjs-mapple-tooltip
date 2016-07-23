import React, { Component } from 'react';
import Plate from './Plate';
import Position from './helper/Position.js';
import Dom from './helper/Dom.js';

export default class ToolTip extends Component {
  constructor(props) {
    super(props);
    this.setPropsValues(props);
    this.setTime = null;
    this.timeOut = this.float ? 0 : 200;
    this.gap = 10;
    this.state = this.initialState();
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
          direction={this.direction}
          content={this.props.children[1]}
          plateWidthHeight={this.state.plateWidthHeight}/>
          { this.props.children[0] }
        </span>
      </span>
    );
  }
  setPropsValues(props) {
    this.float = props.float || false;
    this.direction = props.direction || 'top';
  }
  initialState() {
    return {
      mouseIsOver: false,
      pos: {x: -1000, y: -1000}
    };
  }
  getPositionAroundCursor(referenceXY) {
    const PlateDom = new Dom(this.refs.plateComp);
    const plateDimensions = PlateDom.getDimensions();
    let distanceX = 0;
    let distanceY = 0;
    let posX = 0;
    let posY = 0;
    if (this.direction === 'top') {
      distanceX = 0;
      distanceY = -this.gap;
      posX = referenceXY.x - plateDimensions.width / 2 + distanceX;
      posY = referenceXY.y - plateDimensions.height + distanceY;
    } else if (this.direction === 'right') {
      distanceX = this.gap;
      distanceY = 0;
      posX = referenceXY.x + distanceX;
      posY = referenceXY.y - plateDimensions.height / 2 + distanceY;
    } else if (this.direction === 'bottom') {
      distanceX = 0;
      distanceY = this.gap + 10;
      posX = referenceXY.x - plateDimensions.width / 2 + distanceX;
      posY = referenceXY.y + distanceY;
    } else if (this.direction === 'left') {
      distanceX = -this.gap;
      distanceY = 0;
      posX = referenceXY.x - plateDimensions.width  + distanceX
      posY = referenceXY.y - plateDimensions.height / 2 + distanceY;
    }
    return {
      x: posX,
      y: posY
    }
  }
  getPositionAroundDom(referenceXY, widthHeight) {
    const PlateDom = new Dom(this.refs.plateComp);
    const plateDimensions = PlateDom.getDimensions();
    let distanceX = 0;
    let distanceY = 0;
    let posX = 0;
    let posY = 0;
    if (this.direction === 'top') {
      distanceX = 0;
      distanceY = -this.gap;
      posX = referenceXY.x - plateDimensions.width / 2 + distanceX;
      posY = referenceXY.y - plateDimensions.height + distanceY;
    } else if (this.direction === 'right') {
      distanceX = this.gap + 5;
      distanceY = 0;
      posX = widthHeight.width + distanceX;
      posY = referenceXY.y - plateDimensions.height / 2 + distanceY + widthHeight.height / 2;
    } else if (this.direction === 'bottom') {
      distanceX = 0;
      distanceY = this.gap;
      posX = referenceXY.x - plateDimensions.width / 2 + distanceX;
      posY = referenceXY.y + widthHeight.height + distanceY;
    } else if (this.direction === 'left') {
      distanceX = -this.gap;
      distanceY = 0;
      posX = -plateDimensions.width;
      posY = referenceXY.y - plateDimensions.height / 2 + distanceY + widthHeight.height / 2;    
    }
    return {
      x: posX,
      y: posY
    }
  }
  handleMouseEnter(event) {
    const position = new Position(event);
    const fixedXY = position.getFixedCoordinates();
    const widthHeight = position.getWidthHeight();
    const PlateDom = new Dom(this.refs.plateComp);
    const plateDimensions = PlateDom.getDimensions();
    this.setState({
      plateWidthHeight: plateDimensions
    })
    this.setTime = setTimeout(() => {
      this.setState({
      mouseIsOver: true,
      pos: this.float ? this.getPositionAroundCursor(fixedXY) : this.getPositionAroundDom(fixedXY, widthHeight)
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
      pos: this.getPositionAroundCursor(mousePosition)
    });
  }
}
