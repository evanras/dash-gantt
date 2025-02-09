/**
 * @fileoverview TimelineLine component renders time series data as a line chart
 * within the Gantt timeline. It supports gradients and configurable styling.
 */

// internal/GanttTimeline/TimelineLine.js
import React from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, YAxis, ResponsiveContainer } from 'recharts';

/**
 * TimelineLine renders a line chart representation of time series data.
 * It includes gradient fills and is bounded by the row height.
 * 
 * @component
 * @param {Object} props
 * @param {Array<Object>} props.data - Array of data points with date and value
 * @param {string} props.color - Color code for the line and gradient
 * @param {number} props.position - Left position as percentage of timeline width
 * @param {number} props.width - Width as percentage of timeline width
 */
const TimelineLine = ({
    data,
    color,
    position,
    width
}) => {
    return (
        <div 
            className="dash-gantt-line-chart"
            style={{
                left: `${position}%`,
                width: `${width}%`
            }}
        >
            <ResponsiveContainer width="100%" height={40}>
                <LineChart data={data}>
                    <defs>
                        <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                            <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
                        </linearGradient>
                    </defs>
                    <Line 
                        type="monotone"
                        dataKey="value"
                        stroke={color}
                        fill={`url(#gradient-${color.replace('#', '')})`}
                        dot={false}
                        isAnimationActive={false}
                    />
                    <YAxis domain={[0, 100]} hide />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

TimelineLine.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
        value: PropTypes.number
    })).isRequired,
    color: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
};

export default TimelineLine;