import React, { Component } from 'react';
import MappleTypeCSS from './mappleTypeCSS';
import mappleTypeList from './mappleTypeList';

export default class Plate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pos: { x: -1000, y: -1000 },
      direction: 'top',
      originalPos: true
    };
  }
  componentDidMount() {
    this.props.updatePlateWidth(document.getElementById('mapple_' + this.props.currentId).getBoundingClientRect());
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      pos: nextProps.pos,
      direction: nextProps.direction
    });
  }

  render() {
    const { pos } = this.state;
    const opacity = this.props.visible ? '1' : '0';
    this.mappleTypeCSS = new MappleTypeCSS(this.props.backgroundColor,
      this.props.textColor,
      this.props.borderRadius,
      this.props.plateWidthHeight || { height: 0, width: 0 },
      this.props.tipPosition,
      this.props.direction,
      this.props.mappleType,
      this.props.shadow);
    const outerPlateStyle = this.mappleTypeCSS.getOuterPlateStyle();
    Object.assign(outerPlateStyle, {
      top: pos.y,
      left: pos.x,
      opacity
    });
    const style = this.mappleTypeCSS.getPlateStyle();
    return (
      <div id={`mapple_${this.props.currentId}`} className="mappleTip" style={outerPlateStyle}>
        <div style={style}>
          {this.props.content}
        </div>
        {this.renderTip()}
      </div>
    );
  }
  renderTip() {
    const currentMapple = mappleTypeList()[this.props.mappleType];
    return (
      <span>
        {currentMapple.border ? this.tipDom(6.5, currentMapple.textColor) : null}
        {this.tipDom(5, this.mappleTypeCSS.getOuterPlateStyle().backgroundColor)}
      </span>
    );
  }
  tipDom(tipSize, color) {
    const triangleTipStyle = this.mappleTypeCSS.getTipStyle(tipSize, color);
    return (
      <div className="tip" style={triangleTipStyle}>
      </div>
    );
  }
}
