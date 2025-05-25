/**
 * @fileoverview TimelineLine component renders time series data as a line chart within
 * the Gantt timeline. Supports customizable styling including gradient fills, opacity
 * settings, and interactive features with dynamic tooltips. This component is designed 
 * to work within the DashGantt chart system but can be used independently for line chart visualization.
 *
 * @module TimelineLine
 * @requires react
 * @requires prop-types
 * @requires recharts
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { LineChart, Line, YAxis, ResponsiveContainer, Area, AreaChart, Tooltip, XAxis } from 'recharts';

/**
 * Portal tooltip component that renders outside the chart container
 * to avoid clipping by parent overflow settings
 */
const PortalTooltip = ({ active, payload, label, staticTooltipFields, formatDate, formatValue, mousePosition, containerStyle }) => {
    if (!active || !payload || !payload.length || !mousePosition) {
        return null;
    }

    const data = payload[0].payload;
    const value = payload[0].value;

    // Calculate optimal tooltip position to avoid viewport edges
    const tooltipContent = (
        <div 
            className="dash-gantt-line-tooltip-portal"
            style={{
                position: 'fixed',
                left: mousePosition.x + 10,
                top: mousePosition.y - 10,
                transform: 'translateY(-100%)', // Position above cursor
                zIndex: 99999,
                pointerEvents: 'none',
                ...containerStyle
            }}
        >
            <div className="tooltip-content">
                {/* Dynamic content - date and value */}
                <div className="tooltip-dynamic">
                    <div className="tooltip-item">
                        <span className="tooltip-label">Date: </span>
                        <span className="tooltip-value">
                            {formatDate ? formatDate(data.date) : data.date}
                        </span>
                    </div>
                    <div className="tooltip-item">
                        <span className="tooltip-label">Value: </span>
                        <span className="tooltip-value">
                            {formatValue ? formatValue(value) : value}
                        </span>
                    </div>
                </div>
                
                {/* Static content - additional fields */}
                {staticTooltipFields && staticTooltipFields.length > 0 && (
                    <div className="tooltip-static">
                        <div className="tooltip-divider"></div>
                        {staticTooltipFields.map((field, index) => (
                            <div key={index} className="tooltip-item">
                                <span className="tooltip-label">{field.label}: </span>
                                <span className="tooltip-value">{field.value}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    // Use portal to render tooltip at document.body level
    return createPortal(tooltipContent, document.body);
};

/**
 * Invisible custom tooltip that captures hover data without rendering
 * The actual tooltip is rendered via portal
 */
const InvisibleTooltip = ({ active, payload, label, onTooltipChange, staticTooltipFields, formatDate, formatValue }) => {
    useEffect(() => {
        if (onTooltipChange) {
            onTooltipChange({ active, payload, label, staticTooltipFields, formatDate, formatValue });
        }
    }, [active, payload, label, onTooltipChange, staticTooltipFields, formatDate, formatValue]);

    return null; // This tooltip is invisible
};

/**
 * TimelineLine renders a line chart representation of time series data.
 * Supports gradient fills, configurable styling options, and dynamic tooltips.
 *
 * @component
 * @example
 * // Basic usage with solid fill and simple tooltip
 * <TimelineLine
 *   data={[
 *     { date: '2024-02-01', value: 75 },
 *     { date: '2024-02-02', value: 80 },
 *     { date: '2024-02-03', value: 85 }
 *   ]}
 *   color="#4CAF50"
 *   position={20}
 *   width={60}
 *   fill={{ enabled: true, opacity: 0.3 }}
 *   tooltip={{
 *     enabled: true,
 *     staticFields: [
 *       { label: 'Series', value: 'Revenue' },
 *       { label: 'Unit', value: '$' }
 *     ]
 *   }}
 * />
 *
 * @example
 * // Usage with gradient fill and custom formatters
 * <TimelineLine
 *   data={[...]}
 *   color="#4CAF50"
 *   position={20}
 *   width={60}
 *   fill={{
 *     enabled: true,
 *     gradient: {
 *       startOpacity: 0.4,
 *       endOpacity: 0.1
 *     }
 *   }}
 *   tooltip={{
 *     enabled: true,
 *     staticFields: [{ label: 'Department', value: 'Sales' }],
 *     formatDate: (date) => new Date(date).toLocaleDateString(),
 *     formatValue: (value) => `${value}%`
 *   }}
 * />
 */
const TimelineLine = ({
    data,
    color,
    position,
    width,
    fill = {},
    tooltip = {}
}) => {
    const [mousePosition, setMousePosition] = useState(null);
    const [tooltipData, setTooltipData] = useState(null);
    // Destructure fill options with defaults
    const {
        enabled: fillEnabled = false,
        color: fillColor = color,
        opacity = 0.3,
        gradient = {
            startOpacity: 0.3,
            endOpacity: 0.1
        }
    } = fill;

    // Destructure tooltip options with defaults
    const {
        enabled: tooltipEnabled = true,
        staticFields = [],
        formatDate,
        formatValue,
        style = {}
    } = tooltip;

    // Generate unique gradient ID to prevent conflicts when multiple charts are present
    const gradientId = `gradient-${color.replace('#', '')}-${position}`;

    // Handle mouse move to track position for portal tooltip
    const handleMouseMove = (e) => {
        if (tooltipEnabled) {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        }
    };

    const handleMouseLeave = () => {
        if (tooltipEnabled) {
            setMousePosition(null);
            setTooltipData(null);
        }
    };

    // Handle tooltip data changes from Recharts
    const handleTooltipChange = (data) => {
        setTooltipData(data);
    };

    // Default tooltip styles
    const defaultTooltipStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '8px 12px',
        fontSize: '12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        ...style
    };

    return (
        <div 
            className="dash-gantt-line-chart"
            style={{
                left: `${position}%`,
                width: `${width}%`
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <ResponsiveContainer width="100%" height={40}>
                <AreaChart data={data}>
                    {fillEnabled && (
                        <defs>
                            {gradient ? (
                                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                    <stop 
                                        offset="5%" 
                                        stopColor={fillColor} 
                                        stopOpacity={gradient.startOpacity}
                                    />
                                    <stop 
                                        offset="95%" 
                                        stopColor={fillColor} 
                                        stopOpacity={gradient.endOpacity}
                                    />
                                </linearGradient>
                            ) : null}
                        </defs>
                    )}
                    
                    {/* Hidden X-axis for tooltip positioning */}
                    <XAxis 
                        dataKey="date" 
                        hide 
                        type="category"
                    />
                    
                    <YAxis domain={[0, 100]} hide />
                    
                    {/* Invisible tooltip component that captures data */}
                    {tooltipEnabled && (
                        <Tooltip
                            content={({ active, payload, label }) => (
                                <InvisibleTooltip
                                    active={active}
                                    payload={payload}
                                    label={label}
                                    onTooltipChange={handleTooltipChange}
                                    staticTooltipFields={staticFields}
                                    formatDate={formatDate}
                                    formatValue={formatValue}
                                />
                            )}
                            cursor={{ stroke: color, strokeWidth: 1, strokeDasharray: '3 3' }}
                            animationDuration={0}
                            wrapperStyle={{ visibility: 'hidden' }} // Hide the default tooltip wrapper
                        />
                    )}
                    
                    <Area 
                        type="monotone"
                        dataKey="value"
                        stroke={color}
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill={fillEnabled ? (gradient ? `url(#${gradientId})` : fillColor) : 'none'}
                        isAnimationActive={false}
                        dot={false}
                        activeDot={tooltipEnabled ? { 
                            r: 3, 
                            fill: color, 
                            strokeWidth: 2, 
                            stroke: '#fff' 
                        } : false}
                    />
                </AreaChart>
            </ResponsiveContainer>
            
            {/* Portal tooltip rendered at document.body level */}
            {tooltipEnabled && tooltipData && (
                <PortalTooltip
                    {...tooltipData}
                    mousePosition={mousePosition}
                    containerStyle={defaultTooltipStyle}
                />
            )}
            
            {/* CSS-in-JS styles for tooltip */}
            <style jsx>{`
                .dash-gantt-line-tooltip {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }
                
                .tooltip-content {
                    min-width: 120px;
                }
                
                .tooltip-item {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 4px;
                    gap: 8px;
                }
                
                .tooltip-item:last-child {
                    margin-bottom: 0;
                }
                
                .tooltip-label {
                    font-weight: 500;
                    color: #666;
                }
                
                .tooltip-value {
                    font-weight: 600;
                    color: #333;
                }
                
                .tooltip-divider {
                    height: 1px;
                    background-color: #e0e0e0;
                    margin: 6px 0;
                }
                
                .tooltip-dynamic {
                    margin-bottom: ${staticFields.length > 0 ? '0' : '0'};
                }
                
                .tooltip-static {
                    margin-top: 2px;
                }
            `}</style>
        </div>
    );
};

/**
 * PropTypes for the TimelineLine component.
 * @typedef {Object} TimelineLineProps
 */
TimelineLine.propTypes = {
    /**
     * Array of data points for the line chart. Each point must have a date and value.
     * @type {Array<{date: (string|Date), value: number}>}
     */
    data: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
        value: PropTypes.number
    })).isRequired,

    /**
     * Primary color for the line. Should be a valid CSS color string.
     * @type {string}
     */
    color: PropTypes.string.isRequired,

    /**
     * Left position of the chart as a percentage of timeline width.
     * @type {number}
     */
    position: PropTypes.number.isRequired,

    /**
     * Width of the chart as a percentage of timeline width.
     * @type {number}
     */
    width: PropTypes.number.isRequired,

    /**
     * Configuration object for fill styling.
     * @type {Object}
     * @property {boolean} [enabled=false] - Whether to enable fill
     * @property {string} [color] - Fill color (defaults to line color)
     * @property {number} [opacity=0.3] - Fill opacity (0-1)
     * @property {Object} [gradient] - Gradient configuration
     * @property {number} [gradient.startOpacity=0.3] - Start opacity for gradient
     * @property {number} [gradient.endOpacity=0.1] - End opacity for gradient
     */
    fill: PropTypes.shape({
        enabled: PropTypes.bool,
        color: PropTypes.string,
        opacity: PropTypes.number,
        gradient: PropTypes.shape({
            startOpacity: PropTypes.number,
            endOpacity: PropTypes.number
        })
    }),

    /**
     * Configuration object for tooltip functionality.
     * @type {Object}
     * @property {boolean} [enabled=false] - Whether to enable tooltips
     * @property {Array<{label: string, value: string}>} [staticFields=[]] - Static fields to display
     * @property {Function} [formatDate] - Function to format date display
     * @property {Function} [formatValue] - Function to format value display
     * @property {Object} [style={}] - Custom CSS styles for tooltip container
     */
    tooltip: PropTypes.shape({
        enabled: PropTypes.bool,
        staticFields: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
        })),
        formatDate: PropTypes.func,
        formatValue: PropTypes.func,
        style: PropTypes.object
    })
};

/**
 * Default props for the TimelineLine component.
 * @type {Object}
 */
TimelineLine.defaultProps = {
    fill: {
        enabled: false,
        opacity: 0.3,
        gradient: {
            startOpacity: 0.3,
            endOpacity: 0.1
        }
    },
    tooltip: {
        enabled: false,
        staticFields: [],
        style: {}
    }
};

/**
 * @component-notes
 * 
 * Key Features:
 * - Renders line charts with optional gradient or solid fills
 * - Supports customizable colors and opacities
 * - Dynamic tooltips with hover functionality
 * - Static and dynamic tooltip content support
 * - Custom formatting for dates and values
 * - Automatically scales to container width
 * - Prevents gradient ID conflicts with unique identifiers
 * 
 * Tooltip Features:
 * - Dynamic content: Shows current date/value on hover
 * - Static content: Shows configurable key-value pairs
 * - Custom formatters for date and value display
 * - Crosshair cursor for precise positioning
 * - Active dot indicator on hover
 * - Customizable styling
 * 
 * Implementation Considerations:
 * - Uses recharts Tooltip component for hover detection
 * - Includes hidden XAxis for proper tooltip positioning
 * - CSS-in-JS for tooltip styling
 * - Disables animation for performance
 * - Uses ResponsiveContainer for automatic sizing
 * 
 * Integration Notes:
 * - Works within DashGantt's timeline grid
 * - Expects percentage-based positioning
 * - Maintains consistent height for timeline alignment
 * - Supports both solid and gradient fills
 * - Tooltip data passed through Dash props system
 */

export default TimelineLine;