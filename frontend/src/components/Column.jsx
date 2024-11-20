function Column(props) {
    return (
        <section id={props.id} className="mb-4">
            <h2 className="font-semibold text-3xl mb-2">{props.label}</h2>
            <div className="flex flex-col gap-2 p-2 border rounded-md">
                {props.children}
            </div>
        </section>
    );
}


export default Column;