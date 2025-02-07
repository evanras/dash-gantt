% Auto-generated: do not edit by hand
\name{timelineLine}

\alias{timelineLine}

\title{TimelineLine component}

\description{
TimelineLine renders a line chart representation of time series data. It includes gradient fills and is bounded by the row height.  @component @param {Object} props @param {Array<Object>} props.data - Array of data points with date and value @param {string} props.color - Color code for the line and gradient @param {number} props.position - Left position as percentage of timeline width @param {number} props.width - Width as percentage of timeline width
}

\usage{
timelineLine(color=NULL, data=NULL, position=NULL, width=NULL)
}

\arguments{
\item{color}{Character. }

\item{data}{List of lists containing elements 'date', 'value'.
those elements have the following types:
  - date (character; optional)
  - value (numeric; optional)s. }

\item{position}{Numeric. }

\item{width}{Numeric. }
}

\value{named list of JSON elements corresponding to React.js properties and their values}

