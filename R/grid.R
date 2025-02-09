# AUTO GENERATED FILE - DO NOT EDIT

#' @export
grid <- function(columnWidth=NULL, currentTime=NULL, endDate=NULL, rowHeight=NULL, startDate=NULL, tasks=NULL, timeScale=NULL) {
    
    props <- list(columnWidth=columnWidth, currentTime=currentTime, endDate=endDate, rowHeight=rowHeight, startDate=startDate, tasks=tasks, timeScale=timeScale)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'Grid',
        namespace = 'dash_gantt',
        propNames = c('columnWidth', 'currentTime', 'endDate', 'rowHeight', 'startDate', 'tasks', 'timeScale'),
        package = 'dashGantt'
        )

    structure(component, class = c('dash_component', 'list'))
}
