# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class TimelineBar(Component):
    """A TimelineBar component.
TimelineBar renders a single task bar within the Gantt chart timeline.
It handles the visual representation of a task with a defined start and end time.

@component
@param {Object} props
@param {Object} props.item - The task data object
@param {number} props.position - Left position as percentage of timeline width
@param {number} props.width - Width as percentage of timeline width
@param {string} props.color - Color code for the task bar
@param {string} [props.label] - Optional text to display inside the bar
@param {string} [props.tooltipContent] - Content to show in tooltip on hover

Keyword arguments:

- color (string; required)

- item (dict; required)

- label (string; optional)

- position (number; required)

- tooltipContent (string; optional)

- width (number; required)"""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_gantt'
    _type = 'TimelineBar'
    @_explicitize_args
    def __init__(self, item=Component.REQUIRED, position=Component.REQUIRED, width=Component.REQUIRED, color=Component.REQUIRED, label=Component.UNDEFINED, tooltipContent=Component.UNDEFINED, **kwargs):
        self._prop_names = ['color', 'item', 'label', 'position', 'tooltipContent', 'width']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['color', 'item', 'label', 'position', 'tooltipContent', 'width']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        for k in ['color', 'item', 'position', 'width']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')

        super(TimelineBar, self).__init__(**args)
