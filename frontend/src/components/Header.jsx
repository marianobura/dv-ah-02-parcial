

import { Routes, Route, NavLink, Link } from 'react-router-dom';

function Header() {
    return (
        <header className="flex flex-col items-center justify-center bg-blue-800 text-white gap-2">
            <h1 className="text-3xl font-medium">Parcial #2 - React</h1>
            <p className="text-lg">Mariano Buranits, Eric Jacobsen, Sebastian Winter</p>
            <div className="flex gap-4 mt-4">
                <NavLink to='/'>Inicio</NavLink>
                <NavLink to='/registro'>Registro</NavLink>
                <NavLink to='/login'>Iniciar sesión</NavLink>
            </div>
        </header>
    );
}


export default Header;