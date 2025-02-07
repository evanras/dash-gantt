/**
 * @fileoverview TimelineBar component renders individual task bars in the Gantt chart
 * with configurable positioning, colors, and tooltips.
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
const TimelineBar = ({
    item,
    position,
    width,
    color,
    label,
    tooltipContent
}) => {
    console.log(width)
    return (
        <div
            className="dash-gantt-task-bar"
            style={{
                left: `${position}%`,
                width: `${width}%`,
                backgroundColor: color,
            }}
            title={tooltipContent}
        >
            <span className="dash-gantt-task-label">{label}</span>
        </div>
    );
};

TimelineBar.propTypes = {
    item: PropTypes.object.isRequired,
    position: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    label: PropTypes.string,
    tooltipContent: PropTypes.string
};

export default TimelineBar;