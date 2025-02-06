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
        "status": "in_progress",
        "children": [
            {
                "id": "extract",
                "name": "Extract",
                "status": "running",
                "start": "2023-10-01 14:45",
                "end": "2023-10-01 15:15",
                "label": "Extraction"
            }
        ]
    }
]

# Sample line graph data showing memory usage over time
line_graph_data = {
    "Memory Usage": {
        "dates": [
            "2023-10-01 14:00", "2023-10-01 14:10", 
            "2023-10-01 14:20", "2023-10-01 14:30"
        ],
        "values": [20, 45, 75, 95],
        "color": "#4CAF50"
    },
    "Task Usage": {
        "dates": [
            "2023-10-01 14:45", "2023-10-01 14:55", 
            "2023-10-01 15:05", "2023-10-01 15:15"
        ],
        "values": [30, 60, 80, 85],
        "color": "#2196F3"
    }
}

app.layout = html.Div([
    dash_gantt.DashGantt(
        id='gantt-chart',
        data=data,
        title="Jobs",
        startDate="2023-10-01 14:00",
        endDate="2023-10-01 15:45",
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
                "running": "#2196F3"      # Blue
            }
        },
        tooltipFields=["status", "progress"],
        lineGraphData=line_graph_data,
        columnWidth=100,
        maxHeight="600px"
    )
])

if __name__ == '__main__':
    app.run(debug=True)