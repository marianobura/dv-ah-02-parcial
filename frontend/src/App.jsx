import Header from './components/Header';
import Footer from './components/Footer';
import Column from './components/Column';
import Card from './components/Card';
import Registro from './views/Registro';
import Login from './views/Login';

import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
    let [recargar, setRecargar] = useState(false);
    let [logeado, setLogeado] = useState(false);
    let [users, setUsers] = useState([]);
    let [posts, setPosts] = useState([]);
    let [comments, setComments] = useState([]);
    // const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        console.log('Se renderizó el componente');
        // const getCategories = async () => {
        //     const resp = await fetch('http://localhost:3000/api/productos');
        //     const data = await resp.json();
        //     console.log(data);
        //     setCategorias(data);
        // };

        const GetUsers = async () => {
            try {
                const resp = await fetch('http://localhost:3000/api/users');
                const data = await resp.json();

                if (!data.data) {
                    throw new Error("La propiedad 'data' no está definida en la respuesta de la API");
                }

                // Ahora actualizamos el estado con los usuarios obtenidos
                setUsers(data.data.map(user => ({
                    id: user._id,
                    username: user.username,
                    password: user.password,
                })));
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
            }
        };

        const GetPosts = async () => {
            try {
                const resp = await fetch('http://localhost:3000/api/posts');
                const data = await resp.json();
        
                if (!data.data) {
                    throw new Error("La propiedad 'data' no está definida en la respuesta de la API");
                }
        
                // Ahora actualizamos el estado con los posts obtenidos
                setPosts(data.data.map(post => ({
                    id: post._id,
                    title: post.title,
                    body: post.body,
                    tags: post.tags,  // Este es un arreglo de tags
                    likes: post.reactions.likes,
                    dislikes: post.reactions.dislikes,
                    views: post.views,
                    userId: post.userId
                })));
            } catch (error) {
                console.error('Error al obtener posts:', error);
            }
        };
        

        const GetComments = async () => {
            try {
                const resp = await fetch('http://localhost:3000/api/comments');
                const data = await resp.json();
        
                if (!data.data) {
                    throw new Error("La propiedad 'data' no está definida en la respuesta de la API");
                }
        
                // Ahora actualizamos el estado con los comentarios obtenidos
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
        

        if (logeado) {
            GetUsers(); 
            GetPosts();
            GetComments();
        }
        
    }, [recargar, logeado]);

    const iniciarRecarga = () => {
        setRecargar(!recargar);
    };

    const login = () => {
        console.log('Iniciar sesión');
        setLogeado(true);
    };

    const logout = () => {
        console.log('Cerrar sesión');
        setLogeado(false);
        setUsers([]);
    };

    let mensaje = logeado ? 'Cerrar sesión' : 'Iniciar sesión';

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
        <>
            <Header />
            <h3>{mensaje}</h3>
            <button onClick={iniciarRecarga}>Recargar</button>
            <button onClick={login}>Login</button>
            <button onClick={logout}>Logout</button>

            <Routes>
                <Route path="/registro" element={<Registro />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<DataDisplay data={data} />} />
                <Route path="*" element={<p>Página no encontrada</p>} />
            </Routes>


            {logeado && (
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
)}



            <Footer />
        </>
    );
}

function DataDisplay({ data }) {
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
    );
}

export default App;
