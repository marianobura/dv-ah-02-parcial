import { useState } from "react";
import Users from '../components/Users'
import Posts from '../components/Posts'
import Comments from "../components/Comments";

function Crud() {
    const [selection, setSelection] = useState("users");

    const handleSelectionChange = (e) => {
        setSelection(e.target.value);
    };

    const renderContent = () => {
        switch (selection) {
            case "users":
                return (
                    <Users />
                );
            case "posts":
                return (
                    <Posts />
                )
            case "comments":
                return (
                    <Comments />
                );
            default:
                return null;
        }
    };

    return (
        <>
            <section className="container mx-auto px-4">
                <div className="w-full max-w-sm min-w-[200px] mt-4">
                    <div className="relative">
                        <select value={selection} onChange={handleSelectionChange} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-3 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
                            <option value="users">Usuarios</option>
                            <option value="posts">Posteos</option>
                            <option value="comments">Comentarios</option>
                        </select>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute top-3.5 right-2.5 text-slate-700">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                        </svg>
                    </div>
                </div>
                {renderContent()}
            </section>
        </>
    );
}

export default Crud;