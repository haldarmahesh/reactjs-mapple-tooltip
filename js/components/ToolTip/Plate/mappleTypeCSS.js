export default class MappleTypeCSS {
  constructor(backgroundColor, textColor, borderRadius, plateWidthHeight, tipPosition, direction, mappleType) {
    this.backgroundColor = backgroundColor;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.plateWidthHeight = plateWidthHeight;
    this.tipPosition = tipPosition;
    this.direction = direction;
    this.mappleType = mappleType;
    this.mappleTypeList = {
      default: {
        backgroundColor: this.backgroundColor,
        textColor: this.textColor
      },
      success: {
        backgroundColor: '#DFF2BF',
        textColor: '#5B931F'
      },
      warning: {
        backgroundColor: '#FEEFB3',
        textColor: '#9F6000'
      },
      info: {
        backgroundColor: '#BDE5F8',
        textColor: '#00529B'
      },
      error: {
        backgroundColor: '#FFBABA',
        textColor: '#DA0B16'
      }
    };
    // warning: {},
    //   info: {},
    //   error: {}
  }
  getPlateStyle() {
    return {
      backgroundColor: this.mappleTypeList[this.mappleType].backgroundColor,
      color: this.mappleTypeList[this.mappleType].textColor,
      padding: '5px',
      borderRadius: `${this.borderRadius}px`
    }
  }
  getOuterPlateStyle() {
    return {
      position: 'absolute',
      zIndex: '10000',
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
      borderTop: `${tipSize}px solid ${this.getPlateStyle().backgroundColor}`,
      left: tipLocationHorizontal
    };
    const styleRight = {
      borderTop: `${tipSize}px solid transparent`,
      borderBottom: `${tipSize}px solid transparent`,
      borderRight: `${tipSize}px solid ${this.getPlateStyle().backgroundColor}`,
      top: tipLocationVertical,
      left: '-5px'
    };
    const styleBottom = {
      borderLeft: `${tipSize}px solid transparent`,
      borderRight: `${tipSize}px solid transparent`,
      borderBottom: `${tipSize}px solid ${this.getPlateStyle().backgroundColor}`,
      top: `-${tipSize}px`,
      left: tipLocationHorizontal
    };
    const styleLeft = {
      borderTop: `${tipSize}px solid transparent`,
      borderBottom: `${tipSize}px solid transparent`,
      borderLeft: `${tipSize}px solid ${this.getPlateStyle().backgroundColor}`,
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