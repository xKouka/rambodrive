import React from 'react';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="bg-gray-900 shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Image alt='Logo' src="/logo.png" width={60} height={60}></Image>
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