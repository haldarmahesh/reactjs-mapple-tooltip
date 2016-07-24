export default class Position {
  constructor() {
    this.gap = 10;
  }
  getFixedCoordinates(event) {
    const target = event.currentTarget.getBoundingClientRect();
    return {
      x: target.width / 2 + Math.abs(target.left),
      y: target.top
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
      x: event.clientX,
      y: event.clientY
    }
  }
  getPositionAroundDom(direction, plate, mapple) {
    let distanceX = 0;
    let distanceY = 0;
    let x = 0;
    let y = 0;
    switch (direction) {
      case 'top':
        distanceX = 0;
        distanceY = -this.gap;
        return {
          x:  mapple.width/2 - plate.width/2 + distanceX,
          y: - plate.height + distanceY
        };
      case 'right':
        distanceX = this.gap + 5;
        distanceY = 0;
        return {
          x:  mapple.width + distanceX,
          y: -plate.height / 2 + mapple.height / 2
        };
      case 'bottom':
        distanceX = 0;
        distanceY = this.gap;
        return {
          x:  mapple.width / 2 - plate.width / 2 + distanceX,
          y: mapple.height + distanceY
        };
      case 'left':
        distanceX = -this.gap;
        distanceY = 0;
        return {
          x:  -plate.width + distanceX,
          y: -plate.height / 2 + mapple.height / 2
        };   
      default:
        return {
          x: -1000,
          y: -1000
        };
    }
  }
  getPositionAroundCursor(referenceXY, direction, plate, mapple) {
    let distanceX = 0;
    let distanceY = 0;
    let x = 0;
    let y = 0;
    switch (direction) {
      case 'top':
        distanceX = 0;
        distanceY = -this.gap;
        return {
          x: referenceXY.x - mapple.left - plate.width / 2 + distanceX,
          y: referenceXY.y - mapple.top - plate.height + distanceY
        };
      case 'right':
        distanceX = this.gap + 5;
        distanceY = 0;
        return {
          x: referenceXY.x - mapple.left + distanceX,
          y: referenceXY.y - plate.height/2 - mapple.top
        };
      case 'bottom':
        distanceX = 0;
        distanceY = this.gap + 10;
        return {
          x: referenceXY.x - mapple.left - plate.width / 2 + distanceX,
          y: referenceXY.y - mapple.top + distanceY
        };
      case 'left':
        distanceX = -this.gap;
        distanceY = 0;
        return {
          x: referenceXY.x - mapple.left - plate.width + distanceX,
          y: referenceXY.y - plate.height/2 - mapple.top
        };   
      default:
        return {
          x: -1000,
          y: -1000
        };
    }
  }
}
