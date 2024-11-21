import { useState } from "react";
import Card from '../components/Card'

function Crud() {
    let [users, setUsers] = useState([]);
    let [posts, setPosts] = useState([]);
    let [comments, setComments] = useState([]);

    const getUsers = async () => {
        try {
            const resp = await fetch('http://localhost:3000/api/users');
            const data = await resp.json();

            if (!data.data) {
                throw new Error("La propiedad 'data' no está definida en la respuesta de la API");
            }

            setUsers(data.data.map(user => ({
                id: user._id,
                username: user.username,
                password: user.password,
            })));
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
        }
    };

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

    getUsers(),
    getPosts(),
    getComments()

    return (
        <>
            <section className="container mx-auto px-4">
                <h2 className="text-xl font-bold mt-4 mb-2">Usuarios</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {users.map(user => (
                            <Card
                                key={user.id}
                                method="Usuario"
                                endpoint={`ID: ${user.id}`}
                                description={`Username: ${user.username} | Contraseña: ${user.password}`}
                            />
                        ))}
                    </div>
                <h2 className="text-xl font-bold mt-8 mb-2">Posteos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {posts.map(post => (
                        <Card
                            key={post.id}
                            method={`Post: ${post.title}`}
                            endpoint={`Tags: ${post.tags.join(', ')}`}
                            description={`Likes: ${post.likes}, Dislikes: ${post.dislikes}, Vistas: ${post.views}`}
                        />
                    ))}
                </div>

                <h2 className="text-xl font-bold mt-8 mb-2">Comentarios</h2>
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
            </section>
        </>
    )
}

export default Crud;