% Auto-generated: do not edit by hand
\name{headerRow}

\alias{headerRow}

\title{HeaderRow component}

\description{
HeaderRow renders the timeline header with evenly spaced time intervals. Handles dynamic column widths based on available space.
}

\usage{
headerRow(endDate=NULL, headerHeight=NULL, scrollLeft=NULL,
startDate=NULL, styles=NULL, timeScale=NULL, title=NULL,
titleWidth=NULL)
}

\arguments{
\item{endDate}{Character. End date for the timeline}

\item{headerHeight}{Numeric. Height of the header in pixels}

\item{scrollLeft}{Numeric. Current scroll position}

\item{startDate}{Character. Start date for the timeline}

\item{styles}{Lists containing elements 'container', 'header', 'jobs', 'timeline', 'taskbar', 'timecell', 'caretbutton', 'currenttime'.
those elements have the following types:
  - container (named list; optional)
  - header (named list; optional)
  - jobs (named list; optional)
  - timeline (named list; optional)
  - taskbar (named list; optional)
  - timecell (named list; optional)
  - caretbutton (named list; optional)
  - currenttime (named list; optional). Optional custom styles for header row components}

\item{timeScale}{Lists containing elements 'unit', 'value', 'format'.
those elements have the following types:
  - unit (a value equal to: 'minutes', 'hours', 'days', 'weeks', 'months'; required)
  - value (numeric; required)
  - format (character; required). Configuration for time scale display}

\item{title}{Character. Title displayed in the left column}

\item{titleWidth}{Numeric. Width of the jobs panel}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

