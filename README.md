
[![Build Status](https://travis-ci.org/haldarmahesh/reactjs-mapple-tooltip.svg?branch=master)](https://travis-ci.org/haldarmahesh/reactjs-mapple-tooltip)
[![npm version](https://badge.fury.io/js/reactjs-mappletooltip.svg)](https://badge.fury.io/js/reactjs-mappletooltip)
[![NPM license](https://img.shields.io/github/license/hyperium/hyper.svg)](https://www.npmjs.com/package/reactjs-mappletooltip)
# Reactjs - Mapple ToolTip
A light weighted, easy and customizable tool tip for your app. Mapple is crafted in an elegant manner.

![Mapple Image](http://i.imgur.com/gKj819N.jpg)

## Installing
```
npm i reactjs-mappletooltip --save
```

## Usage

![Default](http://i.imgur.com/O8MzzBo.gif)

```
var MappleToolTip = require('reactjs-mappletooltip');
const PageWithToolTip = () => {
    <MappleToolTip>
      <div>
        Show Mapple Tip on this
      </div>
      <div>
        Hey! this is damn easy
      </div>
    </MappleToolTip>

    <MappleToolTip float={true} direction={'bottom'} mappleType={'warning'}>
      <div>
        Float in bottom direction
      </div>
      <div>
        direction = 'bottom'<br/>
        float = true<br/>
        mappleType = 'warning'
      </div>
    </MappleToolTip>
}
```
Isn't it super easy to start with Mapple ToolTip :sunglasses:

The Mapple-ToolTip seeks for two child elements. When the mouse pointer is hovered on the _first child_, div in the example, the Mapple ToolTip appears on top of the first child with the _second child_ as the content within the tip.


## Preview of defined styles
![7styles](http://i.imgur.com/MGJOyci.gif)

## Mapple Tool Tip Props

<table>
    <tr>
        <th>Prop Name</th>
        <th>Desciption</th>
        <th>Options</th>
        <th>Type</th>
    </tr>
    <tr>
        <td>direction</td>
        <td>Direction of the Mapple tip to be rendered</td>
        <td>
        * top (default)<br/>
        * right<br/>
        * bottom<br/>
        * left
        </td>
        <td>string</td>
    </tr>
    <tr>
        <td>float</td>
        <td>If set true, the Mapple floats with the cursor</td>
        <td>* false (default)<br/>
        * true</td>
        <td>boolean</td>
    <tr>
      <td>tipPosition</td>
      <td>Sets the position of triangular tip, under the Mapple Tip.<br/>Ranging from 0-100 percent.</td>
      <td>50 (default)</br>
      0 - 100</td>
      <td>number (percentage)</td>
    </tr>
    <tr>
      <td>mappleType</td>
      <td>Directly use the predefined 7 types of Mapple style</td>
      <td>* default (default)<br/>
          * light<br/>
          * contra<br/>
          * success<br/>
          * warning<br/>
          * info<br/>
          * error
      </td>
      <td>string</td>
    </tr>
    <tr>
      <td>backgroundColor</td>
      <td>Sets the background of the Mapple tip.<br/>This overwrites the defined Mapple themes</td>
      <td>black (default)<br/>
      any color<br/></td>
      <td>string</td>
    </tr>
    <tr>
      <td>textColor</td>
      <td>Sets the color of text of the Mapple Tip</td>
      <td>white (default)<br/>any color<br/></td>
      <td>string</td>
    </tr>
    <tr>
      <td>shadow</td>
      <td>Sets the shadow of the Mapple tip</td>
      <td>* false (default) </br>
        * true
      </td>
      <td>
      boolean
      </td>
    <tr/>
    </tr>
</table>​

## To do feature
* Add option to show Mapple on click
* Add different types of animations.
* Add method Callbacks
* Set zIndex
