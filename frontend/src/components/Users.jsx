import { useState } from "react";
import Card from '../components/Card'

function Users() {
    let [users, setUsers] = useState([]);

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

    getUsers();

    return (
        <>
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
        </>
    )
}

export default Users;