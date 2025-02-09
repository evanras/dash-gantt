import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

/**
 * HeaderRow renders the timeline header with evenly spaced time intervals.
 * Handles dynamic column widths based on available space.
 */
const HeaderRow = ({
    startDate,
    endDate,
    timeScale,
    headerHeight = 48,
    scrollLeft,
    title = "Jobs"
}) => {
    const MIN_COLUMN_WIDTH = 100; // Minimum width for readability
    const [containerWidth, setContainerWidth] = useState(0);
    const headerRef = useRef(null);

    useEffect(() => {
        const updateWidth = () => {
            if (headerRef.current) {
                // Get container width minus title area
                const titleWidth = 250;
                const width = headerRef.current.getBoundingClientRect().width - titleWidth;
                setContainerWidth(width);
            }
        };

        // Initial width calculation
        updateWidth();

        // Create ResizeObserver for dynamic updates
        const resizeObserver = new ResizeObserver(updateWidth);
        if (headerRef.current) {
            resizeObserver.observe(headerRef.current);
        }

        // Cleanup
        return () => {
            if (headerRef.current) {
                resizeObserver.unobserve(headerRef.current);
            }
            resizeObserver.disconnect();
        };
    }, []);

    /**
     * Generates time intervals based on start date, end date, and time scale
     * @returns {Array} Array of interval objects with dates and labels
     */
    const generateTimeIntervals = () => {
        const intervals = [];
        const start = moment(startDate);
        const end = moment(endDate);
        
        // Calculate total duration and number of intervals
        const duration = end.diff(start, timeScale.unit);
        const numberOfIntervals = Math.ceil(duration / timeScale.value);
        
        // Generate intervals
        for (let i = 0; i <= numberOfIntervals; i++) {
            const currentTime = start.clone().add(i * timeScale.value, timeScale.unit);
            if (currentTime.isSameOrBefore(end)) {
                intervals.push({
                    date: currentTime,
                    label: currentTime.format(timeScale.format)
                });
            }
        }
        return intervals;
    };

    /**
     * Renders the time intervals in the header
     * @returns {JSX.Element} Rendered timeline header
     */
    const renderIntervals = () => {
        const intervals = generateTimeIntervals();
        
        // Calculate column width based on container width and number of intervals
        const calculatedWidth = Math.max(
            MIN_COLUMN_WIDTH,
            containerWidth / intervals.length
        );
        
        const totalWidth = calculatedWidth * intervals.length;

        return (
            <div 
                className="dash-gantt-header-timeline"
                style={{
                    transform: `translateX(-${scrollLeft}px)`,
                    width: `${totalWidth}px`,
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'absolute',
                    top: 0,
                    height: '100%'
                }}
            >
                {intervals.map((interval, index) => (
                    <div
                        key={`${interval.date.valueOf()}-${index}`}
                        className="dash-gantt-time-cell"
                        style={{ 
                            width: `${calculatedWidth}px`,
                            flex: `0 0 ${calculatedWidth}px`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRight: '1px solid #e2e8f0',
                            boxSizing: 'border-box'
                        }}
                    >
                        {interval.label}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div 
            className="dash-gantt-header-container"
            ref={headerRef}
        >
            <div className="dash-gantt-title">
                {title}
            </div>
            {containerWidth > 0 && renderIntervals()}
        </div>
    );
};

HeaderRow.propTypes = {
    /** Start date for the timeline */
    startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    
    /** End date for the timeline */
    endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    
    /** Configuration for time scale display */
    timeScale: PropTypes.shape({
        unit: PropTypes.oneOf(['minutes', 'hours', 'days', 'weeks', 'months']).isRequired,
        value: PropTypes.number.isRequired,
        format: PropTypes.string.isRequired
    }).isRequired,
    
    /** Height of the header in pixels */
    headerHeight: PropTypes.number,
    
    /** Current scroll position */
    scrollLeft: PropTypes.number.isRequired,
    
    /** Title displayed in the left column */
    title: PropTypes.string
};

HeaderRow.defaultProps = {
    headerHeight: 48,
    title: "Jobs"
};

export default HeaderRow;