# AUTO GENERATED FILE - DO NOT EDIT

#' @export
timelineLine <- function(color=NULL, data=NULL, fill=NULL, position=NULL, width=NULL) {
    
    props <- list(color=color, data=data, fill=fill, position=position, width=width)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'TimelineLine',
        namespace = 'dash_gantt',
        propNames = c('color', 'data', 'fill', 'position', 'width'),
        package = 'dashGantt'
        )

    structure(component, class = c('dash_component', 'list'))
}
