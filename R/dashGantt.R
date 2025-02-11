# AUTO GENERATED FILE - DO NOT EDIT

#' @export
dashGantt <- function(id=NULL, classNames=NULL, colorMapping=NULL, columnWidth=NULL, currentTime=NULL, data=NULL, endDate=NULL, maxHeight=NULL, startDate=NULL, styles=NULL, timeScale=NULL, title=NULL, tooltipFields=NULL) {
    
    props <- list(id=id, classNames=classNames, colorMapping=colorMapping, columnWidth=columnWidth, currentTime=currentTime, data=data, endDate=endDate, maxHeight=maxHeight, startDate=startDate, styles=styles, timeScale=timeScale, title=title, tooltipFields=tooltipFields)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'DashGantt',
        namespace = 'dash_gantt',
        propNames = c('id', 'classNames', 'colorMapping', 'columnWidth', 'currentTime', 'data', 'endDate', 'maxHeight', 'startDate', 'styles', 'timeScale', 'title', 'tooltipFields'),
        package = 'dashGantt'
        )

    structure(component, class = c('dash_component', 'list'))
}
