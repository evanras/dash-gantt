% Auto-generated: do not edit by hand
\name{timelineBar}

\alias{timelineBar}

\title{TimelineBar component}

\description{
TimelineBar renders a single task bar within the Gantt chart timeline. It handles the visual representation of a task with a defined start and end time.  @component @param {Object} props @param {Object} props.item - The task data object @param {number} props.position - Left position as percentage of timeline width @param {number} props.width - Width as percentage of timeline width @param {string} props.color - Color code for the task bar @param {string} [props.label] - Optional text to display inside the bar @param {string} [props.tooltipContent] - Content to show in tooltip on hover
}

\usage{
timelineBar(color=NULL, item=NULL, label=NULL, position=NULL,
tooltipContent=NULL, width=NULL)
}

\arguments{
\item{color}{Character. }

\item{item}{Named list. }

\item{label}{Character. }

\item{position}{Numeric. }

\item{tooltipContent}{Character. }

\item{width}{Numeric. }
}

\value{named list of JSON elements corresponding to React.js properties and their values}

