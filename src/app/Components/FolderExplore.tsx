// src/app/Components/FolderExplorer.tsx
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { client } from '../supabase-client';
import { useUser } from '../contexts/UserContext';
import { AppView } from '../Dashboard/page'; // Asegúrate que la ruta a tu página sea correcta

// --- 1. Interfaces y Tipos (Centralizados) ---
interface Profile {
  id: string;
  username: string;
  full_name: string | null;
}
export interface ContactRelation {
  id: number;
  alias: string | null;
  avatar_color: string | null;
  contact: Profile;
}
interface DbFile {
  id: number;
  file_name: string;
  storage_path: string;
  created_at: string;
  file_size: number;
}
interface DetailedShare {
  folder_name: string;
  owner_id: string;
  owner_name: string | null;
  shared_with_id: string;
  shared_with_name: string | null;
  share_direction: 'inbound' | 'outbound';
}
type FileType = "doc" | "excel" | "pdf" | "ppt" | "generic";

// --- 2. Funciones de Ayuda (Reutilizables) ---
const getFileType = (fileName: string): FileType => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    if (ext === "doc" || ext === "docx" || ext === "odt") return "doc";
    if (ext === "xls" || ext === "xlsx" || ext === "ods") return "excel";
    if (ext === "pdf") return "pdf";
    if (ext === "ppt" || ext === "pptx" || ext === "odp") return "ppt";
    return "generic";
};

