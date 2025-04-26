/**
 * @fileoverview TimelineContent is a core component of the DashGantt system that manages
 * the rendering of all timeline items. It handles both bar and line chart visualizations,
 * supports hierarchical data structures, and manages the recursive rendering of nested items.
 * This component acts as the main coordinator between the data structure and the individual
 * visualization components.
 *
 * @module TimelineContent
 * @requires react
 * @requires prop-types
 * @requires ./TimelineBar
 * @requires ./TimelineLine
 */

import React from 'react';
import PropTypes from 'prop-types';
import TimelineBar from './TimelineBar';
import TimelineLine from './TimelineLine';
import TimelineBarGradient from './TimelineBarGradients';
import TimelineBarGradientRight from './TimelineBarGradientRight';

/**
 * Safely maps line chart data with validation
 * 
 * @private
 * @param {Object} item - The timeline item containing dates and values arrays
 * @returns {Array<Object>|null} Mapped data array or null if validation fails
 * 
 * @example
 * const mappedData = mapLineData({
 *   id: 'line1',
 *   dates: ['2024-01-01', '2024-01-02'],
 *   values: [75, 80]
 * });
 */
const mapLineData = (item) => {
    if (!item || !Array.isArray(item.dates) || !Array.isArray(item.values)) {
        console.warn(`Invalid line data for item ${item?.id}: Missing dates or values arrays`);
        return null;
    }

    if (item.dates.length !== item.values.length) {
        console.warn(`Invalid line data for item ${item.id}: Mismatched dates and values lengths`);
        return null;
    }

    return item.dates.map((date, i) => ({
        date,
        value: item.values[i]
    }));
};

/**
 * TimelineContent manages the rendering of all timeline items and their hierarchy.
 * It determines whether to render bars or line charts based on item type and
 * handles the recursive rendering of child items.
 *
 * @component
 * @example
 * // Basic usage with mixed item types
 * const items = [{
 *   id: '1',
 *   displayType: 'bar',
 *   start: '2024-02-01T10:00:00',
 *   end: '2024-02-01T12:00:00',
 *   label: 'Task 1'
 * }, {
 *   id: '2',
 *   displayType: 'line',
 *   dates: ['2024-02-01T10:00:00', '2024-02-01T11:00:00'],
 *   values: [75, 85],
 *   children: [{
 *     id: '2.1',
 *     displayType: 'bar',
 *     start: '2024-02-01T10:30:00',
 *     end: '2024-02-01T11:30:00'
 *   }]
 * }];
 * 
 * <TimelineContent
 *   items={items}
 *   calculatePosition={(date) => {...}}
 *   calculateWidth={(start, end) => {...}}
 *   getItemColor={(item) => {...}}
 *   generateTooltip={(item) => {...}}
 *   expandedRows={{}}
 * />
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
    if (!Array.isArray(items)) {
        console.warn('TimelineContent: items prop must be an array');
        return null;
    }

    return items.map((item) => {
        if (!item || !item.id) {
            console.warn('TimelineContent: each item must have an id');
            return null;
        }

        return (
            <React.Fragment key={item.id}>
                <div className="dash-gantt-timeline-row">
                    {item.displayType === 'line' ? (
                        (() => {
                            const mappedData = mapLineData(item);
                            if (!mappedData) return null;

                            return (
                                <TimelineLine
                                    data={mappedData}
                                    color={item.color || getItemColor(item)}
                                    position={calculatePosition(item.dates[0])}
                                    width={calculateWidth(item.dates[0], item.dates[item.dates.length - 1])}
                                    fill={item.fill}
                                />
                            );
                        })()
                    ) : item.displayType === 'gradient-right' ? (
                        item.start && item.end && (
                            <TimelineBarGradientRight
                                item={item}
                                position={calculatePosition(item.start)}
                                width={calculateWidth(item.start, item.end)}
                                color={getItemColor(item)}
                                label={item.label}
                                tooltipContent={generateTooltip(item)}
                            />
                        )
                    ) : item.displayType === 'gradient' ? (
                        item.start && item.end && (
                            <TimelineBarGradient
                                item={item}
                                position={calculatePosition(item.start)}
                                width={calculateWidth(item.start, item.end)}
                                color={getItemColor(item)}
                                label={item.label}
                                tooltipContent={generateTooltip(item)}
                            />
                        )
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
        );
    });
};

/**
 * PropTypes for the TimelineContent component.
 * @typedef {Object} TimelineContentProps
 */
