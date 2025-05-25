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

import React from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, YAxis, ResponsiveContainer, Area, AreaChart, Tooltip, XAxis } from 'recharts';

/**
 * TimelineLine renders a line chart representation of time series data.
 * Supports gradient fills, configurable styling options, and dynamic tooltips.
 */
const TimelineLine = ({
    data,
    color,
    position,
    width,
    fill = {},
    tooltip = {}
}) => {
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

    return (
        <div 
            className="dash-gantt-line-chart"
            style={{
                left: `${position}%`,
                width: `${width}%`,
                position: 'relative'
            }}
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
                    
                    {/* Recharts tooltip with proper z-index and styling */}
                    {tooltipEnabled && (
                        <Tooltip
                            labelFormatter={(value) => `Date: ${value}`}
                            formatter={(value) => [`${value}`, 'Value']}
                            cursor={{ stroke: color, strokeWidth: 1, strokeDasharray: '3 3' }}
                            animationDuration={0}
                            wrapperStyle={{ 
                                zIndex: 9999,
                                pointerEvents: 'none',
                                // marginBottom: '0.2em',
                            }}
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                                fontSize: '0.7em',
                                paddingBottom: '0.2em',
                            }}
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
            
            {/* CSS to fix tooltip clipping issues */}
            {tooltipEnabled && (
                <style dangerouslySetInnerHTML={{
                    __html: `
                        .recharts-tooltip-wrapper {
                            z-index: 9999 !important;
                            pointer-events: none !important;
                        }
                        
                        .dash-gantt-line-chart {
                            overflow: visible !important;
                        }
                        
                        .dash-gantt-timeline-row {
                            overflow: visible !important;
                        }
                        
                        .dash-gantt-timeline-wrapper {
                            overflow: visible !important;
                        }
                        
                        .dash-gantt-timeline {
                            overflow: visible !important;
                        }
                    `
                }} />
            )}
        </div>
    );
};

/**
 * PropTypes for the TimelineLine component.
 */
TimelineLine.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
        value: PropTypes.number
    })).isRequired,
    color: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    fill: PropTypes.shape({
        enabled: PropTypes.bool,
        color: PropTypes.string,
        opacity: PropTypes.number,
        gradient: PropTypes.shape({
            startOpacity: PropTypes.number,
            endOpacity: PropTypes.number
        })
    }),
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
        enabled: true,
        staticFields: [],
        style: {}
    }
};

export default TimelineLine;