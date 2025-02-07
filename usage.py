import dash_gantt
from dash import Dash, html
from datetime import datetime, timedelta

app = Dash(__name__)

# Sample data for the Gantt chart
data = [
    {
        "id": "source_analysis",
        "name": "Source Data Analysis",
        "status": "completed",
        "start": "2023-10-01 14:00",
        "end": "2023-10-01 14:30",
        "label": "Data Analysis",
        "progress": 100
    },
    {
        "id": "data_load",
        "name": "Data Load",
        "start": "2023-10-01 14:11",
        "end": "2023-10-01 14:52",
        "status": "running",
        "label": "Data Load",
        "children": [
            {
                "id": "extract",
                "name": "Extract",
                "status": "completed",
                "start": "2023-10-01 14:11",
                "end": "2023-10-01 14:37",
                "label": "Extraction"
            },
            {
                "id": "second_one",
                "name": "second one",
                "status": "failed",
                "start": "2023-10-01 14:28",
                "end": "2023-10-01 14:52",  # TODO: time is not 
                "label": "Second One"
            }
        ]
    },
    {
        "id": "memory_usage",
        "name": "Memory Usage",
        "displayType": "line",
        "dates": [
            "2023-10-01 14:00", "2023-10-01 14:05", "2023-10-01 14:10", "2023-10-01 14:15", "2023-10-01 14:20"
            "2023-10-01 14:25", "2023-10-01 14:30", "2023-10-01 14:35", "2023-10-01 14:40", 
            "2023-10-01 14:45", "2023-10-01 14:50",
        ],
        "values": [20, 35, 56, 40, 45, 75, 95, 87, 38, 12, 44],
        "color": "black",
        "children": [
            {
                "id": "bot 1 memory usage",
                "name": "Memory Usage of Bot 1",
                "displayType": "line",
                "dates": [
                    "2023-10-01 14:00", "2023-10-01 14:05", "2023-10-01 14:10", "2023-10-01 14:15", "2023-10-01 14:20"
                    "2023-10-01 14:25", "2023-10-01 14:30", "2023-10-01 14:35", "2023-10-01 14:40", 
                    "2023-10-01 14:45", "2023-10-01 14:50",
                ],
                "values": [10, 25, 36, 10, 35, 45, 95, 99, 41, 2, 4],
                "color": "blue",
            }
        ]
    },
]

app.layout = html.Div([
    dash_gantt.DashGantt(
        id='gantt-chart',
        data=data,
        title="Jobs",
        startDate="2023-10-01 14:00",
        endDate="2023-10-01 15:12",
        currentTime="2023-10-01 15:00",  # Vertical line at 3 PM
        timeScale={
            "unit": "minutes",
            "value": 15,
            "format": "HH:mm"
        },
        colorMapping={
            "key": "status",
            "map": {
                "completed": "#4CAF50",  # Green
                "in_progress": "#FFA726", # Orange
                "running": "#2196F3",     # Blue
                "failed": "red"
            }
        },
        tooltipFields=["status", "progress", "start", "end"],
        # lineGraphData=line_graph_data,
        columnWidth=100,
        maxHeight="600px",
        styles={
            "container": {"color": "black"}
        },
    )
])

if __name__ == '__main__':
    app.run(debug=True)