TimelineContent.propTypes = {
    /**
     * Array of timeline items to render. Each item can be either a bar or line chart type
     * and may contain children for hierarchical display.
     * @type {Array<Object>}
     * @property {string} id - Unique identifier for the item
     * @property {'bar'|'line'} [displayType='bar'] - Type of visualization to use
     * @property {string} [start] - Start date/time for bar items
     * @property {string} [end] - End date/time for bar items
     * @property {Array<string>} [dates] - Array of dates for line chart items
     * @property {Array<number>} [values] - Array of values for line chart items
     * @property {string} [label] - Display label for the item
     * @property {Array<Object>} [children] - Nested timeline items
     */
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        displayType: PropTypes.oneOf(['bar', 'line']),
        start: PropTypes.string,
        end: PropTypes.string,
        dates: PropTypes.arrayOf(PropTypes.string),
        values: PropTypes.arrayOf(PropTypes.number),
        label: PropTypes.string,
        children: PropTypes.array
    })).isRequired,

    /**
     * Function to calculate the left position of an item as a percentage.
     * @type {Function}
     * @param {string} date - The date to calculate position for
     * @returns {number} Position as percentage of timeline width
     */
    calculatePosition: PropTypes.func.isRequired,

    /**
     * Function to calculate the width of an item as a percentage.
     * @type {Function}
     * @param {string} startDate - Start date of the item
     * @param {string} endDate - End date of the item
     * @returns {number} Width as percentage of timeline width
     * 
     */
    calculateWidth: PropTypes.func.isRequired,

    /**
     * Function to determine the color for an item.
     * @type {Function}
     * @param {Object} item - The timeline item
     * @returns {string} Color value (hex code or valid CSS color)
     */
    getItemColor: PropTypes.func.isRequired,

    /**
     * Function to generate tooltip content for an item.
     * @type {Function}
     * @param {Object} item - The timeline item
     * @returns {string} Formatted tooltip content
     */
    generateTooltip: PropTypes.func.isRequired,

    /**
     * Object mapping item IDs to their expanded state for hierarchical display.
     * Maps the ID of an item to a boolean indicating if its children should be shown.
     * @type {Object.<string, boolean>}
     */
    expandedRows: PropTypes.object.isRequired,

    /**
     * Current depth level in the hierarchy, used for indentation.
     * @type {number}
     * @default 0
     */
    level: PropTypes.number
};

/**
 * Default props for the TimelineContent component.
 * @type {Object}
 */
TimelineContent.defaultProps = {
    level: 0
};

/**
 * @component-notes
 * 
 * Key Features:
 * - Supports both bar and line chart visualizations
 * - Handles hierarchical data with recursive rendering
 * - Manages expanded/collapsed states for nested items
 * - Coordinates positioning and styling across different item types
 * - Provides robust data validation and error handling
 * 
 * Implementation Considerations:
 * - Uses React.Fragment to avoid unnecessary DOM nesting
 * - Conditionally renders different visualization components based on displayType
 * - Maintains consistent sizing and spacing through CSS classes
 * - Preserves hierarchy information through level prop
 * - Implements safe data mapping with validation
 * 
 * Integration Notes:
 * - Works in conjunction with DashGantt's main component
 * - Relies on parent component for position calculations
 * - Expects consistent data structure for items
 * - Handles both leaf nodes and parent nodes in the hierarchy
 * 
 * Error Handling:
 * - Validates input arrays and required properties
 * - Provides warning messages for invalid data
 * - Gracefully handles missing or malformed data
 * - Ensures safe rendering with null checks
 * 
 * Data Structure Requirements:
 * 1. Each item must have a unique 'id'
 * 2. Line chart items need matching 'dates' and 'values' arrays
 * 3. Bar chart items require valid 'start' and 'end' dates
 * 4. Optional 'children' array for nested items
 * 
 * Performance Optimization:
 * - Uses functional updates for state changes
 * - Implements conditional rendering
 * - Avoids unnecessary calculations
 * - Maintains flat structure for better React reconciliation
 */

export default TimelineContent;