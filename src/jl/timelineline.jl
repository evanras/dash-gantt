# AUTO GENERATED FILE - DO NOT EDIT

export timelineline

"""
    timelineline(;kwargs...)

A TimelineLine component.
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
- `color` (String; required): Primary color for the line. Should be a valid CSS color string.
@type {string}
- `data` (required): Array of data points for the line chart. Each point must have a date and value.
@type {Array<{date: (string|Date), value: number}>}. data has the following type: Array of lists containing elements 'date', 'value'.
Those elements have the following types:
  - `date` (String; optional)
  - `value` (Real; optional)s
- `fill` (optional): Configuration object for fill styling.
@type {Object}
@property {boolean} [enabled=false] - Whether to enable fill
@property {string} [color] - Fill color (defaults to line color)
@property {number} [opacity=0.3] - Fill opacity (0-1)
@property {Object} [gradient] - Gradient configuration
@property {number} [gradient.startOpacity=0.3] - Start opacity for gradient
@property {number} [gradient.endOpacity=0.1] - End opacity for gradient. fill has the following type: lists containing elements 'enabled', 'color', 'opacity', 'gradient'.
Those elements have the following types:
  - `enabled` (Bool; optional)
  - `color` (String; optional)
  - `opacity` (Real; optional)
  - `gradient` (optional): . gradient has the following type: lists containing elements 'startOpacity', 'endOpacity'.
Those elements have the following types:
  - `startOpacity` (Real; optional)
  - `endOpacity` (Real; optional)
- `position` (Real; required): Left position of the chart as a percentage of timeline width.
@type {number}
- `width` (Real; required): Width of the chart as a percentage of timeline width.
@type {number}
"""
function timelineline(; kwargs...)
        available_props = Symbol[:color, :data, :fill, :position, :width]
        wild_props = Symbol[]
        return Component("timelineline", "TimelineLine", "dash_gantt", available_props, wild_props; kwargs...)
end

