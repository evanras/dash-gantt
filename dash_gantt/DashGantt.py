# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class DashGantt(Component):
    """A DashGantt component.
DashGantt is a React component that creates an interactive Gantt chart.
It supports hierarchical data, timeline visualization, and both bar and line
chart representations. Features include horizontal scrolling, expandable rows,
and configurable styling.

@component
@param {Object} props
@param {string} [props.id] - Component identifier for Dash callbacks
@param {Array<Object>} props.data - Hierarchical data structure for the Gantt chart
@param {string} [props.title="Jobs"] - Title displayed in the left column
@param {Date|string} props.startDate - Start date for the timeline
@param {Date|string} props.endDate - End date for the timeline
@param {Date|string} [props.currentTime] - Current time for timeline indicator
@param {Object} props.timeScale - Configuration for timeline intervals
@param {number} [props.columnWidth=100] - Width of timeline columns in pixels
@param {string|number} [props.maxHeight='80vh'] - Maximum height of the component
@param {Object} [props.colorMapping] - Configuration for mapping data values to colors
@param {Array<string>} [props.tooltipFields] - Fields to display in tooltips
@param {Object} [props.expandedRowsData={}] - Current expanded state of rows
@param {Object} [props.lastExpandedRow] - Information about the last row expanded/collapsed
@param {Object} [props.styles] - Custom styles for component parts
@param {Object} [props.classNames] - Custom CSS classes
@param {Function} [props.setProps] - Dash callback property

Keyword arguments:

- id (string; optional):
    Optional ID used to identify this component in Dash callbacks.

- classNames (dict; optional):
    Optional custom CSS classes.

    `classNames` is a dict with keys:

    - container (string; optional)

    - header (string; optional)

    - jobs (string; optional)

    - timeline (string; optional)

    - taskBar (string; optional)

    - timeCell (string; optional)

    - caretButton (string; optional)

- colorMapping (dict; default {    key: 'status',    map: {        'completed': '#4CAF50',        'in_progress': '#FFA726',        'pending': '#90CAF9'    }}):
    Optional configuration for color mapping.

    `colorMapping` is a dict with keys:

    - key (string; required)

    - map (dict with strings as keys and values of type string; required)

- columnWidth (number; default 100):
    Optional width for timeline columns.

- currentTime (string; optional):
    Optional current time to show indicator.

- data (list of dicts; required):
    Required data structure defining the Gantt chart.

    `data` is a list of dicts with keys:

    - id (string | number; required)

    - name (string; required)

    - icon (string; optional)

    - children (list; optional)

    - start (string; optional)

    - end (string; optional)

    - label (string; optional)

    - status (string; optional)

    - displayType (a value equal to: 'bar', 'line'; optional)

    - dates (list of strings; optional)

    - values (list of numbers; optional)

    - color (string; optional)

- endDate (string; required):
    Required end date for the timeline.

- expandedRowsData (dict; optional):
    Current expanded state of rows, mapping row IDs to boolean
    expanded state.

- lastExpandedRow (dict; optional):
    Information about the last row that was expanded or collapsed.

    `lastExpandedRow` is a dict with keys:

    - id (string | number; optional)

    - expanded (boolean; optional)

- maxHeight (string | number; default '80vh'):
    Optional maximum height of the component.

- startDate (string; required):
    Required start date for the timeline.

- styles (dict; optional):
    Optional custom styles for component parts.

    `styles` is a dict with keys:

    - container (dict; optional)

    - header (dict; optional)

    - jobs (dict; optional)

    - timeline (dict; optional)

    - taskBar (dict; optional)

    - timeCell (dict; optional)

    - caretButton (dict; optional)

    - currentTime (dict; optional)

- timeScale (dict; default {    unit: 'hours',    value: 1,    format: 'HH:mm'}):
    Required configuration for timeline scale and formatting.

    `timeScale` is a dict with keys:

    - unit (a value equal to: 'minutes', 'hours', 'days', 'weeks', 'months'; required)

    - value (number; required)

    - format (string; required)

- title (string; default "Jobs"):
    Optional title displayed in the top left corner.

- tooltipFields (list of strings; default ['name', 'status']):
    Optional fields to display in tooltips."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_gantt'
    _type = 'DashGantt'
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, data=Component.REQUIRED, title=Component.UNDEFINED, startDate=Component.REQUIRED, endDate=Component.REQUIRED, currentTime=Component.UNDEFINED, timeScale=Component.UNDEFINED, columnWidth=Component.UNDEFINED, maxHeight=Component.UNDEFINED, colorMapping=Component.UNDEFINED, tooltipFields=Component.UNDEFINED, expandedRowsData=Component.UNDEFINED, lastExpandedRow=Component.UNDEFINED, styles=Component.UNDEFINED, classNames=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'classNames', 'colorMapping', 'columnWidth', 'currentTime', 'data', 'endDate', 'expandedRowsData', 'lastExpandedRow', 'maxHeight', 'startDate', 'styles', 'timeScale', 'title', 'tooltipFields']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'classNames', 'colorMapping', 'columnWidth', 'currentTime', 'data', 'endDate', 'expandedRowsData', 'lastExpandedRow', 'maxHeight', 'startDate', 'styles', 'timeScale', 'title', 'tooltipFields']
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
