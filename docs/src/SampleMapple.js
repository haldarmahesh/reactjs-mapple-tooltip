import React, { Component } from 'react';
import { typeList } from 'mappleTypeList';
import Plate from 'mappletooltip/components/ToolTip/Plate';
import Position from 'mappletooltip/components/ToolTip/helper/Position';
import ToolTip from 'mappletooltip';

export default class SampleMapple extends Component {
  constructor(props) {
    super(props);
    this.update = false;
    this.state = {
      currentId: 908172311232,
      visible: true,
      updatePlateWidth: () => { },
      backgroundColor: 'black',
      textColor: 'white',
      default: true,
      float: false,
      mappleType: 'default',
      pos: { posX: 12, posY: 100 },
      direction: 'top',
      content: 'Preview Mapple',
      borderRadius: 3,
      tipPosition: 50,
      shadow: false,
      plateWidthHeight: { width: 200, height: 200 },
      fadeInAnimation: true
    };
    this.mappleTypeOptions = [];
    typeList().forEach((item) => {
      this.mappleTypeOptions.push(
        <option key={item} value={item}>{item}</option>
      );
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.update) {
      this.update = false;
      const plateDomInfo = document.getElementById('o4xFNdKxMQkZCsy_mapple_908172311232').getBoundingClientRect();
      const contentForMapple = document.getElementById('asd1233').getBoundingClientRect();
      const position = new Position();
      const newPositionAroundDom = position.getPositionAroundDom(
      this.state.direction, plateDomInfo, contentForMapple);
      this.setState({
        pos: newPositionAroundDom
      });
    }
  }

  componentDidMount() {
    const plateDomInfo = document.getElementById('o4xFNdKxMQkZCsy_mapple_908172311232').getBoundingClientRect();
    const contentForMapple = document.getElementById('asd1233').getBoundingClientRect();
    const position = new Position();
    const newPositionAroundDom = position.getPositionAroundDom(
    this.state.direction, plateDomInfo, contentForMapple);
    this.setState({
      pos: newPositionAroundDom,
      plateWidthHeight: { width: plateDomInfo.width, height: plateDomInfo.height }
    });
  }

  render() {
    return (
      <div>
        <h1>Generate you React Mapple ToolTip now</h1>
        <div style={{ overflow: 'auto' }}>
          <div style={{ width: '400px', float: 'left' }}>
            {this.renderDirectionOptions()}
            {this.renderMappleTypeOtions()}
            {this.renderShadowOptions()}
            {this.renderFloatOptions()}
            {this.renderAnimation()}
            {this.renderBorderRadiusOptions()}
            {this.renderTipPositionOptions()}
          </div>
          <div style={{ width: '400px', float: 'left' }}>
            {this.renderCreateMapple()}
            {this.renderTryHere()}
          </div>
        </div>
        <div>
        {this.renderCode()}
          <h2>Installing</h2>
          <pre>
          npm i reactjs-mappletooltip --save
          </pre>
          <span className="content">
            <h2>More details</h2>
            <div className="well">
              <a href="https://github.com/haldarmahesh/reactjs-mapple-tooltip#reactjs---mapple-tooltip" target="_blank">
              README.md
            </a>
            </div>
          </span>
          {this.renderFooter()}
        </div>
      </div>
    );
  }
  renderFooter() {
    return (
      <footer className="footer">
          Reactjs MappleToolTip by Mahesh Haldar
      </footer>
    );
  }
  renderAdvancedContent() {
    return (
      <div>
        You can embed any html content and dom with css to generate the kind of style and dom structure you want within the tip.
        <ToolTip style={{ margin: '200px', padding: '0px', border: '1px solid blue' }}>
          <div>
          Hey hover here
          </div>
          <div>
            <table className="tablem table-striped">
              <th>
                <td>Props</td>
                <td>Description</td>
              </th>
              <tr>
                <td>asdasd</td>
                <td>qweqwe</td>
              </tr>
            </table>
          </div>
        </ToolTip>
      </div>
    );
  }
  renderCode() {
    this.timer = null;
    window.addEventListener('scroll', () => {
      clearTimeout(this.timer);
      document.getElementById('o4xFNdKxMQkZCsy_mapple_908172311232').style.opacity = '0';
      this.timer = setTimeout(() => {
        document.getElementById('o4xFNdKxMQkZCsy_mapple_908172311232').style.opacity = '1';
        const plateDomInfo = document.getElementById('o4xFNdKxMQkZCsy_mapple_908172311232').getBoundingClientRect();
        const contentForMapple = document.getElementById('asd1233').getBoundingClientRect();
        const position = new Position();
        const newPositionAroundDom = position.getPositionAroundDom(
        this.state.direction, plateDomInfo, contentForMapple);
        this.setState({
          pos: newPositionAroundDom
        });
      }, 200);
    });
    let props = [this.state.direction !== 'top' ? `direction:<span class='strings'>'${this.state.direction}'</span>` : null,
     this.state.mappleType !== 'default' ? `mappleType: <span class='strings'>'${this.state.mappleType}'</span>` : null,
     this.state.shadow ? `shadow: <span class='values'>${this.state.shadow}</span>` : null,
     this.state.float ? `float: <span class='values'>${this.state.float}</span>` : null,
     this.state.fadeInAnimation ? null : `fadeInAnimation: <span class='values'>${this.state.fadeInAnimation}</span>`,
     this.state.borderRadius !== 3 && this.state.mappleType !== 'ching' ? `borderRadius: <span class='values'>${this.state.borderRadius}</span>` : null,
     this.state.tipPosition !== 50 ? `tipPosition: <span class='values'>${this.state.tipPosition}</span>` : null];
    props = props.filter((item) => {
      return item !== null;
    });
    const showConfig = props.length > 0 ? `\n  ${props.join(',\n  ')}` : null;
    const note = (<div><b>Note: </b><i>Use the <b>mappleConfig</b> configuration to generate multiple Mapple ToolTips with same configuration</i></div>);
    return (
      <div className="">
        <h2>Code to generate above Mapple ToolTip</h2>
        {showConfig ? note : null}
        <pre className="code">
          {showConfig ?
            <div
              dangerouslySetInnerHTML={{ __html:
              `<span class='keyword'>const</span> <span class='tag'>mappleConfig</span> = {${showConfig}}\n`
            }}
            />
              : null}
        &lt;
          <span className="tag">MappleToolTip</span>
          {showConfig ? ' {...mappleConfig}' : null}
          &gt;
          <br />
          &nbsp;&nbsp;&lt;<span className="tag">div</span>&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;Hover here to test your Mapple
          <br />
          &nbsp;&nbsp;&lt;/<span className="tag">div</span>&gt;
          <br />
          &nbsp;&nbsp;&lt;<span className="tag">div</span>&gt;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;This is cool
          <br />
          &nbsp;&nbsp;&lt;/<span className="tag">div</span>&gt;<br />
          &lt;/<span className="tag">MappleToolTip</span>&gt;
        </pre>
      </div>
    );
  }
  renderAnimation() {
    return (
      <div className="propRow">
        <div className="propCol pull-left">
        fadeInAnimation
        </div>
        <div className="btn-group pull-left optionCol">
          {this.propButton(true, 'fadeInAnimation', 'animation', this.handleAnimation, true)}
          {this.propButton(false, 'fadeInAnimation', 'no animation', this.handleAnimation, true)}
        </div>
      </div>
    );
  }
  renderTryHere() {
    return (
      <ToolTip
        direction={this.state.direction}
        float={this.state.float}
        borderRadius={this.state.borderRadius}
        tipPosition={this.state.tipPosition}
        mappleType={this.state.mappleType}
        shadow={this.state.shadow}
        fadeInAnimation={this.state.fadeInAnimation}
      style={{ position: 'absolute', left: 520, top: 300,
            padding: '20px',
            border: '1px solid #337AB7' }}
      >
        <div>
          Hover here to test your Mapple
        </div>
        <div>
          This is Cool
        </div>
      </ToolTip>
    );
  }
  renderCreateMapple() {
    const style = {
      display: 'table',
      position: 'relative'
    };
    return (
      <div style={style}>
        <Plate
          currentId={this.state.currentId}
          visible={this.state.visible}
          updatePlateWidth={this.state.updatePlateWidth}
          backgroundColor={this.state.backgroundColor}
          textColor={this.state.textColor}
          default={this.state.default}
          mappleType={this.state.mappleType}
          pos={this.state.pos}
          direction={this.state.direction}
          content={this.state.content}
          borderRadius={this.state.borderRadius}
          tipPosition={this.state.tipPosition}
          shadow={this.state.shadow}
          plateWidthHeight={this.state.plateWidthHeight}
          fadeInAnimation={this.state.fadeInAnimation}
        />
        <div
          id="asd1233" style={{ position: 'absolute', left: 200, top: 100,
          padding: '10px',
          border: '1px solid #337AB7'
        }}
        >
          Box
        </div>
      </div>
    );
  }
  renderFloatOptions() {
    return (
      <div className="propRow">
        <div className="propCol pull-left">
        float
        </div>
        <div className="btn-group pull-left optionCol">
          {this.propButton(true, 'float', 'float', this.handleFloat, true)}
          {this.propButton(false, 'float', 'no float', this.handleFloat, true)}
        </div>
      </div>
    );
  }
  renderShadowOptions() {
    return (
      <div className="propRow">
        <div className="propCol pull-left">
        shadow
        </div>
        <div className="btn-group pull-left optionCol">
          {this.propButton(true, 'shadow', 'shadow', this.handleShadow, true)}
          {this.propButton(false, 'shadow', 'no shadow', this.handleShadow, true)}
        </div>
      </div>
    );
  }
  renderTipPositionOptions() {
    return (
      <div className="propRow">
        <div className="propCol pull-left">
        tipPosition
        </div>
        <div className="btn-group pull-left optionCol">
          <input
          ref="tipPosition"
          type="range"
          defaultValue={this.state.tipPosition}
          onChange={this.handleTipPosition.bind(this)}
          max={100}
          />
          {`${this.state.tipPosition}%`}
        </div>
      </div>
    );
  }
  renderBorderRadiusOptions() {
    const textToShow = `${this.refs.borderRadius ? this.refs.borderRadius.value : this.state.borderRadius}px`;

    return (
      <div className="propRow">
        <div className="propCol pull-left">
        borderRadius
        </div>
        <div className="btn-group pull-left optionCol">
          <input
          ref="borderRadius"
          type="range"
          disabled={this.state.mappleType === 'ching'}
          defaultValue={this.state.borderRadius}
          onChange={this.handleBorderRadius.bind(this)}
          max={this.state.plateWidthHeight.height / 2}
          />
          {this.state.mappleType === 'ching' ? '0px' : textToShow}
        </div>
      </div>
    );
  }
  renderDirectionOptions() {
    return (
      <div className="propRow">
        <div className="propCol pull-left">
        direction
        </div>
        <div className="btn-group pull-left optionCol">
          {this.propButton('top', 'direction', 'top', this.handleDirection)}
          {this.propButton('right', 'direction', 'right', this.handleDirection)}
          {this.propButton('bottom', 'direction', 'bottom', this.handleDirection)}
          {this.propButton('left', 'direction', 'left', this.handleDirection)}
        </div>
      </div>
    );
  }
  renderMappleTypeOtions() {
    return (
      <div className="propRow">
        <div className="propCol pull-left">
        mappleType
        </div>
        <div className="btn-group pull-left optionCol">
          <select
          className="form-control"
          ref="mappleType"
          onChange={this.handleMappleType.bind(this)}
          >
            {this.mappleTypeOptions}
          </select>
        </div>
      </div>
    );
  }
  handleAnimation(animation) {
    this.setState({
      fadeInAnimation: animation
    });
  }
  handleDirection(direction) {
    this.update = true;
    this.setState({
      direction
    });
  }
  handleShadow(shadow) {
    this.update = true;
    this.setState({
      shadow
    });
  }
  handleMappleType() {
    this.setState({
      mappleType: this.refs.mappleType.value
    });
  }
  handleBorderRadius() {
    this.setState({
      borderRadius: parseInt(this.refs.borderRadius.value, 10)
    });
  }
  handleTipPosition() {
    this.setState({
      tipPosition: parseInt(this.refs.tipPosition.value, 10)
    });
  }
  handleFloat(float) {
    this.setState({
      float
    });
  }
  propButton(propVal, propName, showContent, onClick, bool = false) {
    let isActive = false;
    if (bool) {
      isActive = this.state[propName] === propVal;
    } else {
      isActive = this.state[propName] === propVal;
    }
    return (
      <input
        type="button"
        defaultValue={showContent}
        className={`btn ${isActive ? ' btn-primary' : 'btn-default'}`}
        onClick={onClick.bind(this, propVal)}
      />
  );
  }
}
