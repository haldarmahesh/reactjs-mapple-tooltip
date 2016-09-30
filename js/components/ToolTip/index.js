import React, { Component, PropTypes } from 'react';
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
    this.timeOut = this.state.float ? 0 : 40;
    this.gap = 10;
    this.altered = false;
    this.plateInfo = { width: 0, height: 0 };
    count++;
  }

  componentWillReceiveProps(nextProps) {
    this.state = this.setPropsValues(nextProps);
  }

  render() {
    const style = {
      display: 'table',
      position: 'relative'
    };
    Object.assign(style, this.props.style);
    return (
        <span
          style={style}
          onMouseEnter={event => ::this.handleMouseEnter(event)}
          onMouseLeave={::this.handleMouseLeave}
          onMouseMove={event => ::this.handleMouseMove(event)}>
        { this.state.showMappleIf ?
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
            plateWidthHeight={this.state.plateWidthHeight || { height: 0, width: 0 }}
            fadeInAnimation={this.state.fadeInAnimation}
            padding={this.state.padding}
          /> : null}
          <div>
            {this.props.children[0]}
          </div>
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
      float: typeof(props.float) === 'boolean' ? props.float : false,
      direction: typeof(props.direction) === 'string' ? props.direction : directions.TOP,
      borderRadius: typeof(props.borderRadius) === 'number' ? props.borderRadius : 3,
      tipPosition: this.polishTipPosition(props.tipPosition),
      backgroundColor: typeof(props.backgroundColor) === 'string' ? props.backgroundColor : 'black',
      textColor: typeof(props.textColor) === 'string' ? props.textColor : 'white',
      mappleType: typeof(props.mappleType) === 'string' ? this.polishMappleType(props.mappleType) : 'default',
      shadow: typeof(props.shadow) === 'boolean' ? props.shadow : false,
      fadeInAnimation: typeof(props.fadeInAnimation) === 'boolean' ? props.fadeInAnimation : true,
      padding: typeof(props.padding) === 'string' ? props.padding : '8px 12px',
      showMappleIf: typeof(props.showMappleIf) === 'boolean' ? props.showMappleIf : true
    };
  }
  polishTipPosition(tipPosition) {
    let newTipPosition = 50;
    if (typeof(tipPosition) === 'number') {
      newTipPosition = tipPosition >= 0 && tipPosition <= 100 ? tipPosition : 50;
    }
    return newTipPosition;
  }
  polishMappleType(mappleType) {
    return this.mappleTypeList.includes(mappleType) ? mappleType : 'default';
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
}

ToolTip.propTypes = {
  direction: PropTypes.string,
  float: PropTypes.bool,
  borderRadius: PropTypes.number,
  tipPosition: PropTypes.number,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  mappleType: PropTypes.string,
  shadow: PropTypes.bool,
  fadeInAnimation: PropTypes.bool,
  padding: PropTypes.string,
  showMappleIf: PropTypes.bool
};

