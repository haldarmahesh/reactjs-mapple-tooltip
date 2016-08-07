import { directions } from '../helper/constants';
import mappleList from './mappleTypeList.js';
export default class MappleTypeCSS {
  constructor(backgroundColor, textColor, borderRadius, plateWidthHeight, tipPosition, direction, mappleType, shadow, fadeInAnimation) {
    this.mappleTypeList = mappleList(backgroundColor, textColor);
    this.mappleType = mappleType;
    this.currentMapple = this.mappleTypeList[this.mappleType];
    this.backgroundColor = backgroundColor;
    this.textColor = textColor;
    this.borderRadius = this.currentMapple.borderRadius === undefined ? borderRadius : this.currentMapple.borderRadius;
    this.plateWidthHeight = plateWidthHeight;
    this.tipPosition = tipPosition;
    this.direction = direction;
    this.shadow = shadow;
    this.fadeInAnimation = fadeInAnimation ? 0.25 : 0;
    this.borderRadius = this.mappleType === 'ching' ? 0 : this.borderRadius;
  }
  getPlateStyle() {
    const plateStyle = {
      color: this.mappleTypeList[this.mappleType].textColor
    };
    if (this.direction === directions.TOP) {
      Object.assign(plateStyle, {
        padding: this.mappleType === 'ching' ? '8px 12px 4px 12px' : '8px 12px',
        borderBottom: this.mappleType === 'ching' ? '4px solid red' : null
      });
    } else if (this.direction === directions.BOTTOM) {
      Object.assign(plateStyle, {
        padding: this.mappleType === 'ching' ? '8px 12px 8px 12px' : '8px 12px',
        borderTop: this.mappleType === 'ching' ? '4px solid red' : null
      });
    } else if (this.direction === directions.LEFT) {
      Object.assign(plateStyle, {
        padding: this.mappleType === 'ching' ? '8px 12px' : '8px 12px',
        borderRight: this.mappleType === 'ching' ? '4px solid red' : null
      });
    } else if (this.direction === directions.RIGHT) {
      Object.assign(plateStyle, {
        padding: this.mappleType === 'ching' ? '8px 12px' : '8px 12px',
        borderLeft: this.mappleType === 'ching' ? '4px solid red' : null
      });
    }
    return plateStyle;
  }
  getOuterPlateStyle() {
    return {
      position: 'fixed',
      zIndex: '10000',
      boxShadow: this.shadow ? 'rgba(0, 0, 0, 0.45098) 0px 0px 12px' : null,
      backgroundColor: this.currentMapple.backgroundColor,
      border: this.currentMapple.border ? `1px solid ${this.currentMapple.borderColor || this.currentMapple.textColor}` : null,
      borderRadius: `${this.borderRadius}px`,
      WebkitTransition: `opacity ${this.fadeInAnimation}s ease-in-out`,
      msTransition: `opacity ${this.fadeInAnimation}s ease-in-out`
    };
  }
  getTipStyle(tipSize, color) {
    const tipLocationVertical = `${(this.plateWidthHeight.height * this.tipPosition / 100) - tipSize}px`;
    const tipLocationHorizontal = `${(this.plateWidthHeight.width * this.tipPosition / 100) - tipSize}px`;
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
      left: `-${tipSize}px`
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
    };
    if (this.direction === directions.TOP) {
      Object.assign(triangleTipStyle, styleTop);
    } else if (this.direction === directions.RIGHT) {
      Object.assign(triangleTipStyle, styleRight);
    } else if (this.direction === directions.BOTTOM) {
      Object.assign(triangleTipStyle, styleBottom);
    } else if (this.direction === directions.LEFT) {
      Object.assign(triangleTipStyle, styleLeft);
    }
    return triangleTipStyle;
  }
}
