# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class TimelineLine(Component):
    """A TimelineLine component.
TimelineLine renders a line chart representation of time series data.
Supports gradient fills and configurable styling options.

@component
@example
// Basic usage with solid fill
<TimelineLine
  data={[
    { date: '2024-02-01', value: 75 },
    { date: '2024-02-02', value: 80 },
    { date: '2024-02-03', value: 85 }
  ]}
  color="#4CAF50"
  position={20}
  width={60}
  fill={{ enabled: true, opacity: 0.3 }}
/>

@example
// Usage with gradient fill
<TimelineLine
  data={[...]}
  color="#4CAF50"
  position={20}
  width={60}
  fill={{
    enabled: true,
    gradient: {
      startOpacity: 0.4,
      endOpacity: 0.1
    }
  }}
/>

Keyword arguments:

- color (string; required):
    Primary color for the line. Should be a valid CSS color string.
    @type {string}.

- data (list of dicts; required):
    Array of data points for the line chart. Each point must have a
    date and value. @type {Array<{date: (string|Date), value:
    number}>}.

    `data` is a list of dicts with keys:

    - date (string; optional)

    - value (number; optional)

- fill (dict; default {    enabled: False,    opacity: 0.3,    gradient: {        startOpacity: 0.3,        endOpacity: 0.1    }}):
    Configuration object for fill styling. @type {Object} @property
    {boolean} [enabled=False] - Whether to enable fill @property
    {string} [color] - Fill color (defaults to line color) @property
    {number} [opacity=0.3] - Fill opacity (0-1) @property {Object}
    [gradient] - Gradient configuration @property {number}
    [gradient.startOpacity=0.3] - Start opacity for gradient @property
    {number} [gradient.endOpacity=0.1] - End opacity for gradient.

    `fill` is a dict with keys:

    - enabled (boolean; optional)

    - color (string; optional)

    - opacity (number; optional)

    - gradient (dict; optional)

        `gradient` is a dict with keys:

        - startOpacity (number; optional)

        - endOpacity (number; optional)

- position (number; required):
    Left position of the chart as a percentage of timeline width.
    @type {number}.

- width (number; required):
    Width of the chart as a percentage of timeline width. @type
    {number}."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_gantt'
    _type = 'TimelineLine'
    @_explicitize_args
    def __init__(self, data=Component.REQUIRED, color=Component.REQUIRED, position=Component.REQUIRED, width=Component.REQUIRED, fill=Component.UNDEFINED, **kwargs):
        self._prop_names = ['color', 'data', 'fill', 'position', 'width']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['color', 'data', 'fill', 'position', 'width']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        for k in ['color', 'data', 'position', 'width']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')

        super(TimelineLine, self).__init__(**args)
