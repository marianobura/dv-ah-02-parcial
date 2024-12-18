import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../utils/AuthContext';

function Users() {
    const { user } = useContext(AuthContext);
    const { token } = useContext(AuthContext);
    let [users, setUsers] = useState([]);
    let [formData, setFormData] = useState({ id: '', username: '', password: '' });
    let [method, setMethod] = useState("POST");
    const [message, setMessage] = useState('');

    const getUsers = async () => {
        try {
            const resp = await fetch('http://localhost:3000/api/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await resp.json();

            setUsers(data.data.map(user => ({
                id: user._id,
                username: user.username,
                email: user.email,
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
        setMessage('');

        const url = method === "DELETE" || method === "PUT" ? `http://localhost:3000/api/users/${formData.id}` : `http://localhost:3000/api/users`;

        try {
            let response;
            if (method === "DELETE") {
                response = await fetch(url, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                });
                setMessage('Usuario eliminado');
            } else if (method === "PUT") {
                response = await fetch(url, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                    body: JSON.stringify({
                        username: formData.username,
                        email: formData.email,
                        password: formData.password,
                    }),
                });
                setMessage('Usuario editado');
            } else if (method === "POST") {
                response = await fetch(url, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                    body: JSON.stringify(formData),
                });
                setMessage('Usuario agregado');
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
                                <div className="flex justify-between">
                                    <p className="font-medium text-gray-900 truncate">{user.username}</p>
                                    <span className="text-gray-500">ID: {user.id}</span>
                                </div>
                                <p className="text-gray-500 truncate">{user.email}</p>
                            </div>
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
                                {method === "DELETE" && (
                                    <>
                                        <div className="w-full">
                                            <label htmlFor="username-id" className="block font-medium text-gray-900">ID del usuario</label>
                                            <div className="mt-2">
                                                <input type="text" name="username-id" id="username-id" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6" value={formData.id} onChange={(e) => setFormData({...formData, id: e.target.value})} />
                                            </div>
                                        </div>
                                    </>
                                )}
                                {method !== "DELETE" && (
                                    <>
                                        {method === "PUT" && (
                                            <div className="w-full">
                                                <label htmlFor="username-id" className="block font-medium text-gray-900">ID del usuario</label>
                                                <div className="mt-2">
                                                    <input type="text" name="username-id" id="username-id" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6" value={formData.id} onChange={(e) => setFormData({...formData, id: e.target.value})} />
                                                </div>
                                            </div>
                                        )}
                                        <div className="w-full">
                                            <label htmlFor="email" className="block font-medium text-gray-900">Correo electrónico</label>
                                            <div className="mt-2">
                                                <input type="email" name="email" id="email" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
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
                    <p className="mt-6">Inicia sesión para ver los usuarios</p>
                </>
            )}
        </>
    );
}

export default Users;
