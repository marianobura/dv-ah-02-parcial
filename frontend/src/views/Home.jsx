import Column from '../components/Column'
import Card from '../components/Card'

function Home() {
    const data = {
        users: [
            { method: "GET", endpoint: "/api/users", description: "Obtiene todos los usuarios" },
            { method: "POST", endpoint: "/api/users/login", description: "Inicia sesión con un usuario" },
            { method: "GET", endpoint: "/api/users/:id", description: "Obtiene un usuario por ID" },
            { method: "DELETE", endpoint: "/api/users/:id", description: "Elimina un usuario por ID" },
            { method: "PUT", endpoint: "/api/users/:id", description: "Actualiza un usuario por ID" },
        ],
        posts: [
            { method: "GET", endpoint: "/api/posts", description: "Obtiene todos los posteos" },
            { method: "GET", endpoint: "/api/posts?sort=top", description: "Obtiene todos los posteos ordenados de mayor a menor likes" },
            { method: "GET", endpoint: "/api/posts?sort=views", description: "Obtiene todos los posteos ordenados de mayor a menor vistas" },
            { method: "GET", endpoint: "/api/posts/user/:userId", description: "Obtiene un posteo de un usuario por su ID" },
            { method: "GET", endpoint: "/api/posts/:id", description: "Obtiene un posteo por ID" },
            { method: "GET", endpoint: "/api/posts/name/:title", description: "Obtiene un posteo por su título" },
            { method: "POST", endpoint: "/api/posts", description: "Crea un nuevo posteo" },
            { method: "DELETE", endpoint: "/api/posts/:id", description: "Elimina un posteo por ID" },
            { method: "PUT", endpoint: "/api/posts/:id", description: "Actualiza un posteo por ID" },
        ],
        comments: [
            { method: "GET", endpoint: "/api/comments", description: "Obtiene todos los comentarios" },
            { method: "POST", endpoint: "/api/comments", description: "Crea un nuevo comentario" },
            { method: "GET", endpoint: "/api/comments/user/:userId", description: "Obtiene todos los comentarios de un usuario" },
            { method: "GET", endpoint: "/api/comments/:id", description: "Obtiene todos los comentarios de un post" },
            { method: "DELETE", endpoint: "/api/comments/:id", description: "Elimina un comentario por ID" },
            { method: "PUT", endpoint: "/api/comments/:id", description: "Actualiza un comentario por ID" },
        ],
    };

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-8">
            <Column id="user" label="Usuarios">
                <h2 className="sr-only">Usuarios</h2>
                {data.users.map((user, index) => (
                    <Card key={index} method={user.method} endpoint={user.endpoint} description={user.description} />
                ))}
            </Column>
            <Column id="post" label="Posteos">
                <h2 className="sr-only">Posteos</h2>
                {data.posts.map((post, index) => (
                    <Card key={index} method={post.method} endpoint={post.endpoint} description={post.description} />
                ))}
            </Column>
            <Column id="comment" label="Comentarios">
                <h2 className="sr-only">Comentarios</h2>
                {data.comments.map((comment, index) => (
                    <Card key={index} method={comment.method} endpoint={comment.endpoint} description={comment.description} />
                ))}
            </Column>
        </section>
    )
}

export default Home;