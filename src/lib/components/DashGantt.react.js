import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import './DashGantt.css';

/**
 * DashGantt is a React component that creates an interactive Gantt chart with support for
 * hierarchical data, timeline visualization, and both bar and line chart representations.
 * It supports horizontal scrolling for timeline data while maintaining a fixed left column
 * for job descriptions.
 */
export default class DashGantt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedRows: {},  // Tracks which hierarchical rows are expanded
            scrollLeft: 0,     // Tracks horizontal scroll position
            currentTimePosition: 0  // Position of the current time indicator
        };
        this.timelineRef = React.createRef();
    }

    // #region Component Lifecycle

    componentDidMount() {
        this.updateCurrentTimePosition();
    }

    componentDidUpdate(prevProps) {
        // Update current time indicator when the currentTime prop changes
        if (prevProps.currentTime !== this.props.currentTime) {
            this.updateCurrentTimePosition();
        }
    }

    // #endregion

    // #region Helper Methods

    /**
     * Calculates and updates the position of the current time indicator
     * based on the currentTime prop
     */
    updateCurrentTimePosition = () => {
        if (this.props.currentTime) {
            const position = this.calculatePosition(this.props.currentTime);
            this.setState({ currentTimePosition: position });
        }
    };

    /**
     * Handles horizontal scrolling of the timeline view
     * @param {Event} e - Scroll event
     */
    handleTimelineScroll = (e) => {
        this.setState({ scrollLeft: e.target.scrollLeft });
    };

    /**
     * Toggles the expanded/collapsed state of a hierarchical row
     * @param {string|number} id - Unique identifier of the row
     */
    toggleRow = (id) => {
        this.setState((prevState) => ({
            expandedRows: {
                ...prevState.expandedRows,
                [id]: !prevState.expandedRows[id],
            },
        }));
    };

    /**
     * Calculates the horizontal position percentage for a given date
     * @param {string|Date} date - Date to calculate position for
     * @returns {number} Position as percentage
     */
    calculatePosition = (date) => {
        const { startDate, endDate } = this.props;
        const start = moment(startDate);
        const end = moment(endDate);
        const current = moment(date);
        const totalDuration = end.diff(start, 'minutes');
        const currentDuration = current.diff(start, 'minutes');
        return (currentDuration / totalDuration) * 100;
    };

    /**
     * Calculates the width percentage for a task's duration
     * @param {string|Date} startDate - Task start date
     * @param {string|Date} endDate - Task end date
     * @returns {number} Width as percentage
     */
    calculateWidth = (startDate, endDate) => {
        const start = moment(startDate);
        const end = moment(endDate);
        const totalDuration = moment(this.props.endDate).diff(moment(this.props.startDate), 'minutes');
        const taskDuration = end.diff(start, 'minutes');
        return (taskDuration / totalDuration) * 100;
    };

    /**
     * Gets the color for a task based on the colorMapping configuration
     * @param {Object} item - Task data
     * @returns {string} Color value
     */
    getItemColor = (item) => {
        const { colorMapping } = this.props;
        return colorMapping?.map[item[colorMapping.key]] || '#666';
    };

    /**
     * Generates tooltip content for a task
     * @param {Object} item - Task data
     * @returns {string} Formatted tooltip content
     */
    generateTooltip = (item) => {
        const { tooltipFields } = this.props;
        if (!tooltipFields) return item.name;
        
        return tooltipFields
            .map(field => `${field}: ${item[field]}`)
            .join('\n');
    };

    /**
     * Generates time intervals for the timeline header
     * @returns {Array} Array of moment.js objects representing time intervals
     */
    generateTimeIntervals = () => {
        const { startDate, endDate, timeScale, columnWidth } = this.props;
        const start = moment(startDate);
        const end = moment(endDate);
        
        // Calculate total duration and number of intervals
        const totalDuration = end.diff(start, timeScale.unit);
        const numberOfIntervals = Math.ceil(totalDuration / timeScale.value);
        
        // Use a fixed total width if ref isn't available
        const totalWidth = numberOfIntervals * columnWidth;
        
        // Generate intervals with fixed width
        let intervals = [];
        let current = start.clone();
        while (current <= end) {
            intervals.push({
                date: current.clone(),
                width: columnWidth
            });
            current.add(timeScale.value, timeScale.unit);
        }
        
        return intervals;
    };

    // #endregion

    // #region Render Fuctions

    /**
     * Renders a job title with appropriate indentation and controls
     * @param {Object} item - Job data item
     * @param {number} level - Hierarchy level for indentation
     */
    renderJobTitle = (item, level) => {
        return (
            <div className="dash-gantt-job-title">
                <div 
                    className="dash-gantt-job-content"
                    style={{ paddingLeft: `${(level + 1) * 24}px` }}  // Increase indentation based on level
                >
                    {item.children && (
                        <button
                            onClick={() => this.toggleRow(item.id)}
                            className="dash-gantt-caret"
                            aria-label={this.state.expandedRows[item.id] ? "Collapse" : "Expand"}
                        >
                            {this.state.expandedRows[item.id] ? '▼' : '►'}
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
    };

    /**
     * Recursively renders the hierarchical job list
     * @param {Array} items - Array of job items
     * @param {number} level - Current hierarchy level
     */
    renderHierarchicalData = (items, level = 0) => {
        return items.map((item) => (
            <React.Fragment key={item.id}>
                <div className="dash-gantt-job-row">
                    {this.renderJobTitle(item, level)}
                </div>
                {item.children && this.state.expandedRows[item.id] && 
                    this.renderHierarchicalData(item.children, level + 1)}
            </React.Fragment>
        ));
    };

    /**
     * Renders the timeline header with date/time intervals
     */
    renderTimelineHeader = () => {
        const intervals = this.generateTimeIntervals();
        return (
            <div className="dash-gantt-timeline-header">
                {intervals.map((interval, index) => (
                    <div 
                        key={index}
                        className="dash-gantt-time-cell"
                        style={{ width: interval.width }}
                    >
                        {interval.date.format(this.props.timeScale.format)}
                    </div>
                ))}
            </div>
        );
    };

    /**
     * Renders a bar representing a task in the timeline
     * @param {Object} item - Task data
     * @param {number} position - Calculated left position percentage
     * @param {number} width - Calculated width percentage
     */
    renderBar = (item, position, width) => {
        const color = this.getItemColor(item);
        const tooltipContent = this.generateTooltip(item);
        
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
                {item.label || ''}
            </div>
        );
    };

    /**
     * Renders a line chart for time series data
     * @param {Object} item - Task data
     * @param {Object} data - Line chart data
     */
    renderLineChart = (item, data) => {
        const { startDate, endDate } = this.props;
        const componentStart = moment(startDate);
        const componentEnd = moment(endDate);
        
        // Filter data points to only those within the timeline range
        const filteredData = data.dates.map((date, index) => ({
            date: moment(date),
            value: data.values[index]
        })).filter(point => {
            return point.date >= componentStart && point.date <= componentEnd;
        });
    
        // Calculate position and width based on date range
        const startPos = this.calculatePosition(filteredData[0].date);
        const endPos = this.calculatePosition(filteredData[filteredData.length - 1].date);
        const width = endPos - startPos;
    
        return (
            <div 
                className="dash-gantt-line-chart"
                style={{
                    position: 'absolute',
                    left: `${startPos}%`,
                    width: `${width}%`
                }}
            >
                <ResponsiveContainer width="100%" height={40}>
                    <LineChart data={filteredData}>
                        <Line 
                            type="monotone"
                            dataKey="value"
                            stroke={data.color}
                            fill={data.color}
                            fillOpacity={0.3}
                            dot={false}
                            isAnimationActive={false}
                        />
                        <YAxis domain={[0, 100]} hide />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    };

    /**
     * Renders the current time indicator line
     */
    renderCurrentTimeLine = () => {
        if (!this.props.currentTime) return null;
        return (
            <div 
                className="dash-gantt-current-time"
                style={{ left: `${this.state.currentTimePosition}%` }}
            />
        );
    };

    /**
     * Renders all timeline content including bars and line charts
     * @param {Array} items - Array of job items
     * @param {number} level - Current hierarchy level
     */
    renderTimelineContent = (items, level = 0) => {
        console.log("Rendering timeline content for items:", items);
        return items.map((item) => {
            console.log("Processing item:", item);
            if (item.displayType === 'line') {
                console.log("Rendering line chart for:", item.name);
            } else if (item.start && item.end) {
                console.log("Rendering bar for:", item.name);
                console.log("Position:", this.calculatePosition(item.start));
                console.log("Width:", this.calculateWidth(item.start, item.end));
            }
    
            return (
                <React.Fragment key={item.id}>
                    <div className="dash-gantt-timeline-row">
                        {item.displayType === 'line' ? (
                            this.renderLineChart(item, {
                                dates: item.dates,
                                values: item.values,
                                color: item.color
                            })
                        ) : (
                            item.start && item.end && this.renderBar(
                                item,
                                this.calculatePosition(item.start) + (level * 4),
                                this.calculateWidth(item.start, item.end) - (level * 4)
                            )
                        )}
                    </div>
                    {item.children && this.state.expandedRows[item.id] && 
                        this.renderTimelineContent(item.children, level + 1)}
                </React.Fragment>
            );
        });
    };

    render() {
        const { id, data, title, maxHeight, styles, className } = this.props;
        const intervals = this.generateTimeIntervals();
        const totalWidth = intervals.reduce((sum, interval) => sum + interval.width, 0);
    
        return (
            <div 
                id={id} 
                className={`dash-gantt ${className?.container || ''}`}
                style={{ maxHeight, ...(styles?.container || {}) }}
            >
                <div className="dash-gantt-header-container">
                    <div className="dash-gantt-title">
                        {title}
                    </div>
                    <div className="dash-gantt-header-timeline">
                        <div style={{ transform: `translateX(-${this.state.scrollLeft}px)` }}>
                            {this.renderTimelineHeader()}
                        </div>
                    </div>
                </div>
                
                <div className="dash-gantt-content">
                    <div className="dash-gantt-jobs">
                        {this.renderHierarchicalData(data)}
                    </div>
    
                    <div className="dash-gantt-timeline">
                        <div 
                            className="dash-gantt-timeline-scroll"
                            onScroll={this.handleTimelineScroll}
                            ref={this.timelineRef}
                        >
                            <div 
                                className="dash-gantt-timeline-wrapper"
                                style={{ width: Math.max(totalWidth, '100%') }}
                            >
                                {this.renderCurrentTimeLine()}
                                {this.renderTimelineContent(data)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // #endregion
}

DashGantt.propTypes = {
    /** Optional(str): The ID used to identify this component in Dash callbacks. */
    id: PropTypes.string,

    /** Optional(Dict[str, Any]): The data structure defining the Gantt chart. Hierarchical data is supported. 
     * Optionally configure whether the coresponding timeline visual is a bar or line chart. When setting 
     * displayType = 'line', 'dates' and 'values' must also be included. 
    */
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
        label: PropTypes.string
    })).isRequired,

    /** Optional(str): The title to display in the top left corner above the tasks window. */
    title: PropTypes.string,

    /** Required(str | dt.datetime): The very first date the timeline view will begin with. */
    startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,

    /** Required(str | dt.datetime): The very last date the timeline view will end with. */
    endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,

    /** Optional(str | dt.datetime): The current time attribute defines where to display a vertical cutoff line. */
    currentTime: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),

    /** Required(Dict[str, Any]): Configuration for the timeline scale and formatting.
     * unit: The time unit for intervals ('minutes', 'hours', 'days', 'weeks', 'months')
     * value: The number of units between each interval
     * format: The moment.js format string for displaying dates
     */
    timeScale: PropTypes.shape({
        unit: PropTypes.oneOf(['minutes', 'hours', 'days', 'weeks', 'months']).isRequired,
        value: PropTypes.number.isRequired,
        format: PropTypes.string.isRequired,
    }).isRequired,

    /** Optional(number): Width in pixels for each column in the timeline view. Default is 100. */
    columnWidth: PropTypes.number,

    /** Optional(str | number): Maximum height of the component. Can be pixel value or CSS string. Default is '80vh'. */
    maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /** Optional(Dict[str, Any]): Configuration for mapping data values to colors.
     * key: The field in data items to use for color mapping
     * map: Object mapping field values to color strings (e.g., {"completed": "green", "pending": "orange"})
     */
    colorMapping: PropTypes.shape({
        key: PropTypes.string.isRequired,
        map: PropTypes.object.isRequired,
    }),

    /** Optional(List[str]): List of field names from the data items to display in tooltips when hovering over bars. */
    tooltipFields: PropTypes.arrayOf(PropTypes.string),

    /** Optional(Dict[str, Any]): Custom styles for different parts of the component.
     * Available style objects:
     * container: Styles for the main container
     * header: Styles for the header section
     * jobs: Styles for the jobs column
     * timeline: Styles for the timeline section
     * taskBar: Styles for individual task bars
     * timeCell: Styles for timeline header cells
     * caretButton: Styles for expand/collapse buttons
     */
    styles: PropTypes.shape({
        container: PropTypes.object,
        header: PropTypes.object,
        jobs: PropTypes.object,
        timeline: PropTypes.object,
        taskBar: PropTypes.object,
        timeCell: PropTypes.object,
        caretButton: PropTypes.object
    }),

    /** Optional(Dict[str, Any]): Custom CSS classes for different parts of the component.
     * Allows Dash developers to apply their own CSS classes
     */
    className: PropTypes.shape({
        container: PropTypes.string,
        header: PropTypes.string,
        jobs: PropTypes.string,
        timeline: PropTypes.string,
        taskBar: PropTypes.string,
        timeCell: PropTypes.string,
        caretButton: PropTypes.string
    }),

    /** Optional(func): Dash callback property */
    setProps: PropTypes.func
};

DashGantt.defaultProps = {
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