import { useState } from 'react';

const Login = ({ setIsAuthenticated }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endPoint = 'http://127.0.0.1:3000/api/users/login';
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(formData)
            };

            const response = await fetch(endPoint, config);

            if (!response.ok) {
                console.error('Login failed');
                return;
            }

            const data = await response.json();
            console.log(data);

            if (data.token) {
                localStorage.setItem('authToken', data.token); 
                setIsAuthenticated(true);
            }

            setFormData({
                username: '',
                password: ''
            });
        } catch (error) {
            console.error('Error al intentar loguear', error);
        }
    };

    return (
        <section>
            <h1>Iniciar sesión</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Usuario"
                    value={formData.username}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit">Login</button>
            </form>
        </section>
    );
};

export default Login;
