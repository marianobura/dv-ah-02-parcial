import { CornerDownRight, ThumbsUp } from "lucide-react";
import { useState, useEffect } from "react";

function Comments() {
    let [comments, setComments] = useState([]);
    let [formData, setFormData] = useState({ id: '', body: '', likes: '', userId: '', postId: '' });
    let [method, setMethod] = useState("POST");

    const getComments = async () => {
        try {
            const resp = await fetch('http://localhost:3000/api/comments');
            const data = await resp.json();
            
            setComments(data.data.map(comment => ({
                id: comment._id,
                body: comment.body,
                likes: comment.likes,
                username: comment.user.username,
                userId: comment.user._id,
                postId: comment.post
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
            <ul role="list" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {comments.map(comment => (
                    <li key={comment.id} className="p-3 border border-neutral-200">
                        <div className="flex items-center gap-4">
                            <div className="size-12 flex items-center justify-center bg-blue-800 rounded-full text-white">
                                {comment.username ? comment.username.charAt(0).toUpperCase() : '?'}
                            </div>
                            <div className="flex flex-col">
                                <p>{comment.username ? comment.username : 'No encontrado'}</p>
                                <p className="text-gray-500">Usuario: {comment.userId ? comment.userId : 'No encontrado'}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 mt-2">
                            <div className="flex gap-2 text-blue-500">
                                <CornerDownRight size={16} />
                                <span className="text-sm">Comentando en (Post: {comment.postId})</span>
                            </div>
                            <p>{comment.body}</p>
                        </div>
                        <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t">
                            <div className="flex items-center gap-2 border border-neutral-500 rounded-full px-2 py-1">
                                <ThumbsUp size={20} />
                                <p>{comment.likes}</p>
                            </div>
                            <p className="flex text-sm">Comentario: {comment.id}</p>
                        </div>
                    </li>
                ))}
            </ul>

            <form onSubmit={handleSubmit} className="pt-12">
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div className="w-full">
                        <label htmlFor="id" className="block font-medium text-gray-900">ID del comentario</label>
                        <div className="mt-2">
                            <input type="text" name="id" id="id" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6" value={formData.id} onChange={(e) => setFormData({...formData, id: e.target.value})} />
                        </div>
                    </div>
                    <div className="w-full">
                        <label htmlFor="body" className="block font-medium text-gray-900">Contenido</label>
                        <div className="mt-2">
                            <input type="text" name="body" id="body" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6" value={formData.body} onChange={(e) => setFormData({...formData, body: e.target.value})} />
                        </div>
                    </div>
                    <div className="w-full">
                        <label htmlFor="likes" className="block font-medium text-gray-900">Me gustas</label>
                        <div className="mt-2">
                            <input type="number" name="likes" id="likes" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6" value={formData.likes} onChange={(e) => setFormData({...formData, likes: e.target.value})} />
                        </div>
                    </div>
                    <div className="w-full">
                        <label htmlFor="userId" className="block font-medium text-gray-900">ID del usuario</label>
                        <div className="mt-2">
                            <input type="text" name="userId" id="userId" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6" value={formData.userId} onChange={(e) => setFormData({...formData, userId: e.target.value})} />
                        </div>
                    </div>
                    <div className="w-full">
                        <label htmlFor="postId" className="block font-medium text-gray-900">ID del post</label>
                        <div className="mt-2">
                            <input type="text" name="postId" id="postId" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6" value={formData.postId} onChange={(e) => setFormData({...formData, postId: e.target.value})} />
                        </div>
                    </div>
                    <div className="flex items-end gap-4">
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" onChange={(e) => setMethod(e.target.value)} value={method}>
                            <option value="POST">POST</option>
                            <option value="PUT">PUT</option>
                            <option value="DELETE">DELETE</option>
                        </select>
                        <button className="py-2.5 px-6 bg-blue-800 rounded-md text-white flex-1" type="submit">Enviar</button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default Comments;
