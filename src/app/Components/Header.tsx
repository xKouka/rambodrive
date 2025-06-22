import React from 'react';

export default function Header()  {
    return (
        <header className="bg-gray-900 shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"></path>
                            </svg>
                        </div>
                        <div className="ml-2">
                            <span className="text-2xl font-bold text-white">RamboDrive</span>
                        </div>
                    </div>
                    <nav className="hidden md:flex space-x-10">
                        <a href="#caracteristicas" className="text-base font-medium text-gray-300 hover:text-blue-400 transition-colors">Características</a>
                        <a href="#preguntas-frecuentes" className="text-base font-medium text-gray-300 hover:text-blue-400 transition-colors">Preguntas Frecuentes</a>
                    </nav>
                    <div className="flex items-center">
                        <a href="/Login">
                            <button id="registerBtn" className="bg-blue-500 text-white font-medium hover:bg-blue-600 px-4 py-2 rounded-md ml-4 transition-colors">
                                Iniciar sesión
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};