import dash_gantt
import dash
from dash import Dash, html, Input, Output, dcc
from datetime import datetime, timedelta

app = Dash(__name__)

current_time = "2023-10-01 16:44"
current_time = datetime(2023, 10, 1, 16, 44)

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
        "status": "failed",
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
        "id": "pipeline",
        "name": "Pipeline",
        "status": "running",
        "start": "2023-10-01 15:45",
        "end": current_time, 
        "label": "Pipeline"
    },
    {
        "id": "queued_job",
        "name": "Queued Job",
        "status": "queued",
        "start": current_time,
        "end": "2023-10-01 15:05",
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
                    "2023-10-01 14:00", "2023-10-01 14:05", "2023-10-01 14:10", "2023-10-01 14:15", "2023-10-01 14:20",
                    "2023-10-01 14:25", "2023-10-01 14:30", "2023-10-01 14:35", "2023-10-01 14:40", "2023-10-01 14:45",
                    "2023-10-01 14:50", "2023-10-01 14:55", "2023-10-01 15:00", "2023-10-01 15:45", "2023-10-01 15:50",
                    "2023-10-01 15:55", "2023-10-01 16:05", "2023-10-01 16:15", "2023-10-01 16:20", current_time,
                ],
                "values": [
                    10, 25, 36, 10,
                    35, 45, 95, 99,
                    41, 2, 4, 4, 12,
                    36, 58, 59, 89
                ],
                "color": "blue",
            }
        ]
    },
]

data2 = [
    {
        "id": "source_analysis",
        "name": "Source Data Analysis",
        "status": "completed",
        "start": datetime(2023, 10, 1, 2, 55),   #datetime(2023, 10, 1)
        "end": "2023-10-01 14:30",
        "label": "Data Analysis",
        "progress": 100
    },
    {
        "id": "another_one",
        "name": "Another One",
        "status": "completed",
        "start": "2023-10-01 6:00",
        "end": "2023-10-01 22:30",
        "label": "Another One",
        "progress": 100
    },
]

app.layout = html.Div([
    dcc.Interval(id="interval", interval=65 * 10),
    dash_gantt.DashGantt(
        id='gantt-chart',
        data=data,
        title="Jobs",
        startDate="2023-10-01 14:00",
        endDate="2023-10-01 20:12",
        currentTime=current_time,  # Vertical line at 3 PM
        timeScale={
            "unit": "minutes",
            "value": 30,
            "format": "DD/MM HH:mm"
        },
        colorMapping={
            "key": "status",
            "map": {
                "completed": "#4CAF50",  # Green
                "in_progress": "#FFA726", # Orange
                "running": "#2196F3",     # Blue
                "failed": "red",
                "queued": "gray"
            }
        },
        tooltipFields=["status", "progress", "start", "end"],
        # lineGraphData=line_graph_data,
        columnWidth=100,
        maxHeight="600px",
        styles={
            "container": {"color": "black"},
            "currentTime": {"background-color": "transparent", "border-left": "2px dotted black"},
            "timeCell": {"text-align": "center", "background-color": "#f8fafc", "text-color": "black", "background": "black"},
        },
    )
], style={"height": "200px"})


@app.callback(
    Output("gantt-chart", "styles"),
    [Input("interval", "n_intervals")]
)
def update_inner_dash_gantt_component(n_intervals) -> dict[str, str]:
    # ctx = dash.callback_context
    # print(ctx)
    # print(ctx.__dict__)
    possible_colors = ["red", "green", "purple", "black", "orange", "yellow"]
    color = possible_colors[n_intervals] if n_intervals is not None and n_intervals < 6 else "light blue"
    text_color = "black" if color != "black" else "white"
    return {
        "container": {"color": color},
        "currentTime": {"background-color": color, "border-left": f"2px dotted {color}"},
        "timeCell": {"text-align": "right", "background-color": color, "color": text_color},
    }


if __name__ == '__main__':
    app.run(debug=True)