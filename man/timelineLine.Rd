% Auto-generated: do not edit by hand
\name{timelineLine}

\alias{timelineLine}

\title{TimelineLine component}

\description{
TimelineLine renders a line chart representation of time series data. Supports gradient fills and configurable styling options.  @component @example // Basic usage with solid fill <TimelineLine   data={[     { date: '2024-02-01', value: 75 },     { date: '2024-02-02', value: 80 },     { date: '2024-02-03', value: 85 }   ]}   color="#4CAF50"   position={20}   width={60}   fill={{ enabled: true, opacity: 0.3 }} />  @example // Usage with gradient fill <TimelineLine   data={[...]}   color="#4CAF50"   position={20}   width={60}   fill={{     enabled: true,     gradient: {       startOpacity: 0.4,       endOpacity: 0.1     }   }} />
}

\usage{
timelineLine(color=NULL, data=NULL, fill=NULL, position=NULL, width=NULL)
}

\arguments{
\item{color}{Character. Primary color for the line. Should be a valid CSS color string.
@type {string}}

\item{data}{List of lists containing elements 'date', 'value'.
those elements have the following types:
  - date (character; optional)
  - value (numeric; optional)s. Array of data points for the line chart. Each point must have a date and value.
@type {Array<{date: (string|Date), value: number}>}}

\item{fill}{Lists containing elements 'enabled', 'color', 'opacity', 'gradient'.
those elements have the following types:
  - enabled (logical; optional)
  - color (character; optional)
  - opacity (numeric; optional)
  - gradient (optional): . gradient has the following type: lists containing elements 'startopacity', 'endopacity'.
those elements have the following types:
  - startopacity (numeric; optional)
  - endopacity (numeric; optional). Configuration object for fill styling.
@type {Object}
@property {boolean} [enabled=false] - Whether to enable fill
@property {string} [color] - Fill color (defaults to line color)
@property {number} [opacity=0.3] - Fill opacity (0-1)
@property {Object} [gradient] - Gradient configuration
@property {number} [gradient.startOpacity=0.3] - Start opacity for gradient
@property {number} [gradient.endOpacity=0.1] - End opacity for gradient}

\item{position}{Numeric. Left position of the chart as a percentage of timeline width.
@type {number}}

\item{width}{Numeric. Width of the chart as a percentage of timeline width.
@type {number}}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

