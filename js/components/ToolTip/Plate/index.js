import React, { Component } from 'react';
export default class Plate extends Component {
  render() {
    const { pos, direction } = this.props;
    const opacity = this.props.visible ? '1' : '0';
    const plateWidthHeight = this.props.plateWidthHeight || {height: 0, width: 0};
    const style = {
      backgroundColor: 'black',
      padding: '5px',
      color: 'white'
    }
    const triangleTipStyle = {
      width: '0',
      position: 'absolute',
      height: '0'
    };
    const styleTop = {
      borderLeft: '5px solid transparent',
      borderRight: '5px solid transparent',
      borderTop: `5px solid ${style.backgroundColor}`,
      left: '46%'
    };
    const styleRight = {
      borderTop: '5px solid transparent',
      borderBottom: '5px solid transparent',
      borderRight: `5px solid ${style.backgroundColor}`,
      top: (plateWidthHeight.height/2 - 5)+ 'px',
      left: '-5px'
    };
    const styleBottom = {
      borderLeft: '5px solid transparent',
      borderRight: '5px solid transparent',
      borderBottom: `5px solid ${style.backgroundColor}`,
      top: '-5px',
      left: '46%'
    };
    const styleLeft = {
      borderTop: '5px solid transparent',
      borderBottom: '5px solid transparent',
      borderLeft: `5px solid ${style.backgroundColor}`,
      top: (plateWidthHeight.height/2 - 5)+ 'px',
      right: '-5px'
    }
    if(direction === 'top') {
      Object.assign(triangleTipStyle, styleTop);
    } else if(direction === 'right') {
      Object.assign(triangleTipStyle, styleRight);
    } else if(direction === 'bottom') {
      Object.assign(triangleTipStyle, styleBottom);
    } else if(direction === 'left') {
      Object.assign(triangleTipStyle, styleLeft);
    }
    return (
      <div ref={'asd'} style={{position: 'absolute',
        top: pos.y,
        left: pos.x,
        opacity: opacity,
      WebkitTransition: 'opacity .25s ease-in-out',
      msTransition: 'opacity .25s ease-in-out'}}>
        <div style={style}>
          {this.props.content}
        </div>
        <div className="tip" style={triangleTipStyle}>
        </div>
    </div>
    );
  }
}
