# AUTO GENERATED FILE - DO NOT EDIT

export headerrow

"""
    headerrow(;kwargs...)

A HeaderRow component.
HeaderRow renders the timeline header with evenly spaced time intervals.
Handles dynamic column widths based on available space.
Keyword arguments:
- `endDate` (String; required): End date for the timeline
- `headerHeight` (Real; optional): Height of the header in pixels
- `scrollLeft` (Real; required): Current scroll position
- `startDate` (String; required): Start date for the timeline
- `timeScale` (required): Configuration for time scale display. timeScale has the following type: lists containing elements 'unit', 'value', 'format'.
Those elements have the following types:
  - `unit` (a value equal to: 'minutes', 'hours', 'days', 'weeks', 'months'; required)
  - `value` (Real; required)
  - `format` (String; required)
- `title` (String; optional): Title displayed in the left column
"""
function headerrow(; kwargs...)
        available_props = Symbol[:endDate, :headerHeight, :scrollLeft, :startDate, :timeScale, :title]
        wild_props = Symbol[]
        return Component("headerrow", "HeaderRow", "dash_gantt", available_props, wild_props; kwargs...)
end

