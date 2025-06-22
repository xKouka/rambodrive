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
                <button
                  id="startFreeBtn"
                  className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
                >
                  Comenzar gratis
                </button>
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                  <span className="font-medium text-gray-200">
                    Velocidad ultrarrápida
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
            <h2 className="text-3xl font-bold text-white mb-4">
              Todo lo que necesitas para gestionar tus archivos
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              RamboDrive te ofrece herramientas potentes y fáciles de usar para
              almacenar, compartir y colaborar en tus archivos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Característica 1 */}
            <div className="feature-card bg-gray-900 rounded-xl shadow-lg p-6 transition-all duration-300">
              <div className="bg-blue-900 bg-opacity-30 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Almacenamiento seguro
              </h3>
              <p className="text-gray-400">
                Guarda tus archivos con encriptación de extremo a extremo y
                accede a ellos desde cualquier dispositivo.
              </p>
            </div>

            {/* Característica 2 */}
            <div className="feature-card bg-gray-900 rounded-xl shadow-lg p-6 transition-all duration-300">
              <div className="bg-blue-900 bg-opacity-30 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-400"
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
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Compartir sin límites
              </h3>
              <p className="text-gray-400">
                Comparte archivos fácilmente con cualquier persona y controla
                los permisos de acceso.
              </p>
            </div>

            {/* Característica 3 */}
            <div className="feature-card bg-gray-900 rounded-xl shadow-lg p-6 transition-all duration-300">
              <div className="bg-blue-900 bg-opacity-30 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Edición colaborativa
              </h3>
              <p className="text-gray-400">
                Trabaja en documentos con tu equipo en tiempo real y mantén
                todas las versiones organizadas.
              </p>
            </div>

            {/* Característica 4 */}
            <div className="feature-card bg-gray-900 rounded-xl shadow-lg p-6 transition-all duration-300">
              <div className="bg-blue-900 bg-opacity-30 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Backup automático
              </h3>
              <p className="text-gray-400">
                Configura copias de seguridad automáticas para nunca perder tus
                datos importantes.
              </p>
            </div>

            {/* Característica 5 */}
            <div className="feature-card bg-gray-900 rounded-xl shadow-lg p-6 transition-all duration-300">
              <div className="bg-blue-900 bg-opacity-30 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Análisis avanzado
              </h3>
              <p className="text-gray-400">
                Obtén estadísticas detalladas sobre el uso de tu almacenamiento
                y actividad de archivos.
              </p>
            </div>

            {/* Característica 6 (añadida para completar) */}
            <div className="feature-card bg-gray-900 rounded-xl shadow-lg p-6 transition-all duration-300">
              <div className="bg-blue-900 bg-opacity-30 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Integración fluida
              </h3>
              <p className="text-gray-400">
                Conecta RamboDrive con tus aplicaciones y servicios favoritos
                para un flujo de trabajo sin interrupciones.
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
                "Compartir" y podrás generar un enlace seguro con opciones de
                contraseña o fecha de caducidad.
              </p>
            </div>
            {/* Pregunta 4 */}
            <div className="bg-blue-900 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                ¿Existe un límite de almacenamiento en la versión gratuita?
              </h3>
              <p className="text-gray-400">
                La versión gratuita de RamboDrive ofrece X GB de almacenamiento.
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
            <button className="bg-blue-500 text-white font-semibold px-8 py-4 rounded-lg shadow-xl hover:bg-blue-600 transition-colors text-lg">
              Empieza ahora - ¡Es gratis!
            </button>
          </div>
        </section>
      </section>
      <Footer />
    </>
  );
}
