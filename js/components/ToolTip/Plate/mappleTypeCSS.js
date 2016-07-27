import mappleList from './mappleTypeList.js';
export default class MappleTypeCSS {
  constructor(backgroundColor, textColor, borderRadius, plateWidthHeight, tipPosition, direction, mappleType) {
    this.backgroundColor = backgroundColor;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.plateWidthHeight = plateWidthHeight;
    this.tipPosition = tipPosition;
    this.direction = direction;
    this.mappleType = mappleType;
    this.mappleTypeList = mappleList(backgroundColor, textColor);  
  }
  getPlateStyle() {
    return {
      color: this.mappleTypeList[this.mappleType].textColor,
      padding: '5px'
    }
  }
  getOuterPlateStyle() {
    return {
      position: 'fixed',
      zIndex: '10000',
      backgroundColor: this.mappleTypeList[this.mappleType].backgroundColor,
      borderRadius: `${this.borderRadius}px`,
      WebkitTransition: 'opacity .25s ease-in-out',
      msTransition: 'opacity .25s ease-in-out'
    }
  }
  getTipStyle(tipSize) {
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
      borderTop: `${tipSize}px solid ${this.getOuterPlateStyle().backgroundColor}`,
      left: tipLocationHorizontal
    };
    const styleRight = {
      borderTop: `${tipSize}px solid transparent`,
      borderBottom: `${tipSize}px solid transparent`,
      borderRight: `${tipSize}px solid ${this.getOuterPlateStyle().backgroundColor}`,
      top: tipLocationVertical,
      left: '-5px'
    };
    const styleBottom = {
      borderLeft: `${tipSize}px solid transparent`,
      borderRight: `${tipSize}px solid transparent`,
      borderBottom: `${tipSize}px solid ${this.getOuterPlateStyle().backgroundColor}`,
      top: `-${tipSize}px`,
      left: tipLocationHorizontal
    };
    const styleLeft = {
      borderTop: `${tipSize}px solid transparent`,
      borderBottom: `${tipSize}px solid transparent`,
      borderLeft: `${tipSize}px solid ${this.getOuterPlateStyle().backgroundColor}`,
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
}