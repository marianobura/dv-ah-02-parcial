import { useState, useEffect } from "react";

function Users() {
    let [users, setUsers] = useState([]);
    let [formData, setFormData] = useState({ id: '', username: '', password: '' });
    let [method, setMethod] = useState("POST");

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

    useEffect(() => {
        getUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = method === "DELETE" || method === "PUT" 
            ? `http://localhost:3000/api/users/${formData.id}`
            : `http://localhost:3000/api/users`;

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
                        username: formData.username,
                        password: formData.password,
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
                await getUsers();
            } else {
                throw new Error("Error al enviar el formulario");
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
    };

    return (
        <>
            <ul role="list" className="divide-y divide-gray-100">
                {users.map((user) => (
                    <li key={user.id} className="flex flex-col justify-between gap-x-6 py-5">
                        <div className="w-fit px-2 py-1 rounded-full bg-gray-900 text-sm/3 text-white">ID: {user.id}</div>
                        <div className="flex min-w-0 gap-x-4">
                            <div className="min-w-0 flex-auto items-center">
                                <p className="text-sm/6 font-semibold text-gray-900">{user.username}</p>
                                <p className="text-sm/6 text-gray-600">{user.password}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="id" 
                    placeholder="ID del Usuario" 
                    value={formData.id}
                    onChange={(e) => setFormData({...formData, id: e.target.value})}
                />
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Nombre de Usuario" 
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Contraseña" 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
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

export default Users;
