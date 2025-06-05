/**
 * @fileoverview TimelineBarGradientRight component renders individual task bars in the Gantt chart
 * with configurable positioning, colors, and custom tooltips. The key distinction here is that the right 
 * side of the bar will fade into the background color.
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * TimelineBarGradientRight renders a single task bar within the Gantt chart timeline.
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
 * @param {Function} [props.onShowTooltip] - Handler for showing tooltip
 * @param {Function} [props.onHideTooltip] - Handler for hiding tooltip
 */
const TimelineBarGradientRight = ({
    item,
    position,
    width,
    color,
    label,
    tooltipContent,
    onShowTooltip,
    onHideTooltip
}) => {
    const handleMouseEnter = (e) => {
        if (onShowTooltip && tooltipContent) {
            onShowTooltip(e, tooltipContent);
        }
    };

    const handleMouseLeave = (e) => {
        if (onHideTooltip) {
            onHideTooltip(e);
        }
    };

    return (
        <div
            className="dash-gantt-task-bar"
            style={{
                left: `${position}%`,
                width: `${width}%`,
                background: `linear-gradient(to right, ${color} 90%, transparent)`,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <span className="dash-gantt-task-label">{label}</span>
        </div>
    );
};

TimelineBarGradientRight.propTypes = {
    item: PropTypes.object.isRequired,
    position: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    label: PropTypes.string,
    tooltipContent: PropTypes.string,
    onShowTooltip: PropTypes.func,
    onHideTooltip: PropTypes.func
};

export default TimelineBarGradientRight;