import React, { Component } from 'react';
export default class Plate extends Component {
  render() {
    const { pos } = this.props;
    const style = {
      position: 'absolute',
      top: pos.y,
      left: pos.x,
      backgroundColor: 'black',
      padding: '5px',
      color: 'white'
    }
    return (
      <div style={style}>
        This is from Plate
      </div>
    );
  }
}
