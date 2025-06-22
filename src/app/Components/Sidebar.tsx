"use client";
import React, { useState } from "react";
import UploadModal from "./UploadModal";

export default function Sidebar() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
    <div className="w-64 fixed h-full bg-gray-900 border-r pt-4">
      {/* Botón "Nuevo" */}
      <div className="px-4 mb-6">
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center justify-center bg-white hover:bg-blue-50 text-blue-600 border  rounded-full px-6 py-3 shadow-sm transition-all duration-200 w-full"
        >
          {/* Icono de Añadir */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          <span className="font-medium">Nuevo</span>
        </button>
      </div>

      {/* Navegación Principal */}
      <nav>
        <ul>
          {/* Elemento de Navegación Activo */}
          <li className="sidebar-item px-6 py-3 rounded-r-full text-white hover:bg-blue-300 flex items-center">
            {/* Icono de Compartir */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              ></path>
            </svg>
            Mi unidad
          </li>
          {/* Otros Elementos de Navegación */}
          <li className="sidebar-item px-6 py-3 rounded-r-full text-white hover:bg-blue-300 flex items-center">
            {/* Icono de Compartir */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              ></path>
            </svg>
            Compartido conmigo
          </li>
          <li className="sidebar-item px-6 py-3 rounded-r-full text-white hover:bg-blue-300 flex items-center">
            {/* Icono de Reloj (Recientes) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            Recientes
          </li>
          <li className="sidebar-item px-6 py-3 rounded-r-full text-white hover:bg-blue-300 flex items-center">
            {/* Icono de Estrella (Destacados) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              ></path>
            </svg>
            Destacados
          </li>
          <li className="sidebar-item px-6 py-3 rounded-r-full text-white hover:bg-blue-300 flex items-center">
            {/* Icono de Papelera */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              ></path>
            </svg>
            Papelera
          </li>
        </ul>
      </nav>

      {/* Sección de Almacenamiento */}
      <div className="border-t border-gray-700 mt-4 pt-4 px-2.5">
        <div className="flex items-center justify-between text-sm text-white mb-2">
          <span>Almacenamiento</span>
          <span>15.5 GB de 30 GB</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: "52%" }}
          ></div>
        </div>
      </div>
    </div>
       <UploadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
       </>
  );
}
