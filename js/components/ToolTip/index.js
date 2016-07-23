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
  // componentDidUpdate(nextProps) {
  //   if (this.state.default) {
  //     const PlateDomNew = new Dom(this.refs.plateComp);
  //     console.log(PlateDomNew.getDomInfo(), this.state.default);
  //   }
  // }
  render() {
    const { mouseIsOver } = this.state;
    const style = {
      display: 'table',
      position: 'relative'
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
          <div ref="contentForMapple">
            { this.props.children[0] }
          </div>
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
      pos: {x: -1000, y: -1000},
      default: true
    };
  }
  getPositionAroundCursor(referenceXY) {
    const plateDom = new Dom(this.refs.plateComp).getDomInfo();
    const contentForMapple = new Dom(this.refs.contentForMapple).getDomInfo();
    let distanceX = 0;
    let distanceY = 0;
    let posX = 0;
    let posY = 0;
    if (this.direction === 'top') {
      distanceX = 0;
      distanceY = -this.gap;
      posX = referenceXY.x - contentForMapple.left - plateDom.width / 2 + distanceX;
      posY = referenceXY.y - contentForMapple.top - plateDom.height + distanceY;
    } else if (this.direction === 'right') {
      distanceX = this.gap + 5;
      distanceY = 0;
      posX = referenceXY.x - contentForMapple.left + distanceX;
      posY = referenceXY.y - plateDom.height/2 - contentForMapple.top;
    } else if (this.direction === 'bottom') {
      distanceX = 0;
      distanceY = this.gap + 10;
      posX = referenceXY.x - contentForMapple.left - plateDom.width / 2 + distanceX;
      posY = referenceXY.y - contentForMapple.top + distanceY;
      
    } else if (this.direction === 'left') {
      distanceX = -this.gap;
      distanceY = 0;
      posX = referenceXY.x - contentForMapple.left - plateDom.width + distanceX
      posY = referenceXY.y - plateDom.height/2 - contentForMapple.top;
    }
    return {
      x: posX,
      y: posY
    }
  }
  getPositionAroundDom(referenceXY, widthHeight) {
    const plateDom = new Dom(this.refs.plateComp).getDomInfo();
    const contentForMapple = new Dom(this.refs.contentForMapple).getDomInfo();
    let distanceX = 0;
    let distanceY = 0;
    let posX = 0;
    let posY = 0;
    if (this.direction === 'top') {
      distanceX = 0;
      distanceY = -this.gap;
      posX = contentForMapple.width/2 - plateDom.width/2 + distanceX;
      posY = - plateDom.height + distanceY;
    } else if (this.direction === 'right') {
      distanceX = this.gap + 5;
      distanceY = 0;
      posX = contentForMapple.width + distanceX;
      posY = -plateDom.height / 2 + contentForMapple.height / 2;
    } else if (this.direction === 'bottom') {
      distanceX = 0;
      distanceY = this.gap;
      posX = contentForMapple.width / 2 - plateDom.width / 2 + distanceX;
      posY = contentForMapple.height + distanceY;
    } else if (this.direction === 'left') {
      distanceX = -this.gap;
      distanceY = 0;
      posX = -plateDom.width + distanceX;
      posY = -plateDom.height / 2 + contentForMapple.height / 2;    
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
      default: false,
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
