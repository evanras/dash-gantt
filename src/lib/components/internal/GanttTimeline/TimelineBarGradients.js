/**
 * @fileoverview TimelineBarGradientRight component renders individual task bars in the Gantt chart
 * with configurable positioning, colors, and tooltips. The key distinction here is that both 
 * sides of the bar will fade into the background color.
 */

// internal/GanttTimeline/TimelineBar.js
import React from 'react';
import PropTypes from 'prop-types';

/**
 * TimelineBar renders a single task bar within the Gantt chart timeline.
 * It handles the visual representation of a task with a defined start and end time.
 * 
 * @component
 * @param {Object} props
 * @param {Object} props.item - The task data object
 * @param {number} props.position - Left position as percentage of timeline width
 * @param {number} props.width - Width as percentage of timeline width
 * @param {string} props.color - Color code for the task bar
 * @param {string} [props.label] - Optional text to display inside the bar
 * @param {string} [props.tooltipContent] - Content to show in tooltip on hover
 */
const TimelineBarGradient = ({
    item,
    position,
    width,
    color,
    label,
    tooltipContent
}) => {
    return (
        <div
            className="dash-gantt-task-bar"
            style={{
                left: `${position}%`,
                width: `${width}%`,
                background: `linear-gradient(to right, transparent, ${color} 15%, ${color} 85%, transparent)`,
            }}
            title={tooltipContent}
        >
            <span className="dash-gantt-task-label">{label}</span>
        </div>
    );
};

TimelineBarGradient.propTypes = {
    item: PropTypes.object.isRequired,
    position: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    label: PropTypes.string,
    tooltipContent: PropTypes.string
};

export default TimelineBarGradient;