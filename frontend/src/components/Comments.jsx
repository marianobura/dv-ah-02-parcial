import { useState } from "react";

function Comments() {
    let [comments, setComments] = useState([]);

    const getComments = async () => {
        try {
            const resp = await fetch('http://localhost:3000/api/comments');
            const data = await resp.json();
    
            if (!data.data) {
                throw new Error("La propiedad 'data' no está definida en la respuesta de la API");
            }
    
            setComments(data.data.map(comment => ({
                id: comment._id,
                body: comment.body,
                likes: comment.likes,
                username: comment.user.username,
                userId: comment.user._id,
                postId: comment.postId
            })));
        } catch (error) {
            console.error('Error al obtener comentarios:', error);
        }
    };

    getComments();

    return (
        <>
            <h2 className="text-xl font-bold mt-4 mb-2">Comentarios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {comments.map(comment => (
                    <li key={comment.postId} className="flex justify-between gap-x-6 py-5">
                        <div className="flex min-w-0 gap-x-4">
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm/6 font-semibold text-gray-900">Usuario: {comment.username} ({comment.userId})</p>
                                <p className="mt-1 truncate text-xs/5 text-gray-500">{comment.body}</p>
                                <p className="text-sm/6 text-gray-900">Likes: {comment.likes}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </div>
        </>
    );
};

export default Comments;