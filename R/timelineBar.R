# AUTO GENERATED FILE - DO NOT EDIT

#' @export
timelineBar <- function(color=NULL, item=NULL, label=NULL, position=NULL, tooltipContent=NULL, width=NULL) {
    
    props <- list(color=color, item=item, label=label, position=position, tooltipContent=tooltipContent, width=width)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'TimelineBar',
        namespace = 'dash_gantt',
        propNames = c('color', 'item', 'label', 'position', 'tooltipContent', 'width'),
        package = 'dashGantt'
        )

    structure(component, class = c('dash_component', 'list'))
}
