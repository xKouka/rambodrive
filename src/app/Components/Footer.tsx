import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-black text-white py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center md:items-start">
                <div className="mb-8 md:mb-0 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"></path>
                        </svg>
                        <span className="text-3xl font-bold ml-2">RamboDrive</span>
                    </div>
                    <p className="text-gray-500 text-sm">Almacenamiento en la nube potente y seguro.</p>
                    <div className="flex space-x-4 mt-4 justify-center md:justify-start">
                        <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                            </svg>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.428 1.13c2.484 0 2.76.01 3.738.056 2.05.097 3.125.86 3.79 1.523.666.663 1.427 1.737 1.524 3.788.046.978.056 1.254.056 3.738 0 2.484-.01 2.76-.056 3.738-.097 2.05-.86 3.125-1.523 3.79-.663.666-1.737 1.427-3.788 1.524-.978.046-1.254.056-3.738.056-2.484 0-2.76-.01-3.738-.056-2.05-.097-3.125-.86-3.79-1.523-.666-.663-1.427-1.737-1.524-3.788-.046-.978-.056-1.254-.056-3.738 0-2.484.01-2.76.056-3.738.097-2.05.86-3.125 1.523-3.79.663-.666 1.737-1.427 3.788-1.524.978-.046 1.254-.056 3.738-.056zM12 4.14C9.07 4.14 8.7 4.15 7.55 4.2C5.51 4.31 4.31 5.51 4.2 7.55 4.15 8.7 4.14 9.07 4.14 12c0 2.93.01 3.3.06 4.45.11 2.04 1.31 3.24 3.35 3.35.98.05 1.25.06 4.45.06 2.93 0 3.3-.01 4.45-.06 2.04-.11 3.24-1.31 3.35-3.35.05-.98.06-1.25.06-4.45 0-2.93-.01-3.3-.06-4.45-.11-2.04-1.31-3.24-3.35-3.35-.98-.05-1.25-.06-4.45-.06zM12 7.94c-2.24 0-4.06 1.82-4.06 4.06S9.76 16.06 12 16.06s4.06-1.82 4.06-4.06-1.82-4.06-4.06-4.06zM12 14.77c-1.53 0-2.77-1.24-2.77-2.77s1.24-2.77 2.77-2.77 2.77 1.24 2.77 2.77-1.24 2.77-2.77 2.77zM16.92 5.61a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z" clipRule="evenodd" />
                            </svg>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M8.29 20.09c.39.08.77.12 1.18.12 1.94 0 3.51-1.57 3.51-3.51 0-.16-.01-.32-.04-.48l.01-.01c.21-.05.42-.1.63-.16.93-.24 1.63-.58 2.08-.85 1.54-.9 2.58-2.24 3.01-3.8.46-1.63.3-3.24-.49-4.82-.44-.88-1.07-1.6-1.8-2.18-.74-.58-1.57-1.03-2.48-1.3-.92-.28-1.87-.4-2.82-.36-.93.04-1.84.2-2.69.46-.86.26-1.65.62-2.34 1.07-.69.45-1.3 1.01-1.79 1.66-.49.65-.87 1.37-1.12 2.15-.25.79-.37 1.62-.35 2.44.02.83.18 1.65.46 2.43.28.78.68 1.5 1.19 2.14.51.64 1.1 1.18 1.76 1.62.66.44 1.4.78 2.21 1.02.81.24 1.66.38 2.52.4L8.29 20.09zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 11.2c-.37.94-1.08 1.76-2.02 2.37-1.14.73-2.46 1.08-3.87 1.08-.8 0-1.58-.15-2.3-.43-.72-.29-1.37-.69-1.92-1.21-.55-.52-.99-1.14-1.3-1.85-.31-.7-.47-1.48-.46-2.26.01-.79.17-1.56.46-2.27.29-.71.69-1.35 1.21-1.9.52-.55 1.14-.99 1.85-1.3.71-.31 1.49-.47 2.27-.46.79.01 1.56.17 2.27.46.71.29 1.35.69 1.9 1.21.55.52.99 1.14 1.3 1.85.31.7.47 1.48.46 2.26-.01.79-.17 1.56-.46 2.27z" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-16">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Empresa</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-500 hover:text-white transition-colors">Acerca de</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-white transition-colors">Empleos</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-white transition-colors">Blog</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-white transition-colors">Prensa</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Soporte</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-500 hover:text-white transition-colors">Centro de ayuda</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-white transition-colors">Contáctanos</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-white transition-colors">Estado del servicio</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-500 hover:text-white transition-colors">Términos de servicio</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-white transition-colors">Política de privacidad</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-white transition-colors">Política de cookies</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm mt-12 pt-8 border-t border-gray-700">
                © {new Date().getFullYear()} RamboDrive. Todos los derechos reservados.
            </div>
        </footer>
    );
};
