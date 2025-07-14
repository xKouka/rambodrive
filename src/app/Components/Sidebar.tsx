// src/app/Components/Sidebar.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import UploadModal from "./UploadModal";
import { client } from "../supabase-client";
import { useUser } from "../contexts/UserContext";
import { AppView } from "../Dashboard/page"; // Se importa el tipo de vista

interface SidebarProps {
    currentView: AppView;
    onViewChange: (view: AppView) => void;
}

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useUser();
  
  const [usedStorage, setUsedStorage] = useState(0);
  const STORAGE_LIMIT_BYTES = 10 * 1024 * 1024;

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const updateStorageUsage = useCallback(async () => {
    if (!user) return;
    const { data, error } = await client.rpc('calculate_user_storage', { p_user_id: user.id });
    if (error) {
      console.error("Sidebar: Error al calcular el almacenamiento:", error);
    } else {
      setUsedStorage(data);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      updateStorageUsage();
      const channel = client.channel('public:files_sidebar').on('postgres_changes', { event: '*', schema: 'public', table: 'files', filter: `user_id=eq.${user.id}` }, () => updateStorageUsage()).subscribe();
      return () => { client.removeChannel(channel); };
    }
  }, [user, updateStorageUsage]);

  const percentageUsed = (usedStorage / STORAGE_LIMIT_BYTES) * 100;

  // Función para determinar el estilo de los elementos de la barra lateral
  const getNavItemClass = (view: AppView) => {
      const baseClass = "px-6 py-2.5 flex items-center mb-2 transition-colors cursor-pointer";
      if (currentView === view) {
          return `${baseClass} text-white bg-blue-600/20 border-l-4 border-blue-500`;
      }
      return `${baseClass} text-gray-400 hover:bg-gray-800 hover:text-white`;
  };

  return (
    <>
      <div className="w-64 fixed h-full bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="flex-grow min-h-0 overflow-y-auto">
            <div className="px-4 pt-6 mb-6">
              <button onClick={() => setModalOpen(true)} className="flex items-center justify-center bg-white hover:bg-gray-200 text-gray-800 font-semibold rounded-full px-6 py-3 shadow-md hover:shadow-lg transition-all duration-200 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                <span>Nuevo</span>
              </button>
            </div>
            <nav>
              <ul>
                <li onClick={() => onViewChange('my_drive')} className={getNavItemClass('my_drive')}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                  <span>Mi unidad</span>
                </li>
                <li onClick={() => onViewChange('shared_with_me')} className={getNavItemClass('shared_with_me')}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                  <span>Compartido conmigo</span>
                </li>
                <li onClick={() => onViewChange('calendar')} className={getNavItemClass('calendar')}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <span>Calendario</span>
                </li>
                <li onClick={() => onViewChange('contacts')} className={getNavItemClass('contacts')}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zm0 0c2.485 0 4.5 2.015 4.5 4.5v.5H7.5v-.5c0-2.485 2.015-4.5 4.5-4.5zM3.5 21v-2a4 4 0 014-4h5a4 4 0 014 4v2" /></svg>
                  <span>Contactos</span>
                </li>
              </ul>
            </nav>
        </div>
        <div className="flex-shrink-0 absolute bottom-0 left-0 right-0 mb-14 bg-gray-900 border-t border-gray-800 p-4">
          <div className="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
            <span className="font-semibold text-white text-sm">Almacenamiento</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${percentageUsed}%` }}></div>
          </div>
          <div className="text-xs text-gray-400 text-center">
            <span>{formatBytes(usedStorage)} de 10 MB usados</span>
          </div>
        </div>
      </div>
      <UploadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onUploadSuccess={updateStorageUsage} />
    </>
  );
}
