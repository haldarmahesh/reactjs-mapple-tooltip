import React, { Component } from 'react';
import Plate from './Plate';
import Position from './helper/Position.js';
import Dom from './helper/Dom.js';

export default class ToolTip extends Component {
  constructor(props) {
    super(props);
    this.state = this.setPropsValues(props);
    this.setTime = null;
    this.timeOut = this.state.float ? 0 : 200;
    this.gap = 10;
    // = this.initialState();
    this.altered = false;
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
          direction={this.state.direction}
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
    return {
      mouseIsOver: false,
      pos: {x: -1000, y: -1000},
      default: true,
      float: props.float || false,
      direction: props.direction || 'top'
    };
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
    if (this.state.direction === 'top') {
      distanceX = 0;
      distanceY = -this.gap;
      posX = referenceXY.x - contentForMapple.left - plateDom.width / 2 + distanceX;
      posY = referenceXY.y - contentForMapple.top - plateDom.height + distanceY;
    } else if (this.state.direction === 'right') {
      distanceX = this.gap + 5;
      distanceY = 0;
      posX = referenceXY.x - contentForMapple.left + distanceX;
      posY = referenceXY.y - plateDom.height/2 - contentForMapple.top;
    } else if (this.state.direction === 'bottom') {
      distanceX = 0;
      distanceY = this.gap + 10;
      posX = referenceXY.x - contentForMapple.left - plateDom.width / 2 + distanceX;
      posY = referenceXY.y - contentForMapple.top + distanceY;
      
    } else if (this.state.direction === 'left') {
      
    }
    return {
      x: posX,
      y: posY
    }
  }
  handleMouseEnter(event) {
    const position = new Position();
    const fixedXY = position.getFixedCoordinates(event);
    const widthHeight = position.getWidthHeight(event);
    const plateDom = new Dom(this.refs.plateComp);
    const plateDimensions = plateDom.getDimensions();
    const contentForMapple = new Dom(this.refs.contentForMapple).getDomInfo();
    const newPositionAroundDom = position.getPositionAroundDom(this.state.direction, plateDom.getDomInfo(), contentForMapple);
    const newPositionAroundCursor = position.getPositionAroundCursor(fixedXY, this.state.direction, plateDom.getDomInfo(), contentForMapple);
    this.setState({
      plateWidthHeight: plateDimensions
    });
    const newPosition = this.state.float ? newPositionAroundCursor : newPositionAroundDom;
    this.setTime = setTimeout(() => {
      this.setState({
      mouseIsOver: true,
      default: false,
      pos: newPosition
    });
    this.checkIfPlateGoingOut();
    }, this.timeOut);
  }

  handleMouseLeave() {
    clearTimeout(this.setTime);
    this.setTime = setTimeout(() => {
      this.setState(this.setPropsValues(this.props));
    }, this.timeOut);
  }

  handleMouseMove(event) {
    if (!this.state.float) {
      return;
    }
    const position = new Position(event);
    const mousePosition = position.getFloatCoordinates(event);
    const plateDom = new Dom(this.refs.plateComp);
    const contentForMapple = new Dom(this.refs.contentForMapple).getDomInfo();
    const newPositionAroundCursor = position.getPositionAroundCursor(mousePosition, this.state.direction, plateDom.getDomInfo(), contentForMapple);
    
    this.checkIfPlateGoingOut();
    this.setState({
      pos: newPositionAroundCursor
    });
  }
  checkIfPlateGoingOut() {
    const plateDom = new Dom(this.refs.plateComp).getDomInfo();
    const contentForMapple = new Dom(this.refs.contentForMapple).getDomInfo();
    if (this.props.direction === 'left' && plateDom.left < 0 && !this.state.default) {
      this.setState({
        direction: 'right'
      });
      if (!this.state.float) {
        this.setState({
          pos: {
            x: contentForMapple.left,
            y: contentForMapple.height / 2 - plateDom.height / 2
          }
        });
      }
    } 
    else if(this.props.direction === 'top' && !this.state.default) {
       if (plateDom.top < 0) {
          this.setState({
            direction: 'bottom'
          }); 
          if (!this.state.float) {
            this.setState({
              pos: {
                x: contentForMapple.width / 2 - plateDom.width / 2,
                y: contentForMapple.height
              }
            });
          }
       }
       else if (plateDom.left < 0) {
         this.setState({
           direction: 'right'
         });
       }
    }
  }
}
