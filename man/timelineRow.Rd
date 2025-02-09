% Auto-generated: do not edit by hand
\name{timelineRow}

\alias{timelineRow}

\title{TimelineRow component}

\description{
TimelineRow determines whether to render a bar or line chart based on the task type and data
}

\usage{
timelineRow(getColor=NULL, getWidth=NULL, getXPosition=NULL,
rowHeight=NULL, task=NULL, yPosition=NULL)
}

\arguments{
\item{getColor}{Function to get color for a task}

\item{getWidth}{Function to calculate width between two dates}

\item{getXPosition}{Function to calculate x position from a date}

\item{rowHeight}{Numeric. Height of each row}

\item{task}{Lists containing elements 'id', 'name', 'displaytype'.
those elements have the following types:
  - id (character | numeric; required)
  - name (character; required)
  - displaytype (a value equal to: 'bar', 'line'; optional). Task data object}

\item{yPosition}{Numeric. Y position of this row}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

