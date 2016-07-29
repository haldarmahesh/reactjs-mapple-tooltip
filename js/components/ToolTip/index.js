import React, { Component } from 'react';
import Plate from './Plate';
import Position from './helper/Position.js';
import { typeList } from './Plate/mappleTypeList.js';
let count = 0;
export default class ToolTip extends Component {
  constructor(props) {
    super(props);
    this.mappleTypeList = typeList();
    this.state = this.setPropsValues(props);
    this.setTime = null;
    this.timeOut = this.state.float ? 0 : 200;
    this.gap = 10;
    this.altered = false;
    this.plateInfo = { width: 0, height: 0 };
    count++;
  }

  updatePlateWidth(dimension) {
    this.plateInfo = dimension;
  }
  render() {
    const style = {
      display: 'table',
      position: 'relative'
    };
    return (
      <span style={this.props.style}>
        <span
          style={style}
          onMouseEnter={event => ::this.handleMouseEnter(event)}
          onMouseLeave={::this.handleMouseLeave}
          onMouseMove={event => ::this.handleMouseMove(event)}
        >
          <Plate
          currentId={count}
          visible={this.state.mouseIsOver}
          updatePlateWidth={::this.updatePlateWidth}
          backgroundColor={this.state.backgroundColor}
          textColor={this.state.textColor}
          default={this.state.default}
          mappleType={this.state.mappleType}
          pos={this.state.pos}
          direction={this.state.direction}
          content={this.props.children[1]}
          borderRadius={this.state.borderRadius}
          tipPosition={this.state.tipPosition}
          shadow={this.state.shadow}
          plateWidthHeight={this.state.plateWidthHeight}
          />
          <div>
            {this.props.children[0]}
          </div>
        </span>
      </span>);
  }

  setPropsValues(props) {
    return {
      mouseIsOver: false,
      pos: { x: -1000, y: -1000 },
      default: true,
      float: props.float || false,
      direction: props.direction || 'top',
      borderRadius: props.borderRadius || '3',
      tipPosition: props.tipPosition >= 0 && props.tipPosition <= 100 ? props.tipPosition : 50,
      backgroundColor: props.backgroundColor || 'black',
      textColor: props.textColor || 'white',
      mappleType: this.mappleTypeList.includes(props.mappleType) ? props.mappleType : 'default',
      shadow: props.shadow || false,
      changed: false
    };
  }
  handleMouseEnter(event) {
    const position = new Position();
    const fixedXY = position.getFixedCoordinates(event);
    const plateDomInfo = this.plateInfo;
    const contentForMapple = event.currentTarget.getBoundingClientRect();
    const newPositionAroundDom = position.getPositionAroundDom(this.state.direction, plateDomInfo, contentForMapple);
    const newPositionAroundCursor = position.getPositionAroundCursor(fixedXY, this.state.direction, plateDomInfo, contentForMapple);
    const newPosition = this.state.float ? newPositionAroundCursor : newPositionAroundDom;

    const newDirection = this.checkCorners(newPosition, plateDomInfo);
    this.setTime = setTimeout(() => {
      this.setState({
        mouseIsOver: true,
        default: false,
        pos: newPosition,
        direction: newDirection
      }, () => {
        let newPositionAroundDomNew = this.state.float ? position.getPositionAroundCursor(fixedXY, this.state.direction, plateDomInfo, contentForMapple) : position.getPositionAroundDom(this.state.direction, plateDomInfo, contentForMapple);
        if (!this.state.default && this.state.float) {
          newPositionAroundDomNew = {
            x: -1000,
            y: -1000
          };
        }
        this.setState({
          pos: newPositionAroundDomNew,
          plateWidthHeight: {
            width: plateDomInfo.width,
            height: plateDomInfo.height
          }
        });
      });
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
    const plateDom = this.plateInfo;
    const contentForMapple = event.currentTarget.getBoundingClientRect();
    const newPositionAroundCursor = position.getPositionAroundCursor(mousePosition, this.state.direction, plateDom, contentForMapple);
    const newDirection = this.checkCorners(newPositionAroundCursor, plateDom);
    this.setState({
      pos: newPositionAroundCursor,
      direction: newDirection
    });
  }
  checkCorners(newPositionAroundCursor, plateDom) {
    let newDirection = this.state.direction;
    const defaultDirection = this.props.direction || 'top';
    if (this.state.float) {
      if (newPositionAroundCursor.x < 0 && this.state.direction === defaultDirection) {
        newDirection = 'right';
      } else if (newPositionAroundCursor.x + plateDom.width > window.innerWidth && this.state.direction === defaultDirection) {
        newDirection = 'left';
      } else if (newPositionAroundCursor.y < 0 && this.state.direction === defaultDirection) {
        newDirection = 'bottom';
      } else if (newPositionAroundCursor.y + plateDom.height > window.innerHeight && this.state.direction === defaultDirection) {
        newDirection = 'top';
      }
    } else {
      if (newPositionAroundCursor.x < 0 && this.state.direction === defaultDirection) {
        newDirection = 'top';
      } else if (newPositionAroundCursor.x + plateDom.width > window.innerWidth && this.state.direction === defaultDirection) {
        newDirection = 'top';
      } else if (newPositionAroundCursor.y < 0 && this.state.direction === defaultDirection) {
        newDirection = 'bottom';
      } else if (newPositionAroundCursor.y + plateDom.height > window.innerHeight && this.state.direction === defaultDirection) {
        newDirection = 'top';
      }
    }
    return newDirection;
  }
  reverseDirection(reverseOf) {
    const defaultDirection = this.props.direction || 'top';
    let newDirection = defaultDirection;
    if (defaultDirection === 'bottom' || defaultDirection === 'left' || defaultDirection === 'top' || defaultDirection === 'right') {
      if (reverseOf === 'left') {
        newDirection = 'right';
      } else if (reverseOf === 'bottom') {
        newDirection = 'top';
      } else if (reverseOf === 'right') {
        newDirection = 'left';
      } else if (reverseOf === 'top') {
        newDirection = 'bottom';
      }
    }
    return newDirection;
  }
}
