import React, { Component } from 'react';
import MappleTypeCSS from './mappleTypeCSS';
import mappleTypeList from './mappleTypeList';
import ReactDom from 'react-dom';
import ReactDomServer from 'react-dom/server';

export default class Plate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pos: {x: -1000, y: -1000},
      direction: 'top',
      originalPos: true
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      pos: nextProps.pos,
      direction: nextProps.direction
    });
  }
  componentDidMount(state) {
    this.props.updatePlateWidth(document.getElementById('mapple_'+this.props.currentId).getBoundingClientRect());
  }
  
  
  
  render() {
    const { pos, direction } = this.state;
    const opacity = this.props.visible ? '1' : '0';
    this.mappleTypeCSS = new MappleTypeCSS(this.props.backgroundColor,
      this.props.textColor,
      this.props.borderRadius,
      this.props.plateWidthHeight || {height: 0, width: 0},
      this.props.tipPosition,
      this.props.direction,
      this.props.mappleType,
      this.props.shadow);
    const outerPlateStyle = this.mappleTypeCSS.getOuterPlateStyle();
    Object.assign(outerPlateStyle, {
      top: pos.y,
      left: pos.x,
      opacity: opacity
    });
    const style = this.mappleTypeCSS.getPlateStyle();
    return (
      <div id={`mapple_${this.props.currentId}`} className='mappleTip' style={outerPlateStyle}>
        <div style={style}>
          {this.props.content}
        </div>
        { this.renderTip() }
    </div>
    );
  }
  renderTip() {
    const currentMapple =  mappleTypeList()[this.props.mappleType];
    return (
      <span>
        { currentMapple.border ? this.tipDom(6.5, currentMapple.textColor ) : null}
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
