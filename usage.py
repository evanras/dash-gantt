import dash_gantt
import dash
from dash import Dash, html, Input, Output, dcc, State, set_props
from datetime import datetime, timedelta
import time

app = Dash(__name__)

current_time = "2023-10-01 16:44"
current_time = datetime(2023, 10, 1, 17, 53)

# Sample data for the Gantt chart
data = [
    {
        "id": "source_analysis",
        "name": "Source Data Analysis",
        "icon": "bi bi-1-circle",
        "status": "completed",
        "start": "2023-10-01 14:00",
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
                    "2023-10-01 14:00", "2023-10-01 14:05", "2023-10-01 14:10", "2023-10-01 14:15", 
                    "2023-10-01 14:20", "2023-10-01 14:25", "2023-10-01 14:30", "2023-10-01 14:35", 
                    "2023-10-01 14:40", "2023-10-01 14:45", "2023-10-01 14:50", "2023-10-01 14:55", 
                    "2023-10-01 15:00", "2023-10-01 15:45", "2023-10-01 15:50", "2023-10-01 15:55", 
                    "2023-10-01 16:05"
                ],
                "values": [
                    10, 25, 36, 10,
                    35, 45, 95, 99,
                    41, 2, 4, 4, 12,
                    36, 58, 59, 89
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
                    "2023-10-01 14:00", "2023-10-01 14:05", "2023-10-01 14:10", "2023-10-01 14:15", 
                    "2023-10-01 14:20", "2023-10-01 14:25", "2023-10-01 14:30", "2023-10-01 14:35", 
                    "2023-10-01 14:40", "2023-10-01 14:45", "2023-10-01 14:50", "2023-10-01 14:55", 
                    "2023-10-01 15:00", "2023-10-01 15:45", "2023-10-01 15:50", "2023-10-01 15:55", 
                    "2023-10-01 16:05"
        ],
        "values": [
            10, 25, 36, 10,
            35, 45, 95, 99,
            41, 2, 4, 4, 12,
            36, 58, 59, 89
        ],
        'color': '#007bff', 
        'fill': {'enabled': True, 'gradient': {'startOpacity': 1, 'endOpacity': 0.1}}, 
        'children': None
    }
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


data3 = [
    {
        "id": "another_one",
        "name": "Another One",
        "status": "completed",
        "start": "2023-10-01 6:00",
        "end": "2023-10-01 22:30",
        "label": "Another One",
        "progress": 100,
        "children": [
            {
                "id": "third",
                "name": "third one",
                "status": "failed",
                "start": "2023-10-01 14:28",
                "end": "2023-10-01 14:52",  # TODO: time is not 
                "label": "third One",
                "children": [
                    {
                        "id": "fourth",
                        "name": "fourth one",
                        "status": "failed",
                        "start": "2023-10-01 14:28",
                        "end": "2023-10-01 14:52",  # TODO: time is not 
                        "label": "fourth One",
                        "children": [
                            {
                                "id": "fifth",
                                "name": "fifth one",
                                "status": "failed",
                                "start": "2023-10-01 14:28",
                                "end": "2023-10-01 14:52",  # TODO: time is not 
                                "label": "fifth One",
                                "children": [
                                    {
                                        "id": "six",
                                        "name": "six one",
                                        "status": "failed",
                                        "start": "2023-10-01 14:28",
                                        "end": "2023-10-01 14:52",  # TODO: time is not 
                                        "label": "six One",
                                        "children": [
                                            {
                                                "id": "seven",
                                                "name": "seven one",
                                                "status": "failed",
                                                "start": "2023-10-01 14:28",
                                                "end": "2023-10-01 14:52",  # TODO: time is not 
                                                "label": "seven One",
                                                "children": data
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            } 
        ]
    } 
]

inner1 = {
    "id": "jobkey1",
    "name": "job one",
    "status": "failed",
    "start": "2023-10-01 14:28",
    "end": "2023-10-01 14:52",  
    "label": "job One",
    "children": []
}

inner2 = {
    "id": "jobkey2",
    "name": "job two",
    "status": "failed",
    "start": "2023-10-01 14:28",
    "end": "2023-10-01 14:52",  # TODO: time is not 
    "label": "job One",
    "children": []
}

data_store = {"jobkey1": inner1, "jobkey2": inner2}
data_struct = [data_store["jobkey1"], data_store["jobkey2"]]


app.layout = html.Div([
    dcc.Interval(id="interval", interval=65 * 10),
    html.Button(id="button"),
    html.Div(
        id="gantt-container",
        children=[
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
                    "currentTime": {"backgroundColor": "transparent", "border-left": "2px dotted black"},
                    "timeCell": {"text-align": "center", "backgroundColor": "#f8fafc", "color": "white", "background": "black"},
                },
            ),
        ]
    )
])  #, style={"height": "200px"})

# @app.callback(
#     Output("gantt-chart", "data"),
#     Input("gantt-chart", "lastExpandedRow"),
#     Input("data-lookup", "data"),
#     State("gantt-chart", "data"),
#     # State("data-lookup", "data"),
#     prevent_initial_call=True
# )
# def show_expansion_info(expanded_row_info, data_lookup, gantt_data):
#     print(f"ID of last expanded row: {expanded_row_info}. \n sleeping for 2 seconds.")
#     # time.sleep(0.3)
#     if not expanded_row_info:
#         return "No expansion event yet"
#     data_lookup_key = expanded_row_info["id"]
    
#     print(f"Data lookup: {data_lookup}")

#     new_data_from_db = {
#         "id": "childtask1",
#         "name": "task one",
#         "status": "failed",
#         "start": "2023-10-01 14:28",
#         "end": "2023-10-01 14:52",  
#         "label": "job One",
#         "children": []
#     }
#     data_lookup[data_lookup_key]["children"] = new_data_from_db

#     # if len(data[1]["children"]) < 2:
#     print(data_lookup)
    
        
#     return gantt_data


@app.callback(
    Output("button", "children"),
    [Input("button", "n_clicks")],
    prevent_initial_call=True
)
def update_inner_dash_gantt_component(n_clicks):
    set_props("gantt-chart", {"expandedRowsData": {}})
    return "Button"

# @app.callback(
#     Output("gantt-container", "children"),
#     [Input("button", "n_clicks")],
#     prevent_initial_call=True
# )
# def update_inner_dash_gantt_component(n_clicks) -> dict[str, str]:
    
              


if __name__ == '__main__':
    app.run(debug=False)