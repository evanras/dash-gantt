/**
 * @fileoverview DashGantt is the main component that creates an interactive Gantt chart
 * supporting both bar and line chart visualizations, hierarchical data, and
 * configurable styling.
 */

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import HeaderRow from './internal/GanttHeader/HeaderRow';
import TimelineContent from './internal/GanttTimeline/TimelineContent';
import './DashGantt.css';

/**
 * DashGantt is a React component that creates an interactive Gantt chart.
 * It supports hierarchical data, timeline visualization, and both bar and line
 * chart representations. Features include horizontal scrolling, expandable rows,
 * and configurable styling.
 * 
 * @component
 * @param {Object} props
 * @param {string} [props.id] - Component identifier for Dash callbacks
 * @param {Array<Object>} props.data - Hierarchical data structure for the Gantt chart
 * @param {string} [props.title="Jobs"] - Title displayed in the left column
 * @param {Date|string} props.startDate - Start date for the timeline
 * @param {Date|string} props.endDate - End date for the timeline
 * @param {Date|string} [props.currentTime] - Current time for timeline indicator
 * @param {Object} props.timeScale - Configuration for timeline intervals
 * @param {number} [props.columnWidth=100] - Width of timeline columns in pixels
 * @param {string|number} [props.maxHeight='80vh'] - Maximum height of the component
 * @param {Object} [props.colorMapping] - Configuration for mapping data values to colors
 * @param {Array<string>} [props.tooltipFields] - Fields to display in tooltips
 * @param {Object} [props.styles] - Custom styles for component parts
 * @param {Object} [props.className] - Custom CSS classes
 * @param {Function} [props.setProps] - Dash callback property
 */
