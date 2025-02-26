% Auto-generated: do not edit by hand
\name{dashGantt}

\alias{dashGantt}

\title{DashGantt component}

\description{
DashGantt is a React component that creates an interactive Gantt chart. It supports hierarchical data, timeline visualization, and both bar and line chart representations. Features include horizontal scrolling, expandable rows, and configurable styling.  @component @param {Object} props @param {string} [props.id] - Component identifier for Dash callbacks @param {Array<Object>} props.data - Hierarchical data structure for the Gantt chart @param {string} [props.title="Jobs"] - Title displayed in the left column @param {Date|string} props.startDate - Start date for the timeline @param {Date|string} props.endDate - End date for the timeline @param {Date|string} [props.currentTime] - Current time for timeline indicator @param {Object} props.timeScale - Configuration for timeline intervals @param {number} [props.columnWidth=100] - Width of timeline columns in pixels @param {string|number} [props.maxHeight='80vh'] - Maximum height of the component @param {Object} [props.colorMapping] - Configuration for mapping data values to colors @param {Array<string>} [props.tooltipFields] - Fields to display in tooltips @param {Object} [props.expandedRowsData={}] - Current expanded state of rows @param {Object} [props.lastExpandedRow] - Information about the last row expanded/collapsed @param {Object} [props.styles] - Custom styles for component parts @param {Object} [props.classNames] - Custom CSS classes @param {Function} [props.setProps] - Dash callback property
}

\usage{
dashGantt(id=NULL, classNames=NULL, colorMapping=NULL,
columnWidth=NULL, currentTime=NULL, data=NULL, endDate=NULL,
expandedRowsData=NULL, lastExpandedRow=NULL, maxHeight=NULL,
startDate=NULL, styles=NULL, timeScale=NULL, title=NULL,
tooltipFields=NULL)
}

\arguments{
\item{id}{Character. Optional ID used to identify this component in Dash callbacks}

\item{classNames}{Lists containing elements 'container', 'header', 'jobs', 'timeline', 'taskbar', 'timecell', 'caretbutton'.
those elements have the following types:
  - container (character; optional)
  - header (character; optional)
  - jobs (character; optional)
  - timeline (character; optional)
  - taskbar (character; optional)
  - timecell (character; optional)
  - caretbutton (character; optional). Optional custom CSS classes}

\item{colorMapping}{Lists containing elements 'key', 'map'.
those elements have the following types:
  - key (character; required)
  - map (list with named elements and values of type character; required). Optional configuration for color mapping}

\item{columnWidth}{Numeric. Optional width for timeline columns}

\item{currentTime}{Character. Optional current time to show indicator}

\item{data}{List of lists containing elements 'id', 'name', 'icon', 'children', 'start', 'end', 'label', 'status', 'displaytype', 'dates', 'values', 'color'.
those elements have the following types:
  - id (character | numeric; required)
  - name (character; required)
  - icon (character; optional)
  - children (unnamed list; optional)
  - start (character; optional)
  - end (character; optional)
  - label (character; optional)
  - status (character; optional)
  - displaytype (a value equal to: 'bar', 'line'; optional)
  - dates (list of characters; optional)
  - values (list of numerics; optional)
  - color (character; optional)s. Required data structure defining the Gantt chart}

\item{endDate}{Character. Required end date for the timeline}

\item{expandedRowsData}{Named list. Current expanded state of rows, mapping row IDs to boolean expanded state}

\item{lastExpandedRow}{Lists containing elements 'id', 'expanded'.
those elements have the following types:
  - id (character | numeric; optional)
  - expanded (logical; optional). Information about the last row that was expanded or collapsed}

\item{maxHeight}{Character | numeric. Optional maximum height of the component}

\item{startDate}{Character. Required start date for the timeline}

\item{styles}{Lists containing elements 'container', 'header', 'jobs', 'timeline', 'taskbar', 'timecell', 'caretbutton', 'currenttime'.
those elements have the following types:
  - container (named list; optional)
  - header (named list; optional)
  - jobs (named list; optional)
  - timeline (named list; optional)
  - taskbar (named list; optional)
  - timecell (named list; optional)
  - caretbutton (named list; optional)
  - currenttime (named list; optional). Optional custom styles for component parts}

\item{timeScale}{Lists containing elements 'unit', 'value', 'format'.
those elements have the following types:
  - unit (a value equal to: 'minutes', 'hours', 'days', 'weeks', 'months'; required)
  - value (numeric; required)
  - format (character; required). Required configuration for timeline scale and formatting}

\item{title}{Character. Optional title displayed in the top left corner}

\item{tooltipFields}{List of characters. Optional fields to display in tooltips}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

