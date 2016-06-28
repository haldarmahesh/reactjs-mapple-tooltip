import React, { Component } from 'react';
export default class Plate extends Component {
  render() {
    const { pos } = this.props;
    const opacity = this.props.visible ? '1' : '0';
    const style = {
      backgroundColor: 'black',
      padding: '5px',
      color: 'white',
      minWidth: '100px'
    }
    const triangleTipStyle = {
      width: '0',
      position: 'absolute',
      height: '0',
      borderLeft: '5px solid transparent',
      borderRight: '5px solid transparent',
      borderTop: '5px solid',
      left: '46%'
    }
    return (
      <div style={{position: 'absolute',
        top: pos.y,
        left: pos.x,
        opacity: opacity,
      WebkitTransition: 'opacity .25s ease-in-out',
      msTransition: 'opacity .25s ease-in-out'}}>
        <div style={style}>
          This is from Plate
        </div>
        <div className="tip" style={triangleTipStyle}>
        </div>
    </div>
    );
  }
}
