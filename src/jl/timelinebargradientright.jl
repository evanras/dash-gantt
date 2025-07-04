# AUTO GENERATED FILE - DO NOT EDIT

export timelinebargradientright

"""
    timelinebargradientright(;kwargs...)

A TimelineBarGradientRight component.
TimelineBar renders a single task bar within the Gantt chart timeline.
It handles the visual representation of a task with a defined start and end time.

@component
@param {Object} props
@param {Object} props.item - The task data object
@param {number} props.position - Left position as percentage of timeline width
@param {number} props.width - Width as percentage of timeline width
@param {string} props.color - Color code for the task bar
@param {string} [props.label] - Optional text to display inside the bar
@param {string} [props.tooltipContent] - Content to show in tooltip on hover
Keyword arguments:
- `color` (String; required)
- `item` (Dict; required)
- `label` (String; optional)
- `position` (Real; required)
- `tooltipContent` (String; optional)
- `width` (Real; required)
"""
function timelinebargradientright(; kwargs...)
        available_props = Symbol[:color, :item, :label, :position, :tooltipContent, :width]
        wild_props = Symbol[]
        return Component("timelinebargradientright", "TimelineBarGradientRight", "dash_gantt", available_props, wild_props; kwargs...)
end

