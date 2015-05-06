/* jshint ignore:start */

/* jshint ignore:end */

define('ember-nf-graph-examples/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'ember-nf-graph-examples/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  var App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('ember-nf-graph-examples/components/bars-with-line', ['exports', 'ember', 'ember-nf-graph-examples/services/data-generator'], function (exports, Ember, data_generator) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: ["bars-with-line"],

    barData: (function () {
      return data_generator.dataGenerator.simpleOrdinalData();
    }).property(),

    lineData: (function () {
      return data_generator.dataGenerator.simpleOrdinalData();
    }).property() });

});
define('ember-nf-graph-examples/components/basic-area-graph', ['exports', 'ember', 'ember-nf-graph-examples/services/data-generator'], function (exports, Ember, data_generator) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({

    graphData: (function () {
      return data_generator.dataGenerator.simpleTimeSeries();
    }).property()

  });

});
define('ember-nf-graph-examples/components/basic-bar-graph', ['exports', 'ember', 'ember-nf-graph-examples/services/data-generator'], function (exports, Ember, data_generator) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({

    graphData: (function () {
      return data_generator.dataGenerator.simpleOrdinalData();
    }).property()

  });

});
define('ember-nf-graph-examples/components/basic-line-graph', ['exports', 'ember', 'ember-nf-graph-examples/services/data-generator'], function (exports, Ember, data_generator) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({

    graphData: (function () {
      return data_generator.dataGenerator.simpleTimeSeries();
    }).property()

  });

});
define('ember-nf-graph-examples/components/brush-select-zoom', ['exports', 'ember', 'ember-nf-graph-examples/services/data-generator', 'ember-nf-graph-examples/helpers/format-hour-minute'], function (exports, Ember, data_generator, format_hour_minute) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({

    // Start and end dates for filtering the graph data.
    // These are the initial values and will change when brush actions
    // are executed below
    startTime: 0,
    endTime: Number.MAX_VALUE,

    // Domain values for right and left brush markers. These are modified
    // when the user drags with the mouse.
    selectLeft: undefined,
    selectRight: undefined,

    // Original graph data (no zoom or filter)
    graphData: (function () {
      return data_generator.dataGenerator.simpleTimeSeries();
    }).property(),

    // Graph data filtered by zoom extents. Filtered to include only data points
    // falling within the zoom start and end dates
    zoomData: (function () {
      var self = this;

      return this.get("graphData").filter(function (d) {
        return d.x >= self.get("startTime") && d.x <= self.get("endTime");
      });
    }).property("graphData", "startTime", "endTime"),

    // Formats the text shown on the brush selection markers.
    // This is using the format code imported from helper:format-hour-minute
    selectionDisplayFormatter: function selectionDisplayFormatter(ms) {
      return format_hour_minute.format(ms);
    },

    actions: {

      brushEnd: function brushEnd(e) {
        // Now that the brush drag is finished set new
        // zoom values for filtering the main graph data
        this.set("startTime", Ember['default'].get(e, "left.x"));
        this.set("endTime", Ember['default'].get(e, "right.x"));
      },

      reset: function reset() {
        // Reset teh zoom extents
        this.set("startTime", 0);
        this.set("endTime", Number.MAX_VALUE);
      }
    } });

});
define('ember-nf-graph-examples/components/detailed-line-graph', ['exports', 'ember', 'ember-nf-graph-examples/services/data-generator'], function (exports, Ember, data_generator) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({

    graphData: (function () {
      return data_generator.dataGenerator.simpleTimeSeries();
    }).property()

  });

});
define('ember-nf-graph-examples/components/graph-primitives', ['exports', 'ember', 'ember-nf-graph-examples/services/data-generator', 'ember-nf-graph-examples/services/utility'], function (exports, Ember, data_generator, utility) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({

    barHeight: 1,

    graphData: (function () {
      return data_generator.dataGenerator.simpleTimeSeries();
    }).property(),

    extent: (function () {
      var data = this.get("graphData");

      return {
        xMin: utility.min(data.map(function (d) {
          return d.start;
        })),
        xMax: utility.max(data.map(function (d) {
          return d.start;
        })),
        yMin: utility.min(data.map(function (d) {
          return d.index;
        })),
        yMax: utility.max(data.map(function (d) {
          return d.index;
        })) };
    }).property("graphData") });

});
define('ember-nf-graph-examples/components/mouse-tracking-data', ['exports', 'ember', 'ember-nf-graph-examples/services/data-generator'], function (exports, Ember, data_generator) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({

    graphData: (function () {
      return data_generator.dataGenerator.threeMetricTimeSeries();
    }).property()

  });

});
define('ember-nf-graph-examples/components/mouse-tracking', ['exports', 'ember', 'ember-nf-graph-examples/services/data-generator'], function (exports, Ember, data_generator) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({

    graphData: (function () {
      return data_generator.dataGenerator.threeMetricTimeSeries();
    }).property()

  });

});
define('ember-nf-graph-examples/components/nf-area-stack', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    tagName: "g",

    /**
      Used by `nf-area` to identify an area stack parent
      @property isAreaStack
      @type Boolean
      @default true
      @readonly
    */
    isAreaStack: true,

    /**
      The collection of `nf-area` components under this stack.
      @property areas
      @type Array
      @readonly
    */
    areas: Ember['default'].computed(function () {
      return Ember['default'].A();
    }),

    /**
      Registers an area component with this stack. Also links areas to one
      another by setting `nextArea` on each area component.
      @method registerArea
      @param area {Ember.Component} The area component to register.
    */
    registerArea: function registerArea(area) {
      var areas = this.get("areas");
      var prev = areas[areas.length - 1];

      if (prev) {
        prev.set("nextArea", area);
        area.set("prevArea", prev);
      }

      areas.pushObject(area);
    },

    /**
      Unregisters an area component from this stack. Also updates next
      and previous links.
      @method unregisterArea
      @param area {Ember.Component} the area to unregister
    */
    unregisterArea: function unregisterArea(area) {
      var prev = area.get("prevArea");
      var next = area.get("nextArea");

      if (next) {
        next.set("prevArea", prev);
      }

      if (prev) {
        prev.set("nextArea", next);
      }

      this.get("areas").removeObject(area);
    } });

});
define('ember-nf-graph-examples/components/nf-area', ['exports', 'ember', 'ember-nf-graph/mixins/graph-selectable-graphic', 'ember-nf-graph/mixins/graph-has-graph-parent', 'ember-nf-graph/mixins/graph-registered-graphic', 'ember-nf-graph/mixins/graph-data-graphic', 'ember-nf-graph/mixins/graph-area-utils', 'ember-nf-graph/mixins/graph-graphic-with-tracking-dot', 'ember-nf-graph/mixins/graph-requires-scale-source'], function (exports, Ember, Selectable, HasGraphParent, RegisteredGraphic, DataGraphic, AreaUtils, GraphicWithTrackingDot, RequireScaleSource) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(HasGraphParent['default'], RegisteredGraphic['default'], DataGraphic['default'], Selectable['default'], AreaUtils['default'], GraphicWithTrackingDot['default'], RequireScaleSource['default'], {

    tagName: "g",

    classNameBindings: [":nf-area", "selected", "selectable"],

    /**
      The type of d3 interpolator to use to create the area
      @property interpolator
      @type String
      @default 'linear'
    */
    interpolator: "linear",

    /**
      The previous area in the stack, if this area is part of an `nf-area-stack`
      @property prevArea
      @type components.nf-area
      @default null
    */
    prevArea: null,

    /**
      The next area in the stack, if this area is part of an `nf-area-stack`
      @property nextArea
      @type components.nf-area
      @default null
    */
    nextArea: null,

    init: function init() {
      this._super.apply(this, arguments);
      var stack = this.nearestWithProperty("isAreaStack");
      if (stack) {
        stack.registerArea(this);
        this.set("stack", stack);
      }
    },

    _unregister: Ember['default'].on("willDestroyElement", function () {
      var stack = this.get("stack", stack);
      if (stack) {
        stack.unregisterArea(this);
      }
    }),

    /**
      The computed set of next y values to use for the "bottom" of the graphed area.
      If the area is part of a stack, this will be the "top" of the next area in the stack,
      otherwise it will return an array of values at the "bottom" of the graph domain.
      @property nextYData
      @type Array
      @readonly
    */
    nextYData: Ember['default'].computed("renderedData.length", "nextArea.renderedData.@each", function () {
      var nextData = this.get("nextArea.renderedData") || [];
      var renderedDataLength = this.get("renderedData.length");

      var result = nextData.map(function (next) {
        return next[1];
      });

      while (result.length < renderedDataLength) {
        result.push(-99999999);
      }

      return result;
    }),

    /**
      The current rendered data "zipped" together with the nextYData.
      @property areaData
      @type Array
      @readonly
    */
    areaData: Ember['default'].computed("renderedData.@each", "nextYData.@each", function () {
      var nextYData = this.get("nextYData");
      return this.get("renderedData").map(function (r, i) {
        return [r[0], r[1], nextYData[i]];
      });
    }),

    /**
      Gets the area function to use to create the area SVG path data
      @property areaFn
      @type Function
      @readonly
    */
    areaFn: Ember['default'].computed("xScale", "yScale", "interpolator", function () {
      var xScale = this.get("xScale");
      var yScale = this.get("yScale");
      var interpolator = this.get("interpolator");
      return this.createAreaFn(xScale, yScale, interpolator);
    }),

    /**
      The SVG path data for the area
      @property d
      @type String
      @readonly
    */
    d: Ember['default'].computed("areaData", "areaFn", function () {
      var areaData = this.get("areaData");
      return this.get("areaFn")(areaData);
    }),

    click: function click() {
      if (this.get("selectable")) {
        this.toggleProperty("selected");
      }
    }
  });

});
define('ember-nf-graph-examples/components/nf-bars-group', ['exports', 'ember', 'ember-nf-graph/mixins/graph-has-graph-parent', 'ember-nf-graph/mixins/graph-requires-scale-source'], function (exports, Ember, HasGraphParent, RequiresScaleSource) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(HasGraphParent['default'], RequiresScaleSource['default'], {
    tagName: "g",

    isBarsGroup: true,

    groupPadding: 0.1,

    groupOuterPadding: 0,

    // either b-arses or fat, stupid hobbitses
    barses: Ember['default'].computed(function () {
      return Ember['default'].A();
    }),

    registerBars: function registerBars(bars) {
      var barses = this.get("barses");
      barses.pushObject(bars);
      bars.set("group", this);
      bars.set("groupIndex", barses.length - 1);
    },

    unregisterBars: function unregisterBars(bars) {
      if (bars) {
        bars.set("group", undefined);
        bars.set("groupIndex", undefined);
        this.get("barses").removeObject(bars);
      }
    },

    groupWidth: Ember['default'].computed("xScale", function () {
      var xScale = this.get("xScale");
      return xScale && xScale.rangeBand ? xScale.rangeBand() : NaN;
    }),

    barsDomain: Ember['default'].computed("barses.[]", function () {
      var len = this.get("barses.length") || 0;
      return d3.range(len);
    }),

    barScale: Ember['default'].computed("groupWidth", "barsDomain.[]", "groupPadding", "groupOuterPadding", function () {
      var barsDomain = this.get("barsDomain");
      var groupWidth = this.get("groupWidth");
      var groupPadding = this.get("groupPadding");
      var groupOuterPadding = this.get("groupOuterPadding");
      return d3.scale.ordinal().domain(barsDomain).rangeBands([0, groupWidth], groupPadding, groupOuterPadding);
    }),

    barsWidth: function barsWidth() {
      var scale = this.get("barScale");
      return scale && scale.rangeBand ? scale.rangeBand() : NaN;
    } });

});
define('ember-nf-graph-examples/components/nf-bars', ['exports', 'ember', 'ember-nf-graph/mixins/graph-has-graph-parent', 'ember-nf-graph/mixins/graph-data-graphic', 'ember-nf-graph/mixins/graph-registered-graphic', 'ember-nf-graph/utils/parse-property-expression', 'ember-nf-graph/mixins/graph-requires-scale-source', 'ember-nf-graph/mixins/graph-graphic-with-tracking-dot', 'ember-nf-graph/utils/nf/scale-utils', 'ember-nf-graph/utils/nf/svg-dom'], function (exports, Ember, HasGraphParent, DataGraphic, RegisteredGraphic, parsePropExpr, RequireScaleSource, GraphicWithTrackingDot, scale_utils, svg_dom) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(HasGraphParent['default'], RegisteredGraphic['default'], DataGraphic['default'], RequireScaleSource['default'], GraphicWithTrackingDot['default'], {
    tagName: "g",

    classNames: ["nf-bars"],

    /**
      The name of the property on each data item containing the className for the bar rectangle
      @property classprop
      @type String
      @default 'className'
    */
    classprop: "className",

    /**
      Gets the function to get the classname from each data item.
      @property getBarClass
      @readonly
      @private
    */
    getBarClass: Ember['default'].computed("classprop", function () {
      var classprop = this.get("classprop");
      return classprop ? parsePropExpr['default'](classprop) : null;
    }),

    /**
      The nf-bars-group this belongs to, if any.
      @property group
      @type components.nf-bars-group
      @default null
    */
    group: null,

    /**
      The index of this component within the group, if any.
      @property groupIndex
      @type Number
      @default null
    */
    groupIndex: null,

    /**
      The graph content height
      @property graphHeight
      @type Number
      @readonly
    */
    graphHeight: Ember['default'].computed.oneWay("graph.graphHeight"),

    /**
      A scale provided by nf-bars-group to offset the bar rectangle output
      @property barScale
      @type d3.scale
      @readonly
    */
    barScale: Ember['default'].computed.oneWay("group.barScale"),

    /**
      The width of each bar.
      @property barWidth
      @type Number
      @readonly
    */
    barWidth: Ember['default'].computed("xScale", "barScale", function () {
      var barScale = this.get("barScale");
      if (barScale) {
        return barScale.rangeBand();
      }
      var xScale = this.get("xScale");
      return xScale && xScale.rangeBand ? xScale.rangeBand() : 0;
    }),

    groupOffsetX: Ember['default'].computed("barScale", "groupIndex", function () {
      var barScale = this.get("barScale");
      var groupIndex = this.get("groupIndex");
      return scale_utils.normalizeScale(barScale, groupIndex);
    }),

    /**
      The bar models used to render the bars.
      @property bars
      @readonly
    */
    bars: Ember['default'].computed("xScale", "yScale", "renderedData.[]", "graphHeight", "getBarClass", "barWidth", "groupOffsetX", function () {
      var xScale = this.get("xScale");
      var yScale = this.get("yScale");
      var renderedData = this.get("renderedData");
      var graphHeight = this.get("graphHeight");
      var getBarClass = this.get("getBarClass");
      var groupOffsetX = this.get("groupOffsetX");

      if (!xScale || !yScale || !Ember['default'].isArray(renderedData)) {
        return null;
      }

      var w = this.get("barWidth");

      return Ember['default'].A(renderedData.map(function (d) {
        var barClass = "nf-bars-bar" + getBarClass ? " " + getBarClass(d.data) : "";
        var x = scale_utils.normalizeScale(xScale, d[0]) + groupOffsetX;
        var y = scale_utils.normalizeScale(yScale, d[1]);
        var h = graphHeight - y;
        return {
          path: svg_dom.getRectPath(x, y, w, h),
          className: barClass,
          data: d };
      }));
    }),

    /**
      The name of the action to fire when a bar is clicked.
      @property barClick
      @type String
      @default null
    */
    barClick: null,

    init: function init() {
      this._super.apply(this, arguments);
      var group = this.nearestWithProperty("isBarsGroup");
      if (group && group.registerBars) {
        group.registerBars(this);
      }
    },

    actions: {
      nfBarClickBar: function nfBarClickBar(dataPoint) {
        if (this.get("barClick")) {
          this.sendAction("barClick", {
            data: dataPoint.data,
            x: dataPoint[0],
            y: dataPoint[1],
            source: this,
            graph: this.get("graph") });
        }
      }
    }

  });

});
define('ember-nf-graph-examples/components/nf-brush-selection', ['exports', 'ember', 'ember-nf-graph/mixins/graph-has-graph-parent', 'ember-nf-graph/mixins/graph-requires-scale-source'], function (exports, Ember, HasGraphParent, RequiresScaleSource) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(HasGraphParent['default'], RequiresScaleSource['default'], {
    tagName: "g",

    left: undefined,

    right: undefined,

    formatter: null,

    textPadding: 3,

    autoWireUp: true,

    _autoBrushHandler: function _autoBrushHandler(e) {
      this.set("left", Ember['default'].get(e, "left.x"));
      this.set("right", Ember['default'].get(e, "right.x"));
    },

    _autoBrushEndHandler: function _autoBrushEndHandler(e) {
      this.set("left", undefined);
      this.set("right", undefined);
    },

    _wireToGraph: function _wireToGraph() {
      var graph = this.get("graph");
      var auto = this.get("autoWireUp");

      if (auto) {
        graph.on("didBrushStart", this, this._autoBrushHandler);
        graph.on("didBrush", this, this._autoBrushHandler);
        graph.on("didBrushEnd", this, this._autoBrushEndHandler);
      } else {
        graph.off("didBrushStart", this, this._autoBrushHandler);
        graph.off("didBrush", this, this._autoBrushHandler);
        graph.off("didBrushEnd", this, this._autoBrushEndHandler);
      }
    },

    _autoWireUpChanged: Ember['default'].on("didInsertElement", Ember['default'].observer("autoWireUp", function () {
      Ember['default'].run.once(this, this._wireToGraph);
    })),

    _updateLeftText: function _updateLeftText() {
      var root = d3.select(this.element);
      var g = root.select(".nf-brush-selection-left-display");
      var text = g.select(".nf-brush-selection-left-text");
      var bg = g.select(".nf-brush-selection-left-text-bg");

      var display = this.get("leftDisplay");

      if (!display) {
        g.attr("hidden", true);
      } else {
        g.attr("hidden", null);
      }

      text.text(display);

      var textPadding = this.get("textPadding");
      var leftX = this.get("leftX");
      var graphHeight = this.get("graphHeight");
      var bbox = text[0][0].getBBox();

      var doublePad = textPadding * 2;
      var width = bbox.width + doublePad;
      var height = bbox.height + doublePad;
      var x = Math.max(0, leftX - width);
      var y = graphHeight - height;

      g.attr("transform", "translate(" + x + " " + y + ")");

      text.attr("x", textPadding).attr("y", textPadding);

      bg.attr("width", width).attr("height", height);
    },

    _onLeftChange: Ember['default'].on("didInsertElement", Ember['default'].observer("left", "graphHeight", "textPadding", function () {
      Ember['default'].run.once(this, this._updateLeftText);
    })),

    _updateRightText: function _updateRightText() {
      var root = d3.select(this.element);
      var g = root.select(".nf-brush-selection-right-display");
      var text = g.select(".nf-brush-selection-right-text");
      var bg = g.select(".nf-brush-selection-right-text-bg");

      var display = this.get("rightDisplay");

      if (!display) {
        g.attr("hidden", true);
      } else {
        g.attr("hidden", null);
      }

      text.text(display);

      var textPadding = this.get("textPadding");
      var rightX = this.get("rightX");
      var graphHeight = this.get("graphHeight");
      var graphWidth = this.get("graphWidth");
      var bbox = text[0][0].getBBox();

      var doublePad = textPadding * 2;
      var width = bbox.width + doublePad;
      var height = bbox.height + doublePad;
      var x = Math.min(graphWidth - width, rightX);
      var y = graphHeight - height;

      g.attr("transform", "translate(" + x + " " + y + ")");

      text.attr("x", textPadding).attr("y", textPadding);

      bg.attr("width", width).attr("height", height);
    },

    _onRightChange: Ember['default'].on("didInsertElement", Ember['default'].observer("right", "graphHeight", "graphWidth", "textPadding", function () {
      Ember['default'].run.once(this, this._updateRightText);
    })),

    leftDisplay: Ember['default'].computed("left", "formatter", function () {
      var formatter = this.get("formatter");
      var left = this.get("left");
      return formatter ? formatter(left) : left;
    }),

    rightDisplay: Ember['default'].computed("right", "formatter", function () {
      var formatter = this.get("formatter");
      var right = this.get("right");
      return formatter ? formatter(right) : right;
    }),

    isVisible: Ember['default'].computed("left", "right", function () {
      var left = +this.get("left");
      var right = +this.get("right");
      return left === left && right === right;
    }),

    leftX: Ember['default'].computed("xScale", "left", function () {
      var left = this.get("left") || 0;
      var scale = this.get("xScale");
      return scale ? scale(left) : 0;
    }),

    rightX: Ember['default'].computed("xScale", "right", function () {
      var right = this.get("right") || 0;
      var scale = this.get("xScale");
      return scale ? scale(right) : 0;
    }),

    graphWidth: Ember['default'].computed.alias("graph.graphWidth"),

    graphHeight: Ember['default'].computed.alias("graph.graphHeight"),

    rightWidth: Ember['default'].computed("rightX", "graphWidth", function () {
      return this.get("graphWidth") - this.get("rightX") || 0;
    }) });

});
define('ember-nf-graph-examples/components/nf-crosshair', ['exports', 'ember', 'ember-nf-graph/mixins/graph-has-graph-parent'], function (exports, Ember, HasGraphParent) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(HasGraphParent['default'], {
    tagName: "g",

    classNames: ["nf-crosshair"],

    /**
      The height of the crosshair in pixels
      @property height
      @type Number
      @readonly
    */
    height: Ember['default'].computed.alias("graph.graphHeight"),

    /**
      The width of the crosshair in pixels
      @property width
      @type Number
      @readonly
    */
    width: Ember['default'].computed.alias("graph.graphWidth"),

    /**
      The x position of the crosshairs
      @property x
      @type Number
      @default 0
    */
    x: 0,

    /**
      The y position of the crosshairs
      @property y
      @type Number
      @default 0
    */
    y: 0,

    /**
      The visibility of the component
      @property isVisible
      @type Boolean
      @default false
    */
    isVisible: false,

    didContentHoverChange: function didContentHoverChange(e) {
      this.set("isVisible", true);
      this.set("x", e.get("mouseX"));
      this.set("y", e.get("mouseY"));
    },

    didContentHoverEnd: function didContentHoverEnd() {
      this.set("isVisible", false);
    },

    _setupBindings: Ember['default'].observer("graph.content", function () {
      var content = this.get("graph.content");
      if (content) {
        content.on("didHoverChange", this, this.didContentHoverChange);
        content.on("didHoverEnd", this, this.didContentHoverEnd);
      }
    }) });

});
define('ember-nf-graph-examples/components/nf-dot', ['exports', 'ember', 'ember-nf-graph/mixins/graph-has-graph-parent', 'ember-nf-graph/mixins/graph-requires-scale-source'], function (exports, Ember, HasGraphParent, RequireScaleSource) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(HasGraphParent['default'], RequireScaleSource['default'], {
    tagName: "circle",

    attributeBindings: ["r", "cy", "cx"],

    /**
      The x domain value at which to plot the circle
      @property x
      @type Number
      @default null
    */
    x: null,

    /**
      The y domain value at which to plot the circle
      @property x
      @type Number
      @default null
    */
    y: null,

    /**
      The radius of the circle plotted
      @property r
      @type Number
      @default 2.5
    */
    r: 2.5,

    hasX: Ember['default'].computed.notEmpty("x"),

    hasY: Ember['default'].computed.notEmpty("y"),

    /**
      The computed center x coordinate of the circle
      @property cx
      @type Number
      @private
      @readonly
    */
    cx: Ember['default'].computed("x", "xScale", "hasX", function () {
      var x = this.get("x");
      var xScale = this.get("xScale");
      var hasX = this.get("hasX");
      return hasX && xScale ? xScale(x) : -1;
    }),

    /**
      The computed center y coordinate of the circle
      @property cy
      @type Number
      @private
      @readonly
    */
    cy: Ember['default'].computed("y", "yScale", "hasY", function () {
      var y = this.get("y");
      var yScale = this.get("yScale");
      var hasY = this.get("hasY");
      return hasY && yScale ? yScale(y) : -1;
    }),

    /**
      Toggles the visibility of the dot. If x or y are
      not numbers, will return false.
      @property isVisible
      @private
      @readonly
    */
    isVisible: Ember['default'].computed.and("hasX", "hasY") });

});
define('ember-nf-graph-examples/components/nf-gg', ['exports', 'ember', 'ember-nf-graph/mixins/graph-has-graph-parent', 'ember-nf-graph/mixins/graph-requires-scale-source', 'ember-nf-graph/mixins/graph-selectable-graphic'], function (exports, Ember, HasGraphParent, RequireScaleSource, SelectableGraphic) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(HasGraphParent['default'], RequireScaleSource['default'], SelectableGraphic['default'], {
    tagName: "g",

    classNameBindings: [":nf-gg", "selectable", "selected"],

    isScaleSource: true,

    click: function click() {
      if (this.get("selectable")) {
        this.toggleProperty("selected");
      }
    }
  });

});
define('ember-nf-graph-examples/components/nf-graph-content', ['exports', 'ember', 'ember-nf-graph/mixins/graph-has-graph-parent', 'ember-nf-graph/utils/nf/graph-mouse-event'], function (exports, Ember, HasGraphParent, GraphMouseEvent) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(HasGraphParent['default'], {
    tagName: "g",

    classNames: ["nf-graph-content"],

    attributeBindings: ["transform", "clip-path"],

    "clip-path": Ember['default'].computed("graph.contentClipPathId", function () {
      var clipPathId = this.get("graph.contentClipPathId");
      return "url('#" + clipPathId + "')";
    }),

    /**
      The SVG transform for positioning the graph content
      @property transform
      @type String
      @readonly
    */
    transform: Ember['default'].computed("x", "y", function () {
      var x = this.get("x");
      var y = this.get("y");
      return "translate(" + x + " " + y + ")";
    }),

    /**
      The x position of the graph content
      @property x
      @type Number
      @readonly
    */
    x: Ember['default'].computed.alias("graph.graphX"),

    /**
      The calculated y position of the graph content
      @property y
      @type Number
      @readonly
    */
    y: Ember['default'].computed.alias("graph.graphY"),

    /**
      The calculated width of the graph content
      @property width
      @type Number
      @readonly
    */
    width: Ember['default'].computed.alias("graph.graphWidth"),

    /**
      The calculated height of the graph content.
      @property height
      @type Number
      @readonly
    */
    height: Ember['default'].computed.alias("graph.graphHeight"),

    /**
      An array containing models to render the grid lanes
      @property gridLanes
      @type Array
      @readonly
    */
    gridLanes: Ember['default'].computed("graph.yAxis.ticks", "width", "height", function () {
      var ticks = this.get("graph.yAxis.ticks");
      var width = this.get("width");
      var height = this.get("height");

      if (!ticks || ticks.length === 0) {
        return [];
      }

      var sorted = ticks.slice().sort(function (a, b) {
        return a.y - b.y;
      });

      if (sorted[0].y !== 0) {
        sorted.unshift({ y: 0 });
      }

      var lanes = sorted.reduce(function (lanes, tick, i) {
        var y = tick.y;
        var next = sorted[i + 1] || { y: height };
        var h = next.y - tick.y;
        lanes.push({
          x: 0,
          y: y,
          width: width,
          height: h
        });
        return lanes;
      }, []);

      return Ember['default'].A(lanes);
    }),

    /**
      The name of the hoverChange action to fire
      @property hoverChange
      @type String
      @default null
    */
    hoverChange: null,

    mouseMove: function mouseMove(e) {
      var context = GraphMouseEvent['default'].create({
        originalEvent: e,
        source: this,
        graphContentElement: this.element });

      this.trigger("didHoverChange", context);

      if (this.get("hoverChange")) {
        this.sendAction("hoverChange", context);
      }
    },

    /**
      The name of the hoverEnd action to fire
      @property hoverEnd
      @type String
      @default null
    */
    hoverEnd: null,

    mouseLeave: function mouseLeave(e) {
      var context = GraphMouseEvent['default'].create({
        originalEvent: e,
        source: this,
        graphContentElement: this.element
      });
      this.trigger("didHoverEnd", context);

      if (this.get("hoverEnd")) {
        this.sendAction("hoverEnd", context);
      }
    },

    /**
      An array containing models to render fret lines
      @property frets
      @type Array
      @readonly
    */
    frets: Ember['default'].computed.alias("graph.xAxis.ticks"),

    init: function init() {
      this._super.apply(this, arguments);
      this.set("graph.content", this);
    } });

});
define('ember-nf-graph-examples/components/nf-graph', ['exports', 'ember', 'ember-nf-graph/utils/nf/graph-position', 'ember-nf-graph/utils/nf/svg-dom', 'ember-nf-graph/utils/nf/array-helpers'], function (exports, Ember, GraphPosition, svg_dom, array_helpers) {

  'use strict';

  var Observable = Rx.Observable;

  var computedBool = Ember['default'].computed.bool;

  var scaleFactoryProperty = function scaleFactoryProperty(axis) {
    var scaleTypeKey = axis + "ScaleType";
    var powExponentKey = axis + "PowerExponent";

    return Ember['default'].computed(scaleTypeKey, powExponentKey, function () {
      var type = this.get(scaleTypeKey);
      var powExp = this.get(powExponentKey);

      type = typeof type === "string" ? type.toLowerCase() : "";

      if (type === "linear") {
        return d3.scale.linear;
      } else if (type === "ordinal") {
        return d3.scale.ordinal;
      } else if (type === "power" || type === "pow") {
        return function () {
          return d3.scale.pow().exponent(powExp);
        };
      } else if (type === "log") {
        return d3.scale.log;
      } else {
        Ember['default'].warn("unknown scale type: " + type);
        return d3.scale.linear;
      }
    });
  };

  var domainProperty = function domainProperty(axis) {
    var dataKey = axis + "Data";
    var minKey = axis + "Min";
    var maxKey = axis + "Max";
    var scaleTypeKey = axis + "ScaleType";
    var logMinKey = axis + "LogMin";

    return Ember['default'].computed(dataKey + ".@each", minKey, maxKey, scaleTypeKey, logMinKey, function () {
      var data = this.get(dataKey);
      var min = this.get(minKey);
      var max = this.get(maxKey);
      var scaleType = this.get(scaleTypeKey);
      var logMin = this.get(logMinKey);
      var domain = null;

      if (scaleType === "ordinal") {
        domain = data;
      } else {
        var extent = [min, max];

        if (scaleType === "log") {
          if (extent[0] <= 0) {
            extent[0] = logMin;
          }
          if (extent[1] <= 0) {
            extent[1] = logMin;
          }
        }

        domain = extent;
      }

      return domain;
    });
  };

  var scaleProperty = function scaleProperty(axis) {
    var scaleFactoryKey = axis + "ScaleFactory";
    var rangeKey = axis + "Range";
    var domainKey = axis + "Domain";
    var scaleTypeKey = axis + "ScaleType";
    var ordinalPaddingKey = axis + "OrdinalPadding";
    var ordinalOuterPaddingKey = axis + "OrdinalOuterPadding";

    return Ember['default'].computed(scaleFactoryKey, rangeKey, scaleTypeKey, ordinalPaddingKey, domainKey, ordinalOuterPaddingKey, function () {
      var scaleFactory = this.get(scaleFactoryKey);
      var range = this.get(rangeKey);
      var domain = this.get(domainKey);
      var scaleType = this.get(scaleTypeKey);
      var ordinalPadding = this.get(ordinalPaddingKey);
      var ordinalOuterPadding = this.get(ordinalOuterPaddingKey);

      var scale = scaleFactory();

      if (scaleType === "ordinal") {
        scale = scale.domain(domain).rangeBands(range, ordinalPadding, ordinalOuterPadding);
      } else {
        scale = scale.domain(domain).range(range).clamp(true);
      }

      return scale;
    });
  };

  var minProperty = function minProperty(axis, defaultTickCount) {
    var _DataExtent_ = axis + "DataExtent";
    var _MinMode_ = axis + "MinMode";
    var _Axis_tickCount_ = axis + "Axis.tickCount";
    var _ScaleFactory_ = axis + "ScaleFactory";
    var __Min_ = "_" + axis + "Min";
    var _prop_ = axis + "Min";

    return Ember['default'].computed(_MinMode_, _DataExtent_, _Axis_tickCount_, _ScaleFactory_, function (key, value) {
      var mode = this.get(_MinMode_);
      var ext;

      if (arguments.length > 1) {
        this[__Min_] = value;
      } else {
        var change = (function (val) {
          this.set(_prop_, val);
        }).bind(this);

        if (mode === "auto") {
          change(this.get(_DataExtent_)[0] || 0);
        } else if (mode === "push") {
          ext = this.get(_DataExtent_)[0];
          if (!isNaN(ext) && ext < this[__Min_]) {
            change(ext);
          }
        } else if (mode === "push-tick") {
          var extent = this.get(_DataExtent_);
          ext = extent[0];

          if (!isNaN(ext) && ext < this[__Min_]) {
            var tickCount = this.get(_Axis_tickCount_) || defaultTickCount;
            var newDomain = this.get(_ScaleFactory_)().domain(extent).nice(tickCount).domain();
            change(newDomain[0]);
          }
        }
      }

      return this[__Min_];
    });
  };

  var maxProperty = function maxProperty(axis, defaultTickCount) {
    var _DataExtent_ = axis + "DataExtent";
    var _Axis_tickCount_ = axis + "Axis.tickCount";
    var _ScaleFactory_ = axis + "ScaleFactory";
    var _MaxMode_ = axis + "MaxMode";
    var __Max_ = "_" + axis + "Max";
    var _prop_ = axis + "Max";

    return Ember['default'].computed(_MaxMode_, _DataExtent_, _ScaleFactory_, _Axis_tickCount_, function (key, value) {
      var mode = this.get(_MaxMode_);
      var ext;

      if (arguments.length > 1) {
        this[__Max_] = value;
      } else {
        var change = (function (val) {
          this.set(_prop_, val);
        }).bind(this);

        if (mode === "auto") {
          change(this.get(_DataExtent_)[1] || 1);
        } else if (mode === "push") {
          ext = this.get(_DataExtent_)[1];
          if (!isNaN(ext) && this[__Max_] < ext) {
            change(ext);
          }
        } else if (mode === "push-tick") {
          var extent = this.get(_DataExtent_);
          ext = extent[1];

          if (!isNaN(ext) && this[__Max_] < ext) {
            var tickCount = this.get(_Axis_tickCount_) || defaultTickCount;
            var newDomain = this.get(_ScaleFactory_)().domain(extent).nice(tickCount).domain();
            change(newDomain[1]);
          }
        }
      }

      return this[__Max_];
    });
  };

  /**
    A container component for building complex Cartesian graphs.

    ## Minimal example

         {{#nf-graph width=100 height=50}}
           {{#nf-graph-content}}
             {{nf-line data=lineData xprop="foo" yprop="bar"}}
           {{/nf-graph-content}}
         {{/nf-graph}}

    The above will create a simple 100x50 graph, with no axes, and a single line
    plotting the data it finds on each object in the array `lineData` at properties
    `foo` and `bar` for x and y values respectively.

    ## More advanced example

         {{#nf-graph width=500 height=300}}
           {{#nf-x-axis height="50"}}
             <text>{{tick.value}}</text>
           {{/nf-x-axis}}
     
           {{#nf-y-axis width="120"}}
             <text>{{tick.value}}</text>
           {{/nf-y-axis}}
     
           {{#nf-graph-content}}
             {{nf-line data=lineData xprop="foo" yprop="bar"}}
           {{/nf-graph-content}}
         {{/nf-graph}}

    The above example will create a 500x300 graph with both axes visible. The graph will not 
    render either axis unless its component is present.


    @namespace components
    @class nf-graph
    @extends Ember.Component
  */
  exports['default'] = Ember['default'].Component.extend({
    tagName: "div",

    /**
      The exponent to use for xScaleType "pow" or "power".
      @property xPowerExponent
      @type Number
      @default 3
    */
    xPowerExponent: 3,

    /**
      The exponent to use for yScaleType "pow" or "power".
      @property yPowerExponent
      @type Number
      @default 3
    */
    yPowerExponent: 3,

    /**
      The min value to use for xScaleType "log" if xMin <= 0
      @property xLogMin
      @type Number
      @default 0.1
    */
    xLogMin: 0.1,

    /**
      The min value to use for yScaleType "log" if yMin <= 0
      @property yLogMin
      @type Number
      @default 0.1
    */
    yLogMin: 0.1,

    /** 
      Allows child compoenents to identify graph parent.
      @property isGraph
      @private
    */
    isGraph: true,

    /**
      Identifies this graph to its children as providing scales.
      @property isScaleSource
      @private
    */
    isScaleSource: true,

    /**
      @property hasRendered
      @private
    */
    hasRendered: false,

    /**
      Gets or sets the whether or not multiple selectable graphics may be
      selected simultaneously.
      @property selectMultiple
      @type Boolean
      @default false
    */
    selectMultiple: false,

    /**
      The width of the graph in pixels.
      @property width
      @type Number
      @default 300
    */
    width: 300,

    /**
      The height of the graph in pixels.
      @property height
      @type Number
      @default 100
    */
    height: 100,

    /**
      The padding at the top of the graph
      @property paddingTop
      @type Number
      @default 0
    */
    paddingTop: 0,

    /**
      The padding at the left of the graph
      @property paddingLeft
      @type Number
      @default 0
    */
    paddingLeft: 0,

    /**
      The padding at the right of the graph
      @property paddingRight
      @type Number
      @default 0
    */
    paddingRight: 0,

    /**
      The padding at the bottom of the graph
      @property paddingBottom
      @type Number
      @default 0
    */
    paddingBottom: 0,

    /**
      Determines whether to display "lanes" in the background of
      the graph.
      @property showLanes
      @type Boolean
      @default false
    */
    showLanes: false,

    /**
      Determines whether to display "frets" in the background of
      the graph.
      @property showFrets
      @type Boolean
      @default false 
    */
    showFrets: false,

    /**
      The type of scale to use for x values.
      
      Possible Values:
      - `'linear'` - a standard linear scale
      - `'log'` - a logarithmic scale
      - `'power'` - a power-based scale (exponent = 3)
      - `'ordinal'` - an ordinal scale, used for ordinal data. required for bar graphs.
      
      @property xScaleType
      @type String
      @default 'linear'
    */
    xScaleType: "linear",

    /**
      The type of scale to use for y values.
      
      Possible Values:
      - `'linear'` - a standard linear scale
      - `'log'` - a logarithmic scale
      - `'power'` - a power-based scale (exponent = 3)
      - `'ordinal'` - an ordinal scale, used for ordinal data. required for bar graphs.
      
      @property yScaleType
      @type String
      @default 'linear'
    */
    yScaleType: "linear",

    /**
      The padding between value steps when `xScaleType` is `'ordinal'`
      @property xOrdinalPadding
      @type Number
      @default 0.1
    */
    xOrdinalPadding: 0.1,

    /**
      The padding at the ends of the domain data when `xScaleType` is `'ordinal'`
      @property xOrdinalOuterPadding
      @type Number
      @default 0.1
    */
    xOrdinalOuterPadding: 0.1,

    /**
      The padding between value steps when `xScaleType` is `'ordinal'`
      @property yOrdinalPadding
      @type Number
      @default 0.1
    */
    yOrdinalPadding: 0.1,

    /**
      The padding at the ends of the domain data when `yScaleType` is `'ordinal'`
      @property yOrdinalOuterPadding
      @type Number
      @default 0.1
    */
    yOrdinalOuterPadding: 0.1,

    /**
      the `nf-y-axis` component is registered here if there is one present
      @property yAxis
      @readonly
      @default null
    */
    yAxis: null,

    /**
      The `nf-x-axis` component is registered here if there is one present
      @property xAxis
      @readonly
      @default null
    */
    xAxis: null,

    /**
      Backing field for `xMin`
      @property _xMin
      @private
    */
    _xMin: null,

    /**
      Backing field for `xMax`
      @property _xMax
      @private
    */
    _xMax: null,

    /**
      Backing field for `yMin`
      @property _yMin
      @private
    */
    _yMin: null,

    /**
      Backing field for `yMax`
      @property _yMax
      @private
    */
    _yMax: null,

    /**
      Gets or sets the minimum x domain value to display on the graph.
      Behavior depends on `xMinMode`.
      @property xMin
    */
    xMin: minProperty("x", 8),

    /**
      Gets or sets the maximum x domain value to display on the graph.
      Behavior depends on `xMaxMode`.
      @property xMax
    */
    xMax: maxProperty("x", 8),

    /**
      Gets or sets the minimum y domain value to display on the graph.
      Behavior depends on `yMinMode`.
      @property yMin
    */
    yMin: minProperty("y", 5),

    /**
      Gets or sets the maximum y domain value to display on the graph.
      Behavior depends on `yMaxMode`.
      @property yMax
    */
    yMax: maxProperty("y", 5),

    /**
      Sets the behavior of `xMin` for the graph.
       ### Possible values:
       - 'auto': (default) xMin is always equal to the minimum domain value contained in the graphed data. Cannot be set.
      - 'fixed': xMin can be set to an exact value and will not change based on graphed data.
      - 'push': xMin can be set to a specific value, but will update if the minimum x value contained in the graph is less than 
        what xMin is currently set to.
      - 'push-tick': xMin can be set to a specific value, but will update to next "nice" tick if the minimum x value contained in
        the graph is less than that xMin is set to.
       @property xMinMode
      @type String
      @default 'auto'
    */
    xMinMode: "auto",

    /**
      Sets the behavior of `xMax` for the graph.
       ### Possible values:
       - 'auto': (default) xMax is always equal to the maximum domain value contained in the graphed data. Cannot be set.
      - 'fixed': xMax can be set to an exact value and will not change based on graphed data.
      - 'push': xMax can be set to a specific value, but will update if the maximum x value contained in the graph is greater than 
        what xMax is currently set to.
      - 'push-tick': xMax can be set to a specific value, but will update to next "nice" tick if the maximum x value contained in
        the graph is greater than that xMax is set to.
        
      @property xMaxMode
      @type String
      @default 'auto'
    */
    xMaxMode: "auto",

    /**
      Sets the behavior of `yMin` for the graph.
       ### Possible values:
       - 'auto': (default) yMin is always equal to the minimum domain value contained in the graphed data. Cannot be set.
      - 'fixed': yMin can be set to an exact value and will not change based on graphed data.
      - 'push': yMin can be set to a specific value, but will update if the minimum y value contained in the graph is less than 
        what yMin is currently set to.
      - 'push-tick': yMin can be set to a specific value, but will update to next "nice" tick if the minimum y value contained in
        the graph is less than that yMin is set to.
       @property yMinMode
      @type String
      @default 'auto'
    */
    yMinMode: "auto",

    /**
      Sets the behavior of `yMax` for the graph.
       ### Possible values:
       - 'auto': (default) yMax is always equal to the maximum domain value contained in the graphed data. Cannot be set.
      - 'fixed': yMax can be set to an exact value and will not change based on graphed data.
      - 'push': yMax can be set to a specific value, but will update if the maximum y value contained in the graph is greater than 
        what yMax is currently set to.
      - 'push-tick': yMax can be set to a specific value, but will update to next "nice" tick if the maximum y value contained in
        the graph is greater than that yMax is set to.
        
      @property yMaxMode
      @type String
      @default 'auto'
    */
    yMaxMode: "auto",

    /**
      Gets the highest and lowest x values of the graphed data in a two element array.
      @property xDataExtent
      @type Array
      @readonly
    */
    xDataExtent: Ember['default'].computed("xData", function () {
      var xData = this.get("xData");
      return xData ? d3.extent(xData) : [null, null];
    }),

    /**
      Gets the highest and lowest y values of the graphed data in a two element array.
      @property yDataExtent
      @type Array
      @readonly
    */
    yDataExtent: Ember['default'].computed("yData", function () {
      var yData = this.get("yData");
      return yData ? d3.extent(yData) : [null, null];
    }),

    /**
      Gets all x data from all graphics.
      @property xData
      @type Array
      @readonly
    */
    xData: Ember['default'].computed("graphics.@each.xData", function () {
      var graphics = this.get("graphics");
      var all = [];
      graphics.forEach(function (graphic) {
        all = all.concat(graphic.get("xData"));
      });
      return Ember['default'].A(all);
    }),

    /**
      Gets all y data from all graphics
      @property yData
      @type Array
      @readonly
    */
    yData: Ember['default'].computed("graphics.@each.yData", function () {
      var graphics = this.get("graphics");
      var all = [];
      graphics.forEach(function (graphic) {
        all = all.concat(graphic.get("yData"));
      });
      return Ember['default'].A(all);
    }),

    /**
      Gets the DOM id for the content clipPath element.
      @property contentClipPathId
      @type String
      @readonly
      @private
    */
    contentClipPathId: Ember['default'].computed("elementId", function () {
      return this.get("elementId") + "-content-mask";
    }),

    /**
      Registry of contained graphic elements such as `nf-line` or `nf-area` components.
      This registry is used to pool data for scaling purposes.
      @property graphics
      @type Array
      @readonly
     */
    graphics: Ember['default'].computed(function () {
      return Ember['default'].A();
    }),

    /**
      An array of "selectable" graphics that have been selected within this graph.
      @property selected
      @type Array
      @readonly
    */
    selected: null,

    /**
      Computed property to show yAxis. Returns `true` if a yAxis is present.
      @property showYAxis
      @type Boolean
      @default false
     */
    showYAxis: computedBool("yAxis"),

    /**
      Computed property to show xAxis. Returns `true` if an xAxis is present.
      @property showXAxis
      @type Boolean
      @default false
     */
    showXAxis: computedBool("xAxis"),

    /**
      Gets a function to create the xScale
      @property xScaleFactory
      @readonly
     */
    xScaleFactory: scaleFactoryProperty("x"),

    /**
      Gets a function to create the yScale
      @property yScaleFactory
      @readonly
     */
    yScaleFactory: scaleFactoryProperty("y"),

    /**
      Gets the domain of x values.
      @property xDomain
      @type Array
      @readonly
     */
    xDomain: domainProperty("x"),

    /**
      Gets the domain of y values.
      @property yDomain
      @type Array
      @readonly
     */
    yDomain: domainProperty("y"),

    /**
      Gets the current xScale used to draw the graph.
      @property xScale
      @type Function
      @readonly
     */
    xScale: scaleProperty("x"),

    /**
      Gets the current yScale used to draw the graph.
      @property yScale
      @type Function
      @readonly
     */
    yScale: scaleProperty("y"),

    /**
      Registers a graphic such as `nf-line` or `nf-area` components with the graph.
      @method registerGraphic
      @param graphic {Ember.Component} The component object to register
     */
    registerGraphic: function registerGraphic(graphic) {
      var graphics = this.get("graphics");
      graphics.pushObject(graphic);
    },

    /**
      Unregisters a graphic such as an `nf-line` or `nf-area` from the graph.
      @method unregisterGraphic
      @param graphic {Ember.Component} The component to unregister
     */
    unregisterGraphic: function unregisterGraphic(graphic) {
      var graphics = this.get("graphics");
      graphics.removeObject(graphic);
    },

    /**
      The y range of the graph in pixels. The min and max pixel values
      in an array form.
      @property yRange
      @type Array
      @readonly
     */
    yRange: Ember['default'].computed("graphHeight", function () {
      return [this.get("graphHeight"), 0];
    }),

    /**
      The x range of the graph in pixels. The min and max pixel values
      in an array form.
      @property xRange
      @type Array
      @readonly
     */
    xRange: Ember['default'].computed("graphWidth", function () {
      return [0, this.get("graphWidth")];
    }),

    /**
      Returns `true` if the graph has data to render. Data is conveyed
      to the graph by registered graphics.
      @property hasData
      @type Boolean
      @default false
      @readonly
     */
    hasData: Ember['default'].computed.notEmpty("graphics"),

    /**
      The x coordinate position of the graph content
      @property graphX
      @type Number
      @readonly
     */
    graphX: Ember['default'].computed("paddingLeft", "yAxis.width", "yAxis.orient", function () {
      var paddingLeft = this.get("paddingLeft");
      var yAxisWidth = this.get("yAxis.width") || 0;
      var yAxisOrient = this.get("yAxis.orient");
      if (yAxisOrient === "right") {
        return paddingLeft;
      }
      return paddingLeft + yAxisWidth;
    }),

    /** 
      The y coordinate position of the graph content
      @property graphY
      @type Number
      @readonly
     */
    graphY: Ember['default'].computed("paddingTop", "xAxis.orient", "xAxis.height", function () {
      var paddingTop = this.get("paddingTop");
      var xAxisOrient = this.get("xAxis.orient");
      if (xAxisOrient === "top") {
        var xAxisHeight = this.get("xAxis.height") || 0;
        return xAxisHeight + paddingTop;
      }
      return paddingTop;
    }),

    /**
      The width, in pixels, of the graph content
      @property graphWidth
      @type Number
      @readonly
     */
    graphWidth: Ember['default'].computed("width", "paddingRight", "paddingLeft", "yAxis.width", function () {
      var paddingRight = this.get("paddingRight") || 0;
      var paddingLeft = this.get("paddingLeft") || 0;
      var yAxisWidth = this.get("yAxis.width") || 0;
      var width = this.get("width") || 0;
      return Math.max(0, width - paddingRight - paddingLeft - yAxisWidth);
    }),

    /**
      The height, in pixels, of the graph content
      @property graphHeight
      @type Number
      @readonly
     */
    graphHeight: Ember['default'].computed("height", "paddingTop", "paddingBottom", "xAxis.height", function () {
      var paddingTop = this.get("paddingTop") || 0;
      var paddingBottom = this.get("paddingBottom") || 0;
      var xAxisHeight = this.get("xAxis.height") || 0;
      var height = this.get("height") || 0;
      return Math.max(0, height - paddingTop - paddingBottom - xAxisHeight);
    }),

    /**
      An SVG transform to position the graph content
      @property graphTransform
      @type String
      @readonly
     */
    graphTransform: Ember['default'].computed("graphX", "graphY", function () {
      var graphX = this.get("graphX");
      var graphY = this.get("graphY");
      return "translate(" + graphX + " " + graphY + ")";
    }),

    /**
      Sets `hasRendered` to `true` on `willInsertElement`.
      @method _notifyHasRendered
      @private
    */
    _notifyHasRendered: Ember['default'].on("willInsertElement", function () {
      this.set("hasRendered", true);
    }),

    /**
      Gets the mouse position relative to the container
      @method mousePoint
      @param container {SVGElement} the SVG element that contains the mouse event
      @param e {Object} the DOM mouse event
      @return {Array} an array of `[xMouseCoord, yMouseCoord]`
     */
    mousePoint: function mousePoint(container, e) {
      var svg = container.ownerSVGElement || container;
      if (svg.createSVGPoint) {
        var point = svg.createSVGPoint();
        point.x = e.clientX;
        point.y = e.clientY;
        point = point.matrixTransform(container.getScreenCTM().inverse());
        return [point.x, point.y];
      }
      var rect = container.getBoundingClientRect();
      return [e.clientX - rect.left - container.clientLeft, e.clientY - rect.top - container.clientTop];
    },

    /**
      A computed property returned the view's controller.
      @property parentController
      @type Ember.Controller
      @readonly
    */
    parentController: Ember['default'].computed.alias("templateData.view.controller"),

    /**
      Selects the graphic passed. If `selectMultiple` is false, it will deselect the currently
      selected graphic if it's different from the one passed.
      @method selectGraphic
      @param graphic {Ember.Component} the graph component to select within the graph.
    */
    selectGraphic: function selectGraphic(graphic) {
      if (!graphic.get("selected")) {
        graphic.set("selected", true);
      }
      if (this.selectMultiple) {
        this.get("selected").pushObject(graphic);
      } else {
        var current = this.get("selected");
        if (current && current !== graphic) {
          current.set("selected", false);
        }
        this.set("selected", graphic);
      }
    },

    /**
      deselects the graphic passed.
      @method deselectGraphic
      @param graphic {Ember.Component} the graph child component to deselect.
    */
    deselectGraphic: function deselectGraphic(graphic) {
      graphic.set("selected", false);
      if (this.selectMultiple) {
        this.get("selected").removeObject(graphic);
      } else {
        var current = this.get("selected");
        if (current && current === graphic) {
          this.set("selected", null);
        }
      }
    },

    /**
      The initialization method. Fired on `init`.
      @method _setup
      @private
    */
    init: function init() {
      this._super.apply(this, arguments);
      this.set("selected", this.selectMultiple ? Ember['default'].A() : null);
    },

    /**
      The amount of leeway, in pixels, to give before triggering a brush start.
      @property brushThreshold
      @type {Number}
      @default 7
    */
    brushThreshold: 7,

    /**
      The name of the action to trigger when brushing starts
      @property brushStartAction
      @type {String}
      @default null
    */
    brushStartAction: null,

    /**
      The name of the action to trigger when brushing emits a new value
      @property brushAction
      @type {String}
      @default null
    */
    brushAction: null,

    /**
      The name of the action to trigger when brushing ends
      @property brushEndAction
      @type {String}
      @default null
    */
    brushEndAction: null,

    _setupBrushAction: Ember['default'].on("didInsertElement", function () {
      var content = this.$(".nf-graph-content");

      var toBrushEventStreams = this._toBrushEventStreams.bind(this);
      var toComponentEventStream = this._toComponentEventStream;
      var triggerComponentEvent = this._triggerComponentEvent.bind(this);

      var mouseMoves = Observable.fromEvent(content, "mousemove");
      var mouseDowns = Observable.fromEvent(content, "mousedown");
      var mouseUps = Observable.fromEvent(Ember['default'].$(document), "mouseup");
      var mouseLeaves = Observable.fromEvent(content, "mouseleave");

      this._brushDisposable = Observable.merge(mouseDowns, mouseMoves, mouseLeaves).
      // get a streams of mouse events that start on mouse down and end on mouse up
      window(mouseDowns, function () {
        return mouseUps;
      })
      // filter out all of them if there are no brush actions registered
      // map the mouse event streams into brush event streams
      .map(toBrushEventStreams).
      // flatten to a stream of action names and event objects
      flatMap(toComponentEventStream).
      // HACK: this is fairly cosmetic, so skip errors.
      retry().
      // subscribe and send the brush actions via Ember
      forEach(triggerComponentEvent);
    }),

    _toBrushEventStreams: function _toBrushEventStreams(mouseEvents) {
      var getStartInfo = this._getStartInfo;
      var byBrushThreshold = this._byBrushThreshold.bind(this);
      var toBrushEvent = this._toBrushEvent.bind(this);

      // get the starting mouse event
      return mouseEvents.take(1).
      // calculate it's mouse point and info
      map(getStartInfo).
      // combine the start with the each subsequent mouse event
      combineLatest(mouseEvents.skip(1), array_helpers.toArray).
      // filter out everything until the brushThreshold is crossed
      filter(byBrushThreshold).
      // create the brush event object
      map(toBrushEvent);
    },

    _triggerComponentEvent: function _triggerComponentEvent(d) {
      this.trigger(d[0], d[1]);
    },

    _toComponentEventStream: function _toComponentEventStream(events) {
      return Observable.merge(events.take(1).map(function (e) {
        return ["didBrushStart", e];
      }), events.map(function (e) {
        return ["didBrush", e];
      }), events.last().map(function (e) {
        return ["didBrushEnd", e];
      }));
    },

    didBrush: function didBrush(e) {
      if (this.get("brushAction")) {
        this.sendAction("brushAction", e);
      }
    },

    didBrushStart: function didBrushStart(e) {
      document.body.style.setProperty("-webkit-user-select", "none");
      document.body.style.setProperty("-moz-user-select", "none");
      document.body.style.setProperty("user-select", "none");
      if (this.get("brushStartAction")) {
        this.sendAction("brushStartAction", e);
      }
    },

    didBrushEnd: function didBrushEnd(e) {
      document.body.style.removeProperty("-webkit-user-select");
      document.body.style.removeProperty("-moz-user-select");
      document.body.style.removeProperty("user-select");
      if (this.get("brushEndAction")) {
        this.sendAction("brushEndAction", e);
      }
    },

    _toBrushEvent: function _toBrushEvent(d) {
      var start = d[0];
      var currentEvent = d[1];
      var currentPoint = svg_dom.getMousePoint(currentEvent.currentTarget, d[1]);

      var startPosition = GraphPosition['default'].create({
        originalEvent: start.originalEvent,
        graph: this,
        graphX: start.mousePoint.x,
        graphY: start.mousePoint.y
      });

      var currentPosition = GraphPosition['default'].create({
        originalEvent: currentEvent,
        graph: this,
        graphX: currentPoint.x,
        graphY: currentPoint.y
      });

      var left = startPosition;
      var right = currentPosition;

      if (start.originalEvent.clientX > currentEvent.clientX) {
        left = currentPosition;
        right = startPosition;
      }

      return {
        start: startPosition,
        current: currentPosition,
        left: left,
        right: right
      };
    },

    _byBrushThreshold: function _byBrushThreshold(d) {
      var startEvent = d[0].originalEvent;
      var currentEvent = d[1];
      return Math.abs(currentEvent.clientX - startEvent.clientX) > this.get("brushThreshold");
    },

    _getStartInfo: function _getStartInfo(e) {
      return {
        originalEvent: e,
        mousePoint: svg_dom.getMousePoint(e.currentTarget, e)
      };
    },

    willDestroyElement: function willDestroyElement() {
      if (this._brushDisposable) {
        this._brushDisposable.dispose();
      }
    } });

});
define('ember-nf-graph-examples/components/nf-horizontal-line', ['exports', 'ember', 'ember-nf-graph/mixins/graph-has-graph-parent', 'ember-nf-graph/mixins/graph-requires-scale-source'], function (exports, Ember, HasGraphParent, RequireScaleSource) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(HasGraphParent['default'], RequireScaleSource['default'], {
    tagName: "line",

    attributeBindings: ["lineY:y1", "lineY:y2", "x1", "x2"],

    classNames: ["nf-horizontal-line"],

    /**
      The y domain value at which to draw the horizontal line
      @property y
      @type Number
      @default null
    */
    y: null,

    /**
      The computed y coordinate of the line to draw
      @property lineY
      @type Number
      @private
      @readonly
    */
    lineY: Ember['default'].computed("y", "yScale", function () {
      var y = this.get("y");
      var yScale = this.get("yScale");
      var py = yScale ? yScale(y) : -1;
      return py && py > 0 ? py : 0;
    }),

    /**
      The left x coordinate of the line
      @property x1
      @type Number
      @default 0
      @private
    */
    x1: 0,

    /**
      The right x coordinate of the line
      @property x2
      @type Number
      @private
      @readonly
    */
    x2: Ember['default'].computed.alias("graph.graphWidth") });

});
define('ember-nf-graph-examples/components/nf-line', ['exports', 'ember', 'ember-nf-graph/mixins/graph-has-graph-parent', 'ember-nf-graph/mixins/graph-data-graphic', 'ember-nf-graph/mixins/graph-line-utils', 'ember-nf-graph/mixins/graph-selectable-graphic', 'ember-nf-graph/mixins/graph-registered-graphic', 'ember-nf-graph/mixins/graph-graphic-with-tracking-dot', 'ember-nf-graph/mixins/graph-requires-scale-source'], function (exports, Ember, HasGraphParent, DataGraphic, LineUtils, SelectableGraphic, RegisteredGraphic, GraphicWithTrackingDot, RequireScaleSource) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(HasGraphParent['default'], DataGraphic['default'], SelectableGraphic['default'], LineUtils['default'], RegisteredGraphic['default'], GraphicWithTrackingDot['default'], RequireScaleSource['default'], {

    tagName: "g",

    /**
      The type of D3 interpolator to use to create the line.
      @property interpolator
      @type String
      @default 'linear'
    */
    interpolator: "linear",

    classNameBindings: ["selected", "selectable"],

    classNames: ["nf-line"],

    /**
      The d3 line function to create the line path.
      @method lineFn
      @param data {Array} the array of coordinate arrays to plot as an SVG path
      @private
      @return {String} an SVG path data string
    */
    lineFn: Ember['default'].computed("xScale", "yScale", "interpolator", function () {
      var xScale = this.get("xScale");
      var yScale = this.get("yScale");
      var interpolator = this.get("interpolator");
      return this.createLineFn(xScale, yScale, interpolator);
    }),

    /**
      The SVG path data string to render the line
      @property d
      @type String
      @private
      @readonly
    */
    d: Ember['default'].computed("renderedData.@each", "lineFn", function () {
      var renderedData = this.get("renderedData");
      var lineFn = this.get("lineFn");
      return lineFn(renderedData);
    }),

    /**
      Event handler to toggle the `selected` property on click
      @method _toggleSelected
      @private
    */
    _toggleSelected: Ember['default'].on("click", function () {
      if (this.get("selectable")) {
        this.toggleProperty("selected");
      }
    }) });

});
define('ember-nf-graph-examples/components/nf-plot', ['exports', 'ember', 'ember-nf-graph/mixins/graph-has-graph-parent', 'ember-nf-graph/mixins/graph-requires-scale-source', 'ember-nf-graph/utils/nf/graph-event'], function (exports, Ember, HasGraphParent, RequireScaleSource, GraphEvent) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(HasGraphParent['default'], RequireScaleSource['default'], {
    tagName: "g",

    attributeBindings: ["transform"],

    classNames: ["nf-plot"],

    /**
      The x domain value to set the plot at
      @property x
      @default null
    */
    x: null,

    /**
      The y domain value to set the plot at
      @property x
      @default null
    */
    y: null,

    /**
      True if an `x` value is present (defined, not null and non-empty)
      @property hasX
      @type Boolean
      @readonly
    */
    hasX: Ember['default'].computed.notEmpty("x"),

    /**
      True if an `y` value is present (defined, not null and non-empty)
      @property hasY
      @type Boolean
      @readonly
    */
    hasY: Ember['default'].computed.notEmpty("y"),

    /**
      The calculated visibility of the component
      @property isVisible
      @type Boolean
      @readonly
    */
    isVisible: Ember['default'].computed.and("hasX", "hasY"),

    /**
      The calculated x coordinate
      @property rangeX
      @type Number
      @readonly
    */
    rangeX: Ember['default'].computed("x", "xScale", function () {
      var xScale = this.get("xScale");
      var x = this.get("x");
      var hasX = this.get("hasX");
      return (hasX && xScale ? xScale(x) : 0) || 0;
    }),

    /**
      The calculated y coordinate
      @property rangeY
      @type Number
      @readonly
    */
    rangeY: Ember['default'].computed("y", "yScale", function () {
      var yScale = this.get("yScale");
      var y = this.get("y");
      var hasY = this.get("hasY");
      return (hasY && yScale ? yScale(y) : 0) || 0;
    }),

    /**
      The SVG transform of the component's `<g>` tag.
      @property transform
      @type String
      @readonly
    */
    transform: Ember['default'].computed("rangeX", "rangeY", function () {
      var rangeX = this.get("rangeX");
      var rangeY = this.get("rangeY");
      return "translate(" + rangeX + " " + rangeY + ")";
    }),

    data: null,

    click: function click(e) {
      var context = GraphEvent['default'].create({
        x: this.get("x"),
        y: this.get("y"),
        data: this.get("data"),
        source: this,
        graph: this.get("graph"),
        originalEvent: e });
      this.sendAction("action", context);
    } });

});
define('ember-nf-graph-examples/components/nf-plots', ['exports', 'ember', 'ember-nf-graph/mixins/graph-has-graph-parent', 'ember-nf-graph/mixins/graph-data-graphic', 'ember-nf-graph/mixins/graph-requires-scale-source'], function (exports, Ember, HasGraphParent, DataGraphic, RequireScaleSource) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(HasGraphParent['default'], DataGraphic['default'], RequireScaleSource['default'], {
    tagName: "g",

    classNames: ["nf-plots"],

    /**
      The parent controller to use for template binding
      @property parentController
      @type Ember.Controller
      @readonly
      @private
    */
    parentController: Ember['default'].computed.alias("templateData.view.controller"),

    /**
      The model for adding plots to the graph
      @property plotData
      @readonly
      @private
    */
    plotData: Ember['default'].computed("renderedData.@each", function () {
      var renderedData = this.get("renderedData");
      if (renderedData && Ember['default'].isArray(renderedData)) {
        return Ember['default'].A(renderedData.map(function (d) {
          return {
            x: d[0],
            y: d[1],
            data: d.data };
        }));
      }
    }),

    actions: {
      itemClicked: function itemClicked(e) {
        this.sendAction("action", e);
      } } });

});
define('ember-nf-graph-examples/components/nf-range-marker', ['exports', 'ember', 'ember-nf-graph/mixins/graph-has-graph-parent', 'ember-nf-graph/mixins/graph-requires-scale-source'], function (exports, Ember, HasGraphParent, RequireScaleSource) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(HasGraphParent['default'], RequireScaleSource['default'], {
    tagName: "g",

    attributeBindings: ["transform"],

    classNames: ["nf-range-marker"],

    /**
      The parent `nf-range-markers` component.
      @property container
      @type {components.nf-range-markers}
      @default null
    */
    container: null,

    /**
      The minimum domain value for the range to mark.
      @property xMin
      @default 0
    */
    xMin: 0,

    /**
      The maximum domain value for the range to mark.
      @property xMax
      @default 0
    */
    xMax: 0,

    /**
      The spacing above the range marker.
      @property marginTop
      @type Number
      @default 10
    */
    marginTop: 10,

    /**
      The spacing below the range marker.
      @property marginBottom
      @type Number
      @default 3
    */
    marginBottom: 3,

    /**
      The height of the range marker.
      @property height
      @type Number
      @default 10
    */
    height: 10,

    /**
      The computed x position of the range marker.
      @property x
      @type Number
      @readonly
    */
    x: Ember['default'].computed("xMin", "xScale", function () {
      var xScale = this.get("xScale");
      var xMin = this.get("xMin");
      return xScale(xMin);
    }),

    /**
      The computed width of the range marker.
      @property width
      @type Number
      @readonly
    */
    width: Ember['default'].computed("xScale", "xMin", "xMax", function () {
      var xScale = this.get("xScale");
      var xMax = this.get("xMax");
      var xMin = this.get("xMin");
      return xScale(xMax) - xScale(xMin);
    }),

    /**
      The computed y position of the range marker.
      @property y
      @type Number
      @readonly
    */
    y: Ember['default'].computed("container.orient", "prevMarker.bottom", "prevMarker.y", "graph.graphHeight", "totalHeight", function () {
      var orient = this.get("container.orient");
      var prevBottom = this.get("prevMarker.bottom");
      var prevY = this.get("prevMarker.y");
      var graphHeight = this.get("graph.graphHeight");
      var totalHeight = this.get("totalHeight");

      prevBottom = prevBottom || 0;

      if (orient === "bottom") {
        return (prevY || graphHeight) - totalHeight;
      }

      if (orient === "top") {
        return prevBottom;
      }
    }),

    /**
      The computed total height of the range marker including its margins.
      @property totalHeight
      @type Number
      @readonly
    */
    totalHeight: Ember['default'].computed("height", "marginTop", "marginBottom", function () {
      var height = this.get("height");
      var marginTop = this.get("marginTop");
      var marginBottom = this.get("marginBottom");
      return height + marginTop + marginBottom;
    }),

    /**
      The computed bottom of the range marker, not including the bottom margin.
      @property bottom
      @type Number
      @readonly
    */
    bottom: Ember['default'].computed("y", "totalHeight", function () {
      var y = this.get("y");
      var totalHeight = this.get("totalHeight");
      return y + totalHeight;
    }),

    /**
      The computed SVG transform of the range marker container
      @property transform
      @type String
      @readonly
    */
    transform: Ember['default'].computed("y", function () {
      var y = this.get("y") || 0;
      return "translate(0 " + y + ")";
    }),

    /**
      The computed SVG transform fo the range marker label container.
      @property labelTransform
      @type String
      @readonly
    */
    labelTransform: Ember['default'].computed("x", function () {
      var x = this.get("x") || 0;
      return "translate(" + x + " 0)";
    }),

    /**
      Initialization function that registers the range marker with its parent 
      and populates the container property
      @method _setup
      @private
    */
    init: function init() {
      this._super.apply(this, arguments);
      var container = this.nearestWithProperty("isRangeMarkerContainer");
      container.registerMarker(this);
      this.set("container", container);
    },

    /**
      Unregisters the range marker from its parent when the range marker is destroyed.
      @method _unregister
      @private
    */
    _unregister: Ember['default'].on("willDestroyElement", function () {
      this.get("container").unregisterMarker(this);
    })
  });

});
define('ember-nf-graph-examples/components/nf-range-markers', ['exports', 'ember', 'ember-nf-graph/mixins/graph-has-graph-parent'], function (exports, Ember, HasGraphParent) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(HasGraphParent['default'], {
    tagName: "g",

    /**
      Used by `nf-range-marker` to identify the `nf-range-markers` container
      @property isRangeMarkerContainer
      @type Boolean
      @default true
      @readonly
    */
    isRangeMarkerContainer: true,

    /**
      Sets the orientation of the range markers.
       - `'bottom'` - Range markers start at the bottom and stack upward
      - `'top'` - Range markers start at the top and stack downward
      @property orient
      @type String
      @default 'bottom'
    */
    orient: "bottom",

    /**
      The margin, in pixels, between the markers
      @property markerMargin
      @type Number
      @default 10
    */
    markerMargin: 10,

    /**
      The marker components registered with this container
      @property markers
      @type Array
      @readonly
    */
    markers: Ember['default'].computed(function () {
      return Ember['default'].A();
    }),

    /**
      Adds the passed marker to the `markers` list, and sets the `prevMarker` and `nextMarker`
      properties on the marker component and it's neighbor.
      @method registerMarker
      @param marker {nf-range-marker} the range marker to register with this container
    */
    registerMarker: function registerMarker(marker) {
      var markers = this.get("markers");
      var prevMarker = markers[markers.length - 1];

      if (prevMarker) {
        marker.set("prevMarker", prevMarker);
        prevMarker.set("nextMarker", marker);
      }

      markers.pushObject(marker);
    },

    /**
      Removes the marker from the `markers` list. Also updates the `nextMarker` and `prevMarker`
      properties of it's neighboring components.
      @method unregisterMarker
      @param marker {nf-range-marker} the range marker to remove from the `markers` list.
    */
    unregisterMarker: function unregisterMarker(marker) {
      if (marker) {
        var next = marker.nextMarker;
        var prev = marker.prevMarker;
        if (prev) {
          prev.set("nextMarker", next);
        }
        if (next) {
          next.set("prevMarker", prev);
        }
        this.get("markers").removeObject(marker);
      }
    } });

});
define('ember-nf-graph-examples/components/nf-right-tick', ['exports', 'ember', 'ember-nf-graph/mixins/graph-has-graph-parent', 'ember-nf-graph/mixins/graph-requires-scale-source'], function (exports, Ember, HasGraphParent, RequireScaleSource) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(HasGraphParent['default'], RequireScaleSource['default'], {
    tagName: "g",

    classNames: ["nf-right-tick"],

    /**
      The transition duration in milliseconds
      @property duration
      @type Number
      @default 400
    */
    duration: 400,

    /**
      The domain value at which to place the tick
      @property value
      @type Number
      @default null
    */
    value: null,

    /**
      Sets the visibility of the component. Returns false if `y` is not 
      a numeric data type.
      @property isVisible
      @private
      @readonly
    */
    isVisible: Ember['default'].computed("y", function () {
      return !isNaN(this.get("y"));
    }),

    /**
      The calculated y coordinate of the tick
      @property y
      @type Number
      @readonly
    */
    y: Ember['default'].computed("value", "yScale", "graph.paddingTop", function () {
      var value = this.get("value");
      var yScale = this.get("yScale");
      var paddingTop = this.get("graph.paddingTop");
      var vy = 0;
      if (yScale) {
        vy = yScale(value) || 0;
      }
      return vy + paddingTop;
    }),

    /**
      The SVG transform used to render the tick
      @property transform
      @type String
      @private
      @readonly
    */
    transform: Ember['default'].computed("y", "graph.width", function () {
      var y = this.get("y");
      var graphWidth = this.get("graph.width");
      var x0 = graphWidth - 6;
      var y0 = y - 3;
      return "translate(" + x0 + " " + y0 + ")";
    }),

    /**
      performs the D3 transition to move the tick to the proper position.
      @method _transitionalUpdate
      @private
    */
    _transitionalUpdate: function _transitionalUpdate() {
      var transform = this.get("transform");
      var path = this.get("path");
      var duration = this.get("duration");
      path.transition().duration(duration).attr("transform", transform);
    },

    /**
      Schedules the transition when `value` changes on on init.
      @method _triggerTransition
      @private
    */
    _triggerTransition: Ember['default'].on("init", Ember['default'].observer("value", function () {
      Ember['default'].run.scheduleOnce("afterRender", this, this._transitionalUpdate);
    })),

    /**
      Updates the tick position without a transition.
      @method _nonTransitionalUpdate
      @private
    */
    _nonTransitionalUpdate: function _nonTransitionalUpdate() {
      var transform = this.get("transform");
      var path = this.get("path");
      path.attr("transform", transform);
    },

    /**
      Schedules the update of non-transitional positions
      @method _triggerNonTransitionalUpdate
      @private
    */
    _triggerNonTransitionalUpdate: Ember['default'].observer("graph.width", function () {
      Ember['default'].run.scheduleOnce("afterRender", this, this._nonTransitionalUpdate);
    }),

    /**
      Gets the elements required to do the d3 transitions
      @method _getElements
      @private
    */
    _getElements: Ember['default'].on("didInsertElement", function () {
      var g = d3.select(this.$()[0]);
      var path = g.selectAll("path").data([0]);
      this.set("path", path);
    })
  });

});
define('ember-nf-graph-examples/components/nf-selection-box', ['exports', 'ember', 'ember-nf-graph/mixins/graph-has-graph-parent', 'ember-nf-graph/mixins/graph-requires-scale-source', 'ember-nf-graph/utils/nf/scale-utils'], function (exports, Ember, HasGraphParent, RequireScaleSource, scale_utils) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(HasGraphParent['default'], RequireScaleSource['default'], {
    tagName: "g",

    /**
      The duration of the transition in ms
      @property duration
      @type Number
      @default 400
    */
    duration: 400,

    /**
      The minimum x domain value to encompass.
      @property xMin
      @default null
    */
    xMin: null,

    /**
      The maximum x domain value to encompoass.
      @property xMax
      @default null
    */
    xMax: null,

    /**
      The minimum y domain value to encompass.
      @property yMin
      @default null
    */
    yMin: null,

    /** 
      The maximum y domain value to encompass
      @property yMax
      @default null
    */
    yMax: null,

    classNames: ["nf-selection-box"],

    /**
      The x pixel position of xMin
      @property x0
      @type Number
    */
    x0: Ember['default'].computed("xMin", "xScale", function () {
      return scale_utils.normalizeScale(this.get("xScale"), this.get("xMin"));
    }),

    /**
      The x pixel position of xMax
      @property x1
      @type Number
    */
    x1: Ember['default'].computed("xMax", "xScale", function () {
      return scale_utils.normalizeScale(this.get("xScale"), this.get("xMax"));
    }),

    /**
      The y pixel position of yMin
      @property y0
      @type Number
    */
    y0: Ember['default'].computed("yMin", "yScale", function () {
      return scale_utils.normalizeScale(this.get("yScale"), this.get("yMin"));
    }),

    /**
      The y pixel position of yMax
      @property y1
      @type Number
    */
    y1: Ember['default'].computed("yMax", "yScale", function () {
      return scale_utils.normalizeScale(this.get("yScale"), this.get("yMax"));
    }),

    /**
      The SVG path string for the box's rectangle.
      @property rectPath
      @type String
    */
    rectPath: Ember['default'].computed("x0", "x1", "y0", "y1", function () {
      var x0 = this.get("x0");
      var x1 = this.get("x1");
      var y0 = this.get("y0");
      var y1 = this.get("y1");
      return "M" + x0 + "," + y0 + " L" + x0 + "," + y1 + " L" + x1 + "," + y1 + " L" + x1 + "," + y0 + " L" + x0 + "," + y0;
    }),

    /**
      Updates the position of the box with a transition
      @method doUpdatePosition
    */
    doUpdatePosition: function doUpdatePosition() {
      var boxRect = this.get("boxRectElement");
      var rectPath = this.get("rectPath");
      var duration = this.get("duration");

      boxRect.transition().duration(duration).attr("d", rectPath);
    },

    doUpdatePositionStatic: function doUpdatePositionStatic() {
      var boxRect = this.get("boxRectElement");
      var rectPath = this.get("rectPath");

      boxRect.attr("d", rectPath);
    },

    /**
      Schedules an update to the position of the box after render.
      @method updatePosition
      @private
    */
    updatePosition: Ember['default'].observer("xMin", "xMax", "yMin", "yMax", function () {
      Ember['default'].run.once(this, this.doUpdatePosition);
    }),

    staticPositionChange: Ember['default'].on("didInsertElement", Ember['default'].observer("xScale", "yScale", function () {
      Ember['default'].run.once(this, this.doUpdatePositionStatic);
    })),

    /**
      Sets up the required d3 elements after component
      is inserted into the DOM
      @method didInsertElement
    */
    didInsertElement: function didInsertElement() {
      var element = this.get("element");
      var g = d3.select(element);
      var boxRect = g.append("path").attr("class", "nf-selection-box-rect").attr("d", this.get("rectPath"));

      this.set("boxRectElement", boxRect);
    } });

});
define('ember-nf-graph-examples/components/nf-svg-image', ['exports', 'ember', 'ember-nf-graph/mixins/graph-has-graph-parent', 'ember-nf-graph/mixins/graph-requires-scale-source', 'ember-nf-graph/utils/nf/scale-utils', 'ember-nf-graph/mixins/graph-selectable-graphic'], function (exports, Ember, HasGraphParent, RequiresScaleSource, scale_utils, SelectableGraphic) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(HasGraphParent['default'], RequiresScaleSource['default'], SelectableGraphic['default'], {
    tagName: "image",

    classNameBindings: [":nf-svg-image", "selectable", "selected"],

    //HACK: for now xlink:href needs to be bound elsewhere.
    attributeBindings: ["svgX:x", "svgY:y", "svgWidth:width", "svgHeight:height"],

    click: function click() {
      if (this.get("selectable")) {
        this.toggleProperty("selected");
      }
    },

    /**
      The domain x value to place the image at.
      @property x
      @default null
    */
    x: null,

    /**
      The domain y value to place the image at.
      @property y
      @default null
    */
    y: null,

    _width: 0,

    /**
      The width as a domain value. Does not handle ordinal
      scales. To set a pixel value, set `svgWidth` directly.
      @property width
      @type Number
      @default 0
    */
    width: Ember['default'].computed(function (key, value) {
      if (arguments.length > 1) {
        this._width = Math.max(0, +value) || 0;
      }
      return this._width;
    }),

    _height: 0,

    /**
      The height as a domain value. Does not 
      handle ordinal scales. To set a pixel value, just
      set `svgHeight` directly.
      @property height
      @default null
    */
    height: Ember['default'].computed(function (key, value) {
      if (arguments.length > 1) {
        this._height = Math.max(0, +value) || 0;
      }
      return this._height;
    }),

    /**
      The image source url
      @property src
      @type String
    */
    src: Ember['default'].computed(function (key, value) {
      //HACK: because attributeBindings doesn't currently work with namespaced attributes.
      var $elem = this.$();
      if (arguments.length > 1) {
        $elem.attr("xlink:href", value);
      }
      return $elem.attr("xlink:href");
    }),

    x0: Ember['default'].computed("x", "xScale", function () {
      return scale_utils.normalizeScale(this.get("xScale"), this.get("x"));
    }),

    y0: Ember['default'].computed("y", "yScale", function () {
      return scale_utils.normalizeScale(this.get("yScale"), this.get("y"));
    }),

    x1: Ember['default'].computed("xScale", "width", "x", function () {
      var scale = this.get("xScale");
      if (scale.rangeBands) {
        throw new Error("nf-image does not support ordinal scales");
      }
      return scale_utils.normalizeScale(scale, this.get("width") + this.get("x"));
    }),

    y1: Ember['default'].computed("yScale", "height", "y", function () {
      var scale = this.get("yScale");
      if (scale.rangeBands) {
        throw new Error("nf-image does not support ordinal scales");
      }
      return scale_utils.normalizeScale(scale, this.get("height") + this.get("y"));
    }),

    /**
      The pixel value at which to plot the image.
      @property svgX
      @type Number
    */
    svgX: Ember['default'].computed("x0", "x1", function () {
      return Math.min(this.get("x0"), this.get("x1"));
    }),

    /**
      The pixel value at which to plot the image.
      @property svgY
      @type Number
    */
    svgY: Ember['default'].computed("y0", "y1", function () {
      return Math.min(this.get("y0"), this.get("y1"));
    }),

    /**
      The width, in pixels, of the image.
      @property svgWidth
      @type Number
    */
    svgWidth: Ember['default'].computed("x0", "x1", function () {
      return Math.abs(this.get("x0") - this.get("x1"));
    }),

    /**
      The height, in pixels of the image.
      @property svgHeight
      @type Number
    */
    svgHeight: Ember['default'].computed("y0", "y1", function () {
      return Math.abs(this.get("y0") - this.get("y1"));
    }) });

});
define('ember-nf-graph-examples/components/nf-svg-line', ['exports', 'ember', 'ember-nf-graph/mixins/graph-has-graph-parent', 'ember-nf-graph/mixins/graph-requires-scale-source', 'ember-nf-graph/utils/nf/scale-utils', 'ember-nf-graph/mixins/graph-selectable-graphic'], function (exports, Ember, HasGraphParent, RequiresScaleSource, scale_utils, SelectableGraphic) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(HasGraphParent['default'], RequiresScaleSource['default'], SelectableGraphic['default'], {
    tagName: "line",

    classNameBindings: [":nf-svg-line", "selectable", "selected"],

    attributeBindings: ["svgX1:x1", "svgX2:x2", "svgY1:y1", "svgY2:y2"],

    click: function click() {
      if (this.get("selectable")) {
        this.toggleProperty("selected");
      }
    },

    /**
      The domain value to plot the SVGLineElement's x1 at.
      @property x1
      @default null
    */
    x1: null,

    /**
      The domain value to plot the SVGLineElement's x2 at.
      @property x2
      @default null
    */
    x2: null,

    /**
      The domain value to plot the SVGLineElement's y1 at.
      @property y1
      @default null
    */
    y1: null,

    /**
      The domain value to plot the SVGLineElement's y2 at.
      @property y2
      @default null
    */
    y2: null,

    /**
      The pixel value to plot the SVGLineElement's x1 at.
      @property svgX1
      @type Number
    */
    svgX1: Ember['default'].computed("x1", "xScale", function () {
      return scale_utils.normalizeScale(this.get("xScale"), this.get("x1"));
    }),

    /**
      The pixel value to plot the SVGLineElement's x2 at.
      @property svgX2
      @type Number
    */
    svgX2: Ember['default'].computed("x2", "xScale", function () {
      return scale_utils.normalizeScale(this.get("xScale"), this.get("x2"));
    }),

    /**
      The pixel value to plot the SVGLineElement's y1 at.
      @property svgY1
      @type Number
    */
    svgY1: Ember['default'].computed("y1", "yScale", function () {
      return scale_utils.normalizeScale(this.get("yScale"), this.get("y1"));
    }),

    /**
      The pixel value to plot the SVGLineElement's y2 at.
      @property svgY2
      @type Number
    */
    svgY2: Ember['default'].computed("y2", "yScale", function () {
      return scale_utils.normalizeScale(this.get("yScale"), this.get("y2"));
    }) });

});
define('ember-nf-graph-examples/components/nf-svg-path', ['exports', 'ember', 'ember-nf-graph/mixins/graph-has-graph-parent', 'ember-nf-graph/mixins/graph-requires-scale-source', 'ember-nf-graph/utils/nf/scale-utils', 'ember-nf-graph/mixins/graph-selectable-graphic'], function (exports, Ember, HasGraphParent, RequiresScaleSource, scale_utils, SelectableGraphic) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(HasGraphParent['default'], RequiresScaleSource['default'], SelectableGraphic['default'], {
    type: "path",

    classNameBindings: [":nf-svg-path", "selectable", "selected"],

    attributeBindings: ["d"],

    /**
      The array of points to use to plot the path. This is an array of arrays, in the following format:
             // specify path pen commands
            [
              [50, 50, 'L'],
              [100, 100, 'L']
            ]
             // or they will default to 'L'
            [
              [50, 50],
              [100, 100]
            ]
     @property points
    @type Array
    */
    points: null,

    /**
      The data points mapped to scale
      @property svgPoints
      @type Array
    */
    svgPoints: Ember['default'].computed("points.[]", "xScale", "yScale", function () {
      var points = this.get("points");
      var xScale = this.get("xScale");
      var yScale = this.get("yScale");
      if (Ember['default'].isArray(points) && points.length > 0) {
        return points.map(function (v) {
          var dx = scale_utils.normalizeScale(xScale, v[0]);
          var dy = scale_utils.normalizeScale(yScale, v[1]);
          var c = v.length > 2 ? v[2] : "L";
          return [dx, dy, c];
        });
      }
    }),

    click: function click() {
      if (this.get("selectable")) {
        this.toggleProperty("selected");
      }
    },

    /**
      The raw svg path d attribute output
      @property d
      @type String
    */
    d: Ember['default'].computed("svgPoints", function () {
      var svgPoints = this.get("svgPoints");
      if (Ember['default'].isArray(svgPoints) && svgPoints.length > 0) {
        return svgPoints.reduce(function (d, pt, i) {
          if (i === 0) {
            d += "M" + pt[0] + "," + pt[1];
          }
          d += " " + pt[2] + pt[0] + "," + pt[1];
          return d;
        }, "");
      } else {
        return "M0,0";
      }
    }) });

});
define('ember-nf-graph-examples/components/nf-svg-rect', ['exports', 'ember', 'ember-nf-graph/mixins/graph-has-graph-parent', 'ember-nf-graph/mixins/graph-requires-scale-source', 'ember-nf-graph/utils/nf/scale-utils', 'ember-nf-graph/mixins/graph-selectable-graphic'], function (exports, Ember, HasGraphParent, RequiresScaleSource, scale_utils, SelectableGraphic) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(HasGraphParent['default'], RequiresScaleSource['default'], SelectableGraphic['default'], {
    tagName: "path",

    attributeBindings: ["d"],

    classNameBindings: [":nf-svg-rect", "selectable", "selected"],

    /**
      The domain x value to place the rect at.
      @property x
      @default null
    */
    x: null,

    /**
      The domain y value to place the rect at.
      @property y
      @default null
    */
    y: null,

    _width: 0,

    /**
      The width as a domain value. If xScale is ordinal, 
      then this value is the indice offset to which to draw the 
      rectangle. In other words, if it's `2`, then draw the rectangle
      to two ordinals past whatever `x` is set to.
      @property width
      @type Number
      @default 0
    */
    width: Ember['default'].computed(function (key, value) {
      if (arguments.length > 1) {
        this._width = +value;
      }
      return this._width;
    }),

    _height: 0,

    /**
      The height as a domain value. If the yScale is ordinal,
      this value is the indice offset to which to draw the rectangle.
      For example, if the height is `3` then draw the rectangle
      to two ordinals passed whatever `y` is set to.
      @property height
      @type Number
      @default 0
    */
    height: Ember['default'].computed(function (key, value) {
      if (arguments.length > 1) {
        this._height = +value;
      }
      return this._height;
    }),

    /**
      The x value of the bottom right corner of the rectangle.
      @property x1
      @type Number
    */
    x1: Ember['default'].computed("width", "x", "xScale", function () {
      var xScale = this.get("xScale");
      var w = this.get("width");
      var x = this.get("x");
      if (xScale.rangeBands) {
        var domain = xScale.domain();
        var fromIndex = domain.indexOf(x);
        var toIndex = fromIndex + w;
        return scale_utils.normalizeScale(xScale, domain[toIndex]);
      } else {
        x = +x || 0;
        return scale_utils.normalizeScale(xScale, w + x);
      }
    }),

    /**
      The y value of the bottom right corner of the rectangle
      @property y1
      @type Number
    */
    y1: Ember['default'].computed("height", "y", "yScale", function () {
      var yScale = this.get("yScale");
      var h = this.get("height");
      var y = this.get("y");
      if (yScale.rangeBands) {
        var domain = yScale.domain();
        var fromIndex = domain.indexOf(y);
        var toIndex = fromIndex + h;
        return scale_utils.normalizeScale(yScale, domain[toIndex]);
      } else {
        y = +y || 0;
        return scale_utils.normalizeScale(yScale, h + y);
      }
    }),

    /**
      The x value of the top right corner of the rectangle
      @property x0
      @type Number
    */
    x0: Ember['default'].computed("x", "xScale", function () {
      return scale_utils.normalizeScale(this.get("xScale"), this.get("x"));
    }),

    /**
      The y value of the top right corner of the rectangle.
      @property y0
      @type Number
    */
    y0: Ember['default'].computed("y", "yScale", function () {
      return scale_utils.normalizeScale(this.get("yScale"), this.get("y"));
    }),

    /**
      The SVG path data for the rectangle
      @property d
      @type String
    */
    d: Ember['default'].computed("x0", "y0", "x1", "y1", function () {
      var x0 = this.get("x0");
      var y0 = this.get("y0");
      var x1 = this.get("x1");
      var y1 = this.get("y1");
      return "M" + x0 + "," + y0 + " L" + x0 + "," + y1 + " L" + x1 + "," + y1 + " L" + x1 + "," + y0 + " L" + x0 + "," + y0;
    }),

    /**
      Click event handler. Toggles selected if selectable.
      @method click
    */
    click: function click() {
      if (this.get("selectable")) {
        this.toggleProperty("selected");
      }
    }
  });

});
define('ember-nf-graph-examples/components/nf-vertical-line', ['exports', 'ember', 'ember-nf-graph/mixins/graph-has-graph-parent', 'ember-nf-graph/mixins/graph-requires-scale-source'], function (exports, Ember, HasGraphParent, RequireScaleSource) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(HasGraphParent['default'], RequireScaleSource['default'], {
    tagName: "line",

    classNames: ["nf-vertical-line"],

    attributeBindings: ["lineX:x1", "lineX:x2", "y1", "y2"],

    /**
      The top y coordinate of the line
      @property y1
      @type Number
      @default 0
      @private
    */
    y1: 0,

    /**
      The bottom y coordinate of the line
      @property y2
      @type Number
      @private
      @readonly
    */
    y2: Ember['default'].computed.alias("graph.graphHeight"),

    /**
      The x domain value at which to draw the vertical line on the graph
      @property x
      @type Number
      @default null
    */
    x: null,

    /**
      The calculated x coordinate of the vertical line
      @property lineX
      @type Number
      @private
      @readonly
    */
    lineX: Ember['default'].computed("xScale", "x", function () {
      var xScale = this.get("xScale");
      var x = this.get("x");
      var px = xScale ? xScale(x) : -1;
      return px && px > 0 ? px : 0;
    }) });

});
define('ember-nf-graph-examples/components/nf-x-axis', ['exports', 'ember', 'ember-nf-graph/mixins/graph-has-graph-parent', 'ember-nf-graph/mixins/graph-requires-scale-source', 'ember-nf-graph-examples/templates/components/nf-x-axis'], function (exports, Ember, HasGraphParent, RequireScaleSource, layout) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(HasGraphParent['default'], RequireScaleSource['default'], {
    tagName: "g",

    layout: layout['default'],
    template: null,

    useDefaultTemplate: Ember['default'].computed.equal("template", null),

    attributeBindings: ["transform"],
    classNameBindings: ["orientClass"],
    classNames: ["nf-x-axis"],

    /**
      The height of the x axis in pixels.
      @property height
      @type Number
      @default 20
    */
    height: 20,

    /**
      The number of ticks to display
      @property tickCount
      @type Number
      @default 12
    */
    tickCount: 12,

    /**
      The length of the tick line (the small vertical line indicating the tick)
      @property tickLength
      @type Number
      @default 0
    */
    tickLength: 0,

    /**
      The spacing between the end of the tick line and the origin of the templated
      tick content
      @property tickPadding
      @type Number
      @default 5
    */
    tickPadding: 5,

    /**
      The orientation of the x axis. Value can be `'top'` or `'bottom'`.
      @property orient
      @type String
      @default 'bottom'
    */
    orient: "bottom",

    _tickFilter: null,

    /**
      An optional filtering function to allow more control over what tick marks are displayed.
      The function should have exactly the same signature as the function you'd use for an
      `Array.prototype.filter()`.
       @property tickFilter
      @type Function
      @default null
      @example
             {{#nf-x-axis tickFilter=myFilter}}
              <text>{{tick.value}}</text>
            {{/nf-x-axis}}
       And on your controller:
             myFilter: function(tick, index, ticks) {
              return tick.value < 1000;
            },
       The above example will filter down the set of ticks to only those that are less than 1000.
    */
    tickFilter: Ember['default'].computed.alias("_tickFilter"),

    /**
      The class applied due to orientation (e.g. `'orient-top'`)
      @property orientClass
      @type String
      @readonly
    */
    orientClass: Ember['default'].computed("orient", function () {
      return "orient-" + this.get("orient");
    }),

    /**
      The SVG Transform applied to this component's container.
      @property transform
      @type String
      @readonly
    */
    transform: Ember['default'].computed("x", "y", function () {
      var x = this.get("x") || 0;
      var y = this.get("y") || 0;
      return "translate(" + x + " " + y + ")";
    }),

    /**
      The y position of this component's container.
      @property y
      @type Number
      @readonly
    */
    y: Ember['default'].computed("orient", "graph.paddingTop", "graph.paddingBottom", "graph.height", "height", function () {
      var orient = this.get("orient");
      var graphHeight = this.get("graph.height");
      var height = this.get("height");
      var paddingBottom = this.get("graph.paddingBottom");
      var paddingTop = this.get("graph.paddingTop");
      var y;

      if (orient === "bottom") {
        y = graphHeight - paddingBottom - height;
      } else {
        y = paddingTop;
      }

      return y || 0;
    }),

    /**
      This x position of this component's container
      @property x
      @type Number
      @readonly
    */
    x: Ember['default'].computed("graph.graphX", function () {
      return this.get("graph.graphX") || 0;
    }),

    init: function init() {
      this._super.apply(this, arguments);
      this.set("graph.xAxis", this);
      Ember['default'].deprecate("Non-block form of tick is deprecated. Please add `as |tick|` to your template.", this.get("template.blockParams"));
    },

    /**
      The width of the component
      @property width
      @type Number
      @readonly
    */
    width: Ember['default'].computed.alias("graph.graphWidth"),

    tickData: Ember['default'].computed("xScale", "graph.xScaleType", "uniqueXData", "tickCount", function () {
      if (this.get("graph.xScaleType") === "ordinal") {
        return this.get("uniqueXData");
      } else {
        return this.get("xScale").ticks(this.get("tickCount"));
      }
    }),

    /**
      A unique set of all x data on the graph
      @property uniqueXData
      @type Array
      @readonly
    */
    uniqueXData: Ember['default'].computed.uniq("graph.xData"),

    /**
      The models for the ticks to display on the axis.
      @property ticks
      @type Array
      @readonly
    */
    ticks: Ember['default'].computed("xScale", "tickPadding", "tickLength", "height", "orient", "tickFilter", "tickData", "graph.xScaleType", function () {
      var xScale = this.get("xScale");
      var xScaleType = this.get("graph.xScaleType");
      var tickPadding = this.get("tickPadding");
      var tickLength = this.get("tickLength");
      var height = this.get("height");
      var orient = this.get("orient");
      var tickFilter = this.get("tickFilter");
      var ticks = this.get("tickData");
      var y1 = orient === "top" ? height : 0;
      var y2 = y1 + tickLength;
      var labely = orient === "top" ? y1 - tickPadding : y1 + tickPadding;
      var halfBandWidth = xScaleType === "ordinal" ? xScale.rangeBand() / 2 : 0;
      var result = ticks.map(function (tick) {
        return {
          value: tick,
          x: xScale(tick) + halfBandWidth,
          y1: y1,
          y2: y2,
          labely: labely
        };
      });

      if (tickFilter) {
        result = result.filter(tickFilter);
      }

      return Ember['default'].A(result);
    }),

    /**
      The y position, in pixels, of the axis line
      @property axisLineY
      @type Number
      @readonly
    */
    axisLineY: Ember['default'].computed("orient", "height", function () {
      var orient = this.get("orient");
      var height = this.get("height");
      return orient === "top" ? height : 0;
    })

  });

});
define('ember-nf-graph-examples/components/nf-y-axis', ['exports', 'ember', 'ember-nf-graph/mixins/graph-has-graph-parent', 'ember-nf-graph/mixins/graph-requires-scale-source', 'ember-nf-graph-examples/templates/components/nf-y-axis'], function (exports, Ember, HasGraphParent, RequireScaleSource, layout) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(HasGraphParent['default'], RequireScaleSource['default'], {
    tagName: "g",

    layout: layout['default'],
    template: null,

    useDefaultTemplate: Ember['default'].computed.equal("template", null),

    /**
      The number of ticks to display
      @property tickCount
      @type Number
      @default 5
    */
    tickCount: 5,

    /**
      The length of the tick's accompanying line.
      @property tickLength
      @type Number
      @default 5
    */
    tickLength: 5,

    /**
      The distance between the tick line and the origin tick's templated output
      @property tickPadding
      @type Number
      @default 3
    */
    tickPadding: 3,

    /**
      The total width of the y axis
      @property width
      @type Number
      @default 40
    */
    width: 40,

    /**
      The orientation of the y axis. Possible values are `'left'` and `'right'`
      @property orient
      @type String
      @default 'left'
    */
    orient: "left",

    attributeBindings: ["transform"],

    classNameBindings: [":nf-y-axis", "isOrientRight:orient-right:orient-left"],

    _tickFilter: null,

    /**
      An optional filtering function to allow more control over what tick marks are displayed.
      The function should have exactly the same signature as the function you'd use for an
      `Array.prototype.filter()`.
    
      @property tickFilter
      @type Function
      @default null
      @example
    
            {{#nf-y-axis tickFilter=myFilter}} 
              <text>{{tick.value}}</text>
            {{/nf-y-axis}}
    
      And on your controller:
      
            myFilter: function(tick, index, ticks) {
              return tick.value < 1000;
            },
    
      The above example will filter down the set of ticks to only those that are less than 1000.
    */
    tickFilter: Ember['default'].computed(function (name, value) {
      if (arguments.length > 1) {
        this._tickFilter = value;
      }
      return this._tickFilter;
    }),

    /**
      computed property. returns true if `orient` is equal to `'right'`.
      @property isOrientRight
      @type Boolean
      @readonly
    */
    isOrientRight: Ember['default'].computed.equal("orient", "right"),

    /**
      The SVG transform for positioning the component.
      @property transform
      @type String
      @readonly
    */
    transform: Ember['default'].computed("x", "y", function () {
      var x = this.get("x");
      var y = this.get("y");
      return "translate(" + x + " " + y + ")";
    }),

    /**
      The x position of the component
      @property x
      @type Number
      @readonly
    */
    x: Ember['default'].computed("orient", "graph.width", "width", "graph.paddingLeft", "graph.paddingRight", function () {
      var orient = this.get("orient");
      if (orient !== "left") {
        return this.get("graph.width") - this.get("width") - this.get("graph.paddingRight");
      }
      return this.get("graph.paddingLeft");
    }),

    /**
      The y position of the component
      @property y
      @type Number
      @readonly
    */
    y: Ember['default'].computed.alias("graph.graphY"),

    /** 
      the height of the component
      @property height
      @type Number
      @readonly
    */
    height: Ember['default'].computed.alias("graph.height"),

    init: function init() {
      this._super.apply(this, arguments);
      this.set("graph.yAxis", this);
      Ember['default'].deprecate("Non-block form of tick is deprecated. Please add `as |tick|` to your template.", this.get("template.blockParams"));
    },

    /**
      Function to create the tick values. Can be overriden to provide specific values.
      @method tickFactory
      @param yScale {Function} a d3 scale function
      @param tickCount {Number} the number of ticks desired
      @param uniqueYData {Array} all y data represented, filted to be unique (used for ordinal cases)
      @param yScaleType {String} the scale type of the containing graph.
      @return {Array} an array of domain values at which ticks should be placed.
    */
    tickFactory: function tickFactory(yScale, tickCount, uniqueYData, yScaleType) {
      var ticks = yScaleType === "ordinal" ? uniqueYData : yScale.ticks(tickCount);
      if (yScaleType === "log") {
        var step = Math.round(ticks.length / tickCount);
        ticks = ticks.filter(function (tick, i) {
          return i % step === 0;
        });
      }
      return ticks;
    },

    tickData: Ember['default'].computed("graph.yScaleType", "uniqueYData", "yScale", "tickCount", function () {
      var yScaleType = this.get("graph.yScaleType");
      if (yScaleType === "ordinal") {
        return this.get("uniqueYData");
      } else {
        var tickCount = this.get("tickCount");
        var ticks = this.get("yScale").ticks(tickCount);
        if (yScaleType === "log") {
          var step = Math.round(ticks.length / tickCount);
          ticks = ticks.filter(function (tick, i) {
            return i % step === 0;
          });
        }
        return ticks;
      }
    }),

    /**
      All y data from the graph, filtered to unique values.
      @property uniqueYData
      @type Array
      @readonly
    */
    uniqueYData: Ember['default'].computed.uniq("graph.yData"),

    /** 
      The ticks to be displayed.
      @property ticks
      @type Array
      @readonly
    */
    ticks: Ember['default'].computed("yScale", "tickPadding", "axisLineX", "tickLength", "isOrientRight", "tickFilter", function () {
      var yScale = this.get("yScale");
      var tickPadding = this.get("tickPadding");
      var axisLineX = this.get("axisLineX");
      var tickLength = this.get("tickLength");
      var isOrientRight = this.get("isOrientRight");
      var tickFilter = this.get("tickFilter");
      var ticks = this.get("tickData");
      var x1 = isOrientRight ? axisLineX + tickLength : axisLineX - tickLength;
      var x2 = axisLineX;
      var labelx = isOrientRight ? tickLength + tickPadding : axisLineX - tickLength - tickPadding;

      var result = ticks.map(function (tick) {
        return {
          value: tick,
          y: yScale(tick),
          x1: x1,
          x2: x2,
          labelx: labelx };
      });

      if (tickFilter) {
        result = result.filter(tickFilter);
      }

      return Ember['default'].A(result);
    }),

    /**
      The x position of the axis line.
      @property axisLineX
      @type Number
      @readonly
    */
    axisLineX: Ember['default'].computed("isOrientRight", "width", function () {
      return this.get("isOrientRight") ? 0 : this.get("width");
    }) });

});
define('ember-nf-graph-examples/components/nf-y-diff', ['exports', 'ember', 'ember-nf-graph/mixins/graph-has-graph-parent', 'ember-nf-graph/mixins/graph-requires-scale-source', 'ember-nf-graph/utils/nf/scale-utils'], function (exports, Ember, HasGraphParent, RequireScaleSource, scale_utils) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(HasGraphParent['default'], RequireScaleSource['default'], {
    tagName: "g",

    attributeBindings: ["transform"],

    classNameBindings: [":nf-y-diff", "isPositive:positive:negative", "isOrientRight:orient-right:orient-left"],

    /**
      The starting domain value of the difference measurement. The subrahend of the difference calculation.
      @property a
      @type Number
      @default null
    */
    a: null,

    /**
      The ending domain value of the difference measurement. The minuend of the difference calculation.
      @property b
      @type Number
      @default null
    */
    b: null,

    /**
      The amount of padding, in pixels, between the edge of the difference "box" and the content container
      @property contentPadding
      @type Number
      @default 5
    */
    contentPadding: 5,

    /**
      The duration of the transition, in milliseconds, as the difference slides vertically
      @property duration
      @type Number
      @default 400
    */
    duration: 400,

    /**
      The calculated vertical center of the difference box, in pixels.
      @property yCenter
      @type Number
      @readonly
    */
    yCenter: Ember['default'].computed("yA", "yB", function () {
      var yA = +this.get("yA") || 0;
      var yB = +this.get("yB") || 0;
      return (yA + yB) / 2;
    }),

    /**
      The y pixel value of b.
      @property yB
      @type Number
    */
    yB: Ember['default'].computed("yScale", "b", function () {
      return scale_utils.normalizeScale(this.get("yScale"), this.get("b"));
    }),

    /**
      The y pixel value of a.
      @property yA
      @type Number
    */
    yA: Ember['default'].computed("yScale", "a", function () {
      return scale_utils.normalizeScale(this.get("yScale"), this.get("a"));
    }),

    /**
      The SVG transformation of the component.
      @property transform
      @type String
      @private
      @readonly
    */
    transform: Ember['default'].computed.alias("graph.yAxis.transform"),

    /**
      The calculated difference between `a` and `b`.
      @property diff
      @type Number
      @readonly
    */
    diff: Ember['default'].computed("a", "b", function () {
      return +this.get("b") - this.get("a");
    }),

    /**
      Returns `true` if `diff` is a positive number
      @property isPositive
      @type Boolean
      @readonly
    */
    isPositive: Ember['default'].computed.gte("diff", 0),

    /**
      Returns `true` if the graph's y-axis component is configured to orient right.
      @property isOrientRight
      @type Boolean
      @readonly
    */
    isOrientRight: Ember['default'].computed.equal("graph.yAxis.orient", "right"),

    /**
      The width of the difference box
      @property width
      @type Number
      @readonly
    */
    width: Ember['default'].computed.alias("graph.yAxis.width"),

    /**
      The view controller for the view this component is present in
      @property parentController
      @type Ember.Controller
      @private
      @readonly
    */
    parentController: Ember['default'].computed.alias("templateData.view.controller"),

    /**
      The x pixel coordinate of the content container.
      @property contentX
      @type Number
      @readonly
    */
    contentX: Ember['default'].computed("isOrientRight", "width", "contentPadding", function () {
      var contentPadding = this.get("contentPadding");
      var width = this.get("width");
      return this.get("isOrientRight") ? width - contentPadding : contentPadding;
    }),

    rectPath: Ember['default'].computed("yA", "yB", "width", function () {
      var x = 0;
      var w = +this.get("width") || 0;
      var x2 = x + w;
      var yA = +this.get("yA") || 0;
      var yB = +this.get("yB") || 0;
      return "M" + x + "," + yA + " L" + x + "," + yB + " L" + x2 + "," + yB + " L" + x2 + "," + yA + " L" + x + "," + yA;
    }),

    /**
      The SVG transformation used to position the content container.
      @property contentTransform
      @type String
      @private
      @readonly
    */
    contentTransform: Ember['default'].computed("contentX", "yCenter", function () {
      var contentX = this.get("contentX");
      var yCenter = this.get("yCenter");
      return "translate(" + contentX + " " + yCenter + ")";
    }),

    /**
      Sets up the d3 related elements when component is inserted 
      into the DOM
      @method didInsertElement
    */
    didInsertElement: function didInsertElement() {
      var element = this.get("element");
      var g = d3.select(element);

      var rectPath = this.get("rectPath");
      var rect = g.insert("path", ":first-child").attr("class", "nf-y-diff-rect").attr("d", rectPath);

      var contentTransform = this.get("contentTransform");
      var content = g.select(".nf-y-diff-content");
      content.attr("transform", contentTransform);

      this.set("rectElement", rect);
      this.set("contentElement", content);
    },

    /**
      Performs the transition (animation) of the elements.
      @method doTransition
    */
    doTransition: function doTransition() {
      var duration = this.get("duration");
      var rectElement = this.get("rectElement");
      var contentElement = this.get("contentElement");

      if (rectElement) {
        rectElement.transition().duration(duration).attr("d", this.get("rectPath"));
      }

      if (contentElement) {
        contentElement.transition().duration(duration).attr("transform", this.get("contentTransform"));
      }
    },

    /**
      Schedules a transition once at afterRender.
      @method transition
    */
    transition: Ember['default'].observer("a", "b", function () {
      Ember['default'].run.once(this, this.doTransition);
    }),

    /**
      Updates to d3 managed DOM elments that do
      not require transitioning, because they're width-related.
      @method doAdjustWidth
    */
    doAdjustWidth: function doAdjustWidth() {
      var contentElement = this.get("contentElement");
      if (contentElement) {
        var contentTransform = this.get("contentTransform");
        contentElement.attr("transform", contentTransform);
      }
    },

    adjustGraphHeight: Ember['default'].on("didInsertElement", Ember['default'].observer("graph.graphHeight", function () {
      var rectElement = this.get("rectElement");
      var contentElement = this.get("contentElement");

      if (rectElement) {
        rectElement.attr("d", this.get("rectPath"));
      }

      if (contentElement) {
        contentElement.attr("transform", this.get("contentTransform"));
      }
    })),

    /**
      Schedules a call to `doAdjustWidth` on afterRender
      @method adjustWidth
    */
    adjustWidth: Ember['default'].on("didInsertElement", Ember['default'].observer("isOrientRight", "width", "contentPadding", function () {
      Ember['default'].run.once(this, this.doAdjustWidth);
    })) });

});
define('ember-nf-graph-examples/components/stacked-area-graph', ['exports', 'ember', 'ember-nf-graph-examples/services/data-generator'], function (exports, Ember, data_generator) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({

    graphData: (function () {
      return data_generator.dataGenerator.threeMetricTimeSeries();
    }).property()

  });

});
define('ember-nf-graph-examples/helpers/format-hour-minute', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  /* exported format */

  var format = function format(ms) {

    if (isNaN(ms) || ms === null || typeof ms === "undefined") {
      return "";
    }

    var date = new Date(ms);
    var h = date.getHours();
    var m = date.getMinutes();

    if (h < 10) {
      h = "0" + h;
    }

    if (m < 10) {
      m = "0" + m;
    }

    return h + ":" + m;
  };

  exports['default'] = Ember['default'].Handlebars.makeBoundHelper(function (ms) {
    return format(ms);
  });

  exports.format = format;

});
define('ember-nf-graph-examples/initializers/app-version', ['exports', 'ember-nf-graph-examples/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;
  var registered = false;

  exports['default'] = {
    name: "App Version",
    initialize: function initialize(container, application) {
      if (!registered) {
        var appName = classify(application.toString());
        Ember['default'].libraries.register(appName, config['default'].APP.version);
        registered = true;
      }
    }
  };

});
define('ember-nf-graph-examples/initializers/export-application-global', ['exports', 'ember', 'ember-nf-graph-examples/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    var classifiedName = Ember['default'].String.classify(config['default'].modulePrefix);

    if (config['default'].exportApplicationGlobal && !window[classifiedName]) {
      window[classifiedName] = application;
    }
  }

  ;

  exports['default'] = {
    name: "export-application-global",

    initialize: initialize
  };

});
define('ember-nf-graph-examples/router', ['exports', 'ember', 'ember-nf-graph-examples/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  exports['default'] = Router.map(function () {});

});
define('ember-nf-graph-examples/services/data-generator', ['exports'], function (exports) {

  'use strict';

  var minutes = function minutes(n) {
    return n * 60000;
  };

  var random = function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var dataGenerator = {
    simpleTimeSeries: function simpleTimeSeries() {
      var count = 24;
      var now = Date.now();
      var data = [];

      for (var i = 1; i <= count; i++) {
        var y = random(0, 10);
        var x = now - minutes(count * 2 - i * 2);

        data.push({ x: x, y: y });
      }

      return data;
    },

    threeMetricTimeSeries: function threeMetricTimeSeries() {
      var count = 24;
      var now = Date.now();
      var data = [];

      for (var i = 1; i <= count; i++) {
        var x = now - minutes(count * 2 - i * 2);
        var y1 = random(0, 9);
        var y2 = random(10, 19);
        var y3 = random(20, 29);

        data.push({
          date: x,
          low: y1,
          medium: y2,
          high: y3
        });
      }

      return data;
    },

    simpleOrdinalData: function simpleOrdinalData() {
      var count = 10;
      var data = [];

      for (var i = 0; i < count; i++) {
        data.push({
          x: i,
          y: random(10, 30) });
      }

      return data;
    },

    ganttData: function ganttData() {
      var count = 5;
      var data = [];
      var high = Date.now();
      var low = Date.now() - minutes(10);
      var mid = low + (high - low) / 2;

      for (var i = 0; i < count; i++) {
        var start = random(low, mid);
        var end = random(mid, high);

        data.push({
          index: i,
          start: start,
          end: end
        });
      }

      return data;
    }

  };

  exports.dataGenerator = dataGenerator;

});
define('ember-nf-graph-examples/services/utility', ['exports'], function (exports) {

  'use strict';

  var max = function max(array) {
    if (!Array.isArray(array)) {
      return array;
    }
    var test = array.filter(function (item) {
      return !isNaN(item);
    });
    var result = Math.max.apply(null, test);
    return result;
  };

  var min = function min(array) {
    if (!Array.isArray(array)) {
      return array;
    }
    var test = array.filter(function (item) {
      return !isNaN(item);
    });
    var result = Math.min.apply(null, test);
    return result;
  };

  exports.max = max;
  exports.min = min;

});
define('ember-nf-graph-examples/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        dom.setAttribute(el1,"id","title");
        var el2 = dom.createTextNode("ember-cli-nf-graph examples");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("section");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h3");
        var el3 = dom.createTextNode("Resources");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"href","//github.com/netflix/ember-cli-nf-graph");
        var el5 = dom.createTextNode("ember-nf-graph source");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"href","//github.com/netflix/ember-nf-graph-examples");
        var el5 = dom.createTextNode("ember-nf-graph-examples source");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"href","//netflix.github.io/ember-cli-nf-graph/docs/");
        var el5 = dom.createTextNode("Documentation for nf-graph here");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("section");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h3");
        var el3 = dom.createTextNode("Contents");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"href","#basic-line-graph");
        var el5 = dom.createTextNode("Basic Line Graph");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"href","#basic-area-graph");
        var el5 = dom.createTextNode("Basic Area Graph");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"href","#basic-bar-graph");
        var el5 = dom.createTextNode("Basic Bar Graph");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"href","#detailed-line-graph");
        var el5 = dom.createTextNode("Detailed Line Graph");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"href","#stacked-area-graph");
        var el5 = dom.createTextNode("Stacked Area Graph");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"href","#mouse-tracking");
        var el5 = dom.createTextNode("Mouse Tracking");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"href","#mouse-tracking-data");
        var el5 = dom.createTextNode("Mouse Tracking Data");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"href","#brush-select-zoom");
        var el5 = dom.createTextNode("Brush Select to Zoom");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"href","#bars-with-line");
        var el5 = dom.createTextNode("Bar Graph with Line");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("section");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"name","basic-line-graph");
        var el3 = dom.createElement("h3");
        var el4 = dom.createTextNode("Basic Line Graph");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("section");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"name","basic-area-graph");
        var el3 = dom.createElement("h3");
        var el4 = dom.createTextNode("Basic Area Graph");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("section");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"name","basic-bar-graph");
        var el3 = dom.createElement("h3");
        var el4 = dom.createTextNode("Basic Bar Graph");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("section");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"name","detailed-line-graph");
        var el3 = dom.createElement("h3");
        var el4 = dom.createTextNode("Detailed Line Graph");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("section");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"name","stacked-area-graph");
        var el3 = dom.createElement("h3");
        var el4 = dom.createTextNode("Stacked Area Graph");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("section");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"name","mouse-tracking");
        var el3 = dom.createElement("h3");
        var el4 = dom.createTextNode("Mouse Tracking");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("section");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"name","mouse-tracking-data");
        var el3 = dom.createElement("h3");
        var el4 = dom.createTextNode("Mouse Tracking Data");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("section");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"name","brush-select-zoom");
        var el3 = dom.createElement("h3");
        var el4 = dom.createTextNode("Brush Select to Zoom");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("section");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"name","bars-with-line");
        var el3 = dom.createElement("h3");
        var el4 = dom.createTextNode("Bar Graph with Line");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(dom.childAt(fragment, [6]),3,3);
        var morph1 = dom.createMorphAt(dom.childAt(fragment, [8]),3,3);
        var morph2 = dom.createMorphAt(dom.childAt(fragment, [10]),3,3);
        var morph3 = dom.createMorphAt(dom.childAt(fragment, [12]),3,3);
        var morph4 = dom.createMorphAt(dom.childAt(fragment, [14]),3,3);
        var morph5 = dom.createMorphAt(dom.childAt(fragment, [16]),3,3);
        var morph6 = dom.createMorphAt(dom.childAt(fragment, [18]),3,3);
        var morph7 = dom.createMorphAt(dom.childAt(fragment, [20]),3,3);
        var morph8 = dom.createMorphAt(dom.childAt(fragment, [22]),3,3);
        content(env, morph0, context, "basic-line-graph");
        content(env, morph1, context, "basic-area-graph");
        content(env, morph2, context, "basic-bar-graph");
        content(env, morph3, context, "detailed-line-graph");
        content(env, morph4, context, "stacked-area-graph");
        content(env, morph5, context, "mouse-tracking");
        content(env, morph6, context, "mouse-tracking-data");
        content(env, morph7, context, "brush-select-zoom");
        content(env, morph8, context, "bars-with-line");
        return fragment;
      }
    };
  }()));

});
define('ember-nf-graph-examples/templates/components/bars-with-line', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.0",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("\n     ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n     ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
            var morph1 = dom.createMorphAt(fragment,3,3,contextualElement);
            inline(env, morph0, context, "nf-bars", [], {"data": get(env, context, "barData")});
            inline(env, morph1, context, "nf-line", [], {"data": get(env, context, "lineData"), "class": "dashed"});
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, block = hooks.block;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
          dom.insertBoundary(fragment, null);
          block(env, morph0, context, "nf-graph-content", [], {}, child0, null);
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Template");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("table");
        dom.setAttribute(el1,"class","CodeRay template");
        var el2 = dom.createElement("tbody");
        var el3 = dom.createElement("tr");
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","line-numbers");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("pre");
        var el6 = dom.createTextNode("1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","code");
        var el5 = dom.createElement("pre");
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("#nf-graph");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("xScaleType");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("ordinal");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("yMinMode");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("fixed");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("yMin");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Integer");
        dom.setAttribute(el6,"class","integer");
        var el7 = dom.createTextNode("0");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n   ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("#nf-graph-content}}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n     ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("bars");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("data");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("barData");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n     ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("line");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("data");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("lineData");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("class");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("dashed");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n   ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("/");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("graph");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("content");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("/");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("graph");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","discussion");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n  Lines, areas, and bars can be combined in one graph.  nf-graph will account for the domain data within each graph elemen to determine axis and scales.  In this example a bar graph is superimposed with a line plot.\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Component JavaScript");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("table");
        dom.setAttribute(el1,"class","CodeRay");
        var el2 = dom.createElement("tbody");
        var el3 = dom.createElement("tr");
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","line-numbers");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("pre");
        var el6 = dom.createTextNode("1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","code");
        var el5 = dom.createElement("pre");
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Reserved");
        dom.setAttribute(el6,"class","reserved");
        var el7 = dom.createTextNode("import");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("Ember");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("from");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("ember");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Reserved");
        dom.setAttribute(el6,"class","reserved");
        var el7 = dom.createTextNode("import");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("dataGenerator");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("from");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("../services/data-generator");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Reserved");
        dom.setAttribute(el6,"class","reserved");
        var el7 = dom.createTextNode("export");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("default");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("Ember");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("Component");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("extend");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("({");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Key");
        dom.setAttribute(el6,"class","key");
        var el7 = dom.createTextNode("classNames");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(":");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("[");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("bars-with-line");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("]");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(",");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Function");
        dom.setAttribute(el6,"class","function");
        var el7 = dom.createTextNode("barData");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(":");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("function");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("return");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("dataGenerator");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("simpleOrdinalData");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("property");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(",");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Function");
        dom.setAttribute(el6,"class","function");
        var el7 = dom.createTextNode("lineData");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(":");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("function");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("return");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("dataGenerator");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("simpleOrdinalData");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("property");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("})");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        block(env, morph0, context, "nf-graph", [], {"xScaleType": "ordinal", "yMinMode": "fixed", "yMin": 0}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('ember-nf-graph-examples/templates/components/basic-area-graph', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.0",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("\n    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
            inline(env, morph0, context, "nf-area", [], {"data": get(env, context, "graphData")});
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, block = hooks.block;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, null);
          dom.insertBoundary(fragment, 0);
          block(env, morph0, context, "nf-graph-content", [], {}, child0, null);
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Template");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("table");
        dom.setAttribute(el1,"class","CodeRay template");
        var el2 = dom.createElement("tbody");
        var el3 = dom.createElement("tr");
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","line-numbers");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("pre");
        var el6 = dom.createTextNode("1\n2\n3\n4\n5\n6\n7\n");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","code");
        var el5 = dom.createElement("pre");
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("#nf-graph}}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("#nf-graph-content}}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("area");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("data");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("graphData");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("/");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("graph");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("content");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("/");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("graph");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","discussion");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n  {{#nf-graph}} is the main container.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n  {{#nf-graph-content}} is the container for elements that should appear inside the graph's plot area.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n  {{#nf-area}} adds an area plot to the graph.  \"data=graphData\" assigns an array of data to the line.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n  By default {{nf-area}} will look for properties \"x\" and \"y\" on each element in the data array. \"y\" defines the top curve of the area.\n  {{nf-area}} also accepts a second y value \"y1\" to defind the bottom of the area curve.  If \"y1\" is not provided as in this example it defaults to zero and plotted to fill the bottom of the graph.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Component JavaScript");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("table");
        dom.setAttribute(el1,"class","CodeRay");
        var el2 = dom.createElement("tbody");
        var el3 = dom.createElement("tr");
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","line-numbers");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("pre");
        var el6 = dom.createTextNode("1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","code");
        var el5 = dom.createElement("pre");
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Reserved");
        dom.setAttribute(el6,"class","reserved");
        var el7 = dom.createTextNode("import");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("Ember");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("from");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("ember");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Reserved");
        dom.setAttribute(el6,"class","reserved");
        var el7 = dom.createTextNode("import");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("dataGenerator");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("from");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("../services/data-generator");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Reserved");
        dom.setAttribute(el6,"class","reserved");
        var el7 = dom.createTextNode("export");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("default");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("Ember");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("Component");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("extend");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("({");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Function");
        dom.setAttribute(el6,"class","function");
        var el7 = dom.createTextNode("graphData");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(":");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("function");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("return");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("dataGenerator");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("simpleTimeSeries");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("property");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("})");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        block(env, morph0, context, "nf-graph", [], {}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('ember-nf-graph-examples/templates/components/basic-bar-graph', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.0",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("\n     ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
            inline(env, morph0, context, "nf-bars", [], {"data": get(env, context, "graphData")});
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, block = hooks.block;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
          dom.insertBoundary(fragment, null);
          block(env, morph0, context, "nf-graph-content", [], {}, child0, null);
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Template");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("table");
        dom.setAttribute(el1,"class","CodeRay template");
        var el2 = dom.createElement("tbody");
        var el3 = dom.createElement("tr");
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","line-numbers");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("pre");
        var el6 = dom.createTextNode("1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","code");
        var el5 = dom.createElement("pre");
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("#nf-graph");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("xScaleType");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("ordinal");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("yMinMode");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("fixed");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("yMin");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Integer");
        dom.setAttribute(el6,"class","integer");
        var el7 = dom.createTextNode("0");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n   ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("#nf-graph-content}}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n     ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("bars");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("data");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("graphData");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n   ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("/");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("graph");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("content");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("/");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("graph");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","discussion");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n  {{#nf-graph}} is the main container.  xScaleType=\"ordinal\" is required for bar graphs and causes bars to be evenly spaced based on ordinal position.  yMinMode=\"fixed\" and yMin=0 causes the Y Axis to always start at zero regardless of the minimum data value among the data array elements (works with any graph type).\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n  {{#nf-graph-content}} is the container for elements that should appear inside the graph's plot area.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n  {{#nf-bars}} adds a set of bars the graph. \"data=graphData\" assigns an array of data to the line. One bar is drawn for each element in the array.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n  By default {{nf-bars}} will look for properties \"x\" and \"y\" on each element in the data array. \"x\" defines the ordinal position of each bar and is often a simple index. \"y\" defines the height of each bar.  Bar heights are draw relative to each other based on the minimum and maximum y values among all the data elements.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Component JavaScript");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","CodeRay");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("table");
        dom.setAttribute(el2,"class","CodeRay");
        var el3 = dom.createElement("tbody");
        var el4 = dom.createElement("tr");
        var el5 = dom.createTextNode("\n  ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        dom.setAttribute(el5,"class","line-numbers");
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("pre");
        var el7 = dom.createTextNode("1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n  ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        dom.setAttribute(el5,"class","code");
        var el6 = dom.createElement("pre");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Reserved");
        dom.setAttribute(el7,"class","reserved");
        var el8 = dom.createTextNode("import");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Space");
        var el8 = dom.createTextNode(" ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Ident");
        var el8 = dom.createTextNode("Ember");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Space");
        var el8 = dom.createTextNode(" ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Ident");
        var el8 = dom.createTextNode("from");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Space");
        var el8 = dom.createTextNode(" ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","string");
        var el8 = dom.createElement("span");
        dom.setAttribute(el8,"title","String");
        dom.setAttribute(el8,"class","delimiter");
        var el9 = dom.createTextNode("'");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("span");
        dom.setAttribute(el8,"title","String");
        dom.setAttribute(el8,"class","content");
        var el9 = dom.createTextNode("ember");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("span");
        dom.setAttribute(el8,"title","String");
        dom.setAttribute(el8,"class","delimiter");
        var el9 = dom.createTextNode("'");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Operator");
        var el8 = dom.createTextNode(";");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Space");
        var el8 = dom.createTextNode("\n");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Reserved");
        dom.setAttribute(el7,"class","reserved");
        var el8 = dom.createTextNode("import");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Space");
        var el8 = dom.createTextNode(" ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Operator");
        var el8 = dom.createTextNode("{");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Space");
        var el8 = dom.createTextNode(" ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Ident");
        var el8 = dom.createTextNode("dataGenerator");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Space");
        var el8 = dom.createTextNode(" ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Operator");
        var el8 = dom.createTextNode("}");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Space");
        var el8 = dom.createTextNode(" ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Ident");
        var el8 = dom.createTextNode("from");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Space");
        var el8 = dom.createTextNode(" ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","string");
        var el8 = dom.createElement("span");
        dom.setAttribute(el8,"title","String");
        dom.setAttribute(el8,"class","delimiter");
        var el9 = dom.createTextNode("'");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("span");
        dom.setAttribute(el8,"title","String");
        dom.setAttribute(el8,"class","content");
        var el9 = dom.createTextNode("../services/data-generator");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("span");
        dom.setAttribute(el8,"title","String");
        dom.setAttribute(el8,"class","delimiter");
        var el9 = dom.createTextNode("'");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Operator");
        var el8 = dom.createTextNode(";");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Space");
        var el8 = dom.createTextNode("\n\n");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Reserved");
        dom.setAttribute(el7,"class","reserved");
        var el8 = dom.createTextNode("export");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Space");
        var el8 = dom.createTextNode(" ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Keyword");
        dom.setAttribute(el7,"class","keyword");
        var el8 = dom.createTextNode("default");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Space");
        var el8 = dom.createTextNode(" ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Ident");
        var el8 = dom.createTextNode("Ember");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Operator");
        var el8 = dom.createTextNode(".");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Ident");
        var el8 = dom.createTextNode("Component");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Operator");
        var el8 = dom.createTextNode(".");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Ident");
        var el8 = dom.createTextNode("extend");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Operator");
        var el8 = dom.createTextNode("({");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Space");
        var el8 = dom.createTextNode("\n\n  ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Function");
        dom.setAttribute(el7,"class","function");
        var el8 = dom.createTextNode("graphData");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Operator");
        var el8 = dom.createTextNode(":");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Space");
        var el8 = dom.createTextNode(" ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Keyword");
        dom.setAttribute(el7,"class","keyword");
        var el8 = dom.createTextNode("function");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Operator");
        var el8 = dom.createTextNode("(");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Operator");
        var el8 = dom.createTextNode(")");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Space");
        var el8 = dom.createTextNode(" ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Operator");
        var el8 = dom.createTextNode("{");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Space");
        var el8 = dom.createTextNode("\n    ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Keyword");
        dom.setAttribute(el7,"class","keyword");
        var el8 = dom.createTextNode("return");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Space");
        var el8 = dom.createTextNode(" ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Ident");
        var el8 = dom.createTextNode("dataGenerator");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Operator");
        var el8 = dom.createTextNode(".");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Ident");
        var el8 = dom.createTextNode("simpleOrdinalData");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Operator");
        var el8 = dom.createTextNode("(");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Operator");
        var el8 = dom.createTextNode(")");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Operator");
        var el8 = dom.createTextNode(";");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Space");
        var el8 = dom.createTextNode("\n  ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Operator");
        var el8 = dom.createTextNode("}");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Operator");
        var el8 = dom.createTextNode(".");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Ident");
        var el8 = dom.createTextNode("property");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Operator");
        var el8 = dom.createTextNode("(");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Operator");
        var el8 = dom.createTextNode(")");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Space");
        var el8 = dom.createTextNode("\n\n");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Operator");
        var el8 = dom.createTextNode("})");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Operator");
        var el8 = dom.createTextNode(";");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","Space");
        var el8 = dom.createTextNode("\n");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        block(env, morph0, context, "nf-graph", [], {"xScaleType": "ordinal", "yMinMode": "fixed", "yMin": 0}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('ember-nf-graph-examples/templates/components/basic-line-graph', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.0",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("\n     ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
            inline(env, morph0, context, "nf-line", [], {"data": get(env, context, "graphData")});
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, block = hooks.block;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, null);
          dom.insertBoundary(fragment, 0);
          block(env, morph0, context, "nf-graph-content", [], {}, child0, null);
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Template");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("table");
        dom.setAttribute(el1,"class","CodeRay template");
        var el2 = dom.createElement("tbody");
        var el3 = dom.createElement("tr");
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","line-numbers");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("pre");
        var el6 = dom.createTextNode("1\n2\n3\n4\n5\n6\n7\n");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","code");
        var el5 = dom.createElement("pre");
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("#nf-graph}}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n   ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("#nf-graph-content}}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n     ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("line");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("data");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("graphData");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n   ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("/");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("graph");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("content");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("/");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("graph");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","discussion");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n  {{#nf-graph}} is the main container.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n  {{#nf-graph-content}} is the container for elements that should appear inside the graph's plot area.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n  {{#nf-line}} adds a line plot to the graph.  \"data=graphData\" assigns an array of data to the line.  By default {{nf-line}} will look for properties \"x\" and \"y\" on each element in the data array.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Component JavaScript");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("table");
        dom.setAttribute(el1,"class","CodeRay");
        var el2 = dom.createElement("tbody");
        var el3 = dom.createElement("tr");
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","line-numbers");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("pre");
        var el6 = dom.createTextNode("1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","code");
        var el5 = dom.createElement("pre");
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Reserved");
        dom.setAttribute(el6,"class","reserved");
        var el7 = dom.createTextNode("import");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("Ember");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("from");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("ember");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Reserved");
        dom.setAttribute(el6,"class","reserved");
        var el7 = dom.createTextNode("import");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("dataGenerator");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("from");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("../services/data-generator");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Reserved");
        dom.setAttribute(el6,"class","reserved");
        var el7 = dom.createTextNode("export");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("default");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("Ember");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("Component");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("extend");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("({");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Function");
        dom.setAttribute(el6,"class","function");
        var el7 = dom.createTextNode("graphData");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(":");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("function");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("return");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("dataGenerator");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("simpleTimeSeries");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("property");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("})");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        block(env, morph0, context, "nf-graph", [], {}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('ember-nf-graph-examples/templates/components/brush-select-zoom', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.0",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("\n     ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n     ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
            var morph1 = dom.createMorphAt(fragment,3,3,contextualElement);
            inline(env, morph0, context, "nf-line", [], {"data": get(env, context, "zoomData"), "interpolator": "monotone"});
            inline(env, morph1, context, "nf-brush-selection", [], {"right": get(env, context, "selectRight"), "left": get(env, context, "selectLeft"), "formatter": get(env, context, "selectionDisplayFormatter")});
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, block = hooks.block;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
          block(env, morph0, context, "nf-graph-content", [], {}, child0, null);
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Reset Zoom");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Template");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("table");
        dom.setAttribute(el1,"class","CodeRay template");
        var el2 = dom.createElement("tbody");
        var el3 = dom.createElement("tr");
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","line-numbers");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("pre");
        var el6 = dom.createTextNode("1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","code");
        var el5 = dom.createTextNode("\n  ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("pre");
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("#nf-graph");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("yMaxMode");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("push-tick");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("brushEndAction");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("brushEnd");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("#nf-graph-content}}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("line");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("data");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("zoomData");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("interpolator");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("monotone");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("brush");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("selection");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("right");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("selectRight");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("left");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("selectLeft");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("formatter");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("selectionDisplayFormatter");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("/");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("graph");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("content");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("/");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("graph");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n  ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("tr");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","line-numbers");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("pre");
        var el6 = dom.createTextNode("13\n14\n");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","code");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("pre");
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Tag");
        dom.setAttribute(el6,"class","tag");
        var el7 = dom.createTextNode("<button {{action \"reset\"}}>");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Plain");
        var el7 = dom.createTextNode("Reset Zoom");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Tag");
        dom.setAttribute(el6,"class","tag");
        var el7 = dom.createTextNode("</button>");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","discussion");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n  Brush selection allows a segment of the graph's plot area to be selected by click-and-drag with the mouse.  It is up to the developer to decide what to do with the selection results.  This example shows how to use the selection results to zoom in.\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n  yMaxMode=\"push-tick\" causes the Y Axis to auto-resize to the next larger tick value when necessary as graph data changes. In this example graph data will change by filtering the data).  nf-graph will redraw any line plots when data changes.\n  \"push-tick\" also prevents the axis from shrinking which is what we want while zooming to prevent the user from being disoriented by drastically changing axis ranges while zooming.\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n  brushEndAction specifies what action to execute on the component when the brush gesture ends.\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n  {{nf-brush-selection}} captures mouse click-and-drag and emits the graph positions as actions.  It also draws selection markers on the graph plot area. Properties right and left are bound to component properties used to filter the data.\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n  In this example mouse click-and-drag causes the brush enbd action to be fired. When the brush action ends JavaScript code updates data filter properties so that the graph displays only data within the new zoom extents.\n  Clicking the reset button resets the filter properties to include all data (unfiltered or zoomed).\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Component JavaScript");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("table");
        dom.setAttribute(el1,"class","CodeRay");
        var el2 = dom.createElement("tbody");
        var el3 = dom.createElement("tr");
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","line-numbers");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("pre");
        var el6 = dom.createTextNode("1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27\n28\n29\n30\n31\n32\n33\n34\n35\n36\n37\n38\n39\n40\n41\n42\n43\n44\n45\n46\n47\n48\n49\n50\n51\n52\n53\n54\n55\n56\n57\n58\n59\n60\n61\n");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","code");
        var el5 = dom.createElement("pre");
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Reserved");
        dom.setAttribute(el6,"class","reserved");
        var el7 = dom.createTextNode("import");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("Ember");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("from");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("ember");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Reserved");
        dom.setAttribute(el6,"class","reserved");
        var el7 = dom.createTextNode("import");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("dataGenerator");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("from");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("../services/data-generator");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Reserved");
        dom.setAttribute(el6,"class","reserved");
        var el7 = dom.createTextNode("import");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("format");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("from");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("../helpers/format-hour-minute");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Reserved");
        dom.setAttribute(el6,"class","reserved");
        var el7 = dom.createTextNode("export");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("default");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("Ember");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("Component");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("extend");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("({");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("// Start and end dates for filtering the graph data.");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("// These are the initial values and will change when brush actions");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("// are executed below");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Key");
        dom.setAttribute(el6,"class","key");
        var el7 = dom.createTextNode("startTime");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(":");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Integer");
        dom.setAttribute(el6,"class","integer");
        var el7 = dom.createTextNode("0");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(",");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Key");
        dom.setAttribute(el6,"class","key");
        var el7 = dom.createTextNode("endTime");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(":");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("Number");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("MAX_VALUE");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(",");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("// Domain values for right and left brush markers. These are modified");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("// when the user drags with the mouse.");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Key");
        dom.setAttribute(el6,"class","key");
        var el7 = dom.createTextNode("selectLeft");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(":");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Predefined Constant");
        dom.setAttribute(el6,"class","predefined-constant");
        var el7 = dom.createTextNode("undefined");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(",");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Key");
        dom.setAttribute(el6,"class","key");
        var el7 = dom.createTextNode("selectRight");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(":");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Predefined Constant");
        dom.setAttribute(el6,"class","predefined-constant");
        var el7 = dom.createTextNode("undefined");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(",");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("// Original graph data (no zoom or filter)");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Function");
        dom.setAttribute(el6,"class","function");
        var el7 = dom.createTextNode("graphData");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(":");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("function");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("return");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("dataGenerator");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("simpleTimeSeries");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("property");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(",");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("// Graph data filtered by zoom extents. Filtered to include only data points");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("// falling within the zoom start and end dates");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Function");
        dom.setAttribute(el6,"class","function");
        var el7 = dom.createTextNode("zoomData");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(":");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("function");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("var");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("self");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Local Variable");
        dom.setAttribute(el6,"class","local-variable");
        var el7 = dom.createTextNode("this");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("return");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Local Variable");
        dom.setAttribute(el6,"class","local-variable");
        var el7 = dom.createTextNode("this");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("get");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("graphData");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("filter");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("function");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("d");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n      ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("return");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("d");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("x");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(">=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("self");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("get");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("startTime");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("&&");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("d");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("x");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("<=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("self");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("get");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("endTime");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("})");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("property");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("graphData");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(",");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("startTime");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(",");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("endTime");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(",");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("// Formats the text shown on the brush selection markers.");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("// This is using the format code imported from helper:format-hour-minute");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Function");
        dom.setAttribute(el6,"class","function");
        var el7 = dom.createTextNode("selectionDisplayFormatter");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(":");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("function");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("ms");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("return");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("format");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("ms");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(",");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Key");
        dom.setAttribute(el6,"class","key");
        var el7 = dom.createTextNode("actions");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(":");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Function");
        dom.setAttribute(el6,"class","function");
        var el7 = dom.createTextNode("brushEnd");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(":");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("function");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("e");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n      ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("// Now that the brush drag is finished set new");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n      ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("// zoom values for filtering the main graph data");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n      ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Local Variable");
        dom.setAttribute(el6,"class","local-variable");
        var el7 = dom.createTextNode("this");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("set");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("startTime");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(",");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("Ember");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("get");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("e");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(",");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("left.x");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("))");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n      ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Local Variable");
        dom.setAttribute(el6,"class","local-variable");
        var el7 = dom.createTextNode("this");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("set");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("endTime");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(",");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("Ember");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("get");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("e");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(",");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("right.x");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("))");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(",");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Function");
        dom.setAttribute(el6,"class","function");
        var el7 = dom.createTextNode("reset");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(":");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("function");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n      ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("// Reset teh zoom extents");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n      ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Local Variable");
        dom.setAttribute(el6,"class","local-variable");
        var el7 = dom.createTextNode("this");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("set");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("startTime");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(",");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Integer");
        dom.setAttribute(el6,"class","integer");
        var el7 = dom.createTextNode("0");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n      ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Local Variable");
        dom.setAttribute(el6,"class","local-variable");
        var el7 = dom.createTextNode("this");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("set");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("endTime");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(",");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("Number");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("MAX_VALUE");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(",");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("})");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, block = hooks.block, element = hooks.element;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [2]);
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        block(env, morph0, context, "nf-graph", [], {"yMaxMode": "push-tick", "brushEndAction": "brushEnd"}, child0, null);
        element(env, element0, context, "action", ["reset"], {});
        return fragment;
      }
    };
  }()));

});
define('ember-nf-graph-examples/templates/components/detailed-line-graph', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.0",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("text");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var morph0 = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
            inline(env, morph0, context, "format-hour-minute", [get(env, context, "tick.value")], {});
            return fragment;
          }
        };
      }());
      var child1 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.0",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("text");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, content = hooks.content;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var morph0 = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
            content(env, morph0, context, "tick.value");
            return fragment;
          }
        };
      }());
      var child2 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.0",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
            inline(env, morph0, context, "nf-line", [], {"data": get(env, context, "graphData"), "xprop": "x", "yprop": "y", "interpolator": "monotone"});
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, block = hooks.block;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
          var morph1 = dom.createMorphAt(fragment,3,3,contextualElement);
          var morph2 = dom.createMorphAt(fragment,5,5,contextualElement);
          block(env, morph0, context, "nf-x-axis", [], {"tickCount": 5}, child0, null);
          block(env, morph1, context, "nf-y-axis", [], {}, child1, null);
          block(env, morph2, context, "nf-graph-content", [], {}, child2, null);
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Template");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("table");
        dom.setAttribute(el1,"class","CodeRay template");
        var el2 = dom.createElement("tbody");
        var el3 = dom.createElement("tr");
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","line-numbers");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("pre");
        var el6 = dom.createTextNode("1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","code");
        var el5 = dom.createElement("pre");
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("#nf-graph");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("width");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Integer");
        dom.setAttribute(el6,"class","integer");
        var el7 = dom.createTextNode("400");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("height");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Integer");
        dom.setAttribute(el6,"class","integer");
        var el7 = dom.createTextNode("150");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("showLanes");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Predefined Constant");
        dom.setAttribute(el6,"class","predefined-constant");
        var el7 = dom.createTextNode("true");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("showFrets");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Predefined Constant");
        dom.setAttribute(el6,"class","predefined-constant");
        var el7 = dom.createTextNode("true");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("paddingTop");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Integer");
        dom.setAttribute(el6,"class","integer");
        var el7 = dom.createTextNode("10");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("paddingRight");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Integer");
        dom.setAttribute(el6,"class","integer");
        var el7 = dom.createTextNode("10");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("#nf-x-axis tickCount=5}}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("<");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("text");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(">");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("format");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("hour");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("minute");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("tick");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("value");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("<");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("/");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("text");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(">");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("/");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("x");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("axis");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("#nf-y-axis}}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("<");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("text");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(">");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("tick");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("value");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("<");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("/");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("text");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(">");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("/");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("y");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("axis");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("#nf-graph-content}}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("line");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n        ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("data");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("graphData");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n        ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("xprop");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("x");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n        ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("yprop");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("y");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n        ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("interpolator");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("monotone");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("/");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("graph");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("content");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("/");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("graph");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","discussion");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n  width=400 and height=150 define the pixel size of the entire graph including axis and padding.  showLanes=true causes horizontal swim lanes to be shaded in the background.  showFrets=true causes vertical lines to be draw in the background for each tick on the X Axis.  paddingRight and paddingType define padding space between the graph plot area and the absolute border of the entire graph.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n    {{#nf-x-axis}} draws the X Axis. tickCount=5 will produce approximately 5 evenly spaced \"nice\" ticks on the axis (the actual count may be one more or less depending where \"nice\" ticks fall on the axis). ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("text");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" is the X Axis tick template and defines the text that appears on each tick. tick.value is the domain value of each tick.\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n    {{#nf-y-axis}} draws the Y Axis and has a text template similar to nf-x-axis above.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n    {{#nf-graph-content}} is the container for elements that should be drawn within the graph plot area.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n    {{#nf-line}} draws a line plot. data=graphData specifies to get this line's data from the component's graphData property.  xprop defines which property represents the x value on each data element.  yprop defines which property represents the y value on each data element.\n    interpolator=\"monotone\" specifies drawing the line with a smooth curve.  Other interpolator values can be found ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3,"href","https://github.com/mbostock/d3/wiki/SVG-Shapes#line_interpolate");
        var el4 = dom.createTextNode("here");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(".\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Component JavaScript");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("table");
        dom.setAttribute(el1,"class","CodeRay");
        var el2 = dom.createElement("tbody");
        var el3 = dom.createElement("tr");
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","line-numbers");
        var el5 = dom.createElement("pre");
        var el6 = dom.createTextNode("1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","code");
        var el5 = dom.createElement("pre");
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Reserved");
        dom.setAttribute(el6,"class","reserved");
        var el7 = dom.createTextNode("import");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("Ember");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("from");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("ember");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Reserved");
        dom.setAttribute(el6,"class","reserved");
        var el7 = dom.createTextNode("import");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("dataGenerator");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("from");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("../services/data-generator");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Reserved");
        dom.setAttribute(el6,"class","reserved");
        var el7 = dom.createTextNode("export");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("default");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("Ember");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("Component");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("extend");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("({");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Function");
        dom.setAttribute(el6,"class","function");
        var el7 = dom.createTextNode("graphData");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(":");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("function");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("return");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("dataGenerator");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("simpleTimeSeries");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("property");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("})");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, block = hooks.block, get = hooks.get, inline = hooks.inline;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        var morph1 = dom.createMorphAt(dom.childAt(fragment, [6, 3, 1]),0,0);
        dom.insertBoundary(fragment, 0);
        block(env, morph0, context, "nf-graph", [], {"width": 400, "height": 150, "showLanes": true, "showFrets": true, "paddingTop": 10, "paddingRight": 10}, child0, null);
        inline(env, morph1, context, "format-hour-minute", [get(env, context, "tick.value")], {});
        return fragment;
      }
    };
  }()));

});
define('ember-nf-graph-examples/templates/components/graph-primitives', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        var child0 = (function() {
          return {
            isHTMLBars: true,
            revision: "Ember@1.11.0",
            blockParams: 0,
            cachedFragment: null,
            hasRendered: false,
            build: function build(dom) {
              var el0 = dom.createDocumentFragment();
              return el0;
            },
            render: function render(context, env, contextualElement) {
              var dom = env.dom;
              dom.detectNamespace(contextualElement);
              var fragment;
              if (env.useFragmentCache && dom.canClone) {
                if (this.cachedFragment === null) {
                  fragment = this.build(dom);
                  if (this.hasRendered) {
                    this.cachedFragment = fragment;
                  } else {
                    this.hasRendered = true;
                  }
                }
                if (this.cachedFragment) {
                  fragment = dom.cloneNode(this.cachedFragment, true);
                }
              } else {
                fragment = this.build(dom);
              }
              return fragment;
            }
          };
        }());
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.0",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("\n    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n\n");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, get = hooks.get, inline = hooks.inline, block = hooks.block;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
            var morph1 = dom.createMorphAt(fragment,3,3,contextualElement);
            inline(env, morph0, context, "nf-line", [], {"data": get(env, context, "graphData")});
            block(env, morph1, context, "each", [get(env, context, "graphData")], {"keyword": "item"}, child0, null);
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, block = hooks.block;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
          dom.insertBoundary(fragment, null);
          block(env, morph0, context, "nf-graph-content", [], {}, child0, null);
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, null);
        dom.insertBoundary(fragment, 0);
        block(env, morph0, context, "nf-graph", [], {}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('ember-nf-graph-examples/templates/components/mouse-tracking-data', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.0",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("text");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var morph0 = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
            inline(env, morph0, context, "format-hour-minute", [get(env, context, "tick.value")], {});
            return fragment;
          }
        };
      }());
      var child1 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.0",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("text");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, content = hooks.content;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var morph0 = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
            content(env, morph0, context, "tick.value");
            return fragment;
          }
        };
      }());
      var child2 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.0",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("\n    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
            var morph1 = dom.createMorphAt(fragment,3,3,contextualElement);
            var morph2 = dom.createMorphAt(fragment,5,5,contextualElement);
            inline(env, morph0, context, "nf-line", [], {"data": get(env, context, "graphData"), "xprop": "date", "yprop": "low", "trackingMode": "snap-last", "selectable": true, "interpolator": "monotone"});
            inline(env, morph1, context, "nf-line", [], {"data": get(env, context, "graphData"), "xprop": "date", "yprop": "medium", "trackingMode": "snap-last", "selectable": true, "selected": true, "interpolator": "monotone"});
            inline(env, morph2, context, "nf-line", [], {"data": get(env, context, "graphData"), "xprop": "date", "yprop": "high", "trackingMode": "snap-last", "selectable": true, "interpolator": "monotone"});
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, block = hooks.block;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
          var morph1 = dom.createMorphAt(fragment,3,3,contextualElement);
          var morph2 = dom.createMorphAt(fragment,5,5,contextualElement);
          block(env, morph0, context, "nf-x-axis", [], {"tickCount": 5}, child0, null);
          block(env, morph1, context, "nf-y-axis", [], {}, child1, null);
          block(env, morph2, context, "nf-graph-content", [], {}, child2, null);
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("span");
        var el3 = dom.createTextNode("Selected Time: ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("span");
        var el3 = dom.createTextNode(" Value: ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Template");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("table");
        dom.setAttribute(el1,"class","CodeRay template");
        var el2 = dom.createElement("tbody");
        var el3 = dom.createElement("tr");
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","line-numbers");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("pre");
        var el6 = dom.createTextNode("1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27\n");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","code");
        var el5 = dom.createElement("pre");
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("#nf-graph");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("selected");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("selectedLine");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("width");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Integer");
        dom.setAttribute(el6,"class","integer");
        var el7 = dom.createTextNode("400");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("height");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Integer");
        dom.setAttribute(el6,"class","integer");
        var el7 = dom.createTextNode("150");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("showFrets");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Predefined Constant");
        dom.setAttribute(el6,"class","predefined-constant");
        var el7 = dom.createTextNode("true");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("paddingTop");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Integer");
        dom.setAttribute(el6,"class","integer");
        var el7 = dom.createTextNode("10");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("paddingRight");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Integer");
        dom.setAttribute(el6,"class","integer");
        var el7 = dom.createTextNode("10");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("#nf-x-axis tickCount=5}}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("<");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("text");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(">");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("format");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("hour");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("minute");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("tick");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("value");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("<");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("/");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("text");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(">");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("/");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("x");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("axis");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("#nf-y-axis}}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("<");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("text");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(">");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("tick");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("value");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("<");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("/");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("text");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(">");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("/");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("y");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("axis");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("#nf-graph-content}}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("vertical");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("line");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("x");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("selectedLine");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("hoverData");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("x");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("horizontal");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("line");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("y");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("selectedLine");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("hoverData");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("y");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("line");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("data");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("graphData");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("xprop");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("date");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("yprop");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("low");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("trackingMode");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("snap-last");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("selectable");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Predefined Constant");
        dom.setAttribute(el6,"class","predefined-constant");
        var el7 = dom.createTextNode("true");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("interpolator");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("monotone");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("line");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("data");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("graphData");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("xprop");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("date");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("yprop");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("medium");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("trackingMode");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("snap-last");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("selectable");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Predefined Constant");
        dom.setAttribute(el6,"class","predefined-constant");
        var el7 = dom.createTextNode("true");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("selected");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Predefined Constant");
        dom.setAttribute(el6,"class","predefined-constant");
        var el7 = dom.createTextNode("true");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("interpolator");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("monotone");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("line");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("data");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("graphData");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("xprop");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("date");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("yprop");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("high");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("trackingMode");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("snap-last");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("selectable");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Predefined Constant");
        dom.setAttribute(el6,"class","predefined-constant");
        var el7 = dom.createTextNode("true");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("interpolator");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("monotone");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("/");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("graph");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("content");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("/");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("graph");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("tr");
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","line-numbers");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("pre");
        var el6 = dom.createTextNode("28\n29\n30\n");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","code");
        var el5 = dom.createElement("pre");
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Tag");
        dom.setAttribute(el6,"class","tag");
        var el7 = dom.createTextNode("<div>");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Tag");
        dom.setAttribute(el6,"class","tag");
        var el7 = dom.createTextNode("<span>");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Plain");
        var el7 = dom.createTextNode("Selected Time: {{format-hour-minute selectedLine.hoverData.x}}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Tag");
        dom.setAttribute(el6,"class","tag");
        var el7 = dom.createTextNode("</span>");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Tag");
        dom.setAttribute(el6,"class","tag");
        var el7 = dom.createTextNode("<span>");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Plain");
        var el7 = dom.createTextNode("Value: {{selectedLine.hoverData.y}}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Tag");
        dom.setAttribute(el6,"class","tag");
        var el7 = dom.createTextNode("</span>");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Tag");
        dom.setAttribute(el6,"class","tag");
        var el7 = dom.createTextNode("</div>");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","discussion");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n    {{#nf-graph}} is the main graph container.  nf-graph has built-in element selection by clicking or setting a property.  selected=selectedLine causes property \"selectedLine\" to be set to the current selected element.\n    width= and height= set the absolute pixel size of the entire graph, including axis and padding.  showFrets= causes each tick on the X Axis to display a vertical line in the background.  paddingTop and paddingRight define padding size between the plot area and the absolute border of the entire graph.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n    {{#nf-x-axis}} draws the X Axis. tickCount=5 will produce approximately 5 evenly spaced \"nice\" ticks on the axis (the actual count may be one more or less depending where \"nice\" ticks fall on the axis). ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("text");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" is the X Axis tick template and defines the text that appears on each tick. tick.value is the domain value of each tick.\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n    {{#nf-y-axis}} draws the Y Axis and has a text template similar to nf-x-axis above.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n    nf-graph child elements have built in mouse tracking features. Also child elements support being selected by clicking, or by setting a property.  Lines and areas provide a \"hoverData\" property which contains data about the data point nearest to the mouse pointer.\n    By using the \"hoverData\" of the \"selected\" element other graph elements can react to mouse tracking on the selected element.\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n    {{nf-vertical-line}} draws a vertical line in the graph plot area which is being used along with nf-horizontal-line to draw a mouse crosshair.  x=selectedLine.hoverData.x causes the horizontal position of the line to be dependent of the the selected line's hoverData.x value.\n    Therefore mouse tracking will causes the vertical line to follow the mouse pointer and snap to the nearest data point on the selected line.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" draws a horizontal line in the graph plot area and behaves similar the nf-vertical-line above.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n    interpolator=\"monotone\" specifies drawing the area with a smooth curve.  Other interpolator values can be found ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3,"href","https://github.com/mbostock/d3/wiki/SVG-Shapes#line_interpolate");
        var el4 = dom.createTextNode("here");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(".\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n   Display the mouse-tracked values within a div:  {{format-hour-minute selectedLine.hoverData.x}} displays the x value nearest to the mouse pointer on the current selected line. Because of data binding this value will change as the mouse pointer moves around. format-hour-minute is an Ember helper defined in this example project.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Component JavaScript");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("table");
        dom.setAttribute(el1,"class","CodeRay");
        var el2 = dom.createElement("tbody");
        var el3 = dom.createElement("tr");
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","line-numbers");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("pre");
        var el6 = dom.createTextNode("1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","code");
        var el5 = dom.createElement("pre");
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Reserved");
        dom.setAttribute(el6,"class","reserved");
        var el7 = dom.createTextNode("import");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("Ember");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("from");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("ember");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Reserved");
        dom.setAttribute(el6,"class","reserved");
        var el7 = dom.createTextNode("import");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("dataGenerator");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("from");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("../services/data-generator");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Reserved");
        dom.setAttribute(el6,"class","reserved");
        var el7 = dom.createTextNode("export");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("default");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("Ember");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("Component");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("extend");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("({");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Function");
        dom.setAttribute(el6,"class","function");
        var el7 = dom.createTextNode("graphData");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(":");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("function");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("return");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("dataGenerator");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("threeMetricTimeSeries");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("property");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("})");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, block = hooks.block, inline = hooks.inline, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [2]);
        var element1 = dom.childAt(fragment, [8]);
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        var morph1 = dom.createMorphAt(dom.childAt(element0, [1]),1,1);
        var morph2 = dom.createMorphAt(dom.childAt(element0, [2]),1,1);
        var morph3 = dom.createMorphAt(dom.childAt(element1, [3, 1]),0,0);
        var morph4 = dom.createMorphAt(dom.childAt(element1, [11]),1,1);
        dom.insertBoundary(fragment, 0);
        block(env, morph0, context, "nf-graph", [], {"selected": get(env, context, "selectedLine"), "width": 400, "height": 150, "showFrets": true, "paddingTop": 10, "paddingRight": 10}, child0, null);
        inline(env, morph1, context, "format-hour-minute", [get(env, context, "selectedLine.hoverData.x")], {});
        content(env, morph2, context, "selectedLine.hoverData.y");
        inline(env, morph3, context, "format-hour-minute", [get(env, context, "tick.value")], {});
        content(env, morph4, context, "nf-horizontal-line");
        return fragment;
      }
    };
  }()));

});
define('ember-nf-graph-examples/templates/components/mouse-tracking', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.0",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("\n    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n\n    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
            var morph1 = dom.createMorphAt(fragment,3,3,contextualElement);
            var morph2 = dom.createMorphAt(fragment,5,5,contextualElement);
            var morph3 = dom.createMorphAt(fragment,7,7,contextualElement);
            var morph4 = dom.createMorphAt(fragment,9,9,contextualElement);
            inline(env, morph0, context, "nf-vertical-line", [], {"x": get(env, context, "selectedLine.hoverData.x")});
            inline(env, morph1, context, "nf-horizontal-line", [], {"y": get(env, context, "selectedLine.hoverData.y")});
            inline(env, morph2, context, "nf-line", [], {"data": get(env, context, "graphData"), "xprop": "date", "yprop": "low", "trackingMode": "hover", "selectable": true, "interpolator": "monotone"});
            inline(env, morph3, context, "nf-line", [], {"data": get(env, context, "graphData"), "xprop": "date", "yprop": "medium", "trackingMode": "hover", "selectable": true, "selected": true, "interpolator": "monotone"});
            inline(env, morph4, context, "nf-line", [], {"data": get(env, context, "graphData"), "xprop": "date", "yprop": "high", "trackingMode": "hover", "selectable": true, "interpolator": "monotone"});
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, block = hooks.block;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
          dom.insertBoundary(fragment, null);
          block(env, morph0, context, "nf-graph-content", [], {}, child0, null);
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Template");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("table");
        dom.setAttribute(el1,"class","CodeRay template");
        var el2 = dom.createElement("tbody");
        var el3 = dom.createElement("tr");
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","line-numbers");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("pre");
        var el6 = dom.createTextNode("1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","code");
        var el5 = dom.createElement("pre");
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("#nf-graph selected=selectedLine}}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("#nf-graph-content}}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("vertical");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("line");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("x");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("selectedLine");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("hoverData");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("x");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("horizontal");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("line");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("y");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("selectedLine");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("hoverData");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("y");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("line");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("data");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("graphData");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("xprop");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("date");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("yprop");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("low");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("trackingMode");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("hover");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("selectable");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Predefined Constant");
        dom.setAttribute(el6,"class","predefined-constant");
        var el7 = dom.createTextNode("true");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("interpolator");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("monotone");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("line");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("data");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("graphData");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("xprop");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("date");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("yprop");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("medium");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("trackingMode");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("hover");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("selectable");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Predefined Constant");
        dom.setAttribute(el6,"class","predefined-constant");
        var el7 = dom.createTextNode("true");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("selected");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Predefined Constant");
        dom.setAttribute(el6,"class","predefined-constant");
        var el7 = dom.createTextNode("true");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("interpolator");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("monotone");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("line");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("data");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("graphData");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("xprop");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("date");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("yprop");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("high");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("trackingMode");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("hover");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("selectable");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Predefined Constant");
        dom.setAttribute(el6,"class","predefined-constant");
        var el7 = dom.createTextNode("true");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("interpolator");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("monotone");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n   ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("/");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("graph");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("content");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("/");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("graph");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","discussion");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n    {{#nf-graph}} is the main graph container.  nf-graph has built-in element selection by clicking or setting a property.  selected=selectedLine causes property \"selectedLine\" to be set to the current selected element.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n    nf-graph child elements have built in mouse tracking features. Also child elements support being selected by clicking, or by setting a property.  Lines and areas provide a \"hoverData\" property which contains data about the data point nearest to the mouse pointer.\n    By using the \"hoverData\" of the \"selected\" element other graph elements can react to mouse tracking on the selected element.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n    The hoverData property of each graph element is an Ember property that can be data-bound as the source for properties on nearby graph elements, other Ember components, or other HTML attibutes for a wide range of effects.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n    trackingMode=\"hover\" specifies the behavior of nearest data point. \"hover\" mean populate hoverData with an object only while the mouse is hovering. Otherwise return null. Other values are \"snap-first\" and \"snap-last\" which cause hoverData to represent the first or last data point on the element when the mouse is NOT hovering.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n    {{nf-vertical-line}} draws a vertical line in the graph plot area which is being used along with nf-horizontal-line to draw a mouse crosshair.  x=selectedLine.hoverData.x causes the horizontal position of the line to be dependent of the the selected line's hoverData.x value.\n    Therefore mouse tracking will causes the vertical line to follow the mouse pointer and snap to the nearest data point on the selected line.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" draws a horizontal line in the graph plot area and behaves similar the nf-vertical-line above.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n    interpolator=\"monotone\" specifies drawing the area with a smooth curve.  Other interpolator values can be found ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3,"href","https://github.com/mbostock/d3/wiki/SVG-Shapes#line_interpolate");
        var el4 = dom.createTextNode("here");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(".\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Component JavaScript");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("table");
        dom.setAttribute(el1,"class","CodeRay");
        var el2 = dom.createElement("tbody");
        var el3 = dom.createElement("tr");
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","line-numbers");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("pre");
        var el6 = dom.createTextNode("1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","code");
        var el5 = dom.createElement("pre");
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Reserved");
        dom.setAttribute(el6,"class","reserved");
        var el7 = dom.createTextNode("import");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("Ember");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("from");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("ember");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Reserved");
        dom.setAttribute(el6,"class","reserved");
        var el7 = dom.createTextNode("import");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("dataGenerator");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("from");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("../services/data-generator");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Reserved");
        dom.setAttribute(el6,"class","reserved");
        var el7 = dom.createTextNode("export");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("default");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("Ember");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("Component");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("extend");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("({");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Function");
        dom.setAttribute(el6,"class","function");
        var el7 = dom.createTextNode("graphData");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(":");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("function");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("return");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("dataGenerator");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("threeMetricTimeSeries");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("property");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("})");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, block = hooks.block, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        var morph1 = dom.createMorphAt(dom.childAt(fragment, [6, 11]),1,1);
        dom.insertBoundary(fragment, 0);
        block(env, morph0, context, "nf-graph", [], {"selected": get(env, context, "selectedLine")}, child0, null);
        content(env, morph1, context, "nf-horizontal-line");
        return fragment;
      }
    };
  }()));

});
define('ember-nf-graph-examples/templates/components/nf-area', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
          inline(env, morph0, context, "nf-dot", [], {"x": get(env, context, "trackedData.x"), "y": get(env, context, "trackedData.y"), "r": get(env, context, "trackingDotRadius"), "multiplierY": get(env, context, "multiplierY"), "multiplierX": get(env, context, "multiplierX")});
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("path");
        dom.setAttribute(el1,"class","area");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, element = hooks.element, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [0]);
        var morph0 = dom.createMorphAt(fragment,2,2,contextualElement);
        dom.insertBoundary(fragment, null);
        element(env, element0, context, "bind-attr", [], {"d": get(env, context, "d")});
        block(env, morph0, context, "if", [get(env, context, "showTrackingDot")], {}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('ember-nf-graph-examples/templates/components/nf-bars', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("path");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, element = hooks.element;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element0 = dom.childAt(fragment, [1]);
          element(env, element0, context, "bind-attr", [], {"d": get(env, context, "bar.path"), "class": get(env, context, "bar.className")});
          element(env, element0, context, "action", ["nfBarClickBar", get(env, context, "bar.data"), get(env, context, "bar.index")], {});
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, null);
        dom.insertBoundary(fragment, 0);
        block(env, morph0, context, "each", [get(env, context, "bars")], {"keyword": "bar"}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('ember-nf-graph-examples/templates/components/nf-brush-selection', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("rect");
        dom.setAttribute(el1,"class","nf-brush-selection-overlay");
        dom.setAttribute(el1,"x","0");
        dom.setAttribute(el1,"y","0");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("rect");
        dom.setAttribute(el1,"class","nf-brush-selection-overlay");
        dom.setAttribute(el1,"y","0");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("line");
        dom.setAttribute(el1,"class","nf-brush-selection-line");
        dom.setAttribute(el1,"y1","0");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("line");
        dom.setAttribute(el1,"class","nf-brush-selection-line");
        dom.setAttribute(el1,"y1","0");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("g");
        dom.setAttribute(el1,"class","nf-brush-selection-left-display");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("rect");
        dom.setAttribute(el2,"class","nf-brush-selection-left-text-bg");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("text");
        dom.setAttribute(el2,"class","nf-brush-selection-left-text");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("g");
        dom.setAttribute(el1,"class","nf-brush-selection-right-display");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("rect");
        dom.setAttribute(el2,"class","nf-brush-selection-right-text-bg");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("text");
        dom.setAttribute(el2,"class","nf-brush-selection-right-text");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, element = hooks.element, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(fragment, [2]);
        var element2 = dom.childAt(fragment, [4]);
        var element3 = dom.childAt(fragment, [6]);
        var morph0 = dom.createMorphAt(dom.childAt(fragment, [8, 3]),0,0);
        var morph1 = dom.createMorphAt(dom.childAt(fragment, [10, 3]),0,0);
        element(env, element0, context, "bind-attr", [], {"width": get(env, context, "leftX"), "height": get(env, context, "graphHeight")});
        element(env, element1, context, "bind-attr", [], {"x": get(env, context, "rightX"), "width": get(env, context, "rightWidth"), "height": get(env, context, "graphHeight")});
        element(env, element2, context, "bind-attr", [], {"x1": get(env, context, "leftX"), "x2": get(env, context, "leftX"), "y2": get(env, context, "graphHeight")});
        element(env, element3, context, "bind-attr", [], {"x1": get(env, context, "rightX"), "x2": get(env, context, "rightX"), "y2": get(env, context, "graphHeight")});
        content(env, morph0, context, "leftDisplay");
        content(env, morph1, context, "rightDisplay");
        return fragment;
      }
    };
  }()));

});
define('ember-nf-graph-examples/templates/components/nf-crosshair', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("line");
        dom.setAttribute(el1,"class","vertical");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("line");
        dom.setAttribute(el1,"class","horizontal");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, element = hooks.element;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(fragment, [2]);
        element(env, element0, context, "bind-attr", [], {"x1": get(env, context, "x"), "x2": get(env, context, "x"), "y1": "0", "y2": get(env, context, "height")});
        element(env, element1, context, "bind-attr", [], {"x1": "0", "x2": get(env, context, "width"), "y1": get(env, context, "y"), "y2": get(env, context, "y")});
        return fragment;
      }
    };
  }()));

});
define('ember-nf-graph-examples/templates/components/nf-graph-content', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        var child0 = (function() {
          return {
            isHTMLBars: true,
            revision: "Ember@1.11.0",
            blockParams: 0,
            cachedFragment: null,
            hasRendered: false,
            build: function build(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("          ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("rect");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            render: function render(context, env, contextualElement) {
              var dom = env.dom;
              var hooks = env.hooks, get = hooks.get, element = hooks.element;
              dom.detectNamespace(contextualElement);
              var fragment;
              if (env.useFragmentCache && dom.canClone) {
                if (this.cachedFragment === null) {
                  fragment = this.build(dom);
                  if (this.hasRendered) {
                    this.cachedFragment = fragment;
                  } else {
                    this.hasRendered = true;
                  }
                }
                if (this.cachedFragment) {
                  fragment = dom.cloneNode(this.cachedFragment, true);
                }
              } else {
                fragment = this.build(dom);
              }
              var element1 = dom.childAt(fragment, [1]);
              element(env, element1, context, "bind-attr", [], {"x": get(env, context, "lane.x"), "y": get(env, context, "lane.y"), "width": get(env, context, "width"), "height": get(env, context, "lane.height")});
              return fragment;
            }
          };
        }());
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.0",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("g");
            dom.setAttribute(el1,"class","nf-grid-lanes");
            var el2 = dom.createTextNode("\n");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("      ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, get = hooks.get, block = hooks.block;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var morph0 = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
            block(env, morph0, context, "each", [get(env, context, "gridLanes")], {"keyword": "lane"}, child0, null);
            return fragment;
          }
        };
      }());
      var child1 = (function() {
        var child0 = (function() {
          return {
            isHTMLBars: true,
            revision: "Ember@1.11.0",
            blockParams: 0,
            cachedFragment: null,
            hasRendered: false,
            build: function build(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("          ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("line");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            render: function render(context, env, contextualElement) {
              var dom = env.dom;
              var hooks = env.hooks, get = hooks.get, element = hooks.element;
              dom.detectNamespace(contextualElement);
              var fragment;
              if (env.useFragmentCache && dom.canClone) {
                if (this.cachedFragment === null) {
                  fragment = this.build(dom);
                  if (this.hasRendered) {
                    this.cachedFragment = fragment;
                  } else {
                    this.hasRendered = true;
                  }
                }
                if (this.cachedFragment) {
                  fragment = dom.cloneNode(this.cachedFragment, true);
                }
              } else {
                fragment = this.build(dom);
              }
              var element0 = dom.childAt(fragment, [1]);
              element(env, element0, context, "bind-attr", [], {"x1": get(env, context, "fret.x"), "y1": "0", "x2": get(env, context, "fret.x"), "y2": get(env, context, "height")});
              return fragment;
            }
          };
        }());
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.0",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("g");
            dom.setAttribute(el1,"class","nf-grid-frets");
            var el2 = dom.createTextNode("\n");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("      ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, get = hooks.get, block = hooks.block;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var morph0 = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
            block(env, morph0, context, "each", [get(env, context, "frets")], {"keyword": "fret"}, child0, null);
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, block = hooks.block;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
          var morph1 = dom.createMorphAt(fragment,2,2,contextualElement);
          dom.insertBoundary(fragment, null);
          dom.insertBoundary(fragment, 0);
          block(env, morph0, context, "if", [get(env, context, "graph.showLanes")], {}, child0, null);
          block(env, morph1, context, "if", [get(env, context, "graph.showFrets")], {}, child1, null);
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("text");
          dom.setAttribute(el1,"x","0");
          dom.setAttribute(el1,"y","0");
          var el2 = dom.createTextNode("No data");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("rect");
        dom.setAttribute(el1,"x","0");
        dom.setAttribute(el1,"y","0");
        dom.setAttribute(el1,"class","background");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, element = hooks.element, block = hooks.block, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element2 = dom.childAt(fragment, [0]);
        var morph0 = dom.createMorphAt(fragment,2,2,contextualElement);
        var morph1 = dom.createMorphAt(fragment,4,4,contextualElement);
        var morph2 = dom.createMorphAt(fragment,6,6,contextualElement);
        dom.insertBoundary(fragment, null);
        element(env, element2, context, "bind-attr", [], {"width": get(env, context, "width"), "height": get(env, context, "height")});
        block(env, morph0, context, "if", [get(env, context, "graph.hasData")], {}, child0, null);
        block(env, morph1, context, "unless", [get(env, context, "graph.hasData")], {}, child1, null);
        content(env, morph2, context, "yield");
        return fragment;
      }
    };
  }()));

});
define('ember-nf-graph-examples/templates/components/nf-graph', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"style","position:relative");
          var el2 = dom.createTextNode("\n	");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("pre");
          dom.setAttribute(el2,"style","position:absolute; z-index:1000");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, content = hooks.content;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(dom.childAt(fragment, [0, 1]),0,0);
          content(env, morph0, context, "debugInfo");
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        dom.setNamespace("http://www.w3.org/2000/svg");
        var el1 = dom.createElement("svg");
        dom.setAttribute(el1,"class","nf-graph");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("defs");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("clipPath");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("rect");
        dom.setAttribute(el4,"x","0");
        dom.setAttribute(el4,"y","0");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("rect");
        dom.setAttribute(el2,"class","background");
        dom.setAttribute(el2,"x","0");
        dom.setAttribute(el2,"y","0");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  \n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, element = hooks.element, content = hooks.content, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1, 1]);
        var element2 = dom.childAt(element1, [1]);
        var element3 = dom.childAt(element0, [3]);
        var morph0 = dom.createMorphAt(element0,5,5);
        var morph1 = dom.createMorphAt(fragment,2,2,contextualElement);
        dom.insertBoundary(fragment, null);
        element(env, element0, context, "bind-attr", [], {"width": get(env, context, "width"), "height": get(env, context, "height")});
        element(env, element1, context, "bind-attr", [], {"id": get(env, context, "contentClipPathId")});
        element(env, element2, context, "bind-attr", [], {"width": get(env, context, "graphWidth"), "height": get(env, context, "graphHeight")});
        element(env, element3, context, "bind-attr", [], {"width": get(env, context, "width"), "height": get(env, context, "height")});
        content(env, morph0, context, "yield");
        block(env, morph1, context, "if", [get(env, context, "debug")], {}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('ember-nf-graph-examples/templates/components/nf-line', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("path");
          dom.setAttribute(el1,"class","interaction-mask");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, element = hooks.element;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element0 = dom.childAt(fragment, [1]);
          element(env, element0, context, "bind-attr", [], {"d": get(env, context, "d")});
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
          inline(env, morph0, context, "nf-dot", [], {"x": get(env, context, "trackedData.x"), "y": get(env, context, "trackedData.y"), "r": get(env, context, "trackingDotRadius"), "multiplierY": get(env, context, "multiplierY"), "multiplierX": get(env, context, "multiplierX")});
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("path");
        dom.setAttribute(el1,"class","line");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, element = hooks.element, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element1 = dom.childAt(fragment, [0]);
        var morph0 = dom.createMorphAt(fragment,2,2,contextualElement);
        var morph1 = dom.createMorphAt(fragment,4,4,contextualElement);
        dom.insertBoundary(fragment, null);
        element(env, element1, context, "bind-attr", [], {"d": get(env, context, "d")});
        block(env, morph0, context, "if", [get(env, context, "selectable")], {}, child0, null);
        block(env, morph1, context, "if", [get(env, context, "showTrackingDot")], {}, child1, null);
        return fragment;
      }
    };
  }()));

});
define('ember-nf-graph-examples/templates/components/nf-plots', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.0",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("		");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, content = hooks.content;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
            content(env, morph0, context, "yield");
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, block = hooks.block;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, null);
          dom.insertBoundary(fragment, 0);
          block(env, morph0, context, "nf-plot", [], {"x": get(env, context, "item.x"), "y": get(env, context, "item.y"), "action": "itemClicked", "data": get(env, context, "item.data"), "multiplierY": get(env, context, "multiplierY"), "multiplierX": get(env, context, "multiplierX")}, child0, null);
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, null);
        dom.insertBoundary(fragment, 0);
        block(env, morph0, context, "each", [get(env, context, "plotData")], {"keyword": "item"}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('ember-nf-graph-examples/templates/components/nf-range-marker', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("g");
        dom.setAttribute(el1,"class","label");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("rect");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, element = hooks.element, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(fragment, [2]);
        var morph0 = dom.createMorphAt(element0,0,0);
        element(env, element0, context, "bind-attr", [], {"transform": get(env, context, "labelTransform")});
        content(env, morph0, context, "yield");
        element(env, element1, context, "bind-attr", [], {"y": get(env, context, "marginTop"), "x": get(env, context, "x"), "width": get(env, context, "width"), "height": get(env, context, "height")});
        return fragment;
      }
    };
  }()));

});
define('ember-nf-graph-examples/templates/components/nf-right-tick', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("line");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("path");
        dom.setAttribute(el1,"d","M6,0 0,6 6,12");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, element = hooks.element;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [0]);
        element(env, element0, context, "bind-attr", [], {"x1": get(env, context, "graph.width"), "x2": get(env, context, "graph.width"), "y1": "0", "y2": get(env, context, "graph.height")});
        return fragment;
      }
    };
  }()));

});
define('ember-nf-graph-examples/templates/components/nf-table-manager', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","nf-table");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("table");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("thead");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tr");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(dom.childAt(fragment, [0, 1, 1, 1]),1,1);
        content(env, morph0, context, "yield");
        return fragment;
      }
    };
  }()));

});
define('ember-nf-graph-examples/templates/components/nf-x-axis', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        var child0 = (function() {
          var child0 = (function() {
            return {
              isHTMLBars: true,
              revision: "Ember@1.11.0",
              blockParams: 0,
              cachedFragment: null,
              hasRendered: false,
              build: function build(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("          ");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("text");
                var el2 = dom.createComment("");
                dom.appendChild(el1, el2);
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              render: function render(context, env, contextualElement) {
                var dom = env.dom;
                var hooks = env.hooks, content = hooks.content;
                dom.detectNamespace(contextualElement);
                var fragment;
                if (env.useFragmentCache && dom.canClone) {
                  if (this.cachedFragment === null) {
                    fragment = this.build(dom);
                    if (this.hasRendered) {
                      this.cachedFragment = fragment;
                    } else {
                      this.hasRendered = true;
                    }
                  }
                  if (this.cachedFragment) {
                    fragment = dom.cloneNode(this.cachedFragment, true);
                  }
                } else {
                  fragment = this.build(dom);
                }
                var morph0 = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
                content(env, morph0, context, "tick.value");
                return fragment;
              }
            };
          }());
          var child1 = (function() {
            return {
              isHTMLBars: true,
              revision: "Ember@1.11.0",
              blockParams: 0,
              cachedFragment: null,
              hasRendered: false,
              build: function build(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("          ");
                dom.appendChild(el0, el1);
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              render: function render(context, env, contextualElement) {
                var dom = env.dom;
                var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
                dom.detectNamespace(contextualElement);
                var fragment;
                if (env.useFragmentCache && dom.canClone) {
                  if (this.cachedFragment === null) {
                    fragment = this.build(dom);
                    if (this.hasRendered) {
                      this.cachedFragment = fragment;
                    } else {
                      this.hasRendered = true;
                    }
                  }
                  if (this.cachedFragment) {
                    fragment = dom.cloneNode(this.cachedFragment, true);
                  }
                } else {
                  fragment = this.build(dom);
                }
                var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
                inline(env, morph0, context, "yield", [get(env, context, "tick")], {});
                return fragment;
              }
            };
          }());
          return {
            isHTMLBars: true,
            revision: "Ember@1.11.0",
            blockParams: 0,
            cachedFragment: null,
            hasRendered: false,
            build: function build(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            render: function render(context, env, contextualElement) {
              var dom = env.dom;
              var hooks = env.hooks, get = hooks.get, block = hooks.block;
              dom.detectNamespace(contextualElement);
              var fragment;
              if (env.useFragmentCache && dom.canClone) {
                if (this.cachedFragment === null) {
                  fragment = this.build(dom);
                  if (this.hasRendered) {
                    this.cachedFragment = fragment;
                  } else {
                    this.hasRendered = true;
                  }
                }
                if (this.cachedFragment) {
                  fragment = dom.cloneNode(this.cachedFragment, true);
                }
              } else {
                fragment = this.build(dom);
              }
              var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
              dom.insertBoundary(fragment, null);
              dom.insertBoundary(fragment, 0);
              block(env, morph0, context, "if", [get(env, context, "useDefaultTemplate")], {}, child0, child1);
              return fragment;
            }
          };
        }());
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.0",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, get = hooks.get, block = hooks.block;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, null);
            dom.insertBoundary(fragment, 0);
            block(env, morph0, context, "view", ["nf-tick-label"], {"controller": get(env, context, "graph.parentController"), "x": get(env, context, "tick.x"), "y": get(env, context, "tick.labely")}, child0, null);
            return fragment;
          }
        };
      }());
      var child1 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.0",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
            inline(env, morph0, context, "view", ["nf-tick-label"], {"controller": get(env, context, "graph.parentController"), "template": get(env, context, "template"), "x": get(env, context, "tick.x"), "y": get(env, context, "tick.labely")});
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.0",
        blockParams: 1,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("g");
          dom.setAttribute(el1,"class","tick");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("line");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement, blockArguments) {
          var dom = env.dom;
          var hooks = env.hooks, set = hooks.set, get = hooks.get, block = hooks.block, element = hooks.element;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [3]);
          var morph0 = dom.createMorphAt(element0,1,1);
          set(env, context, "tick", blockArguments[0]);
          block(env, morph0, context, "if", [get(env, context, "template.blockParams")], {}, child0, child1);
          element(env, element1, context, "bind-attr", [], {"x1": get(env, context, "tick.x"), "y1": get(env, context, "tick.y1"), "x2": get(env, context, "tick.x"), "y2": get(env, context, "tick.y2")});
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("line");
        dom.setAttribute(el1,"x1","0");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, element = hooks.element, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element2 = dom.childAt(fragment, [0]);
        var morph0 = dom.createMorphAt(fragment,2,2,contextualElement);
        dom.insertBoundary(fragment, null);
        element(env, element2, context, "bind-attr", [], {"y1": get(env, context, "axisLineY"), "x2": get(env, context, "width"), "y2": get(env, context, "axisLineY")});
        block(env, morph0, context, "each", [get(env, context, "ticks")], {}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('ember-nf-graph-examples/templates/components/nf-y-axis', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        var child0 = (function() {
          var child0 = (function() {
            return {
              isHTMLBars: true,
              revision: "Ember@1.11.0",
              blockParams: 0,
              cachedFragment: null,
              hasRendered: false,
              build: function build(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("          ");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("text");
                var el2 = dom.createComment("");
                dom.appendChild(el1, el2);
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              render: function render(context, env, contextualElement) {
                var dom = env.dom;
                var hooks = env.hooks, content = hooks.content;
                dom.detectNamespace(contextualElement);
                var fragment;
                if (env.useFragmentCache && dom.canClone) {
                  if (this.cachedFragment === null) {
                    fragment = this.build(dom);
                    if (this.hasRendered) {
                      this.cachedFragment = fragment;
                    } else {
                      this.hasRendered = true;
                    }
                  }
                  if (this.cachedFragment) {
                    fragment = dom.cloneNode(this.cachedFragment, true);
                  }
                } else {
                  fragment = this.build(dom);
                }
                var morph0 = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
                content(env, morph0, context, "tick.value");
                return fragment;
              }
            };
          }());
          var child1 = (function() {
            return {
              isHTMLBars: true,
              revision: "Ember@1.11.0",
              blockParams: 0,
              cachedFragment: null,
              hasRendered: false,
              build: function build(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("          ");
                dom.appendChild(el0, el1);
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              render: function render(context, env, contextualElement) {
                var dom = env.dom;
                var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
                dom.detectNamespace(contextualElement);
                var fragment;
                if (env.useFragmentCache && dom.canClone) {
                  if (this.cachedFragment === null) {
                    fragment = this.build(dom);
                    if (this.hasRendered) {
                      this.cachedFragment = fragment;
                    } else {
                      this.hasRendered = true;
                    }
                  }
                  if (this.cachedFragment) {
                    fragment = dom.cloneNode(this.cachedFragment, true);
                  }
                } else {
                  fragment = this.build(dom);
                }
                var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
                inline(env, morph0, context, "yield", [get(env, context, "tick")], {});
                return fragment;
              }
            };
          }());
          return {
            isHTMLBars: true,
            revision: "Ember@1.11.0",
            blockParams: 0,
            cachedFragment: null,
            hasRendered: false,
            build: function build(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            render: function render(context, env, contextualElement) {
              var dom = env.dom;
              var hooks = env.hooks, get = hooks.get, block = hooks.block;
              dom.detectNamespace(contextualElement);
              var fragment;
              if (env.useFragmentCache && dom.canClone) {
                if (this.cachedFragment === null) {
                  fragment = this.build(dom);
                  if (this.hasRendered) {
                    this.cachedFragment = fragment;
                  } else {
                    this.hasRendered = true;
                  }
                }
                if (this.cachedFragment) {
                  fragment = dom.cloneNode(this.cachedFragment, true);
                }
              } else {
                fragment = this.build(dom);
              }
              var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
              dom.insertBoundary(fragment, null);
              dom.insertBoundary(fragment, 0);
              block(env, morph0, context, "if", [get(env, context, "useDefaultTemplate")], {}, child0, child1);
              return fragment;
            }
          };
        }());
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.0",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, get = hooks.get, block = hooks.block;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, null);
            dom.insertBoundary(fragment, 0);
            block(env, morph0, context, "view", ["nf-tick-label"], {"controller": get(env, context, "graph.parentController"), "x": get(env, context, "tick.labelx"), "y": get(env, context, "tick.y")}, child0, null);
            return fragment;
          }
        };
      }());
      var child1 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.0",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
            inline(env, morph0, context, "view", ["nf-tick-label"], {"controller": get(env, context, "graph.parentController"), "template": get(env, context, "template"), "x": get(env, context, "tick.labelx"), "y": get(env, context, "tick.y")});
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.0",
        blockParams: 1,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("g");
          dom.setAttribute(el1,"class","tick");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("line");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement, blockArguments) {
          var dom = env.dom;
          var hooks = env.hooks, set = hooks.set, get = hooks.get, block = hooks.block, element = hooks.element;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [3]);
          var morph0 = dom.createMorphAt(element0,1,1);
          set(env, context, "tick", blockArguments[0]);
          block(env, morph0, context, "if", [get(env, context, "template.blockParams")], {}, child0, child1);
          element(env, element1, context, "bind-attr", [], {"x1": get(env, context, "tick.x1"), "y1": get(env, context, "tick.y"), "x2": get(env, context, "tick.x2"), "y2": get(env, context, "tick.y")});
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("line");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, element = hooks.element, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element2 = dom.childAt(fragment, [0]);
        var morph0 = dom.createMorphAt(fragment,2,2,contextualElement);
        dom.insertBoundary(fragment, null);
        element(env, element2, context, "bind-attr", [], {"x1": get(env, context, "axisLineX"), "y1": "0", "x2": get(env, context, "axisLineX"), "y2": get(env, context, "height")});
        block(env, morph0, context, "each", [get(env, context, "ticks")], {}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('ember-nf-graph-examples/templates/components/nf-y-diff', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("g");
        dom.setAttribute(el1,"class","nf-y-diff-content");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(dom.childAt(fragment, [0]),1,1);
        content(env, morph0, context, "yield");
        return fragment;
      }
    };
  }()));

});
define('ember-nf-graph-examples/templates/components/stacked-area-graph', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        var child0 = (function() {
          return {
            isHTMLBars: true,
            revision: "Ember@1.11.0",
            blockParams: 0,
            cachedFragment: null,
            hasRendered: false,
            build: function build(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("      ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n      ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n      ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            render: function render(context, env, contextualElement) {
              var dom = env.dom;
              var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
              dom.detectNamespace(contextualElement);
              var fragment;
              if (env.useFragmentCache && dom.canClone) {
                if (this.cachedFragment === null) {
                  fragment = this.build(dom);
                  if (this.hasRendered) {
                    this.cachedFragment = fragment;
                  } else {
                    this.hasRendered = true;
                  }
                }
                if (this.cachedFragment) {
                  fragment = dom.cloneNode(this.cachedFragment, true);
                }
              } else {
                fragment = this.build(dom);
              }
              var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
              var morph1 = dom.createMorphAt(fragment,3,3,contextualElement);
              var morph2 = dom.createMorphAt(fragment,5,5,contextualElement);
              inline(env, morph0, context, "nf-area", [], {"data": get(env, context, "graphData"), "xprop": "date", "yprop": "high", "class": "high", "interpolator": "monotone"});
              inline(env, morph1, context, "nf-area", [], {"data": get(env, context, "graphData"), "xprop": "date", "yprop": "medium", "class": "medium", "interpolator": "monotone"});
              inline(env, morph2, context, "nf-area", [], {"data": get(env, context, "graphData"), "xprop": "date", "yprop": "low", "class": "low", "interpolator": "monotone"});
              return fragment;
            }
          };
        }());
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.0",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, block = hooks.block;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
            block(env, morph0, context, "nf-area-stack", [], {}, child0, null);
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, block = hooks.block;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
          dom.insertBoundary(fragment, null);
          block(env, morph0, context, "nf-graph-content", [], {}, child0, null);
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Template");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("table");
        dom.setAttribute(el1,"class","CodeRay template");
        var el2 = dom.createElement("tbody");
        var el3 = dom.createElement("tr");
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","line-numbers");
        var el5 = dom.createElement("pre");
        var el6 = dom.createTextNode("1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","code");
        var el5 = dom.createElement("pre");
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("#nf-graph");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("yMinMode");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("fixed");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("yMin");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Integer");
        dom.setAttribute(el6,"class","integer");
        var el7 = dom.createTextNode("0");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("#nf-graph-content}}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Comment");
        dom.setAttribute(el6,"class","comment");
        var el7 = dom.createTextNode("#nf-area-stack}}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n      ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("area");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("data");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("graphData");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("xprop");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("date");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("yprop");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("high");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("class");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("high");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("interpolator");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("monotone");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n      ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("area");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("data");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("graphData");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("xprop");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("date");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("yprop");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("medium");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("class");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("medium");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("interpolator");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("monotone");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n      ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("area");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("data");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("graphData");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("xprop");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("date");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("yprop");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("low");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("class");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("low");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("interpolator");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("=");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("monotone");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("\"");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("/");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("area");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("stack");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("/");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("graph");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("content");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("/");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("nf");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("-");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("graph");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","discussion");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n    {{#nf-area-stack}} groups several nf-area elements into a \"stack\" so that areas are visually contoured to fit together. Each area will appear as a band of color that can be styled. The data array should defind the y value for the top curve of each area, but the bottom curve will be set aumatically by using the adjacent nf-area.  Adjacent areas are determined by the order that nf-area elements are listed in the template.\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n    yprop specifies which property on each data element represents the y value for the area.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n    class can be defined to apply a CSS class to the area.\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n    interpolator=\"monotone\" specifies drawing the area with a smooth curve.  Other interpolator values can be found ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3,"href","https://github.com/mbostock/d3/wiki/SVG-Shapes#line_interpolate");
        var el4 = dom.createTextNode("here");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(".\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Component JavaScript");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("table");
        dom.setAttribute(el1,"class","CodeRay");
        var el2 = dom.createElement("tbody");
        var el3 = dom.createElement("tr");
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","line-numbers");
        var el5 = dom.createElement("pre");
        var el6 = dom.createTextNode("1\n2\n3\n4\n5\n6\n7\n8\n9\n10");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4,"class","code");
        var el5 = dom.createElement("pre");
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Reserved");
        dom.setAttribute(el6,"class","reserved");
        var el7 = dom.createTextNode("import");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("Ember");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("from");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("ember");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Reserved");
        dom.setAttribute(el6,"class","reserved");
        var el7 = dom.createTextNode("import");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("dataGenerator");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("from");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","String");
        dom.setAttribute(el6,"class","string");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","content");
        var el8 = dom.createTextNode("../services/data-generator");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7,"title","String");
        dom.setAttribute(el7,"class","delimiter");
        var el8 = dom.createTextNode("'");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Reserved");
        dom.setAttribute(el6,"class","reserved");
        var el7 = dom.createTextNode("export");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("default");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("Ember");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("Component");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("extend");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("({");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Function");
        dom.setAttribute(el6,"class","function");
        var el7 = dom.createTextNode("graphData");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(":");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("function");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("{");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Keyword");
        dom.setAttribute(el6,"class","keyword");
        var el7 = dom.createTextNode("return");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode(" ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("dataGenerator");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("threeMetricTimeSeries");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n  ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("}");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(".");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Ident");
        var el7 = dom.createTextNode("property");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("(");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(")");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Space");
        var el7 = dom.createTextNode("\n\n");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode("})");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6,"title","Operator");
        var el7 = dom.createTextNode(";");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        block(env, morph0, context, "nf-graph", [], {"yMinMode": "fixed", "yMin": 0}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('ember-nf-graph-examples/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
  });

});
define('ember-nf-graph-examples/tests/components/bars-with-line.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/bars-with-line.js should pass jshint', function() { 
    ok(true, 'components/bars-with-line.js should pass jshint.'); 
  });

});
define('ember-nf-graph-examples/tests/components/basic-area-graph.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/basic-area-graph.js should pass jshint', function() { 
    ok(true, 'components/basic-area-graph.js should pass jshint.'); 
  });

});
define('ember-nf-graph-examples/tests/components/basic-bar-graph.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/basic-bar-graph.js should pass jshint', function() { 
    ok(true, 'components/basic-bar-graph.js should pass jshint.'); 
  });

});
define('ember-nf-graph-examples/tests/components/basic-line-graph.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/basic-line-graph.js should pass jshint', function() { 
    ok(true, 'components/basic-line-graph.js should pass jshint.'); 
  });

});
define('ember-nf-graph-examples/tests/components/brush-select-zoom.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/brush-select-zoom.js should pass jshint', function() { 
    ok(true, 'components/brush-select-zoom.js should pass jshint.'); 
  });

});
define('ember-nf-graph-examples/tests/components/detailed-line-graph.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/detailed-line-graph.js should pass jshint', function() { 
    ok(true, 'components/detailed-line-graph.js should pass jshint.'); 
  });

});
define('ember-nf-graph-examples/tests/components/graph-primitives.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/graph-primitives.js should pass jshint', function() { 
    ok(true, 'components/graph-primitives.js should pass jshint.'); 
  });

});
define('ember-nf-graph-examples/tests/components/mouse-tracking-data.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/mouse-tracking-data.js should pass jshint', function() { 
    ok(true, 'components/mouse-tracking-data.js should pass jshint.'); 
  });

});
define('ember-nf-graph-examples/tests/components/mouse-tracking.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/mouse-tracking.js should pass jshint', function() { 
    ok(true, 'components/mouse-tracking.js should pass jshint.'); 
  });

});
define('ember-nf-graph-examples/tests/components/stacked-area-graph.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/stacked-area-graph.js should pass jshint', function() { 
    ok(true, 'components/stacked-area-graph.js should pass jshint.'); 
  });

});
define('ember-nf-graph-examples/tests/helpers/format-hour-minute.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/format-hour-minute.js should pass jshint', function() { 
    ok(true, 'helpers/format-hour-minute.js should pass jshint.'); 
  });

});
define('ember-nf-graph-examples/tests/helpers/resolver', ['exports', 'ember/resolver', 'ember-nf-graph-examples/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('ember-nf-graph-examples/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('ember-nf-graph-examples/tests/helpers/start-app', ['exports', 'ember', 'ember-nf-graph-examples/app', 'ember-nf-graph-examples/router', 'ember-nf-graph-examples/config/environment'], function (exports, Ember, Application, Router, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('ember-nf-graph-examples/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('ember-nf-graph-examples/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(true, 'router.js should pass jshint.'); 
  });

});
define('ember-nf-graph-examples/tests/services/data-generator.jshint', function () {

  'use strict';

  module('JSHint - services');
  test('services/data-generator.js should pass jshint', function() { 
    ok(true, 'services/data-generator.js should pass jshint.'); 
  });

});
define('ember-nf-graph-examples/tests/services/utility.jshint', function () {

  'use strict';

  module('JSHint - services');
  test('services/utility.js should pass jshint', function() { 
    ok(true, 'services/utility.js should pass jshint.'); 
  });

});
define('ember-nf-graph-examples/tests/test-helper', ['ember-nf-graph-examples/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('ember-nf-graph-examples/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('ember-nf-graph-examples/tests/unit/components/bars-with-line-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent("bars-with-line", {});

  ember_qunit.test("it renders", function (assert) {
    assert.expect(2);

    // Creates the component instance
    var component = this.subject();
    assert.equal(component._state, "preRender");

    // Renders the component to the page
    this.render();
    assert.equal(component._state, "inDOM");
  });

  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('ember-nf-graph-examples/tests/unit/components/bars-with-line-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components');
  test('unit/components/bars-with-line-test.js should pass jshint', function() { 
    ok(true, 'unit/components/bars-with-line-test.js should pass jshint.'); 
  });

});
define('ember-nf-graph-examples/tests/unit/components/basic-area-graph-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent("basic-area-graph", {});

  ember_qunit.test("it renders", function (assert) {
    assert.expect(2);

    // Creates the component instance
    var component = this.subject();
    assert.equal(component._state, "preRender");

    // Renders the component to the page
    this.render();
    assert.equal(component._state, "inDOM");
  });

  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('ember-nf-graph-examples/tests/unit/components/basic-area-graph-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components');
  test('unit/components/basic-area-graph-test.js should pass jshint', function() { 
    ok(true, 'unit/components/basic-area-graph-test.js should pass jshint.'); 
  });

});
define('ember-nf-graph-examples/tests/unit/components/basic-bar-graph-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent("basic-bar-graph", {});

  ember_qunit.test("it renders", function (assert) {
    assert.expect(2);

    // Creates the component instance
    var component = this.subject();
    assert.equal(component._state, "preRender");

    // Renders the component to the page
    this.render();
    assert.equal(component._state, "inDOM");
  });

  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('ember-nf-graph-examples/tests/unit/components/basic-bar-graph-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components');
  test('unit/components/basic-bar-graph-test.js should pass jshint', function() { 
    ok(true, 'unit/components/basic-bar-graph-test.js should pass jshint.'); 
  });

});
define('ember-nf-graph-examples/tests/unit/components/basic-line-graph-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent("basic-line-graph", {});

  ember_qunit.test("it renders", function (assert) {
    assert.expect(2);

    // Creates the component instance
    var component = this.subject();
    assert.equal(component._state, "preRender");

    // Renders the component to the page
    this.render();
    assert.equal(component._state, "inDOM");
  });

  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('ember-nf-graph-examples/tests/unit/components/basic-line-graph-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components');
  test('unit/components/basic-line-graph-test.js should pass jshint', function() { 
    ok(true, 'unit/components/basic-line-graph-test.js should pass jshint.'); 
  });

});
define('ember-nf-graph-examples/tests/unit/components/brush-select-zoom-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent("brush-select-zoom", {});

  ember_qunit.test("it renders", function (assert) {
    assert.expect(2);

    // Creates the component instance
    var component = this.subject();
    assert.equal(component._state, "preRender");

    // Renders the component to the page
    this.render();
    assert.equal(component._state, "inDOM");
  });

  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('ember-nf-graph-examples/tests/unit/components/brush-select-zoom-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components');
  test('unit/components/brush-select-zoom-test.js should pass jshint', function() { 
    ok(true, 'unit/components/brush-select-zoom-test.js should pass jshint.'); 
  });

});
define('ember-nf-graph-examples/tests/unit/components/detailed-line-graph-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent("detailed-line-graph", {});

  ember_qunit.test("it renders", function (assert) {
    assert.expect(2);

    // Creates the component instance
    var component = this.subject();
    assert.equal(component._state, "preRender");

    // Renders the component to the page
    this.render();
    assert.equal(component._state, "inDOM");
  });

  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('ember-nf-graph-examples/tests/unit/components/detailed-line-graph-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components');
  test('unit/components/detailed-line-graph-test.js should pass jshint', function() { 
    ok(true, 'unit/components/detailed-line-graph-test.js should pass jshint.'); 
  });

});
define('ember-nf-graph-examples/tests/unit/components/graph-primitives-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent("graph-primitives", {});

  ember_qunit.test("it renders", function (assert) {
    assert.expect(2);

    // Creates the component instance
    var component = this.subject();
    assert.equal(component._state, "preRender");

    // Renders the component to the page
    this.render();
    assert.equal(component._state, "inDOM");
  });

  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('ember-nf-graph-examples/tests/unit/components/graph-primitives-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components');
  test('unit/components/graph-primitives-test.js should pass jshint', function() { 
    ok(true, 'unit/components/graph-primitives-test.js should pass jshint.'); 
  });

});
define('ember-nf-graph-examples/tests/unit/components/mouse-tracking-data-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent("mouse-tracking-data", {});

  ember_qunit.test("it renders", function (assert) {
    assert.expect(2);

    // Creates the component instance
    var component = this.subject();
    assert.equal(component._state, "preRender");

    // Renders the component to the page
    this.render();
    assert.equal(component._state, "inDOM");
  });

  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('ember-nf-graph-examples/tests/unit/components/mouse-tracking-data-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components');
  test('unit/components/mouse-tracking-data-test.js should pass jshint', function() { 
    ok(true, 'unit/components/mouse-tracking-data-test.js should pass jshint.'); 
  });

});
define('ember-nf-graph-examples/tests/unit/components/mouse-tracking-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent("mouse-tracking", {});

  ember_qunit.test("it renders", function (assert) {
    assert.expect(2);

    // Creates the component instance
    var component = this.subject();
    assert.equal(component._state, "preRender");

    // Renders the component to the page
    this.render();
    assert.equal(component._state, "inDOM");
  });

  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('ember-nf-graph-examples/tests/unit/components/mouse-tracking-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components');
  test('unit/components/mouse-tracking-test.js should pass jshint', function() { 
    ok(true, 'unit/components/mouse-tracking-test.js should pass jshint.'); 
  });

});
define('ember-nf-graph-examples/tests/unit/components/stacked-area-graph-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent("stacked-area-graph", {});

  ember_qunit.test("it renders", function (assert) {
    assert.expect(2);

    // Creates the component instance
    var component = this.subject();
    assert.equal(component._state, "preRender");

    // Renders the component to the page
    this.render();
    assert.equal(component._state, "inDOM");
  });

  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('ember-nf-graph-examples/tests/unit/components/stacked-area-graph-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components');
  test('unit/components/stacked-area-graph-test.js should pass jshint', function() { 
    ok(true, 'unit/components/stacked-area-graph-test.js should pass jshint.'); 
  });

});
define('ember-nf-graph-examples/views/nf-plot', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].View.extend({
    tagName: "g"
  });

});
define('ember-nf-graph-examples/views/nf-tick-label', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].View.extend({
    tagName: "g",

    attributeBindings: ["transform"],

    transform: Ember['default'].computed("x", "y", function () {
      var x = this.get("x");
      var y = this.get("y");
      return "translate(" + x + " " + y + ")";
    }),

    className: "nf-tick-label"
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('ember-nf-graph-examples/config/environment', ['ember'], function(Ember) {
  var prefix = 'ember-nf-graph-examples';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("ember-nf-graph-examples/tests/test-helper");
} else {
  require("ember-nf-graph-examples/app")["default"].create({"name":"ember-nf-graph-examples","version":"0.0.0.135bdc0f"});
}

/* jshint ignore:end */
//# sourceMappingURL=ember-nf-graph-examples.map