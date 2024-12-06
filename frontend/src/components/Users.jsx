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
            <h2 className="text-xl font-bold mt-4 mb-2">Usuarios</h2>
            <ul role="list" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {users.map((user) => (
                    <li key={user.id} className="p-3 border border-neutral-200">
                        <div className="flex items-center gap-4">
                            <div className="flex-shrink-0">
                                <div className="size-12 flex items-center justify-center bg-blue-800 rounded-full text-white">
                                    {user.username ? user.username.charAt(0).toUpperCase() : '?'}
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 truncate">
                                    {user.username}
                                </p>
                                <p className="text-gray-500 truncate">
                                    Usuario: {user.id}
                                </p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <form onSubmit={handleSubmit} className="pt-12">
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div className="w-full">
                        <label htmlFor="username-id" className="block font-medium text-gray-900">ID del usuario</label>
                        <div className="mt-2">
                            <input type="text" name="username-id" id="username-id" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6" value={formData.id} onChange={(e) => setFormData({...formData, id: e.target.value})} />
                        </div>
                    </div>
                    <div className="w-full">
                        <label htmlFor="username" className="block font-medium text-gray-900">Nombre de usuario</label>
                        <div className="mt-2">
                            <input type="text" name="username" id="username" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} />
                        </div>
                    </div>
                    <div className="w-full">
                        <label htmlFor="password" className="block font-medium text-gray-900">Contraseña</label>
                        <div className="mt-2">
                            <input type="password" name="password" id="password" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
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

export default Users;
