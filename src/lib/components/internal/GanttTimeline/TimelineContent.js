/**
 * @fileoverview TimelineContent handles the rendering of all timeline items,
 * including both bars and line charts, with support for hierarchical data.
 */

// internal/GanttTimeline/TimelineContent.js
import React from 'react';
import PropTypes from 'prop-types';
import TimelineBar from './TimelineBar';
import TimelineLine from './TimelineLine';

/**
 * TimelineContent manages the rendering of all timeline items and their hierarchy.
 * It determines whether to render bars or line charts based on item type and
 * handles the recursive rendering of child items.
 * 
 * @component
 * @param {Object} props
 * @param {Array<Object>} props.items - Array of timeline items to render
 * @param {Function} props.calculatePosition - Function to calculate item's left position
 * @param {Function} props.calculateWidth - Function to calculate item's width
 * @param {Function} props.getItemColor - Function to determine item's color
 * @param {Function} props.generateTooltip - Function to generate tooltip content
 * @param {Object} props.expandedRows - Map of row IDs to their expanded state
 * @param {number} [props.level=0] - Current hierarchy level for indentation
 */
const TimelineContent = ({
    items,
    calculatePosition,
    calculateWidth,
    getItemColor,
    generateTooltip,
    expandedRows,
    level = 0
}) => {
    return items.map((item) => (
        <React.Fragment key={item.id}>
            <div className="dash-gantt-timeline-row">
                {item.displayType === 'line' ? (
                    <TimelineLine
                        data={item.dates.map((date, i) => ({
                            date,
                            value: item.values[i]
                        }))}
                        color={item.color || getItemColor(item)}
                        position={calculatePosition(item.dates[0])}
                        width={calculateWidth(item.dates[0], item.dates[item.dates.length - 1])}
                    />
                ) : (
                    item.start && item.end && (
                        <TimelineBar
                            item={item}
                            position={calculatePosition(item.start)}
                            width={calculateWidth(item.start, item.end)}
                            color={getItemColor(item)}
                            label={item.label}
                            tooltipContent={generateTooltip(item)}
                        />
                    )
                )}
            </div>
            {item.children && expandedRows[item.id] && (
                <TimelineContent
                    items={item.children}
                    calculatePosition={calculatePosition}
                    calculateWidth={calculateWidth}
                    getItemColor={getItemColor}
                    generateTooltip={generateTooltip}
                    expandedRows={expandedRows}
                    level={level + 1}
                />
            )}
        </React.Fragment>
    ));
};

TimelineContent.propTypes = {
    items: PropTypes.array.isRequired,
    calculatePosition: PropTypes.func.isRequired,
    calculateWidth: PropTypes.func.isRequired,
    getItemColor: PropTypes.func.isRequired,
    generateTooltip: PropTypes.func.isRequired,
    expandedRows: PropTypes.object.isRequired,
    level: PropTypes.number
};

export default TimelineContent;