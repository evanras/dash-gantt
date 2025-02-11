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
- `styles` (optional): Optional custom styles for header row components. styles has the following type: lists containing elements 'container', 'header', 'jobs', 'timeline', 'taskBar', 'timeCell', 'caretButton', 'currentTime'.
Those elements have the following types:
  - `container` (Dict; optional)
  - `header` (Dict; optional)
  - `jobs` (Dict; optional)
  - `timeline` (Dict; optional)
  - `taskBar` (Dict; optional)
  - `timeCell` (Dict; optional)
  - `caretButton` (Dict; optional)
  - `currentTime` (Dict; optional)
- `timeScale` (required): Configuration for time scale display. timeScale has the following type: lists containing elements 'unit', 'value', 'format'.
Those elements have the following types:
  - `unit` (a value equal to: 'minutes', 'hours', 'days', 'weeks', 'months'; required)
  - `value` (Real; required)
  - `format` (String; required)
- `title` (String; optional): Title displayed in the left column
- `titleWidth` (Real; optional): Width of the jobs panel
"""
function headerrow(; kwargs...)
        available_props = Symbol[:endDate, :headerHeight, :scrollLeft, :startDate, :styles, :timeScale, :title, :titleWidth]
        wild_props = Symbol[]
        return Component("headerrow", "HeaderRow", "dash_gantt", available_props, wild_props; kwargs...)
end

