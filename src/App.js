import React, { Component } from 'react';
import { ToolTip } from '../js';

export default class App extends Component {
  render() {
    const style={
      backgroundColor: 'red',
      width: '500px',
      padding: '10px'
    };
    const toolTipConfig = {
      direction: 'bottom',
      float: true
    } 
    return (
      <div>
        <h1>Hello, world.</h1>
        <ToolTip {...toolTipConfig}>
          <div className='tipDiv' style={style}>
            Hello wassup
          </div>
          <div>
            Mahesh
          </div>
        </ToolTip>
        <ToolTip {...toolTipConfig}>
          <input type="text" />
          <div>
            hello
          </div>
        </ToolTip>
      </div>
    );
  }
}
