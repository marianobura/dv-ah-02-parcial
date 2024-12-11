import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../utils/AuthContext';

function Header() {
    const { user, logout } = useContext(AuthContext);
    
    return (
        <header className="flex flex-col items-center justify-center bg-blue-800 text-white gap-2">
            <h1 className="text-3xl font-medium">Parcial #2 - React</h1>
            <p className="text-lg">Mariano Buranits, Eric Jacobsen, Sebastian Winter</p>
            <div className="flex gap-4 mt-4 items-center">
                {!user ? (
                    <>
                        <NavLink to='/registro'>Registro</NavLink>
                        <NavLink to='/login'>Iniciar sesión</NavLink>
                        <NavLink to='/endpoints'>Endpoints</NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to='/'>Inicio</NavLink>
                        <NavLink to='/endpoints'>Endpoints</NavLink>
                        <div className='flex items-center ml-12 gap-2'>
                            <span>{user.username || 'Usuario'}</span>
                            <button className="text-white bg-red-800 rounded px-3 py-1.5" onClick={logout}>Cerrar sesión</button>
                        </div>
                    </>
                )}
            </div>
        </header>
    );
}


export default Header;