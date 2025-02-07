# AUTO GENERATED FILE - DO NOT EDIT

export timelinerow

"""
    timelinerow(;kwargs...)

A TimelineRow component.
TimelineRow determines whether to render a bar or line chart
based on the task type and data
Keyword arguments:
- `rowHeight` (Real; required): Height of each row
- `task` (required): Task data object. task has the following type: lists containing elements 'id', 'name', 'displayType'.
Those elements have the following types:
  - `id` (String | Real; required)
  - `name` (String; required)
  - `displayType` (a value equal to: 'bar', 'line'; optional)
- `yPosition` (Real; required): Y position of this row
"""
function timelinerow(; kwargs...)
        available_props = Symbol[:rowHeight, :task, :yPosition]
        wild_props = Symbol[]
        return Component("timelinerow", "TimelineRow", "dash_gantt", available_props, wild_props; kwargs...)
end

