'use client';

import React, { useState } from 'react';
import { client } from '../supabase-client';
import { useUser } from '../contexts/UserContext';
// 1. Importa tus nuevas funciones de alerta
import { showSuccessAlert, showErrorAlert } from '../../utils/alerts';

interface AddContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    onContactAdded: () => void;
}

interface Profile {
    id: string;
    username: string;
    full_name: string | null;
}

const avatarColors = ['bg-blue-500', 'bg-emerald-500', 'bg-purple-500', 'bg-amber-500', 'bg-red-500', 'bg-indigo-500'];

export default function AddContactModal({ isOpen, onClose, onContactAdded }: AddContactModalProps) {
    const { user } = useUser();
    const [searchEmail, setSearchEmail] = useState('');
    const [alias, setAlias] = useState('');
    const [selectedColor, setSelectedColor] = useState(avatarColors[0]);
    const [foundProfile, setFoundProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!searchEmail.trim()) return;
        setLoading(true);
        setFoundProfile(null);

        try {
            const { data, error } = await client.from('profiles').select('*').eq('username', searchEmail.trim()).single();
            if (error && error.code !== 'PGRST116') throw error;

            if (data) {
                if (data.id === user?.id) {
                    showErrorAlert("Acción no permitida", "No puedes añadirte a ti mismo como contacto.");
                } else {
                    setFoundProfile(data);
                }
            } else {
                showErrorAlert("Búsqueda sin resultados", "No se encontró ningún usuario con ese email.");
            }
        } catch (error) {
            showErrorAlert('Error', 'Ocurrió un problema al buscar el usuario.');
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddContact = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!foundProfile || !user) return;
        setLoading(true);

        try {
            const { error } = await client.from('contacts').insert({
                owner_id: user.id,
                contact_id: foundProfile.id,
                alias: alias.trim() || null,
                avatar_color: selectedColor,
            });

            if (error) throw error;

            showSuccessAlert('¡Éxito!', 'El contacto ha sido añadido correctamente.');
            onContactAdded();
            handleClose();

        } catch (error) {
            if (error && typeof error === 'object' && 'code' in error) {
                if (error.code === '23505') {
                    showErrorAlert("Contacto duplicado", "Ya tienes a este usuario en tu lista de contactos.");
                } else {
                    showErrorAlert('Error', 'Hubo un error al guardar el contacto.');
                    console.error("Error al añadir contacto:", error);
                }
            } else {
                showErrorAlert('Error inesperado', 'Hubo un error inesperado al guardar el contacto.');
                console.error("Error al añadir contacto:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setSearchEmail('');
        setAlias('');
        setFoundProfile(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center" onClick={handleClose}>
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md text-white shadow-lg m-4" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-semibold mb-4">Añadir Contacto</h2>
                {!foundProfile ? (
                    <>
                        <p className="text-sm text-gray-400 mb-4">Ingresa el email del usuario a buscar.</p>
                        <div className="flex gap-2 mb-4">
                            <input type="email" value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} placeholder="email@ejemplo.com" className="w-full p-2 rounded bg-gray-700 border border-gray-600" />
                            <button onClick={handleSearch} disabled={loading} className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 font-semibold disabled:bg-gray-500">
                                {loading ? '...' : 'Buscar'}
                            </button>
                        </div>
                    </>
                ) : (
                    <form onSubmit={handleAddContact}>
                        <div className="bg-gray-700/50 p-4 rounded-lg mb-4">
                            <p className="text-sm text-gray-300">Usuario encontrado:</p>
                            <p className="font-bold text-lg">{foundProfile.full_name || foundProfile.username}</p>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="alias" className="block text-sm font-medium text-gray-300 mb-1">Alias (Opcional)</label>
                            <input id="alias" type="text" value={alias} onChange={(e) => setAlias(e.target.value)} placeholder="Ej: Juan - Trabajo" className="w-full p-2 rounded bg-gray-700 border border-gray-600" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Color del Avatar</label>
                            <div className="flex gap-3">
                                {avatarColors.map(color => (
                                    <div key={color} onClick={() => setSelectedColor(color)} className={`w-8 h-8 rounded-full cursor-pointer transition-transform ${color} ${selectedColor === color ? 'ring-2 ring-offset-2 ring-offset-gray-800 ring-white' : ''}`} />
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-end gap-4">
                            <button type="button" onClick={() => setFoundProfile(null)} className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 font-semibold">Atrás</button>
                            <button type="submit" disabled={loading} className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 font-semibold disabled:bg-gray-500">Añadir</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
