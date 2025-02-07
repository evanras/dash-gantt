# AUTO GENERATED FILE - DO NOT EDIT

export timelineline

"""
    timelineline(;kwargs...)

A TimelineLine component.
TimelineLine renders a line chart representation of time series data.
It includes gradient fills and is bounded by the row height.

@component
@param {Object} props
@param {Array<Object>} props.data - Array of data points with date and value
@param {string} props.color - Color code for the line and gradient
@param {number} props.position - Left position as percentage of timeline width
@param {number} props.width - Width as percentage of timeline width
Keyword arguments:
- `color` (String; required)
- `data` (required): . data has the following type: Array of lists containing elements 'date', 'value'.
Those elements have the following types:
  - `date` (String; optional)
  - `value` (Real; optional)s
- `position` (Real; required)
- `width` (Real; required)
"""
function timelineline(; kwargs...)
        available_props = Symbol[:color, :data, :position, :width]
        wild_props = Symbol[]
        return Component("timelineline", "TimelineLine", "dash_gantt", available_props, wild_props; kwargs...)
end

