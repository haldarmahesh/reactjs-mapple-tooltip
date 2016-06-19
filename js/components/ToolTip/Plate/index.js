import React, { Component } from 'react';
export default class Plate extends Component {
  render() {
    const { pos } = this.props;
    console.log('pos', pos);
    const style = {
      position: 'absolute',
      top: pos.y,
      left: pos.x
    }
    return (
      <div style={style}>
        This is from Plate
      </div>
    );
  }
}
