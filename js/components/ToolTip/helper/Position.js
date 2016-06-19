export default class Position {
  constructor(event) {
    this.event =  event;
  }
  getFixed() {
    const target = this.event.currentTarget.getBoundingClientRect();
    console.log('target rects', target);
    console.log('explore', this.event.target);
    return {
      x: target.width / 2 + target.left,
      y: target.top
    }
  }

  getFloatCoordinates() {
    return {
      x: this.event.clientX,
      y: this.event.clientY
    }
  }

  getDimensions(comp) {
    console.log(comp);
    console.log(comp.getBoundingClientRect());
  }
}
