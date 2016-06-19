import React, { Component } from 'react';
export default class Plate extends Component {
  render() {
    const { pos } = this.props;
    const visible = this.props.visible ? 'visible' : 'hidden';
    const style = {
      position: 'absolute',
      top: pos.y,
      left: pos.x,
      backgroundColor: 'black',
      padding: '5px',
      color: 'white',
      visibility: visible
    }
    return (
      <div style={style}>
        This is from Plate
      </div>
    );
  }
}
