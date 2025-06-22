import React from 'react';
import FileCard from './FileCard'; // Asegúrate de que la ruta de importación sea correcta

export default function RecentFiles() {
    // Datos de ejemplo para los archivos recientes
    const recentFiles = [
        { id: 1, name: "Informe_Trimestral.docx", date: "12 mayo 2023", type: "doc" },
        { id: 2, name: "Datos_Financieros.xlsx", date: "10 mayo 2023", type: "excel" },
        { id: 3, name: "Presentación_Proyecto.pdf", date: "8 mayo 2023", type: "pdf" },
        { id: 4, name: "Calendario_Eventos.pptx", date: "5 mayo 2023", type: "ppt" },
    ];

    return (
        <div className="mb-6">
            <h2 className="text-xl font-medium text-white mb-4">Archivos recientes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {recentFiles.map(file => (
                    <FileCard
                        key={file.id}
                        fileName={file.name}
                        modifiedDate={file.date}
                        fileType={file.type as any} // Cast para asegurar que coincide con los tipos definidos en FileCardProps
                    />
                ))}
            </div>
        </div>
    );
};


