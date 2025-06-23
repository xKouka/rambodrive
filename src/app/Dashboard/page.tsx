"use client";

import React, { useEffect } from 'react';
import Head from 'next/head';
import { useUser } from '../contexts/UserContext';
import { useRouter } from 'next/navigation'
import FolderExplorer from '../Components/FolderExplore';   
import AllFilesTable from '../Components/AllFiles';
import DashboardHeader from '../Components/DashboardHeader';
import Sidebar from '../Components/Sidebar';
import ClientLayout from '../ClientLayout';


export default function DashboardPage() {
    const { user, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/Login');
        }
    }, [user, loading]);

    if (loading) return <p>Cargando sesión...</p>;
    if (!user) return null; // Ya estás redirigiendo en useEffect

    return (
        <ClientLayout>
            <div className="gradient-bg min-h-screen">
                <Head>
                    <title>RamboDrive - Mi Almacenamiento</title>
                    <meta name="description" content="Gestiona tus archivos en la nube con RamboDrive." />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                {/* Encabezado */}
                <DashboardHeader />

                {/* Contenido Principal con Sidebar y Área de Contenido */}
                <div className="pt-16 flex"> {/* pt-16 para desplazar el contenido debajo del header fijo */}
                    {/* Barra Lateral */}
                    <Sidebar />

                    {/* Área de Contenido Principal */}
                    <div className="ml-64 flex-grow p-6"> {/* ml-64 para dejar espacio a la sidebar fija */}
                        <FolderExplorer />
                        <AllFilesTable />
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
};
