# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class TimelineRow(Component):
    """A TimelineRow component.
TimelineRow determines whether to render a bar or line chart
based on the task type and data

Keyword arguments:

- rowHeight (number; required):
    Height of each row.

- task (dict; required):
    Task data object.

    `task` is a dict with keys:

    - id (string | number; required)

    - name (string; required)

    - displayType (a value equal to: 'bar', 'line'; optional)

- yPosition (number; required):
    Y position of this row."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_gantt'
    _type = 'TimelineRow'
    @_explicitize_args
    def __init__(self, task=Component.REQUIRED, rowHeight=Component.REQUIRED, yPosition=Component.REQUIRED, getXPosition=Component.REQUIRED, getWidth=Component.REQUIRED, getColor=Component.REQUIRED, **kwargs):
        self._prop_names = ['rowHeight', 'task', 'yPosition']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['rowHeight', 'task', 'yPosition']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        for k in ['rowHeight', 'task', 'yPosition']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')

        super(TimelineRow, self).__init__(**args)
