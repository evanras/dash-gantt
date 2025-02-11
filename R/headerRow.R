# AUTO GENERATED FILE - DO NOT EDIT

#' @export
headerRow <- function(endDate=NULL, headerHeight=NULL, scrollLeft=NULL, startDate=NULL, styles=NULL, timeScale=NULL, title=NULL, titleWidth=NULL) {
    
    props <- list(endDate=endDate, headerHeight=headerHeight, scrollLeft=scrollLeft, startDate=startDate, styles=styles, timeScale=timeScale, title=title, titleWidth=titleWidth)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'HeaderRow',
        namespace = 'dash_gantt',
        propNames = c('endDate', 'headerHeight', 'scrollLeft', 'startDate', 'styles', 'timeScale', 'title', 'titleWidth'),
        package = 'dashGantt'
        )

    structure(component, class = c('dash_component', 'list'))
}