const DashGantt = ({
    id,
    data,
    title = "Jobs",
    startDate,
    endDate,
    currentTime,
    timeScale,
    columnWidth = 100,
    maxHeight = '80vh',
    colorMapping,
    tooltipFields,
    styles = {},
    className = {},
    setProps
}) => {
    const [expandedRows, setExpandedRows] = useState({});
    const [scrollLeft, setScrollLeft] = useState(0);
    const [currentTimePosition, setCurrentTimePosition] = useState(0);
    const [tooltip, setTooltip] = useState({ content: '', visible: false, x: 0, y: 0 });
    const timelineRef = useRef(null);
    const tooltipRef = useRef(null);

    useEffect(() => {
        if (currentTime) {
            const position = calculatePosition(currentTime);
            setCurrentTimePosition(position);
        }
    }, [currentTime]);

    /**
     * Handles horizontal scrolling of the timeline view.
     * Updates the scrollLeft state to maintain header synchronization.
     * 
     * @param {Event} e - Scroll event object
     */
    const handleTimelineScroll = (e) => {
        setScrollLeft(e.target.scrollLeft);
    };

    /**
     * Toggles the expanded/collapsed state of a hierarchical row.
     * 
     * @param {string|number} id - Unique identifier of the row
     */
    const toggleRow = (id) => {
        setExpandedRows(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    /**
     * Calculates the horizontal position percentage for a given date.
     * 
     * @param {Date|string} date - Date to calculate position for
     * @returns {number} Position as percentage of timeline width
     */
    const calculatePosition = (date) => {
        const start = moment(startDate);
        const end = moment(endDate);
        const current = moment(date);
        const totalDuration = end.diff(start, 'minutes');
        const currentDuration = current.diff(start, 'minutes');
        return (currentDuration / totalDuration) * 100;
    };

    /**
     * Calculates the width percentage for a task's duration.
     * 
     * @param {Date|string} startDate - Task start date
     * @param {Date|string} endDate - Task end date
     * @returns {number} Width as percentage of timeline width
     */
    const calculateWidth = (startDate, endDate) => {
        const start = moment(startDate);
        const end = moment(endDate);
        const totalDuration = moment(endDate).diff(moment(startDate), 'minutes');
        const taskDuration = end.diff(start, 'minutes');
        return (taskDuration / totalDuration) * 100;
    };

    /**
     * Gets the color for a task based on the colorMapping configuration.
     * 
     * @param {Object} item - Task data object
     * @returns {string} Color value (hex code)
     */
    const getItemColor = (item) => {
        if (!colorMapping) return '#666';
        return colorMapping.map[item[colorMapping.key]] || '#666';
    };

    /**
     * Generates tooltip content for a task by combining specified fields.
     * 
     * @param {Object} item - Task data object
     * @returns {string} Formatted tooltip content
     */
    const generateTooltip = (item) => {
        if (!tooltipFields) return item.name;
        return tooltipFields
            .map(field => `${field}: ${item[field]}`)
            .join('\n');
    };

    /**
     * Handles showing the tooltip at the mouse position
     * @param {Event} e - Mouse event
     * @param {string} content - Tooltip content
     */
    const handleShowTooltip = (e, content) => {
        // Position tooltip near cursor but slightly offset
        const x = e.clientX + 10;
        const y = e.clientY + 10;
        setTooltip({ content, visible: true, x, y });
    };

    /**
     * Handles hiding the tooltip
     */
    const handleHideTooltip = () => {
        setTooltip(prev => ({ ...prev, visible: false }));
    };

    /**
     * Renders a job title with appropriate indentation and controls.
     * Includes caret for expandable items and optional icons.
     * 
     * @param {Object} item - Job data item
     * @param {number} level - Hierarchy level for indentation
     * @returns {JSX.Element} Rendered job title component
     */
    const renderJobTitle = (item, level) => (
        <div className="dash-gantt-job-title">
            <div 
                className="dash-gantt-job-content"
                data-level={level}
            >
                {item.children && (
                    <button
                        onClick={() => toggleRow(item.id)}
                        className="dash-gantt-caret"
                        aria-label={expandedRows[item.id] ? "Collapse" : "Expand"}
                    >
                        {expandedRows[item.id] ? '▼' : '►'}
                    </button>
                )}
                {item.icon && (
                    <img 
                        src={item.icon} 
                        alt="" 
                        className="dash-gantt-job-icon"
                    />
                )}
                <span className="dash-gantt-job-name">{item.name}</span>
            </div>
        </div>
    );

    /**
     * Recursively renders the hierarchical job list.
     * 
     * @param {Array<Object>} items - Array of job items
     * @param {number} level - Current hierarchy level
     * @returns {JSX.Element} Rendered job list
     */
    const renderHierarchicalData = (items, level = 0) => {
        return items.map((item) => (
            <React.Fragment key={item.id}>
                <div className="dash-gantt-job-row">
                    {renderJobTitle(item, level)}
                </div>
                {item.children && expandedRows[item.id] && 
                    renderHierarchicalData(item.children, level + 1)}
            </React.Fragment>
        ));
    };

    /**
     * Renders the current time indicator line
     * @returns {JSX.Element|null} Current time indicator or null if not specified
     */
    const renderCurrentTimeLine = () => {
        if (!currentTime) return null;
        return (
            <div 
                className="dash-gantt-current-time"
                style={{ left: `${currentTimePosition}%` }}
            />
        );
    };

    // Calculate total width based on time intervals
    const intervals = (() => {
        const start = moment(startDate);
        const end = moment(endDate);
        const totalDuration = end.diff(start, timeScale.unit);
        const numberOfIntervals = Math.ceil(totalDuration / timeScale.value);
        return Array(numberOfIntervals).fill(null);
    })();

    const totalWidth = intervals.length * columnWidth;

    return (
        <div 
            id={id} 
            className={`dash-gantt ${className?.container || ''}`}
            style={{ maxHeight, ...(styles?.container || {}) }}
        >
            <HeaderRow
                title={title}
                startDate={startDate}
                endDate={endDate}
                timeScale={timeScale}
                columnWidth={columnWidth}
                headerHeight={48}
                scrollLeft={scrollLeft}
            />
            
            <div className="dash-gantt-content">
                {/* Fixed left column with job titles */}
                <div className="dash-gantt-jobs">
                    {renderHierarchicalData(data)}
                </div>

                {/* Scrollable timeline section */}
                <div className="dash-gantt-timeline">
                    <div 
                        className="dash-gantt-timeline-scroll"
                        onScroll={handleTimelineScroll}
                        ref={timelineRef}
                    >
                        <div 
                            className="dash-gantt-timeline-wrapper"
                            style={{ width: totalWidth }}
                        >
                            {/* Removed Grid component */}
                            {renderCurrentTimeLine()}
                            <TimelineContent
                                items={data}
                                calculatePosition={calculatePosition}
                                calculateWidth={calculateWidth}
                                getItemColor={getItemColor}
                                generateTooltip={generateTooltip}
                                expandedRows={expandedRows}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* Tooltip */}
            <div 
                ref={tooltipRef}
                className={`dash-gantt-tooltip ${tooltip.visible ? 'visible' : ''}`}
                style={{
                    left: `${tooltip.x}px`,
                    top: `${tooltip.y}px`
                }}
            >
                {tooltip.content}
            </div>
        </div>
    );
};

DashGantt.propTypes = {
    /** Optional ID used to identify this component in Dash callbacks */
    id: PropTypes.string,

    /** Required data structure defining the Gantt chart */
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        icon: PropTypes.string,
        // For bar charts
        start: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
        end: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
        // For line charts
        displayType: PropTypes.oneOf(['bar', 'line']),
        dates: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])),
        values: PropTypes.arrayOf(PropTypes.number),
        color: PropTypes.string,
        // Common fields
        children: PropTypes.array,
        label: PropTypes.string,
        status: PropTypes.string
    })).isRequired,

    /** Optional title displayed in the top left corner */
    title: PropTypes.string,

    /** Required start date for the timeline */
    startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,

    /** Required end date for the timeline */
    endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,

    /** Optional current time to show indicator */
    currentTime: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),

    /** Required configuration for timeline scale and formatting */
    timeScale: PropTypes.shape({
        unit: PropTypes.oneOf(['minutes', 'hours', 'days', 'weeks', 'months']).isRequired,
        value: PropTypes.number.isRequired,
        format: PropTypes.string.isRequired,
    }).isRequired,

    /** Optional width for timeline columns */
    columnWidth: PropTypes.number,

    /** Optional maximum height of the component */
    maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /** Optional configuration for color mapping */
    colorMapping: PropTypes.shape({
        key: PropTypes.string.isRequired,
        map: PropTypes.objectOf(PropTypes.string).isRequired,
    }),

    /** Optional fields to display in tooltips */
    tooltipFields: PropTypes.arrayOf(PropTypes.string),

    /** Optional custom styles for component parts */
    styles: PropTypes.shape({
        container: PropTypes.object,
        header: PropTypes.object,
        jobs: PropTypes.object,
        timeline: PropTypes.object,
        taskBar: PropTypes.object,
        timeCell: PropTypes.object,
        caretButton: PropTypes.object
    }),

    /** Optional custom CSS classes */
    className: PropTypes.shape({
        container: PropTypes.string,
        header: PropTypes.string,
        jobs: PropTypes.string,
        timeline: PropTypes.string,
        taskBar: PropTypes.string,
        timeCell: PropTypes.string,
        caretButton: PropTypes.string
    }),

    /** Optional Dash callback property */
    setProps: PropTypes.func
};

DashGantt.defaultProps = {
    title: "Jobs",
    columnWidth: 100,
    maxHeight: '80vh',
    timeScale: {
        unit: 'hours',
        value: 1,
        format: 'HH:mm'
    },
    tooltipFields: ['name', 'status'],
    colorMapping: {
        key: 'status',
        map: {
            'completed': '#4CAF50',
            'in_progress': '#FFA726',
            'pending': '#90CAF9'
        }
    }
};

export default DashGantt;