// components/MainContent.js
import React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import "./globals.css";

export default function Home() {
  return (
    <>
      <Header />
      {/* Main Content */}
      {/* Sección Hero */}
      <section className="gradient-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
                Almacena, comparte y accede a tus archivos desde cualquier lugar
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                RamboDrive te ofrece almacenamiento en la nube seguro, rápido y
                fácil de usar para todos tus documentos importantes.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a href="/Login">
                  <button
                    id="startFreeBtn"
                    className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
                  >
                    Comenzar gratis
                  </button>
                </a>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-10">
              <div className="bg-gray-900 p-2 rounded-lg shadow-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="300"
                  viewBox="0 0 600 400"
                >
                  <rect width="600" height="400" fill="#111827"></rect>
                  <rect
                    x="40"
                    y="40"
                    width="520"
                    height="60"
                    rx="4"
                    fill="#1F2937"
                    stroke="#374151"
                    strokeWidth="1"
                  ></rect>
                  <circle cx="70" cy="70" r="15" fill="#3B82F6"></circle>
                  <rect
                    x="100"
                    y="62"
                    width="120"
                    height="16"
                    rx="2"
                    fill="#F3F4F6"
                  ></rect>
                  <rect
                    x="40"
                    y="120"
                    width="250"
                    height="120"
                    rx="4"
                    fill="#1F2937"
                    stroke="#374151"
                    strokeWidth="1"
                  ></rect>
                  <rect
                    x="60"
                    y="140"
                    width="80"
                    height="80"
                    rx="4"
                    fill="#3B82F6"
                    fillOpacity="0.1"
                  ></rect>
                  <path
                    d="M100 160 L120 180 L80 180"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="3"
                  ></path>
                  <rect
                    x="150"
                    y="140"
                    width="120"
                    height="16"
                    rx="2"
                    fill="#F3F4F6"
                  ></rect>
                  <rect
                    x="150"
                    y="165"
                    width="80"
                    height="10"
                    rx="2"
                    fill="#D1D5DB"
                  ></rect>
                  <rect
                    x="150"
                    y="185"
                    width="60"
                    height="10"
                    rx="2"
                    fill="#D1D5DB"
                  ></rect>
                  <rect
                    x="310"
                    y="120"
                    width="250"
                    height="120"
                    rx="4"
                    fill="#1F2937"
                    stroke="#374151"
                    strokeWidth="1"
                  ></rect>
                  <rect
                    x="330"
                    y="140"
                    width="80"
                    height="80"
                    rx="4"
                    fill="#60A5FA"
                    fillOpacity="0.1"
                  ></rect>
                  <path
                    d="M370 160 L350 180 L390 180"
                    fill="none"
                    stroke="#60A5FA"
                    strokeWidth="3"
                  ></path>
                  <rect
                    x="420"
                    y="140"
                    width="120"
                    height="16"
                    rx="2"
                    fill="#F3F4F6"
                  ></rect>
                  <rect
                    x="420"
                    y="165"
                    width="80"
                    height="10"
                    rx="2"
                    fill="#D1D5DB"
                  ></rect>
                  <rect
                    x="420"
                    y="185"
                    width="60"
                    height="10"
                    rx="2"
                    fill="#D1D5DB"
                  ></rect>
                  <rect
                    x="40"
                    y="260"
                    width="520"
                    height="1"
                    fill="#374151"
                  ></rect>
                  <rect
                    x="40"
                    y="280"
                    width="520"
                    height="40"
                    rx="4"
                    fill="#1F2937"
                    stroke="#374151"
                    strokeWidth="1"
                  ></rect>
                  <circle
                    cx="60"
                    cy="300"
                    r="10"
                    fill="#3B82F6"
                    fillOpacity="0.2"
                  ></circle>
                  <rect
                    x="80"
                    y="295"
                    width="100"
                    height="10"
                    rx="2"
                    fill="#F3F4F6"
                  ></rect>
                  <rect
                    x="480"
                    y="295"
                    width="60"
                    height="10"
                    rx="2"
                    fill="#D1D5DB"
                  ></rect>
                  <rect
                    x="40"
                    y="330"
                    width="520"
                    height="40"
                    rx="4"
                    fill="#1F2937"
                    stroke="#374151"
                    strokeWidth="1"
                  ></rect>
                  <circle
                    cx="60"
                    cy="350"
                    r="10"
                    fill="#60A5FA"
                    fillOpacity="0.2"
                  ></circle>
                  <rect
                    x="80"
                    y="345"
                    width="120"
                    height="10"
                    rx="2"
                    fill="#F3F4F6"
                  ></rect>
                  <rect
                    x="480"
                    y="345"
                    width="60"
                    height="10"
                    rx="2"
                    fill="#D1D5DB"
                  ></rect>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex justify-center -mt-8">
              <div className="bg-gray-900 shadow-xl rounded-lg px-8 py-5 flex items-center space-x-8">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-400 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    ></path>
                  </svg>
                  <span className="font-medium text-gray-200">
                    Seguridad avanzada
                  </span>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-400 mr-2"
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
                  <span className="font-medium text-gray-200">Acceso 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* Sección de Características */}
<section id="caracteristicas" className="py-20 bg-black">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
        Tu nube personal, simple y veloz
      </h2>
      <p className="text-xl text-gray-400 max-w-3xl mx-auto">
        RamboDrive elimina lo complicado. Sube, organiza y accede a tus archivos de la forma más sencilla.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/* Característica 1: Subida Rápida */}
      <div className="feature-card bg-gray-900 rounded-xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-2">
        <div className="bg-blue-900 bg-opacity-30 rounded-full w-16 h-16 flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">
          Sube al Instante
        </h3>
        <p className="text-gray-400">
          Arrastra y suelta cualquier archivo. Tu almacenamiento en la nube, sin esperas ni complicaciones.
        </p>
      </div>

      {/* Característica 2: Organización Sencilla */}
      <div className="feature-card bg-gray-900 rounded-xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-2">
        <div className="bg-blue-900 bg-opacity-30 rounded-full w-16 h-16 flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">
          Organiza a tu Manera
        </h3>
        <p className="text-gray-400">
          Crea carpetas, renombra archivos y encuentra todo fácilmente con una interfaz limpia y directa.
        </p>
      </div>

      {/* Característica 3: Acceso Universal */}
      <div className="feature-card bg-gray-900 rounded-xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-2">
        <div className="bg-blue-900 bg-opacity-30 rounded-full w-16 h-16 flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">
          Acceso Desde Donde Sea
        </h3>
        <p className="text-gray-400">
          Tus archivos siempre disponibles y seguros, accesibles desde tu computadora, tablet o teléfono.
        </p>
      </div>

    </div>
  </div>
