import ReactDOM from 'react-dom';
export default class Dom {
  constructor(component) {
    this.domNode = ReactDOM.findDOMNode(component);
  }
  getDimensions() {
    return {
      width: this.domNode.offsetWidth,
      height: this.domNode.offsetHeight
    }
  }
}
