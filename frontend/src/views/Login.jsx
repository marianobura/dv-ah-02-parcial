import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endPoint = 'http://127.0.0.1:5000/api/users/login';
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(formData)
            };

            const response = await fetch(endPoint, config);

            if (!response.ok) {
                alert('Usuario o contraseña incorrectos');
                console.error('Login failed');
                return;
            }

            const data = await response.json();
            console.log(data);

            if (data.token) {
                localStorage.setItem('authToken', data.token); 
                setIsAuthenticated(true);
                navigate('/');
            }

            setFormData({
                username: '',
                password: '',
                email: ''
            });
        } catch (error) {
            console.error('Error al intentar loguear', error);
            alert('Error del servidor. Intente nuevamente más tarde.');
        }
    };

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 lg:py-0">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8 bg-neutral-300">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Iniciar sesión
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                                    Correo electrónico
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="google@gmail.com"
                                    required
                                    onChange={handleChange}
                                    value={formData.email}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required
                                    onChange={handleChange}
                                    value={formData.password}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-blue-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Iniciar sesión
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
