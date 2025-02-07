# AUTO GENERATED FILE - DO NOT EDIT

#' @export
timelineRow <- function(getColor=NULL, getWidth=NULL, getXPosition=NULL, rowHeight=NULL, task=NULL, yPosition=NULL) {
    
    props <- list(getColor=getColor, getWidth=getWidth, getXPosition=getXPosition, rowHeight=rowHeight, task=task, yPosition=yPosition)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'TimelineRow',
        namespace = 'dash_gantt',
        propNames = c('getColor', 'getWidth', 'getXPosition', 'rowHeight', 'task', 'yPosition'),
        package = 'dashGantt'
        )

    structure(component, class = c('dash_component', 'list'))
}
