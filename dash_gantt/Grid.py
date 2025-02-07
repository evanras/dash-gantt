# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class Grid(Component):
    """A Grid component.
Grid component creates the background grid structure for the Gantt chart
including row backgrounds and time interval lines

Keyword arguments:

- columnWidth (number; required):
    Width of each column in pixels.

- currentTime (string; optional):
    Optional current time to show indicator.

- endDate (string; required):
    End date for the timeline.

- rowHeight (number; required):
    Height of each row in pixels.

- startDate (string; required):
    Start date for the timeline.

- tasks (list of dicts; required):
    Array of task objects to determine number of rows.

    `tasks` is a list of dicts with keys:

    - id (string | number; required)

- timeScale (dict; required):
    Configuration for time scale display.

    `timeScale` is a dict with keys:

    - unit (a value equal to: 'minutes', 'hours', 'days', 'weeks', 'months'; required)

    - value (number; required)

    - format (string; required)"""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_gantt'
    _type = 'Grid'
    @_explicitize_args
    def __init__(self, tasks=Component.REQUIRED, startDate=Component.REQUIRED, endDate=Component.REQUIRED, timeScale=Component.REQUIRED, rowHeight=Component.REQUIRED, columnWidth=Component.REQUIRED, currentTime=Component.UNDEFINED, **kwargs):
        self._prop_names = ['columnWidth', 'currentTime', 'endDate', 'rowHeight', 'startDate', 'tasks', 'timeScale']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['columnWidth', 'currentTime', 'endDate', 'rowHeight', 'startDate', 'tasks', 'timeScale']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        for k in ['columnWidth', 'endDate', 'rowHeight', 'startDate', 'tasks', 'timeScale']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')

        super(Grid, self).__init__(**args)
