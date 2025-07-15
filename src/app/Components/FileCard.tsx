'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { client } from '../supabase-client';
import { useUser } from '../contexts/UserContext';
import { showSuccessAlert, showErrorAlert, showConfirmAlert } from '../../utils/alerts';

// --- Interfaz para los archivos de la base de datos ---
interface DbFile {
    id: number;
    file_name: string;
    storage_path: string;
}

// --- Componente para una tarjeta de carpeta ---
function FolderCard({ name, onClick }: { name: string, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-xl text-left font-medium shadow-lg hover:shadow-blue-500/20 transition-all w-full flex items-center"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
            {name}
        </button>
    );
}

// --- Componente para ver el contenido de una carpeta ---
function FolderViewer({ folder, onBack }: { folder: string, onBack: () => void }) {
    const { user } = useUser();
    const [files, setFiles] = useState<DbFile[]>([]);
    const [menuOpen, setMenuOpen] = useState<number | null>(null);
    const [uploading, setUploading] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const fetchFiles = useCallback(async () => {
        if (!user?.id || !folder) return;
        const { data, error } = await client
            .from('files')
            .select('id, file_name, storage_path')
            .eq('user_id', user.id)
            .like('storage_path', `${user.id}/${folder}/%`);

        if (error) {
            console.error("Error cargando archivos de la carpeta:", error);
            showErrorAlert("Error", "No se pudieron cargar los archivos de la carpeta.");
            return;
        }
        setFiles(data || []);
    }, [user, folder]);

    useEffect(() => {
        fetchFiles();
    }, [fetchFiles]);

    // Cierra el menú contextual al hacer clic fuera
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuRef]);

    const handleDownload = async (storagePath: string) => {
        setMenuOpen(null);
        const { data, error } = await client.storage.from('rambodrive').createSignedUrl(storagePath, 60);
        if (error || !data?.signedUrl) {
            showErrorAlert('Error', 'No se pudo generar el enlace de descarga.');
            return;
        }
        window.open(data.signedUrl, '_blank');
    };

    const handleDelete = async (file: DbFile) => {
        setMenuOpen(null);
        const isConfirmed = await showConfirmAlert(
            '¿Eliminar archivo?',
            `¿Estás seguro de que quieres eliminar "${file.file_name}"?`,
            'Sí, eliminar'
        );

        if (isConfirmed) {
            try {
                await client.from('files').delete().eq('id', file.id);
                await client.storage.from('rambodrive').remove([file.storage_path]);
                showSuccessAlert('Eliminado', `El archivo "${file.file_name}" ha sido eliminado.`);
                fetchFiles();
            } catch (error) {
                showErrorAlert('Error', 'No se pudo eliminar el archivo.');
                console.error(error);
            }
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user?.id) return;

        setUploading(true);
        const path = `${user.id}/${folder}/${file.name}`;

        try {
            const { error: uploadError } = await client.storage.from('rambodrive').upload(path, file, { upsert: true });
            if (uploadError) throw uploadError;

            const { error: insertError } = await client.from('files').insert({
                file_name: file.name,
                file_size: file.size,
                mime_type: file.type,
                storage_path: path,
                user_id: user.id
            });

            if (insertError) throw insertError;

            showSuccessAlert('¡Éxito!', `El archivo "${file.name}" se ha subido correctamente.`);
            fetchFiles();

        } catch (error) {
            // Si el error es de Supabase, puede tener un mensaje más específico
            let message = 'Ocurrió un error inesperado.';
            let code: string | null = null;

            // Type guard to safely access error properties without using 'any'
            if (typeof error === 'object' && error !== null) {
                const errorObj = error as { message?: unknown; code?: unknown };
                if (typeof errorObj.message === 'string') {
                    message = errorObj.message;
                }
                if (typeof errorObj.code === 'string') {
                    code = errorObj.code;
                }
            }

            showErrorAlert('Error al subir', message);
            console.error(error);

            // Intenta limpiar el archivo subido si la inserción en la BD falla
            // No se elimina si el error es por conflicto (archivo/registro ya existe)
            if (code !== '23505' && code !== '409') { // 23505 (DB) y 409 (Storage) son errores de conflicto
                await client.storage.from('rambodrive').remove([path]);
            }
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-lg font-semibold truncate">
                    Carpeta: {folder}
                </h3>
                <div className="flex gap-2">
                    <label className="bg-green-600 text-white px-3 py-1.5 rounded-lg cursor-pointer hover:bg-green-500 text-sm font-medium">
                        {uploading ? 'Subiendo...' : 'Subir archivo'}
                        <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
                    </label>
                    <button onClick={onBack} className="text-sm text-white bg-gray-600 hover:bg-gray-500 px-3 py-1.5 rounded-lg font-medium">
                        ⬅ Volver
                    </button>
                </div>
            </div>

            <ul className="bg-gray-800 rounded-lg p-2 space-y-1">
                {files.map(file => (
                    <li key={file.id} className="flex justify-between items-center p-2 rounded-md hover:bg-gray-700/50 relative group">
                        <span className="text-gray-200 text-sm">{file.file_name}</span>
                        <div className="relative">
                            <button onClick={() => setMenuOpen(menuOpen === file.id ? null : file.id)} className="text-gray-400 hover:text-white p-1 opacity-0 group-hover:opacity-100"> ⋮ </button>
                            {menuOpen === file.id && (
                                <div ref={menuRef} className="absolute right-0 mt-2 w-32 bg-white rounded shadow-lg z-10">
                                    <button onClick={() => handleDownload(file.storage_path)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"> Descargar </button>
                                    <button onClick={() => handleDelete(file)} className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"> Eliminar </button>
                                </div>
                            )}
                        </div>
                    </li>
                ))}
                {files.length === 0 && !uploading && (
                    <li className="text-gray-500 text-center p-4">Esta carpeta está vacía.</li>
                )}
            </ul>
        </div>
    );
}

// --- Componente principal del explorador de carpetas ---
interface FolderExplorerProps {
    onFolderSelect: (folderName: string | null) => void;
}

export default function FolderExplorer({ onFolderSelect }: FolderExplorerProps) {
    const { user } = useUser();
    const [folders, setFolders] = useState<string[]>([]);
    const [newFolderName, setNewFolderName] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

    const handleSetSelectedFolder = (folderName: string | null) => {
        setSelectedFolder(folderName);
        onFolderSelect(folderName);
    };

    const fetchFolders = useCallback(async () => {
        if (!user?.id) return;
        const { data, error } = await client.storage.from('rambodrive').list(user.id, { limit: 100 });
        if (error) {
            console.error('Error al obtener carpetas:', error.message);
            showErrorAlert('Error', 'No se pudieron cargar las carpetas.');
            return;
        }
        const folderNames = data?.filter(item => item.id === null).map(item => item.name) || [];
        setFolders(folderNames);
    }, [user]);

    useEffect(() => {
        fetchFolders();
    }, [fetchFolders]);

    const handleAddFolder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newFolderName.trim() || !user?.id) return;
        const folderPath = `${user.id}/${newFolderName}/.placeholder`;
        setLoading(true);
        const { error } = await client.storage.from('rambodrive').upload(folderPath, new Blob(['']), { upsert: false });
        if (error) {
            showErrorAlert('Error', 'No se pudo crear la carpeta. Es posible que ya exista una con el mismo nombre.');
        } else {
            showSuccessAlert('¡Éxito!', `La carpeta "${newFolderName}" ha sido creada.`);
            setNewFolderName('');
            fetchFolders();
        }
        setLoading(false);
    };

    return (
        <div className="mb-6">
            {!selectedFolder ? (
                <>
                    <h2 className="text-xl font-medium text-white mb-4">Carpetas personales</h2>
                    <form onSubmit={handleAddFolder} className="flex gap-2 mb-4">
                        <input
                            type="text"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            placeholder="Nombre de la nueva carpeta"
                            className="p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-blue-500 focus:border-blue-500 flex-1"
                        />
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition font-semibold" disabled={loading}>
                            {loading ? 'Creando...' : 'Crear'}
                        </button>
                    </form>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {folders.map((folderName, index) => (
                            <FolderCard
                                key={index}
                                name={folderName}
                                onClick={() => handleSetSelectedFolder(folderName)}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <FolderViewer
                    folder={selectedFolder}
                    onBack={() => handleSetSelectedFolder(null)}
                />
            )}
        </div>
    );
}
