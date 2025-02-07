# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class DashGantt(Component):
    """A DashGantt component.
DashGantt is a React component that creates an interactive Gantt chart with support for
hierarchical data, timeline visualization, and both bar and line chart representations.
It supports horizontal scrolling for timeline data while maintaining a fixed left column
for job descriptions.

Keyword arguments:

- id (string; optional):
    Optional(str): The ID used to identify this component in Dash
    callbacks.

- className (dict; optional):
    Optional(Dict[str, Any]): Custom CSS classes for different parts
    of the component. Allows Dash developers to apply their own CSS
    classes.

    `className` is a dict with keys:

    - container (string; optional)

    - header (string; optional)

    - jobs (string; optional)

    - timeline (string; optional)

    - taskBar (string; optional)

    - timeCell (string; optional)

    - caretButton (string; optional)

- colorMapping (dict; default {    key: 'status',    map: {        'completed': '#4CAF50',        'in_progress': '#FFA726',        'pending': '#90CAF9'    }}):
    Optional(Dict[str, Any]): Configuration for mapping data values to
    colors. key: The field in data items to use for color mapping map:
    Object mapping field values to color strings (e.g.,
    {\"completed\": \"green\", \"pending\": \"orange\"}).

    `colorMapping` is a dict with keys:

    - key (string; required)

    - map (dict; required)

- columnWidth (number; default 100):
    Optional(number): Width in pixels for each column in the timeline
    view. Default is 100.

- currentTime (string; optional):
    Optional(str | dt.datetime): The current time attribute defines
    where to display a vertical cutoff line.

- data (list of dicts; required):
    Optional(Dict[str, Any]): The data structure defining the Gantt
    chart. Hierarchical data is supported.  Optionally configure
    whether the coresponding timeline visual is a bar or line chart.
    When setting  displayType = 'line', 'dates' and 'values' must also
    be included.

    `data` is a list of dicts with keys:

    - id (string | number; required)

    - name (string; required)

    - icon (string; optional)

    - start (string; optional)

    - end (string; optional)

    - displayType (a value equal to: 'bar', 'line'; optional)

    - dates (list of strings; optional)

    - values (list of numbers; optional)

    - color (string; optional)

    - children (list; optional)

    - label (string; optional)

- endDate (string; required):
    Required(str | dt.datetime): The very last date the timeline view
    will end with.

- maxHeight (string | number; default '80vh'):
    Optional(str | number): Maximum height of the component. Can be
    pixel value or CSS string. Default is '80vh'.

- startDate (string; required):
    Required(str | dt.datetime): The very first date the timeline view
    will begin with.

- styles (dict; optional):
    Optional(Dict[str, Any]): Custom styles for different parts of the
    component. Available style objects: container: Styles for the main
    container header: Styles for the header section jobs: Styles for
    the jobs column timeline: Styles for the timeline section taskBar:
    Styles for individual task bars timeCell: Styles for timeline
    header cells caretButton: Styles for expand/collapse buttons.

    `styles` is a dict with keys:

    - container (dict; optional)

    - header (dict; optional)

    - jobs (dict; optional)

    - timeline (dict; optional)

    - taskBar (dict; optional)

    - timeCell (dict; optional)

    - caretButton (dict; optional)

- timeScale (dict; default {    unit: 'hours',    value: 1,    format: 'HH:mm'}):
    Required(Dict[str, Any]): Configuration for the timeline scale and
    formatting. unit: The time unit for intervals ('minutes', 'hours',
    'days', 'weeks', 'months') value: The number of units between each
    interval format: The moment.js format string for displaying dates.

    `timeScale` is a dict with keys:

    - unit (a value equal to: 'minutes', 'hours', 'days', 'weeks', 'months'; required)

    - value (number; required)

    - format (string; required)

- title (string; optional):
    Optional(str): The title to display in the top left corner above
    the tasks window.

- tooltipFields (list of strings; default ['name', 'status']):
    Optional(List[str]): List of field names from the data items to
    display in tooltips when hovering over bars."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_gantt'
    _type = 'DashGantt'
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, data=Component.REQUIRED, title=Component.UNDEFINED, startDate=Component.REQUIRED, endDate=Component.REQUIRED, currentTime=Component.UNDEFINED, timeScale=Component.UNDEFINED, columnWidth=Component.UNDEFINED, maxHeight=Component.UNDEFINED, colorMapping=Component.UNDEFINED, tooltipFields=Component.UNDEFINED, styles=Component.UNDEFINED, className=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'className', 'colorMapping', 'columnWidth', 'currentTime', 'data', 'endDate', 'maxHeight', 'startDate', 'styles', 'timeScale', 'title', 'tooltipFields']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'className', 'colorMapping', 'columnWidth', 'currentTime', 'data', 'endDate', 'maxHeight', 'startDate', 'styles', 'timeScale', 'title', 'tooltipFields']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        for k in ['data', 'endDate', 'startDate']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')

        super(DashGantt, self).__init__(**args)
