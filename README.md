# DashGantt

DashGantt is a Dash component library allowing developers to seemlessly create Gantt charts. 

[![PyPI Downloads](https://static.pepy.tech/personalized-badge/dash-gantt?period=total&units=INTERNATIONAL_SYSTEM&left_color=BLACK&right_color=GREEN&left_text=downloads)](https://pepy.tech/projects/dash-gantt)

https://github.com/user-attachments/assets/828abb60-551c-4a2a-84ed-c45be1d15e1c

## Installation
```python
pip install dash-gantt
```

## Usage
```python
data = [
    {
        "id": "source_analysis",
        "name": "Source Data Analysis",
        "icon": "bi bi-1-circle",
        "status": "completed",
        "start": "2023-10-01 12:00",
        "end": "2023-10-01 14:30",
        "label": "Data Analysis",
        "progress": 100
    },
    {
        "id": "job id = 1, data_load",
        "name": "Data Load",
        "icon": "https://img.icons8.com/?size=100&id=bQUXBvTNh8MI&format=png&color=000000.png",
        "start": "2023-10-01 14:11",
        "end": "2023-10-01 14:52",
        "status": "failed",
        "label": "Data Load",
        "children": [
            {
                "id": "tak orchestrator, task id =1 ",
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
                "label": "Second One",
                "children": [
                    {
                        "id": "tak asdforchestrator, task id =1 ",
                        "name": "Extract",
                        "status": "completed",
                        "start": "2023-10-01 14:11",
                        "end": "2023-10-01 14:37",
                        "label": "Extraction"
                    },
                    {
                        "id": "sedfsdcond_one",
                        "name": "second one",
                        "status": "failed",
                        "start": "2023-10-01 14:28",
                        "end": "2023-10-01 14:52",  # TODO: time is not 
                        "label": "Second One"
                    }
                ]   
            }
        ]
    },
    {
        "id": "pipeline",
        "name": "Pipeline",
        "status": "running",
        "start": "2023-10-01 15:45",
        "end": current_time, 
        "label": "Pipeline",
        "displayType": "gradient-right"
    },
    {
        "id": "queued_job",
        "name": "Queued Job",
        "status": "queued",
        "start": current_time,
        "end": "2023-10-01 19:06",
        "displayType": "gradient"
    },
    {
        "id": "seasdcond_one",
        "name": "second one",
        "status": "failed",
        "start": "2023-10-01 14:28",
        "end": "2023-10-01 14:52",  # TODO: time is not 
        "label": "Second One",
        "children": [
            {
                "id": "tak asdfosdfrchestrator, task id =1 ",
                "name": "Extract",
                "status": "completed",
                "start": "2023-10-01 14:11",
                "end": "2023-10-01 14:37",
                "label": "Extraction"
            },
            {
                "id": "sedfsdascond_one",
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
            "2023-10-01 14:00", "2023-10-01 14:05", "2023-10-01 14:10", "2023-10-01 14:15", "2023-10-01 14:20",
            "2023-10-01 14:25", "2023-10-01 14:30", "2023-10-01 14:35", "2023-10-01 14:40", "2023-10-01 14:45", 
            "2023-10-01 14:50",
        ],
        "values": [
            20, 35, 56, 40, 45,
            75, 95, 87, 38, 12,
            44
        ],
        "color": "black",
        "fill": {
            "enabled": True,
            "gradient": {
                "startOpacity": 1,
                "endOpacity": 0.01
            }
        },
        "children": [
            {
                "id": "bot 1 memory usage",
                "name": "Memory Usage of Bot 1",
                "displayType": "line",
                "dates": [
                    dt.datetime(2023, 10, 1, 14, 0),
                    dt.datetime(2023, 10, 1, 14, 5),
                    dt.datetime(2023, 10, 1, 14, 10),
                    dt.datetime(2023, 10, 1, 14, 15),
                    dt.datetime(2023, 10, 1, 14, 20),
                    dt.datetime(2023, 10, 1, 14, 25),
                    dt.datetime(2023, 10, 1, 14, 30),
                    dt.datetime(2023, 10, 1, 14, 35),
                    dt.datetime(2023, 10, 1, 14, 40),
                    dt.datetime(2023, 10, 1, 14, 45),
                    dt.datetime(2023, 10, 1, 14, 50),
                    dt.datetime(2023, 10, 1, 14, 55),
                    dt.datetime(2023, 10, 1, 15, 0),
                    dt.datetime(2023, 10, 1, 15, 45),
                    dt.datetime(2023, 10, 1, 15, 50),
                    dt.datetime(2023, 10, 1, 15, 55),
                    dt.datetime(2023, 10, 1, 16, 5)
                ],
                "values": [
                    40, 25, 36, 10,
                    35, 45, 95, 79,
                    41, 2, 4, 4, 12,
                    36, 58, 39, 89
                ],
                "color": "blue",
                "fill": {
                    "enabled": True,
                    "gradient": {
                        "startOpacity": 0.5,
                        "endOpacity": 0
                    }
                }
            }
        ]
    },
    {
        'id': 'telemetry-memory-usage',
        'name': 'Memory Usage', 
        'displayType': 'line', 
        "dates": [
                    dt.datetime(2023, 10, 1, 14, 0),
                    dt.datetime(2023, 10, 1, 14, 5),
                    dt.datetime(2023, 10, 1, 14, 10),
                    dt.datetime(2023, 10, 1, 14, 15),
                    dt.datetime(2023, 10, 1, 14, 20),
                    dt.datetime(2023, 10, 1, 14, 25),
                    dt.datetime(2023, 10, 1, 14, 30),
                    dt.datetime(2023, 10, 1, 14, 35),
                    dt.datetime(2023, 10, 1, 14, 40),
                    dt.datetime(2023, 10, 1, 14, 45),
                    dt.datetime(2023, 10, 1, 14, 50),
                    dt.datetime(2023, 10, 1, 14, 55),
                    dt.datetime(2023, 10, 1, 15, 0),
                    dt.datetime(2023, 10, 1, 15, 45),
                    dt.datetime(2023, 10, 1, 15, 50),
                    dt.datetime(2023, 10, 1, 15, 55),
                    dt.datetime(2023, 10, 1, 16, 5)
                ],
        "values": [
            60, 25, 16, 32,
            35, 45, 15, 99,
            46, 2, 4, 54, 12,
            36, 78, 59, 89
        ],
        'color': '#007bff', 
        'fill': {'enabled': True, 'gradient': {'startOpacity': 1, 'endOpacity': 0.1}}, 
        'children': None
    }
]
app.layout = html.Div([
    dcc.Interval(id="interval", interval=65 * 10),
    html.Div(
        id="gantt-container",
        children=[
            dash_gantt.DashGantt(
                id='gantt-chart',
                data=data,
                title="Jobs",
                startDate="2023-10-01 11:00",
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
                columnWidth=100,
                maxHeight="600px",
                styles={
                    "currentTime": {"backgroundColor": "transparent", "border-left": "2px dotted black"},
                    "timeCell": {"text-align": "center", "backgroundColor": "#f8fafc"},
                    "tooltip": {
                        "backgroundColor": 'rgb(242, 241, 241)',
                        "color": 'black',
                        "padding": '4px 8px',
                        "borderRadius": '4px',
                        "fontSize": '1.2rem',
                        "pointerEvents": 'none',
                        "zIndex": "1000,"
                    }
                },
            ),
        ]
    )
])

if __name__ == '__main__':
    app.run(debug=False)
```

Developers can customize the time granularity, tooltips, data hierarchies, styles, and much more using the dash-gantt library. 
