export default class MappleTypeCSS {
  constructor(backgroundColor, textColor, borderRadius, plateWidthHeight, tipPosition, direction) {
    this.backgroundColor = backgroundColor;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.plateWidthHeight = plateWidthHeight;
    this.tipPosition = tipPosition;
    this.direction = direction;
  }
  getPlateStyle() {
    return {
      backgroundColor: this.backgroundColor,
      color: this.textColor,
      padding: '5px',
      borderRadius: `${this.borderRadius}px`
    }
  }
  getTipStyle() {
    const tipLocationVertical = `${(this.plateWidthHeight.height * this.tipPosition/100) - 5}px`;
    const tipLocationHorizontal = `${(this.plateWidthHeight.width * this.tipPosition/100) - 5}px`;
    const triangleTipStyle = {
      width: '0',
      position: 'absolute',
      height: '0'
    };
    const styleTop = {
      borderLeft: '5px solid transparent',
      borderRight: '5px solid transparent',
      borderTop: `5px solid ${this.backgroundColor}`,
      left: tipLocationHorizontal
    };
    const styleRight = {
      borderTop: '5px solid transparent',
      borderBottom: '5px solid transparent',
      borderRight: `5px solid ${this.backgroundColor}`,
      top: tipLocationVertical,
      left: '-5px'
    };
    const styleBottom = {
      borderLeft: '5px solid transparent',
      borderRight: '5px solid transparent',
      borderBottom: `5px solid ${this.backgroundColor}`,
      top: '-5px',
      left: tipLocationHorizontal
    };
    const styleLeft = {
      borderTop: '5px solid transparent',
      borderBottom: '5px solid transparent',
      borderLeft: `5px solid ${this.backgroundColor}`,
      top: tipLocationVertical,
      right: '-5px'
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