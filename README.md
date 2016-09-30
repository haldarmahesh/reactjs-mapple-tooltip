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

## Demo and Mapple ToolTip generator
Generate the config for your Mapple ToolTip from here [Demo and Generator](http://www.maheshhaldar.xyz/reactjs-mapple-tooltip/docs/)

## Usage

![Default](http://i.imgur.com/O8MzzBo.gif)

```
var MappleToolTip = require('reactjs-mappletooltip');
const PageWithToolTip = () => {
  return(
    <div>

      {/* Default Mapple */}

      <MappleToolTip>
        <div>
          Show Mapple Tip on this
        </div>
        <div>
          Hey! this is damn easy
        </div>
      </MappleToolTip>

      {/* customized Mapple */}

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
    </div>
  );
}
```
Isn't it super easy to start wwiith Mapple ToolTip :sunglasses:

The Mapple-ToolTip seeks for two child elements. When the mouse pointer is hovered on the _first child_, div in the example, the Mapple ToolTip appears on top of the first child with the _second child_ as the content within the tip.


## Preview of defined styles
![8styles](http://i.imgur.com/TOE8OXH.gif)

##Highlights
* Start with _8 pre-defined Mapple ToolTip themes_
* _Customize_ the Mapplet ToolTip to get your own theme.
* Supports _multiline content_ in Mapple Tip
* Supports _images with text_ within the Tip

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
            <ul>
                <li> top (default)</li>
                <li> right</li>
                <li> bottom</li>
                <li> left</li>
            <ul>
        </td>
        <td>string</td>
    </tr>
    <tr>
      <td>mappleType</td>
      <td>Directly use the predefined 8 types of Mapple style</td>
      <td>
        <ul>
            <li>default (default)</li>
            <li>ching</li>
            <li>light</li>
            <li>contra</li>
            <li>success</li>
            <li>warning</li>
            <li>info</li>
            <li>error</li>
        </ul>
      </td>
      <td>string</td>
    </tr>
    <tr>
        <td>float</td>
        <td>If set true, the Mapple floats with the cursor</td>
        <td>
            <ul>
                <li>false (default)</li>
                <li>true</li>
            </ul>
        <td>boolean</td>
    </tr>
    <tr>
        <td>shadow</td>
        <td>Sets the shadow of the Mapple tip</td>
        <td>
            <ul>
                <li>false (default)</li>
                <li>true</li>
            </ul>
      </td>
      <td>
      boolean
      </td>
    </tr>
    <tr>
        <td>
            fadeInAnimation
        </td>
        <td>Activates the 0.25s fade in transition to the Mapple visibility</td>
        <td>
            <ul>
                <li>true (default)</li>
                <li>false</li>
            </ul>
        </td>
        <td>
            boolean
        </td>
    </tr>
    <tr>
        <td>tipPosition</td>
        <td>Sets the position of triangular tip, under the Mapple Tip.<br/>Ranging from 0-100 percent.</td>
        <td>
            <ul>
                <li>50 (default)</li>
                <li>0 - 100</li>
            </ul>
        </td>
      <td>number (percentage)</td>
    </tr>
    <tr>
        <td>backgroundColor</td>
        <td>Sets the background of the Mapple tip.<br/>This overwrites the defined Mapple themes</td>
        <td>
            <ul>
                <li>black (default)</li>
                <li>any color</li>
            </ul>
        </td>
      <td>string</td>
    </tr>
    <tr>
        <td>textColor</td>
        <td>Sets the color of text of the Mapple Tip</td>
        <td>
            <ul>
                <li>white (default)</li>
                <li>any color</li>
            </ul>
        </td>
      <td>string</td>
    </tr>
    <tr>
        <td>padding</td>
        <td>Sets the padding in the Mapple Tip</td>
        <td>
            <ul>
                <li>'8px 12px' (default)</li>
                <li>CSS style padding property</li>
            </ul>
        </td>
      <td>string</td>
    </tr>
    <tr>
        <td>showMappleIf</td>
        <td>Display/hide the Mapple Tool Tip on the content, based on condition</td>
        <td>
            <ul>
                <li>true (default)</li>
                <li>any condition</li>
            </ul>
        </td>
      <td>boolean</td>
    </tr>
</table>

