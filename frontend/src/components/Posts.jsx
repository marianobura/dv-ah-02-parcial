import { useState } from "react";
import Card from '../components/Card'

function Posts() {
    let [posts, setPosts] = useState([]);

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

    return (
        <>
            <h2 className="text-xl font-bold mt-4 mb-2">Posteos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map(post => (
                    <Card
                        key={post.id}
                        method={`Post: ${post.title}`}
                        endpoint={`Tags: ${post.tags.join(", ")}`}
                        description={`Likes: ${post.likes}, Dislikes: ${post.dislikes}, Vistas: ${post.views}`}
                    />
                ))}
            </div>
        </>
    );
};

export default Posts;