'use client';

import React, { useState, useEffect } from 'react';
import { client } from '../supabase-client';
import { useUser } from '../contexts/UserContext';
import { FileObject } from '@supabase/storage-js';

function FolderCard({ name, onClick }: { name: string, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="bg-blue-800 hover:bg-blue-700 text-white p-4 rounded-xl text-center font-semibold shadow-md transition-all w-full"
        >
            📁 {name}
        </button>
    );
}

function FolderViewer({ folder, onBack }: { folder: string, onBack: () => void }) {
    const { user } = useUser();
    const [files, setFiles] = useState<FileObject[]>([]);
    const [menuOpen, setMenuOpen] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchFiles();
    }, [folder]);

    const fetchFiles = async () => {
        if (!user?.email) return;

        const { data, error } = await client.storage
            .from('rambodrive')
            .list(`${user.email}/${folder}`, { limit: 100 });

        if (error) {
            console.error("Error cargando archivos:", error);
            return;
        }

        const archivos = data?.filter(item => item.metadata) || [];
        setFiles(archivos);
    };

    const handleDownload = async (fileName: string) => {
        if (!user?.email) return;

        const { data, error } = await client.storage
            .from('rambodrive')
            .createSignedUrl(`${user.email}/${folder}/${fileName}`, 60);

        if (error || !data?.signedUrl) {
            console.error('Error al generar URL firmada', error);
            return;
        }

        window.open(data.signedUrl, '_blank');
    };

    const handleDelete = async (fileName: string) => {
        if (!user?.email) return;

        const { error } = await client.storage
            .from('rambodrive')
            .remove([`${user.email}/${folder}/${fileName}`]);

        if (error) {
            console.error('Error al eliminar archivo', error);
            return;
        }

        fetchFiles();
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user?.email) return;

        setUploading(true);

        const path = `${user.email}/${folder}/${file.name}`;
        const { error } = await client.storage
            .from('rambodrive')
            .upload(path, file, {
                cacheControl: '3600',
                upsert: true,
            });

        if (error) {
            console.error('Error al subir archivo:', error);
            alert('Error al subir archivo');
        } else {
            fetchFiles();
        }

        setUploading(false);
    };

    return (
        <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-lg font-semibold">
                    Contenido de la carpeta: {folder}
                </h3>
                <div className="flex gap-2">
                    <label className="bg-green-600 text-white px-3 py-1 rounded cursor-pointer hover:bg-green-500 text-sm">
                        {uploading ? 'Subiendo...' : 'Subir archivo'}
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleUpload}
                            disabled={uploading}
                        />
                    </label>
                    <button
                        onClick={onBack}
                        className="text-sm text-white bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded"
                    >
                        ⬅ Volver
                    </button>
                </div>
            </div>

            <ul className="bg-white rounded-sm p-4 space-y-2">
                {files.map((file, index) => (
                    <li
                        key={index}
                        className="flex justify-between items-center p-2 rounded hover:bg-gray-50 relative"
                    >
                        <span className="text-gray-800">{file.name}</span>
                        <div className="relative">
                            <button
                                onClick={() =>
                                    setMenuOpen(menuOpen === file.id ? null : file.id)
                                }
                                className="text-gray-500 hover:text-gray-800"
                            >
                                ⋮
                            </button>
                            {menuOpen === file.id && (
                                <div className="absolute right-0 mt-2 w-32 bg-white rounded shadow-lg z-10">
                                    <button
                                        onClick={() => {
                                            handleDownload(file.name);
                                            setMenuOpen(null);
                                        }}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    >
                                        Descargar
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleDelete(file.name);
                                            setMenuOpen(null);
                                        }}
                                        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            )}
                        </div>
                    </li>
                ))}
                {files.length === 0 && (
                    <li className="text-gray-500">Esta carpeta está vacía.</li>
                )}
            </ul>
        </div>
    );
}

export default function FolderExplorer() {
    const { user } = useUser();
    const [folders, setFolders] = useState<string[]>([]);
    const [newFolderName, setNewFolderName] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

    const fetchFolders = async () => {
        if (!user?.email) return;

        const { data, error } = await client.storage
            .from('rambodrive')
            .list(user.email, { limit: 100 });

        if (error) {
            console.error('Error al obtener carpetas:', error.message);
            return;
        }

        const folderNames = data
            ?.filter(item => item.name && item.metadata === null)
            .map(item => item.name) || [];

        setFolders(folderNames);
    };

    useEffect(() => {
        fetchFolders();
    }, [user]);

    const handleAddFolder = async () => {
        if (!newFolderName.trim() || !user?.email) return;

        const folderPath = `${user.email}/${newFolderName}/.placeholder.txt`;

        setLoading(true);
        const { error } = await client.storage
            .from('rambodrive')
            .upload(folderPath, new Blob([''], { type: 'text/plain' }), {
                upsert: false,
            });

        if (error) {
            alert('Error al crear la carpeta');
            console.error(error);
        } else {
            setNewFolderName('');
            fetchFolders();
        }
        setLoading(false);
    };

    return (
        <div className="mb-6">
            <h2 className="text-xl font-medium text-white mb-4">Carpetas personales</h2>

            {!selectedFolder && (
                <>
                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            placeholder="Nueva carpeta"
                            className="p-2 rounded-lg bg-gray-100 text-black flex-1"
                        />
                        <button
                            onClick={handleAddFolder}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition"
                        >
                            {loading ? 'Creando...' : 'Crear'}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {folders.map((folderName, index) => (
                            <FolderCard
                                key={index}
                                name={folderName}
                                onClick={() => setSelectedFolder(folderName)}
                            />
                        ))}
                    </div>
                </>
            )}

            {selectedFolder && (
                <FolderViewer
                    folder={selectedFolder}
                    onBack={() => setSelectedFolder(null)}
                />
            )}
        </div>
    );
}
