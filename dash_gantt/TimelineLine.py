# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class TimelineLine(Component):
    """A TimelineLine component.
TimelineLine renders a line chart representation of time series data.
It includes gradient fills and is bounded by the row height.

@component
@param {Object} props
@param {Array<Object>} props.data - Array of data points with date and value
@param {string} props.color - Color code for the line and gradient
@param {number} props.position - Left position as percentage of timeline width
@param {number} props.width - Width as percentage of timeline width

Keyword arguments:

- color (string; required)

- data (list of dicts; required)

    `data` is a list of dicts with keys:

    - date (string; optional)

    - value (number; optional)

- position (number; required)

- width (number; required)"""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_gantt'
    _type = 'TimelineLine'
    @_explicitize_args
    def __init__(self, data=Component.REQUIRED, color=Component.REQUIRED, position=Component.REQUIRED, width=Component.REQUIRED, **kwargs):
        self._prop_names = ['color', 'data', 'position', 'width']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['color', 'data', 'position', 'width']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        for k in ['color', 'data', 'position', 'width']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')

        super(TimelineLine, self).__init__(**args)
