// Card.jsx
function Card({ method, endpoint, description }) {
    const colors = {
        GET: {
            bg: "bg-blue-50",
            labelBg: "bg-blue-700",
        },
        POST: {
            bg: "bg-green-50",
            labelBg: "bg-green-700",
        },
        DELETE: {
            bg: "bg-red-50",
            labelBg: "bg-red-700",
        },
        PUT: {
            bg: "bg-yellow-50",
            labelBg: "bg-yellow-700",
        },
    };

    const color = colors[method];

    return (
        <div className={`border p-2 ${color.bg}`}>
            <div className="flex items-center gap-1">
                <div className={`text-sm text-white font-semibold px-2 rounded-full w-fit ${color.labelBg}`}>
                    {method}
                </div>
                <p className="font-medium">{endpoint}</p>
            </div>
            <p>{description}</p>
        </div>
    );
}

export default Card;