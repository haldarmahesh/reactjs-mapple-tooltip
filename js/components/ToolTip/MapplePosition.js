import { directions } from './helper/constants';
export default class MapplePosition {
  constructor(position, plateDom, curDirection, defaultDirection, float) {
    this.position = position;
    this.plateDom = plateDom;
    this.curDirection = curDirection;
    this.defaultDirection = defaultDirection || directions.TOP;
    this.float = float;
  }
  checkCorners() {
    let newDirection = this.curDirection;
    if (this.float) {
      if (this.isBeyondLeft()) {
        newDirection = directions.RIGHT;
      } else if (this.isBeyondRight()) {
        newDirection = directions.LEFT;
      } else if (this.isBeyondTop()) {
        newDirection = directions.BOTTOM;
      } else if (this.isBeyondBottom()) {
        newDirection = directions.TOP;
      }
    } else {
      if (this.isBeyondLeft()) {
        newDirection = directions.TOP;
      } else if (this.isBeyondRight()) {
        newDirection = directions.TOP;
      } else if (this.isBeyondTop()) {
        newDirection = directions.BOTTOM;
      } else if (this.isBeyondBottom()) {
        newDirection = directions.TOP;
      }
    }
    return newDirection;
  }
  isBeyondLeft() {
    return this.position.posX < 0 && this.curDirection === this.defaultDirection;
  }
  isBeyondRight() {
    return this.position.posX + this.plateDom.width > window.innerWidth
      && this.curDirection === this.defaultDirection;
  }
  isBeyondTop() {
    return this.position.posY < 0 && this.curDirection === this.defaultDirection;
  }
  isBeyondBottom() {
    return this.position.posY + this.plateDom.height > window.innerHeight
      && this.curDirection === this.defaultDirection;
  }
}
