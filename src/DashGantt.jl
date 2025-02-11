
module DashGantt
using Dash

const resources_path = realpath(joinpath( @__DIR__, "..", "deps"))
const version = "0.0.2"

include("jl/dashgantt.jl")
include("jl/headerrow.jl")
include("jl/timelinebar.jl")
include("jl/timelineline.jl")

function __init__()
    DashBase.register_package(
        DashBase.ResourcePkg(
            "dash_gantt",
            resources_path,
            version = version,
            [
                DashBase.Resource(
    relative_package_path = "dash_gantt.min.js",
    external_url = nothing,
    dynamic = nothing,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "dash_gantt.min.js.map",
    external_url = nothing,
    dynamic = true,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "DashGantt.css",
    external_url = nothing,
    dynamic = nothing,
    async = nothing,
    type = :css
)
            ]
        )

    )
end
end
