import React, { Component } from 'react';
import { ToolTip } from '../js';

export default class App extends Component {
  render() {
    const style={
      backgroundColor: 'red',
      width: '500px',
      padding: '10px'
    };
    return (
      <div>
        <h1>Hello, world.</h1>
        <ToolTip>
          <div className='tipDiv' style={style}>
            Hello wassup
          </div>
        </ToolTip>
        <ToolTip>
          <input type="text" />
        </ToolTip>
      </div>
    );
  }
}
