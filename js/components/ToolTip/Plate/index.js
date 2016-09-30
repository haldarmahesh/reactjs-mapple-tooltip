import React, { Component, PropTypes } from 'react';
import MappleTypeCSS from './mappleTypeCSS';
import mappleTypeList from './mappleTypeList';
import { directions } from '../helper/constants';

export default class Plate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pos: { posX: -1000, posY: -1000 },
      direction: directions.TOP,
      originalPos: true
    };
  }
  componentDidMount() {
    this.props.updatePlateWidth(document.getElementById('o4xFNdKxMQkZCsy_mapple_' + this.props.currentId).getBoundingClientRect());
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
      this.props.plateWidthHeight,
      this.props.tipPosition,
      this.props.direction,
      this.props.mappleType,
      this.props.shadow,
      this.props.fadeInAnimation, this.props.padding);
    const outerPlateStyle = this.mappleTypeCSS.getOuterPlateStyle();
    Object.assign(outerPlateStyle, {
      top: pos.posY,
      left: pos.posX,
      opacity
    });
    const style = this.mappleTypeCSS.getPlateStyle();
    return (
      <div id={`o4xFNdKxMQkZCsy_mapple_${this.props.currentId}`} className="mappleTip" style={outerPlateStyle}>
        <div style={style}>
          {this.props.content}
        </div>
        {this.renderTip()}
      </div>
    );
  }
  renderTip() {
    const currentMapple = mappleTypeList()[this.props.mappleType];
    const tipColor = this.props.mappleType === 'ching' ? 'red' : this.mappleTypeCSS.getOuterPlateStyle().backgroundColor;
    return (
      <span>
        {currentMapple.border ? this.tipDom(6.5, currentMapple.borderColor || currentMapple.textColor) : null}
        {this.tipDom(5, tipColor)}
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

Plate.propTypes = {
  currentId: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired,
  updatePlateWidth: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  default: PropTypes.bool.isRequired,
  mappleType: PropTypes.string.isRequired,
  pos: PropTypes.object.isRequired,
  direction: PropTypes.string.isRequired,
  content: PropTypes.any.isRequired,
  borderRadius: PropTypes.number.isRequired,
  tipPosition: PropTypes.number.isRequired,
  shadow: PropTypes.bool.isRequired,
  plateWidthHeight: PropTypes.object.isRequired,
  fadeInAnimation: PropTypes.bool.isRequired,
  padding: PropTypes.string.isRequired
};
