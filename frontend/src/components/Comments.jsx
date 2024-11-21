import { useState, useEffect } from "react";

function Comments() {
    let [comments, setComments] = useState([]);
    let [formData, setFormData] = useState({ id: '', body: '', likes: '', userId: '', postId: '' });
    let [method, setMethod] = useState("POST");

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

    useEffect(() => {
        getComments();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const url = method === "DELETE" || method === "PUT" 
            ? `http://localhost:3000/api/comments/${formData.id}`
            : `http://localhost:3000/api/comments`;
    
        try {
            let response;
            if (method === "DELETE") {
                response = await fetch(url, {
                    method: "DELETE",
                });
            } else if (method === "PUT") {
                response = await fetch(url, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        body: formData.body,
                        likes: formData.likes,
                        postId: formData.postId,
                    }),
                });
            } else if (method === "POST") {
                response = await fetch(url, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
            }
    
            if (response.ok) {
                await getComments();
            } else {
                throw new Error("Error al enviar el formulario");
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
    };
    
    

    return (
        <>
            <h2 className="text-xl font-bold mt-4 mb-2">Comentarios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {comments.map((comment) => (
                    <li key={comment.id} className="flex justify-between gap-x-6 py-5">
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

            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="id" 
                    placeholder="ID del Comentario" 
                    value={formData.id}
                    onChange={(e) => setFormData({...formData, id: e.target.value})}
                />
                <input 
                    type="text" 
                    name="body" 
                    placeholder="Comentario" 
                    value={formData.body}
                    onChange={(e) => setFormData({...formData, body: e.target.value})}
                />
                <input 
                    type="number" 
                    name="likes" 
                    placeholder="Likes" 
                    value={formData.likes}
                    onChange={(e) => setFormData({...formData, likes: e.target.value})}
                />
                <input 
                    type="text" 
                    name="userId" 
                    placeholder="ID Usuario" 
                    value={formData.userId}
                    onChange={(e) => setFormData({...formData, userId: e.target.value})}
                />
                <input 
                    type="text" 
                    name="postId" 
                    placeholder="ID Post" 
                    value={formData.postId}
                    onChange={(e) => setFormData({...formData, postId: e.target.value})}
                />

                <select onChange={(e) => setMethod(e.target.value)} value={method}>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                </select>
                <button type="submit">Enviar</button>
            </form>
        </>
    );
}

export default Comments;
