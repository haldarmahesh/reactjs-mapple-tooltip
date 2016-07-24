import React, { Component } from 'react';
import Dom from '../helper/Dom';
import MappleTypeCSS from './mappleTypeCSS';
export default class Plate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pos: {x: -1000, y: -1000},
      direction: 'top',
      originalPos: true
    }
  }
  // componentDidUpdate(props) {
  //    if (!this.props.default) {

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
  //   }
  // }
  componentWillReceiveProps(nextProps) {
    this.setState({
      pos: nextProps.pos,
      direction: nextProps.direction
    });
  }
  
  
  render() {
    const { pos, direction } = this.state;
    const opacity = this.props.visible ? '1' : '0';
    this.mappleTypeCSS = new MappleTypeCSS(this.props.backgroundColor,
      this.props.textColor,
      this.props.borderRadius,
      this.props.plateWidthHeight || {height: 0, width: 0},
      this.props.tipPosition,
      this.props.direction);
    
    const style = this.mappleTypeCSS.getPlateStyle();
    const triangleTipStyle = this.mappleTypeCSS.getTipStyle();
    return (
      <div ref={'asd'} style={{position: 'absolute',
        top: pos.y,
        left: pos.x,
        zIndex: '10000',
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
