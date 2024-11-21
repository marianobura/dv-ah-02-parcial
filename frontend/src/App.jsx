import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './views/Home'
import Registro from './views/Registro';
import Login from './views/Login';
import Crud from './views/Crud'

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/registro" element={<Registro />} />
                <Route path="/login" element={<Login />} />
                <Route path="/crud" element={<Crud />} />
                <Route path="/" element={<Home />} />
                <Route path="*" element={<p>Página no encontrada</p>} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
