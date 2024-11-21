import { useState } from "react";
import Card from '../components/Card';

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
                userId: comment.userId,
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
                    <Card
                        key={comment.id}
                        method="Comentario"
                        endpoint={`Usuario ID: ${comment.userId} | Post ID: ${comment.postId}`}
                        description={`Comentario: ${comment.body} | Likes: ${comment.likes}`}
                    />
                ))}
            </div>
        </>
    );
};

export default Comments;