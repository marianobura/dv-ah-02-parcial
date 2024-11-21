import { useState, useEffect } from "react";
import Card from '../components/Card';

function Posts() {
    const [posts, setPosts] = useState([]);
    const [formData, setFormData] = useState({ title: '', body: '', tags: '', likes: '', dislikes: '', views: '', userId: '', id: '' });
    const [method, setMethod] = useState("POST");

    useEffect(() => {
        getPosts(); 
    }, []);
    
    const getPosts = async () => {
        try {
            const resp = await fetch('http://localhost:3000/api/posts');
            const data = await resp.json();
            if (Array.isArray(data.data)) {
                console.log(data.data); 
                setPosts(data.data.map(post => ({
                    id: post._id,
                    title: post.title,
                    body: post.body,
                    tags: post.tags || [],
                    likes: post.reactions.likes,
                    dislikes: post.reactions.dislikes,
                    views: post.views,
                    userId: post.userId
                })));
            } else {
                console.error("La respuesta no contiene un arreglo de posts.");
            }
        } catch (error) {
            console.error('Error al obtener posts:', error);
        }
    };
    

    useEffect(() => {
        getPosts(); 
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = 'http://localhost:3000/api/posts';
        let response;
        const tagsArray = formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [];

        try {
            if (method === 'POST') {
                response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title: formData.title,
                        body: formData.body,
                        tags: tagsArray,
                        reactions: { likes: formData.likes, dislikes: formData.dislikes },
                        views: formData.views,
                        userId: formData.userId,
                    }),
                });
            } else if (method === 'PUT') {
                response = await fetch(`${url}/${formData.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title: formData.title,
                        body: formData.body,
                        tags: tagsArray,
                        reactions: { likes: formData.likes, dislikes: formData.dislikes },
                        views: formData.views,
                        userId: formData.userId,
                    }),
                });
            } else if (method === 'DELETE') {
                response = await fetch(`${url}/${formData.id}`, { method: 'DELETE' });
            }

            if (response.ok) {
                const data = await response.json();
                console.log('Respuesta del servidor:', data);
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map(post => (
                    <div key={post.id} className="post-item">
                        <Card
                            method={`Post: ${post.title}`}
                            endpoint={`Tags: ${post.tags.join(", ")}`}
                            description={`Likes: ${post.likes}, Dislikes: ${post.dislikes}, Vistas: ${post.views}`}
                        />
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="id" 
                    placeholder="ID del Post" 
                    value={formData.id}
                    onChange={(e) => setFormData({...formData, id: e.target.value})}
                />
                <input 
                    type="text" 
                    name="title" 
                    placeholder="Título" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
                <input 
                    type="text" 
                    name="body" 
                    placeholder="Cuerpo" 
                    value={formData.body}
                    onChange={(e) => setFormData({...formData, body: e.target.value})}
                />
                <input 
                    type="text" 
                    name="tags" 
                    placeholder="Etiquetas" 
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                />
                <input 
                    type="number" 
                    name="likes" 
                    placeholder="Likes" 
                    value={formData.likes}
                    onChange={(e) => setFormData({...formData, likes: e.target.value})}
                />
                <input 
                    type="number" 
                    name="dislikes" 
                    placeholder="Dislikes" 
                    value={formData.dislikes}
                    onChange={(e) => setFormData({...formData, dislikes: e.target.value})}
                />
                <input 
                    type="number" 
                    name="views" 
                    placeholder="Vistas" 
                    value={formData.views}
                    onChange={(e) => setFormData({...formData, views: e.target.value})}
                />
                <input 
                    type="text" 
                    name="userId" 
                    placeholder="ID Usuario" 
                    value={formData.userId}
                    onChange={(e) => setFormData({...formData, userId: e.target.value})}
                />

                <select onChange={(e) => setMethod(e.target.value)}>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                </select>
                <button type="submit">Enviar</button>
            </form>
        </>
    );
}

export default Posts;
