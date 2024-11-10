function Column(props) {
    return (
        <div id={props.id}>
            <h2 className="font-semibold text-3xl mb-2">{props.label}</h2>
            <div className="flex flex-col gap-2 p-2 border">
                {props.children}
            </div>
        </div>
    )
}

export default Column;