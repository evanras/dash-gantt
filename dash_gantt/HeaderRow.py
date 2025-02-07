# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class HeaderRow(Component):
    """A HeaderRow component.
HeaderRow renders the timeline header with evenly spaced time intervals.
Handles dynamic column widths based on available space.

Keyword arguments:

- endDate (string; required):
    End date for the timeline.

- headerHeight (number; default 48):
    Height of the header in pixels.

- scrollLeft (number; required):
    Current scroll position.

- startDate (string; required):
    Start date for the timeline.

- timeScale (dict; required):
    Configuration for time scale display.

    `timeScale` is a dict with keys:

    - unit (a value equal to: 'minutes', 'hours', 'days', 'weeks', 'months'; required)

    - value (number; required)

    - format (string; required)

- title (string; default "Jobs"):
    Title displayed in the left column."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_gantt'
    _type = 'HeaderRow'
    @_explicitize_args
    def __init__(self, startDate=Component.REQUIRED, endDate=Component.REQUIRED, timeScale=Component.REQUIRED, headerHeight=Component.UNDEFINED, scrollLeft=Component.REQUIRED, title=Component.UNDEFINED, **kwargs):
        self._prop_names = ['endDate', 'headerHeight', 'scrollLeft', 'startDate', 'timeScale', 'title']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['endDate', 'headerHeight', 'scrollLeft', 'startDate', 'timeScale', 'title']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        for k in ['endDate', 'scrollLeft', 'startDate', 'timeScale']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')

        super(HeaderRow, self).__init__(**args)
