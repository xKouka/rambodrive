// src/app/Components/DashboardHeader.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { client } from '../supabase-client'; // Corregido para una ruta relativa más probable
import { useUser } from '../contexts/UserContext'; // Corregido para una ruta relativa más probable

export default function DashboardHeader() {
    const { user } = useUser();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleSignOut = async () => {
        const { error } = await client.auth.signOut();
        if (error) {
            alert(`Error al cerrar sesión: ${error.message}`);
        } else {
            // Redirige al login después de cerrar sesión
            router.push('/Login'); 
        }
    };

    // Cierra el menú si se hace clic fuera de él
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    // Obtiene la inicial del email del usuario
    const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : 'U';

    return (
        <header className="bg-gray-900 shadow-sm fixed w-full z-20">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Sección del Logo y Título */}
                <div className="flex items-center">
                    <div className="mr-2">
                        <Image alt='logo' src="/logo.png" width={55} height={55} />
                    </div>
                    <h1 className="text-2xl font-medium text-white">RamboDrive</h1>
                </div>

                {/* --- SECCIÓN DE PERFIL ACTUALIZADA --- */}
                <div className="relative">
                    {/* Avatar de Usuario */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="bg-blue-600 text-white rounded-full h-10 w-10 flex items-center justify-center text-lg font-semibold hover:bg-blue-700 transition"
                    >
                        {/* --- CORRECCIÓN AQUÍ --- */}
                        <span className="font-medium">{userInitial}</span>
                    </button>

                    {/* Menú Desplegable */}
                    {isMenuOpen && (
                        <div
                            ref={menuRef}
                            className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-30"
                        >
                            <div className="px-4 py-2 border-b border-gray-200">
                                <p className="text-sm text-gray-900">Sesión iniciada como</p>
                                <p className="text-sm font-medium text-gray-900 truncate" title={user?.email}>
                                    {user?.email}
                                </p>
                            </div>
                            <button
                                onClick={handleSignOut}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
