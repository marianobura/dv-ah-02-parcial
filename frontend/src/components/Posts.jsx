import { useState, useEffect } from "react";
import Card from '../components/Card';

function Posts() {
    let [posts, setPosts] = useState([]);
    let [formData, setFormData] = useState({ title: '', body: '', tags: '', likes: '', dislikes: '', views: '', userId: '' });
    let [method, setMethod] = useState("POST");

    useEffect(() => {
        const getPosts = async () => {
            try {
                const resp = await fetch('http://localhost:3000/api/posts');
                const data = await resp.json();
                if (!data.data) {
                    throw new Error("La propiedad 'data' no está definida en la respuesta de la API");
                }
                setPosts(data.data.map(post => ({
                    id: post._id,
                    title: post.title,
                    body: post.body,
                    tags: post.tags, 
                    likes: post.reactions.likes,
                    dislikes: post.reactions.dislikes,
                    views: post.views,
                    userId: post.userId
                })));
            } catch (error) {
                console.error('Error al obtener posts:', error);
            }
        };

        getPosts();
    }, []); // Solo se ejecuta una vez al montar el componente

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para enviar el formulario dependiendo del método seleccionado (POST, PUT, DELETE)
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
                    onChange={(e) => setFormData({...formData, tags: e.target.value.split(',')})}
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