</section>

      {/* Sección de Preguntas Frecuentes */}
      <section id="preguntas-frecuentes" className="py-20 gradient-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Encuentra respuestas rápidas a las preguntas más comunes sobre
              RamboDrive.
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {/* Pregunta 1 */}
            <div className="bg-blue-900 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                ¿Qué tipos de archivos puedo almacenar en RamboDrive?
              </h3>
              <p className="text-gray-400">
                Puedes almacenar cualquier tipo de archivo, incluyendo
                documentos, fotos, videos, audios y más. No hay restricciones de
                formato.
              </p>
            </div>
            {/* Pregunta 3 */}
            <div className="bg-blue-900 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                ¿Cómo puedo compartir un archivo de forma segura?
              </h3>
              <p className="text-gray-400">
                Para compartir un archivo, selecciona el archivo, haz clic en
                "Compartir" y podrás compartir una carpeta de forma segura.
              </p>
            </div>
            {/* Pregunta 4 */}
            <div className="bg-blue-900 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                ¿Existe un límite de almacenamiento en la versión gratuita?
              </h3>
              <p className="text-gray-400">
                La versión gratuita de RamboDrive ofrece 10MB de almacenamiento.
                Para obtener más espacio, puedes consultar nuestros planes
                premium.
              </p>
            </div>
          </div>
        </div>

        {/* Sección de Llamada a la Acción (añadida para completar) */}
        <section className="py-20 text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-6">
              Listo para potenciar tu almacenamiento?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-4xl mx-auto">
              Únete a miles de usuarios que confían en RamboDrive para mantener
              sus datos seguros y accesibles.
            </p>
            <a href="/Login">
              <button className="bg-blue-500 text-white font-semibold px-8 py-4 rounded-lg shadow-xl hover:bg-blue-600 transition-colors text-lg">
                Empieza ahora - ¡Es gratis!
              </button>
            </a>
          </div>
        </section>
      </section>
      <Footer />
    </>
  );
}
