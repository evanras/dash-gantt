/**
 * @fileoverview TimelineLine component renders time series data as a line chart within
 * the Gantt timeline. Supports customizable styling including gradient fills, opacity
 * settings, and interactive features. This component is designed to work within the
 * DashGantt chart system but can be used independently for line chart visualization.
 *
 * @module TimelineLine
 * @requires react
 * @requires prop-types
 * @requires recharts
 */

import React from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, YAxis, ResponsiveContainer, Area, AreaChart } from 'recharts';

/**
 * TimelineLine renders a line chart representation of time series data.
 * Supports gradient fills and configurable styling options.
 *
 * @component
 * @example
 * // Basic usage with solid fill
 * <TimelineLine
 *   data={[
 *     { date: '2024-02-01', value: 75 },
 *     { date: '2024-02-02', value: 80 },
 *     { date: '2024-02-03', value: 85 }
 *   ]}
 *   color="#4CAF50"
 *   position={20}
 *   width={60}
 *   fill={{ enabled: true, opacity: 0.3 }}
 * />
 *
 * @example
 * // Usage with gradient fill
 * <TimelineLine
 *   data={[...]}
 *   color="#4CAF50"
 *   position={20}
 *   width={60}
 *   fill={{
 *     enabled: true,
 *     gradient: {
 *       startOpacity: 0.4,
 *       endOpacity: 0.1
 *     }
 *   }}
 * />
 */
const TimelineLine = ({
    data,
    color,
    position,
    width,
    fill = {}
}) => {
    // Destructure fill options with defaults
    console.log('FILL: ', fill)
    const {
        enabled: fillEnabled = false,
        color: fillColor = color,
        opacity = 0.3,
        gradient = {
            startOpacity: 0.3,
            endOpacity: 0.1
        }
    } = fill;
    console.log("Second FILL: ", fill)

    // Generate unique gradient ID to prevent conflicts when multiple charts are present
    const gradientId = `gradient-${color.replace('#', '')}-${position}`;
    console.log("GRADIENT_ID", gradientId)

    return (
        <div 
            className="dash-gantt-line-chart"
            style={{
                left: `${position}%`,
                width: `${width}%`
            }}
        >
            <ResponsiveContainer width="100%" height={40}>
                <AreaChart data={data}>
                    {fillEnabled && (
                        <defs>
                            {gradient ? (
                                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                    <stop 
                                        offset="5%" 
                                        stopColor={fillColor} 
                                        stopOpacity={gradient.startOpacity}
                                    />
                                    <stop 
                                        offset="95%" 
                                        stopColor={fillColor} 
                                        stopOpacity={gradient.endOpacity}
                                    />
                                </linearGradient>
                            ) : null}
                        </defs>
                    )}
                    <YAxis domain={[0, 100]} hide />
                    <Area 
                        type="monotone"
                        dataKey="value"
                        stroke={false}
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill={fillEnabled ? (gradient ? `url(#${gradientId})` : fillColor) : 'none'}
                        isAnimationActive={false}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

/**
 * PropTypes for the TimelineLine component.
 * @typedef {Object} TimelineLineProps
 */
TimelineLine.propTypes = {
    /**
     * Array of data points for the line chart. Each point must have a date and value.
     * @type {Array<{date: (string|Date), value: number}>}
     */
    data: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
        value: PropTypes.number
    })).isRequired,

    /**
     * Primary color for the line. Should be a valid CSS color string.
     * @type {string}
     */
    color: PropTypes.string.isRequired,

    /**
     * Left position of the chart as a percentage of timeline width.
     * @type {number}
     */
    position: PropTypes.number.isRequired,

    /**
     * Width of the chart as a percentage of timeline width.
     * @type {number}
     */
    width: PropTypes.number.isRequired,

    /**
     * Configuration object for fill styling.
     * @type {Object}
     * @property {boolean} [enabled=false] - Whether to enable fill
     * @property {string} [color] - Fill color (defaults to line color)
     * @property {number} [opacity=0.3] - Fill opacity (0-1)
     * @property {Object} [gradient] - Gradient configuration
     * @property {number} [gradient.startOpacity=0.3] - Start opacity for gradient
     * @property {number} [gradient.endOpacity=0.1] - End opacity for gradient
     */
    fill: PropTypes.shape({
        enabled: PropTypes.bool,
        color: PropTypes.string,
        opacity: PropTypes.number,
        gradient: PropTypes.shape({
            startOpacity: PropTypes.number,
            endOpacity: PropTypes.number
        })
    })
};

/**
 * Default props for the TimelineLine component.
 * @type {Object}
 */
TimelineLine.defaultProps = {
    fill: {
        enabled: false,
        opacity: 0.3,
        gradient: {
            startOpacity: 0.3,
            endOpacity: 0.1
        }
    }
};

/**
 * @component-notes
 * 
 * Key Features:
 * - Renders line charts with optional gradient or solid fills
 * - Supports customizable colors and opacities
 * - Automatically scales to container width
 * - Prevents gradient ID conflicts with unique identifiers
 * 
 * Implementation Considerations:
 * - Uses recharts for rendering
 * - Disables animation for performance
 * - Hides dots for cleaner appearance
 * - Uses ResponsiveContainer for automatic sizing
 * 
 * Integration Notes:
 * - Works within DashGantt's timeline grid
 * - Expects percentage-based positioning
 * - Maintains consistent height for timeline alignment
 * - Supports both solid and gradient fills
 */

export default TimelineLine;