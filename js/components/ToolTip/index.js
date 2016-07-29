import React, { Component } from 'react';
import Plate from './Plate';
import Position from './helper/Position.js';
import { typeList } from './Plate/mappleTypeList.js';
import MapplePosition from './MapplePosition';
import { directions } from './helper/constants';
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

  updatePlateWidth(dimension) {
    this.plateInfo = dimension;
  }

  setPropsValues(props) {
    return {
      mouseIsOver: false,
      pos: { posX: -1000, posY: -1000 },
      default: true,
      float: props.float || false,
      direction: props.direction || directions.TOP,
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
    const { direction } = this.props;
    const { float } = this.state;
    const position = new Position();
    const fixedXY = position.getFixedCoordinates(event);
    const plateDomInfo = this.plateInfo;
    const contentForMapple = event.currentTarget.getBoundingClientRect();
    const curDirection = this.state.direction;
    const newPositionAroundDom = position.getPositionAroundDom(
      this.state.direction, plateDomInfo, contentForMapple);
    const newPositionAroundCursor = position.getPositionAroundCursor(
      fixedXY, this.state.direction, plateDomInfo, contentForMapple);
    const newPosition = this.state.float ? newPositionAroundCursor : newPositionAroundDom;
    const mapplePositionObj = new MapplePosition(
          newPosition, plateDomInfo, curDirection, direction, float);
    const newDirection = mapplePositionObj.checkCorners();
    this.setTime = setTimeout(() => {
      this.setState({
        mouseIsOver: true,
        default: false,
        pos: newPosition,
        direction: newDirection
      }, () => {
        let newPositionAroundDomNew = this.state.float
          ? position.getPositionAroundCursor(
              fixedXY, this.state.direction, plateDomInfo, contentForMapple)
          : position.getPositionAroundDom(this.state.direction, plateDomInfo, contentForMapple);
        if (!this.state.default && this.state.float) {
          newPositionAroundDomNew = {
            posX: -1000,
            posY: -1000
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
    const { float } = this.state;
    if (!float) {
      return;
    }
    const { direction } = this.props;
    const position = new Position(event);
    const mousePosition = position.getFloatCoordinates(event);
    const plateDom = this.plateInfo;
    const contentForMapple = event.currentTarget.getBoundingClientRect();
    const curDirection = this.state.direction;
    const newPositionAroundCursor = position.getPositionAroundCursor(
      mousePosition, curDirection, plateDom, contentForMapple
      );
    const mapplePositionObj = new MapplePosition(
      newPositionAroundCursor, plateDom, curDirection, direction, float
      );
    const newDirection = mapplePositionObj.checkCorners();
    this.setState({
      pos: newPositionAroundCursor,
      direction: newDirection
    });
  }
  reverseDirection(reverseOf) {
    const defaultDirection = this.props.direction || directions.TOP;
    let newDirection = defaultDirection;
    if (defaultDirection === directions.BOTTOM || defaultDirection === directions.LEFT || defaultDirection === directions.TOP || defaultDirection === directions.RIGHT) {
      if (reverseOf === directions.LEFT) {
        newDirection = directions.RIGHT;
      } else if (reverseOf === directions.BOTTOM) {
        newDirection = directions.TOP;
      } else if (reverseOf === directions.RIGHT) {
        newDirection = directions.LEFT;
      } else if (reverseOf === directions.TOP) {
        newDirection = directions.BOTTOM;
      }
    }
    return newDirection;
  }
}