const getFileIconProps = (type: FileType) => {
    switch (type) {
      case 'doc': return { iconPath: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", bgColor: "bg-blue-100", textColor: "text-blue-600" };
      case 'excel': return { iconPath: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", bgColor: "bg-green-100", textColor: "text-green-600" };
      case 'pdf': return { iconPath: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z", bgColor: "bg-red-100", textColor: "text-red-600" };
      case 'ppt': return { iconPath: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", bgColor: "bg-yellow-100", textColor: "text-yellow-600" };
      default: return { iconPath: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z", bgColor: "bg-gray-100", textColor: "text-gray-600" };
    }
};

// Hook personalizado para cerrar menús al hacer clic fuera
const useClickOutside = (handler: () => void) => {
    const domNode = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const maybeHandler = (event: MouseEvent) => {
            if (domNode.current && !domNode.current.contains(event.target as Node)) {
                handler();
            }
        };
        document.addEventListener("mousedown", maybeHandler);
        return () => {
            document.removeEventListener("mousedown", maybeHandler);
        };
    }, [handler]);
    return domNode;
};

// --- 3. Componentes de UI (Reutilizables) ---

function FolderCard({ name, description, onCardClick, onMenuClick, isShared = false }: { 
    name: string, 
    description?: string,
    onCardClick: () => void, 
    onMenuClick: (e: React.MouseEvent) => void, 
    isShared?: boolean 
}) {
    return (
        <div className="bg-gray-800 rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all relative group flex flex-col">
            <button onClick={onCardClick} className="text-white p-4 text-left font-medium w-full flex items-center flex-grow">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 mr-3 ${isShared ? 'text-purple-400' : 'text-yellow-400'} flex-shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                <span className="truncate">{name}</span>
            </button>
            {description && (
                <p className="text-xs text-gray-400 px-4 pb-2 truncate" title={description}>{description}</p>
            )}
            {!isShared && (
                <button onClick={onMenuClick} className="absolute top-3 right-2 p-1.5 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                </button>
            )}
        </div>
    );
}

function FolderViewer({ folder, ownerId, onBack, contacts, onShare }: { 
    folder: string; 
    ownerId: string; 
    onBack: () => void;
    contacts: ContactRelation[];
    onShare: (folderName: string, contact: ContactRelation) => void;
}) {
    const { user } = useUser();
    const [files, setFiles] = useState<DbFile[]>([]);
    const [menuOpen, setMenuOpen] = useState<number | null>(null);
    const [uploading, setUploading] = useState(false);
    const [shareMenuOpen, setShareMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const shareMenuRef = useRef<HTMLDivElement>(null);
    const isOwner = user?.id === ownerId;

    const fetchFiles = useCallback(async () => {
        if (!ownerId || !folder) return;
        const { data, error } = await client.from('files').select('id, file_name, storage_path, created_at, file_size').eq('user_id', ownerId).like('storage_path', `${ownerId}/${folder}/%`);
        if (error) { console.error("Error cargando archivos:", error); return; }
        setFiles(data || []);
    }, [ownerId, folder]);

    useEffect(() => { fetchFiles(); }, [fetchFiles]);
    
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(null);
            }
            if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
                setShareMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleDownload = async (storagePath: string) => {
        const { data, error } = await client.storage.from('rambodrive').createSignedUrl(storagePath, 60);
        if (error || !data?.signedUrl) { alert('Error al generar el enlace de descarga'); return; }
        window.open(data.signedUrl, '_blank');
    };

    const handleDelete = async (file: DbFile) => {
        await client.from('files').delete().eq('id', file.id);
        await client.storage.from('rambodrive').remove([file.storage_path]);
        fetchFiles();
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user?.id) return;
        setUploading(true);
        const path = `${ownerId}/${folder}/${file.name}`;
        const { error: uploadError } = await client.storage.from('rambodrive').upload(path, file, { upsert: true });
        if (uploadError) {
            alert('Error al subir archivo');
            setUploading(false);
            return;
        }
        const { error: insertError } = await client.from('files').insert({
            file_name: file.name,
            file_size: file.size,
            mime_type: file.type,
            storage_path: path,
            user_id: ownerId
        });
        if (insertError) {
            alert(`Error al guardar el archivo: ${insertError.message}`);
            await client.storage.from('rambodrive').remove([path]);
        } else {
            fetchFiles();
        }
        setUploading(false);
    };

    return (
        <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-lg font-semibold truncate">
                    Carpeta: {folder} {!isOwner && <span className="text-sm text-purple-400">(Compartida)</span>}
                </h3>
                <div className="flex gap-2 items-center">
                    {isOwner && (
                        <>
                            <div className="relative">
                                <button onClick={() => setShareMenuOpen(!shareMenuOpen)} className="text-sm text-white bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-lg font-medium">
                                    Compartir
                                </button>
                                {shareMenuOpen && (
                                    <div ref={shareMenuRef} className="absolute top-full right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-20 max-h-60 overflow-y-auto">
                                        <div className="p-2 border-b text-xs text-gray-500">Compartir con...</div>
                                        {contacts.length > 0 ? (
                                            contacts.map(contact => (
                                                <button key={contact.id} onClick={() => onShare(folder, contact)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                    {contact.alias || contact.contact.full_name || contact.contact.username}
                                                </button>
                                            ))
                                        ) : (
                                            <div className="px-4 py-3 text-sm text-gray-500">No tienes contactos.</div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <label className="bg-green-600 text-white px-3 py-1.5 rounded-lg cursor-pointer hover:bg-green-500 text-sm font-medium">
                                {uploading ? 'Subiendo...' : 'Subir archivo'}
                                <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
                            </label>
                        </>
                    )}
                    <button onClick={onBack} className="text-sm text-white bg-gray-600 hover:bg-gray-500 px-3 py-1.5 rounded-lg font-medium">
                        ⬅ Volver
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                {files.map((file) => {
                    const fileType = getFileType(file.file_name);
                    const { iconPath, bgColor, textColor } = getFileIconProps(fileType);
                    return (
                        <div key={file.id} className="bg-gray-800 rounded-lg shadow-lg hover:shadow-blue-500/20 transition-shadow duration-300 group">
                            <div className={`h-32 flex items-center justify-center ${bgColor} rounded-t-lg`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-16 w-16 ${textColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={iconPath}></path></svg>
                            </div>
                            <div className="p-3 relative">
                                <h3 className="font-medium text-white text-sm whitespace-nowrap overflow-hidden text-ellipsis" title={file.file_name}>{file.file_name}</h3>
                                <p className="text-xs text-gray-400">{new Date(file.created_at).toLocaleDateString()}</p>
                                {isOwner && (
                                    <div className="absolute top-2 right-2">
                                        <button onClick={() => setMenuOpen(menuOpen === file.id ? null : file.id)} className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                                        </button>
                                        {menuOpen === file.id && (
                                            <div ref={menuRef} className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                                                <button onClick={() => handleDownload(file.storage_path)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Descargar</button>
                                                <button onClick={() => handleDelete(file)} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Eliminar</button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
                {files.length === 0 && !uploading && (<div className="col-span-full text-center py-8 text-gray-500">Esta carpeta está vacía.</div>)}
            </div>
        </div>
    );
}


// --- 4. Componente Principal (Orquestador) ---
interface FolderExplorerProps {
  view: AppView;
  onFolderSelect: (folderName: string | null) => void;
}

export default function FolderExplorer({ view, onFolderSelect }: FolderExplorerProps) {
    const { user } = useUser();
    const [folders, setFolders] = useState<string[]>([]);
    const [allShares, setAllShares] = useState<DetailedShare[]>([]);
    const [contacts, setContacts] = useState<ContactRelation[]>([]);
    const [newFolderName, setNewFolderName] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState<{ name: string; ownerId: string } | null>(null);
    const [folderMenuOpen, setFolderMenuOpen] = useState<string | null>(null);
    const [shareMenuOpen, setShareMenuOpen] = useState<string | null>(null);
    const [renamingFolder, setRenamingFolder] = useState<string | null>(null);
    const [renameInput, setRenameInput] = useState('');
    const menuRef = useRef<HTMLDivElement>(null);

    const handleSetSelectedFolder = (folder: { name: string; ownerId: string } | null) => {
        setSelectedFolder(folder);
        onFolderSelect(folder ? folder.name : null);
    };

    const fetchFolders = useCallback(async () => {
        if (!user?.id) return;
        const { data, error } = await client.storage.from('rambodrive').list(user.id, { limit: 100 });
        if (error) { console.error('Error al obtener carpetas:', error.message); return; }
        const folderNames = data?.filter(item => item.id === null).map(item => item.name) || [];
        setFolders(folderNames);
    }, [user]);

    const fetchAllShares = useCallback(async () => {
        if (!user?.id) return;
        setLoading(true);
        const { data, error } = await client.rpc('get_all_my_shares', { p_user_id: user.id });
        if (error) {
            console.error("Error fetching all shares:", error);
        } else {
            setAllShares(data || []);
        }
        setLoading(false);
    }, [user]);
    
    const fetchContacts = useCallback(async () => {
        if (!user) return;
        const { data, error } = await client.from('contacts').select(`id, alias, avatar_color, contact:contact_id ( id, username, full_name )`).eq('owner_id', user.id);
        if (error) { console.error("Error cargando contactos:", error); return; }
        if (data) {
            const validData = (data as any[]).filter(item => item.contact && typeof item.contact === 'object').map(item => ({ id: item.id, alias: item.alias, avatar_color: item.avatar_color, contact: item.contact }));
            setContacts(validData);
        }
    }, [user]);

    useEffect(() => {
        handleSetSelectedFolder(null);
        if (view === 'my_drive') {
            fetchFolders();
            fetchContacts();
        } else if (view === 'shared_with_me') {
            fetchAllShares();
        }
    }, [view, fetchFolders, fetchAllShares, fetchContacts]);
    
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setFolderMenuOpen(null);
                setShareMenuOpen(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleAddFolder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newFolderName.trim() || !user?.id) return;
        const folderPath = `${user.id}/${newFolderName}/.placeholder`;
        setLoading(true);
        const { error } = await client.storage.from('rambodrive').upload(folderPath, new Blob(['']), { upsert: false });
        if (error) { alert('Error al crear la carpeta. Es posible que ya exista.'); } else { setNewFolderName(''); fetchFolders(); }
        setLoading(false);
    };

    const handleDeleteFolder = async (folderName: string) => {
        if (!user?.id) return;
        if (!confirm(`¿Estás seguro de que quieres eliminar la carpeta "${folderName}" y todo su contenido?`)) return;
        const { data: files } = await client.storage.from('rambodrive').list(`${user.id}/${folderName}`);
        const filePathsToDelete = files?.map(file => `${user.id}/${folderName}/${file.name}`) || [];
        await client.from('files').delete().like('storage_path', `${user.id}/${folderName}/%`);
        if (filePathsToDelete.length > 0) {
            await client.storage.from('rambodrive').remove(filePathsToDelete);
        }
        fetchFolders();
        setFolderMenuOpen(null);
    };

    const handleRenameFolder = async (oldName: string) => {
        const newName = renameInput.trim();
        if (!user?.id || !newName || oldName === newName) {
            setRenamingFolder(null);
            return;
        }
        const { data: filesToMove } = await client.storage.from('rambodrive').list(`${user.id}/${oldName}`);
        for (const file of filesToMove || []) {
            await client.storage.from('rambodrive').move(`${user.id}/${oldName}/${file.name}`, `${user.id}/${newName}/${file.name}`);
        }
        const { data: dbFiles } = await client.from('files').select('id, storage_path').like('storage_path', `${user.id}/${oldName}/%`);
        if (dbFiles) {
            for (const file of dbFiles) {
                const newPath = file.storage_path.replace(`${user.id}/${oldName}`, `${user.id}/${newName}`);
                await client.from('files').update({ storage_path: newPath }).eq('id', file.id);
            }
        }
        setRenamingFolder(null);
        fetchFolders();
    };
    
    const handleShareWithContact = async (folderName: string, contact: ContactRelation) => {
        if (!user) return;
        const { error } = await client.from('shares').insert({ folder_name: folderName, owner_id: user.id, shared_with_id: contact.contact.id });
        if (error) {
            alert(`Error al compartir: ${error.message}`);
        } else {
            alert(`¡Carpeta "${folderName}" compartida con ${contact.alias || contact.contact.full_name}!`);
        }
        setShareMenuOpen(null);
    };

    // --- Lógica de Renderizado ---
    if (selectedFolder) {
        return <FolderViewer 
                    folder={selectedFolder.name} 
                    ownerId={selectedFolder.ownerId} 
                    onBack={() => handleSetSelectedFolder(null)}
                    contacts={contacts}
                    onShare={handleShareWithContact}
                />;
    }

    if (view === 'my_drive') {
        return (
            <div>
                <h2 className="text-xl font-medium text-white mb-4">Carpetas personales</h2>
                <form onSubmit={handleAddFolder} className="flex gap-2 mb-4">
                    <input type="text" value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} placeholder="Nombre de la nueva carpeta" className="p-2 rounded-lg bg-gray-700 text-white border border-gray-600 flex-1" />
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 font-semibold" disabled={loading}>{loading ? 'Creando...' : 'Crear'}</button>
                </form>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {folders.map((folderName, index) => (
                        <div key={`own-${index}`} className="relative">
                            {renamingFolder === folderName ? (
                                <form onSubmit={(e) => { e.preventDefault(); handleRenameFolder(folderName); }} className="bg-gray-800 rounded-xl p-2 flex gap-2">
                                    <input type="text" value={renameInput} onChange={(e) => setRenameInput(e.target.value)} autoFocus className="p-2 rounded-lg bg-gray-700 text-white flex-1" />
                                    <button type="submit" className="bg-green-600 text-white px-3 rounded-lg">✓</button>
                                    <button type="button" onClick={() => setRenamingFolder(null)} className="bg-red-600 text-white px-3 rounded-lg">×</button>
                                </form>
                            ) : (
                                <FolderCard name={folderName} onCardClick={() => user && handleSetSelectedFolder({ name: folderName, ownerId: user.id })} onMenuClick={(e) => { e.stopPropagation(); setFolderMenuOpen(folderMenuOpen === folderName ? null : folderName); }} />
                            )}
                            {folderMenuOpen === folderName && (
                                <div ref={menuRef} className="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-20">
                                    <button onClick={() => { setShareMenuOpen(folderName); setFolderMenuOpen(null); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Compartir</button>
                                    <button onClick={() => { setRenamingFolder(folderName); setRenameInput(folderName); setFolderMenuOpen(null); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Cambiar nombre</button>
                                    <button onClick={() => handleDeleteFolder(folderName)} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Eliminar carpeta</button>
                                </div>
                            )}
                            {shareMenuOpen === folderName && (
                                <div ref={menuRef} className="absolute top-full right-0 mt-1 w-56 bg-white rounded-md shadow-lg z-20 max-h-60 overflow-y-auto">
                                    <div className="p-2 border-b text-xs text-gray-500">Compartir con...</div>
                                    {contacts.length > 0 ? (
                                        contacts.map(contact => (
                                            <button key={contact.id} onClick={() => handleShareWithContact(folderName, contact)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                {contact.alias || contact.contact.full_name || contact.contact.username}
                                            </button>
                                        ))
                                    ) : (
                                        <div className="px-4 py-3 text-sm text-gray-500">No tienes contactos.</div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (view === 'shared_with_me') {
        return (
            <div>
                <h2 className="text-xl font-medium text-white mb-4">Compartido conmigo y por mí</h2>
                {loading ? (
                    <p className="text-center text-gray-400">Cargando...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {allShares.length > 0 ? allShares.map((share, index) => {
                            const isOutbound = share.share_direction === 'outbound';
                            const description = isOutbound 
                                ? `Para: ${share.shared_with_name || 'Desconocido'}` 
                                : `De: ${share.owner_name || 'Desconocido'}`;
                            
                            return (
                                <FolderCard 
                                    key={`share-${index}`} 
                                    name={share.folder_name} 
                                    description={description}
                                    onCardClick={() => handleSetSelectedFolder({ name: share.folder_name, ownerId: share.owner_id })} 
                                    onMenuClick={(e) => e.stopPropagation()}
                                    isShared={true} 
                                />
                            );
                        }) : (
                            <p className="col-span-full text-center py-8 text-gray-500">No tienes carpetas compartidas.</p>
                        )}
                    </div>
                )}
            </div>
        );
    }

    return null;
}
