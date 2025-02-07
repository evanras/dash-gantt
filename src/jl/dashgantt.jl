# AUTO GENERATED FILE - DO NOT EDIT

export dashgantt

"""
    dashgantt(;kwargs...)

A DashGantt component.
DashGantt is a React component that creates an interactive Gantt chart with support for
hierarchical data, timeline visualization, and both bar and line chart representations.
It supports horizontal scrolling for timeline data while maintaining a fixed left column
for job descriptions.
Keyword arguments:
- `id` (String; optional): Optional(str): The ID used to identify this component in Dash callbacks.
- `className` (optional): Optional(Dict[str, Any]): Custom CSS classes for different parts of the component.
Allows Dash developers to apply their own CSS classes. className has the following type: lists containing elements 'container', 'header', 'jobs', 'timeline', 'taskBar', 'timeCell', 'caretButton'.
Those elements have the following types:
  - `container` (String; optional)
  - `header` (String; optional)
  - `jobs` (String; optional)
  - `timeline` (String; optional)
  - `taskBar` (String; optional)
  - `timeCell` (String; optional)
  - `caretButton` (String; optional)
- `colorMapping` (optional): Optional(Dict[str, Any]): Configuration for mapping data values to colors.
key: The field in data items to use for color mapping
map: Object mapping field values to color strings (e.g., {"completed": "green", "pending": "orange"}). colorMapping has the following type: lists containing elements 'key', 'map'.
Those elements have the following types:
  - `key` (String; required)
  - `map` (Dict; required)
- `columnWidth` (Real; optional): Optional(number): Width in pixels for each column in the timeline view. Default is 100.
- `currentTime` (String; optional): Optional(str | dt.datetime): The current time attribute defines where to display a vertical cutoff line.
- `data` (required): Optional(Dict[str, Any]): The data structure defining the Gantt chart. Hierarchical data is supported. 
Optionally configure whether the coresponding timeline visual is a bar or line chart. When setting 
displayType = 'line', 'dates' and 'values' must also be included.. data has the following type: Array of lists containing elements 'id', 'name', 'icon', 'start', 'end', 'displayType', 'dates', 'values', 'color', 'children', 'label'.
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
  - `label` (String; optional)s
- `endDate` (String; required): Required(str | dt.datetime): The very last date the timeline view will end with.
- `maxHeight` (String | Real; optional): Optional(str | number): Maximum height of the component. Can be pixel value or CSS string. Default is '80vh'.
- `startDate` (String; required): Required(str | dt.datetime): The very first date the timeline view will begin with.
- `styles` (optional): Optional(Dict[str, Any]): Custom styles for different parts of the component.
Available style objects:
container: Styles for the main container
header: Styles for the header section
jobs: Styles for the jobs column
timeline: Styles for the timeline section
taskBar: Styles for individual task bars
timeCell: Styles for timeline header cells
caretButton: Styles for expand/collapse buttons. styles has the following type: lists containing elements 'container', 'header', 'jobs', 'timeline', 'taskBar', 'timeCell', 'caretButton'.
Those elements have the following types:
  - `container` (Dict; optional)
  - `header` (Dict; optional)
  - `jobs` (Dict; optional)
  - `timeline` (Dict; optional)
  - `taskBar` (Dict; optional)
  - `timeCell` (Dict; optional)
  - `caretButton` (Dict; optional)
- `timeScale` (optional): Required(Dict[str, Any]): Configuration for the timeline scale and formatting.
unit: The time unit for intervals ('minutes', 'hours', 'days', 'weeks', 'months')
value: The number of units between each interval
format: The moment.js format string for displaying dates. timeScale has the following type: lists containing elements 'unit', 'value', 'format'.
Those elements have the following types:
  - `unit` (a value equal to: 'minutes', 'hours', 'days', 'weeks', 'months'; required)
  - `value` (Real; required)
  - `format` (String; required)
- `title` (String; optional): Optional(str): The title to display in the top left corner above the tasks window.
- `tooltipFields` (Array of Strings; optional): Optional(List[str]): List of field names from the data items to display in tooltips when hovering over bars.
"""
function dashgantt(; kwargs...)
        available_props = Symbol[:id, :className, :colorMapping, :columnWidth, :currentTime, :data, :endDate, :maxHeight, :startDate, :styles, :timeScale, :title, :tooltipFields]
        wild_props = Symbol[]
        return Component("dashgantt", "DashGantt", "dash_gantt", available_props, wild_props; kwargs...)
end

