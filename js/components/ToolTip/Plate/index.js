import React, { Component } from 'react';
import Dom from '../helper/Dom';
export default class Plate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pos: {x: -1000, y: -1000},
      direction: 'top',
      originalPos: true
    }
  }
  componentDidUpdate(props) {
     if (!this.props.default) {

      //  console.log(props.mapple, props.pos);
        // console.log('trace',props.pos.y, props.mapple, plate);
        // const plate = new Dom(this.refs.asd).getDomInfo();        
        // if (plate.left < -15) {
        //   this.setState({
        //     pos: {
        //       x:  0,
        //       y: props.pos.y
        //     }
        //   });
        // } else if (plate.right > window.innerWidth) {
        //   this.setState({
        //     pos: {
        //       x: props.mapple.width - plate.width - 10,
        //       y: props.pos.y
        //     }
        //   })
        // } 
        // else if (plate.top < -10) {
        //   console.log('matter', props.pos.x, props.pos.y);
        //   this.setState({
        //     pos: {
        //       x: 20,
        //       y: 24
        //     },
        //     direction: 'bottom'
        //   })
        // }
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      pos: nextProps.pos,
      direction: nextProps.direction
    });
  }
  
  
  render() {
    const { pos, direction } = this.state;
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
