# AUTO GENERATED FILE - DO NOT EDIT

export grid

"""
    grid(;kwargs...)

A Grid component.
Grid component creates the background grid structure for the Gantt chart
including row backgrounds and time interval lines
Keyword arguments:
- `columnWidth` (Real; required): Width of each column in pixels
- `currentTime` (String; optional): Optional current time to show indicator
- `endDate` (String; required): End date for the timeline
- `rowHeight` (Real; required): Height of each row in pixels
- `startDate` (String; required): Start date for the timeline
- `tasks` (required): Array of task objects to determine number of rows. tasks has the following type: Array of lists containing elements 'id'.
Those elements have the following types:
  - `id` (String | Real; required)s
- `timeScale` (required): Configuration for time scale display. timeScale has the following type: lists containing elements 'unit', 'value', 'format'.
Those elements have the following types:
  - `unit` (a value equal to: 'minutes', 'hours', 'days', 'weeks', 'months'; required)
  - `value` (Real; required)
  - `format` (String; required)
"""
function grid(; kwargs...)
        available_props = Symbol[:columnWidth, :currentTime, :endDate, :rowHeight, :startDate, :tasks, :timeScale]
        wild_props = Symbol[]
        return Component("grid", "Grid", "dash_gantt", available_props, wild_props; kwargs...)
end

