import { useState, useEffect, useContext } from "react";
import { Eye, ThumbsDown, ThumbsUp } from 'lucide-react';
import { AuthContext } from '../utils/AuthContext';

function Posts() {
    const { user } = useContext(AuthContext);
    const { token } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [formData, setFormData] = useState({ title: '', body: '', tags: '', likes: '', dislikes: '', views: '', userId: '', id: '' });
    const [method, setMethod] = useState("POST");
    const [message, setMessage] = useState('');


    useEffect(() => {
        getPosts(); 
    }, []);
    
    const getPosts = async () => {
        try {
            const resp = await fetch('http://localhost:3000/api/posts', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await resp.json();

            setPosts(data.data.map(post => ({
                id: post._id,
                title: post.title,
                body: post.body,
                tags: post.tags || [],
                likes: post.reactions.likes,
                dislikes: post.reactions.dislikes,
                views: post.views,
                userId: post.user._id,
                username: post.user.username,
            })));
        } catch (error) {
            console.error('Error al obtener posts:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        const url = 'http://localhost:3000/api/posts';
        let response;
        const tagsArray = formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [];

        try {
            if (method === 'POST') {
                response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify({
                        title: formData.title,
                        body: formData.body,
                        tags: tagsArray,
                        reactions: { likes: formData.likes, dislikes: formData.dislikes },
                        views: formData.views,
                        userId: formData.userId,
                    }),
                });
                setMessage('Posteo agregado')
            } else if (method === 'PUT') {
                response = await fetch(`${url}/${formData.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify({
                        title: formData.title,
                        body: formData.body,
                        tags: tagsArray,
                        reactions: { likes: formData.likes, dislikes: formData.dislikes },
                        views: formData.views,
                        userId: formData.userId,
                    }),
                });
                setMessage('Posteo editado')
            } else if (method === 'DELETE') {
                response = await fetch(`${url}/${formData.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                });
                setMessage('Posteo eliminado')
            }

            if (response.ok) {
                const data = await response.json();
                if (method === 'POST') {
                    setPosts(prevPosts => [...prevPosts, data.data]);
                } else if (method === 'PUT') {
                    setPosts(prevPosts => prevPosts.map(post => post.id === formData.id ? data.data : post));
                } else if (method === 'DELETE') {
                    setPosts(prevPosts => prevPosts.filter(post => post.id !== formData.id));
                }
                getPosts();
            } else {
                const errorDetails = await response.text();
                console.error('Error al procesar la solicitud:', errorDetails);
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
        }
    };

    return (
        <>
            <h2 className="text-xl font-bold mt-4 mb-2">Posteos</h2>
            <ul role="list" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {posts.map(post => (
                    <li key={post.id} className="p-3 border border-neutral-200">
                        <div className="flex items-center gap-4">
                            <div className="size-12 flex items-center justify-center bg-blue-800 rounded-full text-white">
                                {post.username ? post.username.charAt(0).toUpperCase() : '?'}
                            </div>
                            <div className="flex flex-col">
                                <p>{post.username ? post.username : 'No encontrado'}</p>
                                <p className="text-gray-500">Usuario: {post.userId ? post.userId : 'No encontrado'}</p>
                            </div>
                        </div>
                        <div className="mt-2">
                            <h3 className="text-lg font-bold">{post.title}</h3>
                            <p>{post.body}</p>
                        </div>
                        <div className="mt-2">
                            <div className="flex gap-2 text-white">
                                {post.tags.map((tag, index) => (
                                    <span key={index} className="rounded-full bg-blue-800 text-white px-2 py-1 text-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t">
                            <div className="flex gap-2">
                                <div className="flex items-center gap-2 border border-neutral-500 rounded-full px-2 py-1">
                                    <Eye size={20} />
                                    <p>{post.views}</p>
                                </div>
                                <div className="flex items-center gap-2 border border-neutral-500 rounded-full px-2 py-1">
                                    <ThumbsUp size={20} />
                                    <p>{post.likes}</p>
                                </div>
                                <div className="flex items-center gap-2 border border-neutral-500 rounded-full px-2 py-1">
                                    <ThumbsDown size={20} />
                                    <p>{post.dislikes}</p>
                                </div>
                            </div>
                            <p className="inline text-sm">Post: {post.id}</p>
                        </div>
                    </li>
                ))}
            </ul>

            {user ? (
                <>
                    {message && (
                        <p className={`mt-2 text-sm font-semibold w-fit rounded-md p-2 ${
                                message.includes('editado') ? 'text-blue-800 bg-blue-200 border border-blue-800'
                                : message.includes('eliminado') ? 'text-red-800 bg-red-200 border border-red-800'
                                : 'text-green-800 bg-green-200 border border-green-800'
                        }`}>{message}</p>
                    )}

                    <form onSubmit={handleSubmit} className="mt-12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {method === 'DELETE' && (
                                <>
                                    <div className="w-full">
                                        <label htmlFor="id" className="block font-medium text-gray-900">ID del post</label>
                                        <div className="mt-2">
                                            <input type="text" name="id" id="id" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6" value={formData.id} onChange={(e) => setFormData({...formData, id: e.target.value})} />
                                        </div>
                                    </div>
                                </>
                            )}
                            {method !== 'DELETE' && (
                                <>
                                    {method === 'PUT' && (
                                        <div className="w-full">
                                            <label htmlFor="id" className="block font-medium text-gray-900">ID del post</label>
                                            <div className="mt-2">
                                                <input type="text" name="id" id="id" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6" value={formData.id} onChange={(e) => setFormData({...formData, id: e.target.value})} />
                                            </div>
                                        </div>
                                    )}
                                    <div className="w-full">
                                        <label htmlFor="title" className="block font-medium text-gray-900">Título</label>
                                        <div className="mt-2">
                                            <input type="text" name="title" id="title" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="body" className="block font-medium text-gray-900">Contenido</label>
                                        <div className="mt-2">
                                            <input type="text" name="body" id="body" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6" value={formData.body} onChange={(e) => setFormData({...formData, body: e.target.value})} />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="tags" className="block font-medium text-gray-900">Etiquetas</label>
                                        <div className="mt-2">
                                            <input type="text" name="tags" id="tags" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6" value={formData.tags} onChange={(e) => setFormData({...formData, tags: e.target.value})} />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="likes" className="block font-medium text-gray-900">Me gustas</label>
                                        <div className="mt-2">
                                            <input type="number" name="likes" id="likes" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6" value={formData.likes} onChange={(e) => setFormData({...formData, likes: e.target.value})} />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="dislikes" className="block font-medium text-gray-900">No me gustas</label>
                                        <div className="mt-2">
                                            <input type="number" name="dislikes" id="dislikes" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6" value={formData.dislikes} onChange={(e) => setFormData({...formData, dislikes: e.target.value})} />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="views" className="block font-medium text-gray-900">Vistas</label>
                                        <div className="mt-2">
                                            <input type="number" name="views" id="views" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6" value={formData.views} onChange={(e) => setFormData({...formData, views: e.target.value})} />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="userId" className="block font-medium text-gray-900">ID del usuario</label>
                                        <div className="mt-2">
                                            <input type="text" name="userId" id="userId" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6" value={formData.userId} onChange={(e) => setFormData({...formData, userId: e.target.value})} />
                                        </div>
                                    </div>
                                </>
                            )}
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
            ) : (
                <>
                    <p className="mt-6">Inicia sesión para ver los posteos</p>
                </>
            )}
        </>
    );
}

export default Posts;
