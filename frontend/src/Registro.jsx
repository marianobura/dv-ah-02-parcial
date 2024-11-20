import { useState } from 'react';

const Registro = () => {
    //Creamos un estado para el formulario
    const [ formData, setFormData ] = useState({
        nombre: '',
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        // console.log(name, value);
        setFormData( { ...formData, [name]: value } )
    }

    //Evitamos la recarga de la página
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Enviando formulario');    
            console.log(formData);
            const endPoint = 'http://localhost:3000/api/users';
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(formData)
            }
        
            const response = await fetch(endPoint, config);

            if( !response.ok ){
                console.error(response);
            }

            const data = await response.json();

            console.log(data);
            setFormData({
                name: '',  
                email: '',
                password: ''
            });

        } catch (error) {
            console.log(error);
            alert('Error del Servidor');
        }
        
    }

    return (
        <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 lg:py-0">
            <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8 bg-neutral-300">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Create an account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={ handleSubmit }>
                        <div>
                            <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900">Nombre</label>
                            <input type="nombre" name="nombre" id="nombre" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Juan Pedro" required="" onChange={handleChange} value={formData.nombre} />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="google@gmail.com" required="" onChange={handleChange} value={formData.email} />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" onChange={handleChange} value={formData.password} />
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Crear cuenta</button>
                        <p className="text-sm font-light text-gray-500">
                            Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline">Login here</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
        </section>
    );
}

export default Registro;