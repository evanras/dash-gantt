# AUTO GENERATED FILE - DO NOT EDIT

#' @export
headerRow <- function(endDate=NULL, headerHeight=NULL, scrollLeft=NULL, startDate=NULL, timeScale=NULL, title=NULL) {
    
    props <- list(endDate=endDate, headerHeight=headerHeight, scrollLeft=scrollLeft, startDate=startDate, timeScale=timeScale, title=title)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'HeaderRow',
        namespace = 'dash_gantt',
        propNames = c('endDate', 'headerHeight', 'scrollLeft', 'startDate', 'timeScale', 'title'),
        package = 'dashGantt'
        )

    structure(component, class = c('dash_component', 'list'))
}
