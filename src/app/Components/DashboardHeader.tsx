'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { client } from '../supabase-client';
import { useUser } from '../contexts/UserContext';
// 1. Importamos las alertas necesarias
import { showConfirmAlert, showErrorAlert } from '../../utils/alerts';

export default function DashboardHeader() {
    const { user } = useUser();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleSignOut = async () => {
        setIsMenuOpen(false); // Cerramos el menú primero

        const isConfirmed = await showConfirmAlert(
            '¿Cerrar Sesión?',
            '¿Estás seguro de que quieres cerrar tu sesión?',
            'Sí, cerrar sesión'
        );

        if (isConfirmed) {
            const { error } = await client.auth.signOut();
            if (error) {
                showErrorAlert('Error', `No se pudo cerrar la sesión: ${error.message}`);
            } else {
                router.push('/Login');
            }
        }
    };

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

                <div className="relative">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="bg-blue-600 text-white rounded-full h-10 w-10 flex items-center justify-center text-lg font-semibold hover:bg-blue-700 transition"
                    >
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
