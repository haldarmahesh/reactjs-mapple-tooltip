import React from 'react';
import mappleList from './mappleTypeList.js';
export default class MappleTypeCSS {
  constructor(backgroundColor, textColor, borderRadius, plateWidthHeight, tipPosition, direction, mappleType, shadow) {
    this.backgroundColor = backgroundColor;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.plateWidthHeight = plateWidthHeight;
    this.tipPosition = tipPosition;
    this.direction = direction;
    this.mappleType = mappleType;
    this.shadow = shadow;
    this.mappleTypeList = mappleList(backgroundColor, textColor);  
  }
  getPlateStyle() {
    return {
      color: this.mappleTypeList[this.mappleType].textColor,
      padding: '5px'
    }
  }
  getOuterPlateStyle() {
    const currentMapple =  this.mappleTypeList[this.mappleType];
    return {
      position: 'fixed',
      zIndex: '10000',
      boxShadow: this.shadow ? 'rgba(0, 0, 0, 0.45098) 0px 0px 12px' : null,
      backgroundColor: currentMapple.backgroundColor,
      border: currentMapple.border ? `1px solid ${currentMapple.textColor}` : null, 
      borderRadius: `${this.borderRadius}px`,
      WebkitTransition: 'opacity .25s ease-in-out',
      msTransition: 'opacity .25s ease-in-out'
    }
  }
  getTipStyle(tipSize, color) {
    const tipLocationVertical = `${(this.plateWidthHeight.height * this.tipPosition/100) - tipSize}px`;
    const tipLocationHorizontal = `${(this.plateWidthHeight.width * this.tipPosition/100) - tipSize}px`;
    const triangleTipStyle = {
      width: '0',
      position: 'absolute',
      height: '0'
    };
    const styleTop = {
      borderLeft: `${tipSize}px solid transparent`,
      borderRight: `${tipSize}px solid transparent`,
      borderTop: `${tipSize}px solid ${color}`,
      left: tipLocationHorizontal
    };
    const styleRight = {
      borderTop: `${tipSize}px solid transparent`,
      borderBottom: `${tipSize}px solid transparent`,
      borderRight: `${tipSize}px solid ${color}`,
      top: tipLocationVertical,
      left: '-5px'
    };
    const styleBottom = {
      borderLeft: `${tipSize}px solid transparent`,
      borderRight: `${tipSize}px solid transparent`,
      borderBottom: `${tipSize}px solid ${color}`,
      top: `-${tipSize}px`,
      left: tipLocationHorizontal
    };
    const styleLeft = {
      borderTop: `${tipSize}px solid transparent`,
      borderBottom: `${tipSize}px solid transparent`,
      borderLeft: `${tipSize}px solid ${color}`,
      top: tipLocationVertical, 
      right: `-${tipSize}px`
    }
    if(this.direction === 'top') {
      Object.assign(triangleTipStyle, styleTop);
    } else if(this.direction === 'right') {
      Object.assign(triangleTipStyle, styleRight);
    } else if(this.direction === 'bottom') {
      Object.assign(triangleTipStyle, styleBottom);
    } else if(this.direction === 'left') {
      Object.assign(triangleTipStyle, styleLeft);
    }
    return triangleTipStyle;
  }
  renderTip() {
    const currentMapple =  this.mappleTypeList[this.mappleType];
    return (
      <span>
        { currentMapple.border ? this.tipDom(6.5, currentMapple.textColor ) : null}
        {this.tipDom(5, this.getOuterPlateStyle().backgroundColor)}
      </span>
    );
  }
  tipDom(tipSize, color) {
    console.log(tipSize, color);
    const triangleTipStyle = this.getTipStyle(tipSize, color);
    return (
      <div className="tip" style={triangleTipStyle}>
      </div>
    );
  }
}