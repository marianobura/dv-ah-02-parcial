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
                body: JSON.stringfy(formData)
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
        <div >
            <h2>Registro</h2>
            <form onSubmit={ handleSubmit } className="flex flex-col gap-2 p-2 border rounded-md">
                <label htmlFor="">Nombre</label>
                <input className="border border-black" type="text" name='nombre' onChange={handleChange} value={formData.nombre}/>
                
                <label htmlFor="">Email</label>
                <input className="border border-black" type="email" name='email' onChange={handleChange} value={formData.email}/>

                <label htmlFor="">Contraseña</label>
                <input className="border border-black" type="password" name='password' onChange={handleChange} value={formData.password}/>

                <button type="submit" className='border border-black'>Registrarme</button>
            </form>
        </div>
    );
}

export default Registro;