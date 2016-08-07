import React, { Component } from 'react';
import ToolTip from 'mappletooltip';
import mappleTypeList from 'mappleTypeList';

export default class PageWithToolTip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: 'top',
      float: false
    };
  }
  render() {
    return (<div>
      {this.toolTipList()}
    </div>);
  }
  getOptions() {
    return (
      <div>
        <div id="directions">
          <h3>Directions</h3>
          <button
            value="top"
            className="btn btn-primary form-control"
            style={{ backgroundColor: this.state.direction === 'top' ? 'blue' : null }}
            onClick={this.handleClick.bind(this, 'top')}
          />
          <input
          type="button"
          className="btn btn-primary form-control"
          style={{ backgroundColor: this.state.direction === 'bottom' ? 'blue' : null }}
          value="bottom" onClick={this.handleClick.bind(this, 'bottom')}
          />
          <input
          type="button"
          style={{ backgroundColor: this.state.direction === 'left' ? 'blue' : null }}
          value="left" onClick={this.handleClick.bind(this, 'left')}
          />
          <input
          type="button" value="right"
          style={{ backgroundColor: this.state.direction === 'right' ? 'blue' : null }}
          onClick={this.handleClick.bind(this, 'right')}
          />
        </div>
        <div id="float">
          <h3>Float</h3>
          <input
          type="button"
          style={{ backgroundColor: this.state.float ? 'blue' : null }}
          value="float" onClick={this.handleFloatClick.bind(this, true)}
          />
          <input
          type="button" value="don't float"
          style={{ backgroundColor: !this.state.float ? 'blue' : null }}
          onClick={this.handleFloatClick.bind(this, false)}
          />
        </div>
        <div id="float">
          <h3>Float</h3>
          <input type="button" value="float" onClick={this.handleFloatClick.bind(this, true)} />
          <input type="button" value="don't float" onClick={this.handleFloatClick.bind(this, false)} />
        </div>
      </div>
    );
  }
  handleClick(direction) {
    this.setState({
      direction
    });
  }
  handleFloatClick(float) {
    this.setState({
      float
    });
  }
  toolTipList() {
    return (
      <div>
        <div style={{ padding: '100px', marginBottom: '100px' }}>
        {this.getMapple('Default', 'Default Mapple')}
        {this.getMapple('Ching', 'Ching Mapple', 'ching')}
        {this.getMapple('Light', 'Light Mapple', 'light')}
        {this.getMapple('Contra', 'Contra Mapple', 'contra')}
        {this.getMapple('Success', 'Success Mapple', 'success')}
        {this.getMapple('Warning', 'Warning Mapple', 'warning')}
        {this.getMapple('Info', 'Info Mapple', 'info')}
        {this.getMapple('Error', 'Error Mapple', 'error')}
        </div>
      </div>);
  }
  getMapple(mapple, tip, type = 'default') {
    const styleObj = { float: 'left',
    padding: '10px',
    border: '1px solid black',
    margin: '0px 10px'
  };
    const currentMapple = mappleTypeList('black', 'white')[type];

    Object.assign(styleObj, {
      backgroundColor: currentMapple.backgroundColor,
      border: `1px solid ${currentMapple.borderColor}`,
      color: currentMapple.textColor
    });
    if (type === 'ching') {
      Object.assign(styleObj, {
        padding: '10px 10px 5px 10px',
        borderBottom: '5px solid red'
      });
    }
    return (<ToolTip
      style={styleObj}
      mappleType={type}
      direction={this.props.direction}
      float={this.props.float}
      borderRadius={this.props.borderRadius}
      tipPosition={this.props.tipPosition}
      shadow={this.props.shadow}
      fadeInAnimation={this.props.fadeInAnimation}
    >
      <div>
        <div>
          {mapple}
        </div>
      </div>
      <div>
      {tip}
      </div>
    </ToolTip>);
  }

}
