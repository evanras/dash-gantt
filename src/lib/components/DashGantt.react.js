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
 * @param {Object} [props.expandedRowsData={}] - Current expanded state of rows
 * @param {Object} [props.lastExpandedRow] - Information about the last row expanded/collapsed
 * @param {Object} [props.styles] - Custom styles for component parts
 * @param {Object} [props.classNames] - Custom CSS classes
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
    classNames = {},
    expandedRowsData = {},
    setProps
}) => {
    const [expandedRows, setExpandedRows] = useState(expandedRowsData);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [currentTimePosition, setCurrentTimePosition] = useState(0);
    const [tooltip, setTooltip] = useState({ content: '', visible: false, x: 0, y: 0 });
    const [jobsPanelWidth, setJobsPanelWidth] = useState(250);
    const [isResizing, setIsResizing] = useState(false);

    const tooltipRef = useRef(null);
    const timelineRef = useRef(null);
    const jobsRef = useRef(null);
    const isScrolling = useRef(false);
    const resizeRef = useRef(null);

    // Update the expanded rows when the prop value is changed
    useEffect(() => {
        console.log('expandedRowsData prop changed:', expandedRowsData);
        setExpandedRows(expandedRowsData);
    }, [expandedRowsData]);

    // Jobs panel resize handlers
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isResizing) return;
            
            // Calculate new width, with min and max constraints
            const newWidth = Math.max(150, Math.min(800, e.clientX));
            setJobsPanelWidth(newWidth);
            
            // Prevent text selection during resize
            e.preventDefault();
        };

        const handleMouseUp = () => {
            setIsResizing(false);
            document.body.style.cursor = 'default';
        };

        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);

    const handleResizeStart = (e) => {
        setIsResizing(true);
        document.body.style.cursor = 'col-resize';
        e.preventDefault();
    };

    useEffect(() => {
        if (currentTime) {
            const position = calculatePosition(moment(currentTime));
            setCurrentTimePosition(position);
        }
    }, [currentTime]);

    const totalDuration = moment(endDate).diff(moment(startDate), timeScale.unit);

    // Function to handle synchronized scrolling
    const handleScroll = (event) => {
        if (isScrolling.current) return;
        
        try {
            isScrolling.current = true;
            const { scrollTop, scrollLeft } = event.target;
            
            // Determine which container triggered the scroll
            const isTimelineScroll = event.target === timelineRef.current?.querySelector('.dash-gantt-timeline-scroll');
            
            if (isTimelineScroll) {
                // Timeline was scrolled, sync jobs panel
                if (jobsRef.current) {
                    jobsRef.current.scrollTop = scrollTop;
                }
                setScrollLeft(scrollLeft);
            } else {
                // Jobs panel was scrolled, sync timeline
                if (timelineRef.current) {
                    const timelineScroll = timelineRef.current.querySelector('.dash-gantt-timeline-scroll');
                    if (timelineScroll) {
                        timelineScroll.scrollTop = scrollTop;
                    }
                }
            }
        } finally {
            // Use RAF to prevent scroll event spam
            requestAnimationFrame(() => {
                isScrolling.current = false;
            });
        }
    };

    // Add effect to ensure scroll positions stay synced after window resize
    useEffect(() => {
        const syncScrollPositions = () => {
            if (jobsRef.current && timelineRef.current) {
                const timelineScroll = timelineRef.current.querySelector('.dash-gantt-timeline-scroll');
                if (timelineScroll) {
                    timelineScroll.scrollTop = jobsRef.current.scrollTop;
                }
            }
        };

        window.addEventListener('resize', syncScrollPositions);
        return () => window.removeEventListener('resize', syncScrollPositions);
    }, []);

    /**
     * Toggles the expanded/collapsed state of a hierarchical row.
     * 
     * @param {string|number} id - Unique identifier of the row
     */
    const toggleRow = (id) => {
        // Create the new state
        const newExpandedRows = {
            ...expandedRows,
            [id]: !expandedRows[id]
        };
        
        // Update internal React state
        setExpandedRows(newExpandedRows);
        
        // Send data back to Dash
        if (setProps) {
            setProps({
                expandedRowsData: newExpandedRows,
                lastExpandedRow: {
                    id: id,
                    expanded: newExpandedRows[id]
                }
            });
        }
    };

    /**
     * Calculates the horizontal position percentage for a given date.
     * 
     * @param {Date|string} date - Date to calculate position for (this should be the task's start date)
     * @returns {number} Position as percentage of timeline width
     */
    const calculatePosition = (date) => {
        const taskStart = moment(startDate);
        const current = moment(date);
        const currentDuration = current.diff(taskStart, timeScale.unit);
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
        const taskStart = moment(startDate);
        const taskEnd = moment(endDate);
        const taskDuration = taskEnd.diff(taskStart, timeScale.unit);
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
     * Uses a grid layout to maintain consistent spacing regardless of caret presence.
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
                            {/* Caret container - always present for consistent spacing */}
                            <div className="dash-gantt-caret-container">
                                {item.children && (
                                    <button
                                        onClick={() => toggleRow(item.id)}
                                        className="dash-gantt-caret"
                                        aria-label={expandedRows[item.id] ? "Collapse" : "Expand"}
                                    >
                                        {expandedRows[item.id] ? '▼' : '►'}
                                    </button>
                                )}
                            </div>

                            {/* Content wrapper for job name and icon */}
                            <div className="dash-gantt-job-content-wrapper">
                                {item.icon && (
                                    item.icon.match(/\.(jpeg|jpg|gif|png|svg|webp)$/) ? (
                                        <img 
                                            src={item.icon} 
                                            alt="" 
                                            className="dash-gantt-job-icon"
                                        />
                                    ) : (
                                        <div className={`dash-gantt-job-icon ${item.icon}`}></div>
                                    )
                                )}
                                <span className="dash-gantt-job-name">{item.name}</span>
                            </div>
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
                style={{ left: `${currentTimePosition}%`, ...(styles?.currentTime || {}) }}
            />
        );
    };

    // Calculate total width based on time intervals
    const intervals = (() => {
        const numberOfIntervals = Math.ceil(totalDuration / timeScale.value);
        return Array(numberOfIntervals).fill(null);
    })();

    const totalWidth = intervals.length * columnWidth;

    return (
        <div 
            id={id} 
            className={`dash-gantt ${classNames?.container || ''}`}
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
                titleWidth={jobsPanelWidth}
                styles={styles}
            />
            
            <div className="dash-gantt-content">
                {/* Jobs panel */}
                <div 
                    ref={jobsRef}
                    className="dash-gantt-jobs"
                    onScroll={handleScroll}
                    style={{ width: jobsPanelWidth }}
                >
                    {renderHierarchicalData(data)}
                </div>

                {/* Jobs panel resize handler */}
                <div
                    ref={resizeRef}
                    className="dash-gantt-resize-handle"
                    onMouseDown={handleResizeStart}
                    style={{ left: `${jobsPanelWidth}px` }}
                />

                {/* Timeline section */}
                <div 
                    ref={timelineRef}
                    className="dash-gantt-timeline"
                >
                    <div 
                        className="dash-gantt-timeline-scroll"
                        onScroll={handleScroll}
                    >
                        <div 
                            className="dash-gantt-timeline-wrapper"
                            style={{ width: totalWidth }}
                        >
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
        // Common fields
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        icon: PropTypes.string,
        children: PropTypes.array,
        // For bar charts
        start: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
        end: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
        label: PropTypes.string,
        status: PropTypes.string,
        // For line charts
        displayType: PropTypes.oneOf(['bar', 'line']),
        dates: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])),
        values: PropTypes.arrayOf(PropTypes.number),
        color: PropTypes.string
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

    /** Current expanded state of rows, mapping row IDs to boolean expanded state */
    expandedRowsData: PropTypes.object,

    /** Information about the last row that was expanded or collapsed */
    lastExpandedRow: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        expanded: PropTypes.bool
    }),

    /** Optional custom styles for component parts */
    styles: PropTypes.shape({
        container: PropTypes.object,
        header: PropTypes.object,
        jobs: PropTypes.object,
        timeline: PropTypes.object,
        taskBar: PropTypes.object,
        timeCell: PropTypes.object,
        caretButton: PropTypes.object,
        currentTime: PropTypes.object
    }),

    /** Optional custom CSS classes */
    classNames: PropTypes.shape({
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
    expandedRowsData: {},
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