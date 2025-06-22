import React from 'react';

interface FileCardProps {
    fileName: string;
    modifiedDate: string;
    fileType: 'doc' | 'excel' | 'pdf' | 'ppt'; // Añade más tipos si es necesario
}

export default function FileCard({ fileName, modifiedDate, fileType }: FileCardProps) {
    // Función para determinar el icono y los colores según el tipo de archivo
    const getFileIconProps = (type: string) => {
        switch (type) {
            case 'doc':
                return {
                    iconPath: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                    bgColor: "bg-blue-50",
                    textColor: "text-blue-600"
                };
            case 'excel':
                return {
                    iconPath: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                    bgColor: "bg-green-50",
                    textColor: "text-green-600"
                };
            case 'pdf':
                return {
                    iconPath: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z",
                    bgColor: "bg-red-50",
                    textColor: "text-red-600"
                };
            case 'ppt':
                return {
                    iconPath: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
                    bgColor: "bg-yellow-50",
                    textColor: "text-yellow-600"
                };
            default:
                return {
                    iconPath: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", // Icono por defecto (documento)
                    bgColor: "bg-gray-100",
                    textColor: "text-gray-600"
                };
        }
    };

    const { iconPath, bgColor, textColor } = getFileIconProps(fileType);

    return (
        <div className="file-card bg-gray-900 rounded-lg overflow-hidden custom-shadow hover:shadow-md transition-shadow duration-200">
            <div className={`h-32 flex items-center justify-center ${bgColor}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-16 w-16 ${textColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath}></path>
                </svg>
            </div>
            <div className="p-3">
                <h3 className="font-medium text-white whitespace-nowrap overflow-hidden text-ellipsis">{fileName}</h3>
                <p className="text-sm text-gray-500">Modificado: {modifiedDate}</p>
            </div>
        </div>
    );
};