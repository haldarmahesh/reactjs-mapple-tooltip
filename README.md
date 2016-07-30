# Reactjs - Mapple ToolTip
An easy and customizable tool tip for your app.

Mapple is crafted in an elegant manner.

![Mapple Image](http://i.imgur.com/gKj819N.jpg)

##Highlights
* Start with _7 pre-defined Mapple ToolTip themes_
* _Customize_ the Mapplet ToolTip to get your own theme.
* Supports _multiline content_ in Mapple Tip
* Supports _images with text_ as Tip

## Installing
```
npm i reactjs-mappletooltip --save
```

## Usage
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

    <MappleToolTip float={true} direction={'bottom'}>
      <div>
        Float in bottom direction
      </div>
      <div>
        direction = 'bottom'<br/>
        float = true
      </div>
    </MappleToolTip>
}
```

![Default](http://i.imgur.com/qpW2ebr.gif)

> The above is `default` Mapple tool tip, with the default props.

Isn't it super easy to start with Mapple ToolTip :sunglasses:

The Mapple-ToolTip seeks for two child elements. When mouse pointer is hovered on the _first child_, div in the example, the mapple tool tip appears on top of first child with the _second child_ as the content within the tip.

## Preview of defined styles
![7styles](http://i.imgur.com/MGJOyci.gif)

