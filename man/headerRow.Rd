% Auto-generated: do not edit by hand
\name{headerRow}

\alias{headerRow}

\title{HeaderRow component}

\description{
HeaderRow renders the timeline header with evenly spaced time intervals. Handles dynamic column widths based on available space.
}

\usage{
headerRow(endDate=NULL, headerHeight=NULL, scrollLeft=NULL,
startDate=NULL, timeScale=NULL, title=NULL)
}

\arguments{
\item{endDate}{Character. End date for the timeline}

\item{headerHeight}{Numeric. Height of the header in pixels}

\item{scrollLeft}{Numeric. Current scroll position}

\item{startDate}{Character. Start date for the timeline}

\item{timeScale}{Lists containing elements 'unit', 'value', 'format'.
those elements have the following types:
  - unit (a value equal to: 'minutes', 'hours', 'days', 'weeks', 'months'; required)
  - value (numeric; required)
  - format (character; required). Configuration for time scale display}

\item{title}{Character. Title displayed in the left column}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

