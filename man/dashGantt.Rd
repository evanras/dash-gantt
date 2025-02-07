% Auto-generated: do not edit by hand
\name{dashGantt}

\alias{dashGantt}

\title{DashGantt component}

\description{
DashGantt is a React component that creates an interactive Gantt chart with support for hierarchical data, timeline visualization, and both bar and line chart representations. It supports horizontal scrolling for timeline data while maintaining a fixed left column for job descriptions.
}

\usage{
dashGantt(id=NULL, className=NULL, colorMapping=NULL,
columnWidth=NULL, currentTime=NULL, data=NULL, endDate=NULL,
maxHeight=NULL, startDate=NULL, styles=NULL, timeScale=NULL,
title=NULL, tooltipFields=NULL)
}

\arguments{
\item{id}{Character. Optional(str): The ID used to identify this component in Dash callbacks.}

\item{className}{Lists containing elements 'container', 'header', 'jobs', 'timeline', 'taskbar', 'timecell', 'caretbutton'.
those elements have the following types:
  - container (character; optional)
  - header (character; optional)
  - jobs (character; optional)
  - timeline (character; optional)
  - taskbar (character; optional)
  - timecell (character; optional)
  - caretbutton (character; optional). Optional(Dict[str, Any]): Custom CSS classes for different parts of the component.
Allows Dash developers to apply their own CSS classes}

\item{colorMapping}{Lists containing elements 'key', 'map'.
those elements have the following types:
  - key (character; required)
  - map (named list; required). Optional(Dict[str, Any]): Configuration for mapping data values to colors.
key: The field in data items to use for color mapping
map: Object mapping field values to color strings (e.g., {"completed": "green", "pending": "orange"})}

\item{columnWidth}{Numeric. Optional(number): Width in pixels for each column in the timeline view. Default is 100.}

\item{currentTime}{Character. Optional(str | dt.datetime): The current time attribute defines where to display a vertical cutoff line.}

\item{data}{List of lists containing elements 'id', 'name', 'icon', 'start', 'end', 'displaytype', 'dates', 'values', 'color', 'children', 'label'.
those elements have the following types:
  - id (character | numeric; required)
  - name (character; required)
  - icon (character; optional)
  - start (character; optional)
  - end (character; optional)
  - displaytype (a value equal to: 'bar', 'line'; optional)
  - dates (list of characters; optional)
  - values (list of numerics; optional)
  - color (character; optional)
  - children (unnamed list; optional)
  - label (character; optional)s. Optional(Dict[str, Any]): The data structure defining the Gantt chart. Hierarchical data is supported. 
Optionally configure whether the coresponding timeline visual is a bar or line chart. When setting 
displayType = 'line', 'dates' and 'values' must also be included.}

\item{endDate}{Character. Required(str | dt.datetime): The very last date the timeline view will end with.}

\item{maxHeight}{Character | numeric. Optional(str | number): Maximum height of the component. Can be pixel value or CSS string. Default is '80vh'.}

\item{startDate}{Character. Required(str | dt.datetime): The very first date the timeline view will begin with.}

\item{styles}{Lists containing elements 'container', 'header', 'jobs', 'timeline', 'taskbar', 'timecell', 'caretbutton'.
those elements have the following types:
  - container (named list; optional)
  - header (named list; optional)
  - jobs (named list; optional)
  - timeline (named list; optional)
  - taskbar (named list; optional)
  - timecell (named list; optional)
  - caretbutton (named list; optional). Optional(Dict[str, Any]): Custom styles for different parts of the component.
Available style objects:
container: Styles for the main container
header: Styles for the header section
jobs: Styles for the jobs column
timeline: Styles for the timeline section
taskBar: Styles for individual task bars
timeCell: Styles for timeline header cells
caretButton: Styles for expand/collapse buttons}

\item{timeScale}{Lists containing elements 'unit', 'value', 'format'.
those elements have the following types:
  - unit (a value equal to: 'minutes', 'hours', 'days', 'weeks', 'months'; required)
  - value (numeric; required)
  - format (character; required). Required(Dict[str, Any]): Configuration for the timeline scale and formatting.
unit: The time unit for intervals ('minutes', 'hours', 'days', 'weeks', 'months')
value: The number of units between each interval
format: The moment.js format string for displaying dates}

\item{title}{Character. Optional(str): The title to display in the top left corner above the tasks window.}

\item{tooltipFields}{List of characters. Optional(List[str]): List of field names from the data items to display in tooltips when hovering over bars.}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

