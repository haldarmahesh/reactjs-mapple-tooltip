import React, { Component } from 'react';
import Plate from './Plate';
import Position from './helper/Position.js';
import Dom from './helper/Dom.js';
import { typeList } from './Plate/mappleTypeList.js';

export default class ToolTip extends Component {
  constructor(props) {
    super(props);
    this.mappleTypeList = typeList();    
    this.state = this.setPropsValues(props);
    this.setTime = null;
    this.timeOut = this.state.float ? 0 : 200;
    this.gap = 10;
    this.altered = false;
    this.lastPlateDom = null;
  }
  // componentDidUpdate(nextProps) {
  //   if (this.state.default) {
  //     const PlateDomNew = new Dom(this.refs.plateComp);
  //     console.log(PlateDomNew.getDomInfo(), this.state.default);
  //   }
  // }
  componentDidMount() {
    this.setState({
      mappleInfo: this.getPlateAndMappleInfo().mapple
    })
  }
  
  render() {
    const { mouseIsOver } = this.state;
    const style = {
      display: 'table',
      position: 'relative'
    }
    return (
      <span style={this.props.style}>
        <span style={style}
          onMouseEnter={event => ::this.handleMouseEnter(event)}
          onMouseLeave={::this.handleMouseLeave}
          onMouseMove={event => ::this.handleMouseMove(event)}>
          <Plate
          visible={this.state.mouseIsOver}
          ref={'plateComp'}
          backgroundColor={this.state.backgroundColor}
          textColor={this.state.textColor}
          default={this.state.default}
          mappleType={this.state.mappleType}
          pos={this.state.pos}
          direction={this.state.direction}
          mapple={this.state.mappleInfo}
          content={this.props.children[1]}
          borderRadius={this.state.borderRadius}
          tipPosition={this.state.tipPosition}
          plateWidthHeight={this.state.plateWidthHeight}/>
          <div ref="contentForMapple">
            { this.props.children[0] }
          </div>
        </span>
      </span>
    );
  }
  getPlateAndMappleInfo() {
    const plateDom = new Dom(this.refs.plateComp).getDomInfo();
    const contentForMapple = new Dom(this.refs.contentForMapple).getDomInfo();
    return {
      plate: plateDom || {},
      mapple: contentForMapple || {}
    }
  }
  setPropsValues(props) {
    return {
      mouseIsOver: false,
      pos: {x: -1000, y: -1000},
      default: true,
      float: props.float || false,
      direction: props.direction || 'top',
      borderRadius: props.borderRadius || '3',
      tipPosition: props.tipPosition >= 0 && props.tipPosition <= 100 ? props.tipPosition : 50,
      backgroundColor: props.backgroundColor || 'black',
      textColor: props.textColor || 'white',
      mappleType: this.mappleTypeList.includes(props.mappleType) ? props.mappleType : 'default',
      changed: false
    };
  }
  handleMouseEnter(event) {
    const position = new Position();
    const fixedXY = position.getFixedCoordinates(event);
    const widthHeight = position.getWidthHeight(event);
    const plateDom = new Dom(this.refs.plateComp);
    const plateDimensions = plateDom.getDimensions();
    const plateDomInfo = this.getPlateAndMappleInfo().plate;
    const contentForMapple = this.getPlateAndMappleInfo().mapple;
    const newPositionAroundDom = position.getPositionAroundDom(this.state.direction, plateDomInfo, contentForMapple);
    const newPositionAroundCursor = position.getPositionAroundCursor(fixedXY, this.state.direction, plateDom.getDomInfo(), contentForMapple);
    this.setState({
      plateWidthHeight: plateDimensions
    });
    let newPosition = this.state.float ? newPositionAroundCursor : newPositionAroundDom;
    if (this.state.default) {
      newPosition = {
        x: -1000,
        y: -1000
      }
    }
    console.log('new', newPosition);
    this.setTime = setTimeout(() => {
      this.setState({
      mouseIsOver: true,
      default: false,
      pos: newPosition
    });
    // this.checkIfPlateGoingOut();
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
    const plateDom = this.getPlateAndMappleInfo().plate;
    const contentForMapple = this.getPlateAndMappleInfo().mapple;
    let newPositionAroundCursor = position.getPositionAroundCursor(mousePosition, this.state.direction, plateDom, contentForMapple);
    // this.checkIfPlateGoingOut();
    this.setState({
      pos: newPositionAroundCursor
    });
  }
  reverseDirection(reverseOf) {
    if (this.props.direction === 'bottom' || this.props.direction === 'left' || this.props.direction === 'top' || this.props.direction === 'right') {
      if (reverseOf === 'left') {
        return 'right';
      } else if (reverseOf === 'bottom') {
        return 'top';
      } else if (reverseOf === 'right') {
        return 'left';
      } else if (reverseOf === 'top') {
        return 'bottom';
      }
    }
  }
  checkIfPlateGoingOut() {
    const plateDom = this.getPlateAndMappleInfo().plate;
    const mapple = this.getPlateAndMappleInfo().mapple;
    let newDirection = '';
    if (!this.state.default) {
      let newPosition = this.state.pos;
      if (plateDom.left < 0 && !this.state.changed) {
        newDirection = this.reverseDirection('left');
        this.setState({
          direction: newDirection,
          changed: true
        });
      } else if(plateDom.top < 0 && !this.state.changed) {
        newDirection = this.reverseDirection('top');
        if (!this.state.float) {
          newPosition = {
            x: mapple.width - plateDom.width - 10,
            y: mapple.height + 10
          }  
        }
        this.setState({
          direction: newDirection,
          pos: newPosition,
          changed: true
        })
      } else if (plateDom.right > window.innerWidth && !this.state.changed) {
        newDirection = this.reverseDirection('right');
        if (!this.state.float) {
          newPosition = {
            x: mapple.width - plateDom.width - 10,
            y: this.state.pos.y
          } 
        }
        this.setState({
          direction: newDirection,
          pos: newPosition,
          changed: true
        });
      } else if (plateDom.bottom > window.innerHeight && !this.state.changed) {
        newDirection = this.reverseDirection('bottom');
        if (!this.state.float) {
          newPosition = {
            x: this.state.pos.x,
            y: -plateDom.height - 10
          }
        }
        this.setState({
          direction: newDirection,
          pos: newPosition,
          changed: true
        });
      }
    }
  }
}
