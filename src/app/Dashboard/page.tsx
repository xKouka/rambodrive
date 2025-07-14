// src/app/Dashboard/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useRouter } from 'next/navigation'
import FolderExplorer from '../Components/FolderExplore';
import AllFilesTable from '../Components/AllFiles';
import DashboardHeader from '../Components/DashboardHeader';
import Sidebar from '../Components/Sidebar';
import ClientLayout from '../ClientLayout';
import Contacts from '../Components/Contacts';

// Se define un tipo para las vistas disponibles
export type AppView = 'my_drive' | 'shared_with_me' | 'calendar' | 'contacts';

export default function DashboardPage() {
    const { user, loading } = useUser();
    const router = useRouter();

    // Estado para controlar la vista actual (Mi unidad, Compartido, etc.)
    const [currentView, setCurrentView] = useState<AppView>('my_drive');
    // Estado para saber si una carpeta (propia o compartida) está abierta
    const [isFolderOpen, setIsFolderOpen] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/Login');
        }
    }, [user, loading, router]);

    if (loading) {
        return <p className="text-center text-white mt-20">Cargando sesión...</p>;
    }
    if (!user) {
        return null;
    }

    return (
        <ClientLayout>
            <div className="gradient-bg min-h-screen">
                <DashboardHeader />
                <div className="pt-16 flex">
                    {/* Se le pasa la vista actual y la función para cambiarla */}
                    <Sidebar currentView={currentView} onViewChange={setCurrentView} />

                    <div className="ml-64 flex-grow p-6">
                        {/* El explorador de carpetas ahora muestra contenido según la vista seleccionada */}
                        <FolderExplorer
                            view={currentView}
                            onFolderSelect={(folder) => setIsFolderOpen(!!folder)}
                        />

                        {/* La tabla de archivos raíz solo se muestra en "Mi unidad" y si no hay una carpeta abierta */}
                        {currentView === 'my_drive' && !isFolderOpen && <AllFilesTable />}

                        {/* Aquí podrías añadir los componentes para Calendario y Contactos */}
                        {currentView === 'calendar' && <div className="text-white">Componente de Calendario</div>}
                        {currentView === 'calendar' && <div className="text-white">Componente de Calendario</div>}
                        {currentView === 'contacts' && <div className="text-white">Componente de Contactos</div>}
                        {currentView === 'contacts' && <Contacts />}
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
};
