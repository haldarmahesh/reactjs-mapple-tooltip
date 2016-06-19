export default class Position {
  constructor(event) {
    this.event =  event;
  }
  getFixed() {
    const target = this.event.currentTarget.getBoundingClientRect();
    return {
      x: target.width / 2 + target.left - 50,
      y: target.top - 25
    }
  }

  getFloatCoordinates() {
    return {
      x: this.event.clientX,
      y: this.event.clientY
    }
  }
}
