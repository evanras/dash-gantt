# AUTO GENERATED FILE - DO NOT EDIT

export dashgantt

"""
    dashgantt(;kwargs...)

A DashGantt component.
DashGantt is a React component that creates an interactive Gantt chart.
It supports hierarchical data, timeline visualization, and both bar and line
chart representations. Features include horizontal scrolling, expandable rows,
and configurable styling.

@component
@param {Object} props
@param {string} [props.id] - Component identifier for Dash callbacks
@param {Array<Object>} props.data - Hierarchical data structure for the Gantt chart
@param {string} [props.title="Jobs"] - Title displayed in the left column
@param {Date|string} props.startDate - Start date for the timeline
@param {Date|string} props.endDate - End date for the timeline
@param {Date|string} [props.currentTime] - Current time for timeline indicator
@param {Object} props.timeScale - Configuration for timeline intervals
@param {number} [props.columnWidth=100] - Width of timeline columns in pixels
@param {string|number} [props.maxHeight='80vh'] - Maximum height of the component
@param {Object} [props.colorMapping] - Configuration for mapping data values to colors
@param {Array<string>} [props.tooltipFields] - Fields to display in tooltips
@param {Object} [props.styles] - Custom styles for component parts
@param {Object} [props.className] - Custom CSS classes
@param {Function} [props.setProps] - Dash callback property
Keyword arguments:
- `id` (String; optional): Optional ID used to identify this component in Dash callbacks
- `className` (optional): Optional custom CSS classes. className has the following type: lists containing elements 'container', 'header', 'jobs', 'timeline', 'taskBar', 'timeCell', 'caretButton'.
Those elements have the following types:
  - `container` (String; optional)
  - `header` (String; optional)
  - `jobs` (String; optional)
  - `timeline` (String; optional)
  - `taskBar` (String; optional)
  - `timeCell` (String; optional)
  - `caretButton` (String; optional)
- `colorMapping` (optional): Optional configuration for color mapping. colorMapping has the following type: lists containing elements 'key', 'map'.
Those elements have the following types:
  - `key` (String; required)
  - `map` (Dict with Strings as keys and values of type String; required)
- `columnWidth` (Real; optional): Optional width for timeline columns
- `currentTime` (String; optional): Optional current time to show indicator
- `data` (required): Required data structure defining the Gantt chart. data has the following type: Array of lists containing elements 'id', 'name', 'icon', 'start', 'end', 'displayType', 'dates', 'values', 'color', 'children', 'label', 'status'.
Those elements have the following types:
  - `id` (String | Real; required)
  - `name` (String; required)
  - `icon` (String; optional)
  - `start` (String; optional)
  - `end` (String; optional)
  - `displayType` (a value equal to: 'bar', 'line'; optional)
  - `dates` (Array of Strings; optional)
  - `values` (Array of Reals; optional)
  - `color` (String; optional)
  - `children` (Array; optional)
  - `label` (String; optional)
  - `status` (String; optional)s
- `endDate` (String; required): Required end date for the timeline
- `maxHeight` (String | Real; optional): Optional maximum height of the component
- `startDate` (String; required): Required start date for the timeline
- `styles` (optional): Optional custom styles for component parts. styles has the following type: lists containing elements 'container', 'header', 'jobs', 'timeline', 'taskBar', 'timeCell', 'caretButton', 'currentTime'.
Those elements have the following types:
  - `container` (Dict; optional)
  - `header` (Dict; optional)
  - `jobs` (Dict; optional)
  - `timeline` (Dict; optional)
  - `taskBar` (Dict; optional)
  - `timeCell` (Dict; optional)
  - `caretButton` (Dict; optional)
  - `currentTime` (Dict; optional)
- `timeScale` (optional): Required configuration for timeline scale and formatting. timeScale has the following type: lists containing elements 'unit', 'value', 'format'.
Those elements have the following types:
  - `unit` (a value equal to: 'minutes', 'hours', 'days', 'weeks', 'months'; required)
  - `value` (Real; required)
  - `format` (String; required)
- `title` (String; optional): Optional title displayed in the top left corner
- `tooltipFields` (Array of Strings; optional): Optional fields to display in tooltips
"""
function dashgantt(; kwargs...)
        available_props = Symbol[:id, :className, :colorMapping, :columnWidth, :currentTime, :data, :endDate, :maxHeight, :startDate, :styles, :timeScale, :title, :tooltipFields]
        wild_props = Symbol[]
        return Component("dashgantt", "DashGantt", "dash_gantt", available_props, wild_props; kwargs...)
end

