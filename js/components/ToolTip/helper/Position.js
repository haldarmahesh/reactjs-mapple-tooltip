import { directions } from '../helper/constants';
export default class Position {
  constructor() {
    this.floatGap = 10;
    this.solidGap = 6;
  }
  getFixedCoordinates(event) {
    const target = event.currentTarget.getBoundingClientRect();
    return {
      posX: target.width / 2 + Math.abs(target.left),
      posY: target.top
    };
  }
  getWidthHeight(event) {
    const target = event.currentTarget.getBoundingClientRect();
    return {
      width: target.width,
      height: target.height
    };
  }

  getFloatCoordinates(event) {
    return {
      posX: event.clientX,
      posY: event.clientY
    };
  }
  getPositionAroundDom(direction, plate, mapple) {
    let distanceX = 0;
    let distanceY = 0;
    switch (direction) {
    case directions.TOP:
      distanceX = 0;
      distanceY = -this.solidGap;
      return {
        posX: mapple.left + mapple.width / 2 - plate.width / 2,
        posY: mapple.top - plate.height + distanceY
      };
    case directions.RIGHT:
      distanceX = this.solidGap;
      distanceY = 0;
      return {
        posX: mapple.right + distanceX,
        posY: mapple.bottom - plate.height / 2 - mapple.height / 2
      };
    case directions.BOTTOM:
      distanceX = 0;
      distanceY = this.solidGap;
      return {
        posX: mapple.left + mapple.width / 2 - plate.width / 2 + distanceX,
        posY: mapple.bottom + distanceY
      };
    case directions.LEFT:
      distanceX = -this.solidGap;
      distanceY = 0;
      return {
        posX: mapple.left - plate.width + distanceX,
        posY: mapple.top + mapple.height / 2 - plate.height / 2
      };
    default:
      return {
        posX: -1000,
        posY: -1000
      };
    }
  }
  getPositionAroundCursor(referenceXY, direction, plate, mapple) {
    let distanceX = 0;
    let distanceY = 0;
    switch (direction) {
    case directions.TOP:
      distanceX = 0;
      distanceY = -this.floatGap;
      return {
        posX: referenceXY.posX - plate.width / 2,
        posY: referenceXY.posY - plate.height + distanceY
      };
    case directions.RIGHT:
      distanceX = this.floatGap + 5;
      distanceY = 0;
      return {
        posX: referenceXY.posX + distanceX,
        posY: referenceXY.posY - plate.height / 2
      };
    case directions.BOTTOM:
      distanceX = 0;
      distanceY = this.floatGap + 10;
      return {
        posX: referenceXY.posX - plate.width / 2 + distanceX,
        posY: referenceXY.posY + distanceY
      };
    case directions.LEFT:
      distanceX = -this.floatGap;
      distanceY = 0;
      return {
        posX: referenceXY.posX - plate.width + distanceX,
        posY: referenceXY.posY - plate.height / 2
      };
    default:
      return {
        posX: -1000,
        posY: -1000
      };
    }
  }
}
