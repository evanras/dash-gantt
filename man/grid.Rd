% Auto-generated: do not edit by hand
\name{grid}

\alias{grid}

\title{Grid component}

\description{
Grid component creates the background grid structure for the Gantt chart including row backgrounds and time interval lines
}

\usage{
grid(columnWidth=NULL, currentTime=NULL, endDate=NULL,
rowHeight=NULL, startDate=NULL, tasks=NULL, timeScale=NULL)
}

\arguments{
\item{columnWidth}{Numeric. Width of each column in pixels}

\item{currentTime}{Character. Optional current time to show indicator}

\item{endDate}{Character. End date for the timeline}

\item{rowHeight}{Numeric. Height of each row in pixels}

\item{startDate}{Character. Start date for the timeline}

\item{tasks}{List of lists containing elements 'id'.
those elements have the following types:
  - id (character | numeric; required)s. Array of task objects to determine number of rows}

\item{timeScale}{Lists containing elements 'unit', 'value', 'format'.
those elements have the following types:
  - unit (a value equal to: 'minutes', 'hours', 'days', 'weeks', 'months'; required)
  - value (numeric; required)
  - format (character; required). Configuration for time scale display}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

