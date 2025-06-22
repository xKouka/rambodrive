import React from 'react';

export default function DashboardHeader(){
    return (
        <header className="bg-gray-900 shadow-sm fixed w-full z-10">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Sección del Logo y Título */}
                <div className="flex items-center">
                    <div className="mr-2">
                        {/* Icono de RamboDrive (Nube) */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z"></path>
                        </svg>
                    </div>
                    <h1 className="text-2xl font-medium text-white">RamboDrive</h1>
                </div>

                {/* Barra de Búsqueda */}
                <div className="flex-grow mx-10">
                    <div className="relative">
                        <input type="text" placeholder="Buscar en RamboDrive" className="w-full py-2 px-4 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" />
                        <button className="absolute right-3 top-2 text-gray-500">
                            {/* Icono de Búsqueda */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Iconos de Utilidad y Perfil de Usuario */}
                <div className="flex items-center">
                    <button className="p-2 rounded-full hover:bg-gray-100 mr-2">
                        {/* Icono de Ayuda/Información */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 mr-2">
                        {/* Icono de Configuración */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                    </button>
                    <div className="ml-2">
                        {/* Avatar de Usuario */}
                        <button className="bg-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center">
                            <span className="font-medium">U</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

