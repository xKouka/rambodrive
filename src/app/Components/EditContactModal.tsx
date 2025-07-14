'use client';

import React, { useState, useEffect } from 'react';
import { client } from '../supabase-client';
import { ContactRelation } from './Contacts'; // Importamos el tipo desde Contacts

interface EditContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    onContactUpdated: () => void;
    contactToEdit: ContactRelation | null;
}

const avatarColors = ['bg-blue-500', 'bg-emerald-500', 'bg-purple-500', 'bg-amber-500', 'bg-red-500', 'bg-indigo-500'];

export default function EditContactModal({ isOpen, onClose, onContactUpdated, contactToEdit }: EditContactModalProps) {
    const [alias, setAlias] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (contactToEdit) {
            setAlias(contactToEdit.alias || '');
            setSelectedColor(contactToEdit.avatar_color || avatarColors[0]);
        }
    }, [contactToEdit]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!contactToEdit) return;
        setLoading(true);

        try {
            const { error } = await client
                .from('contacts')
                .update({
                    alias: alias.trim() || null,
                    avatar_color: selectedColor,
                })
                .eq('id', contactToEdit.id);

            if (error) throw error;
            onContactUpdated();
            onClose();
        } catch (error) {
            alert("Error al actualizar el contacto.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !contactToEdit) return null;
    const displayName = contactToEdit.contact.full_name || contactToEdit.contact.username;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center" onClick={onClose}>
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md text-white shadow-lg m-4" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-semibold mb-4">Editar Contacto</h2>
                <form onSubmit={handleUpdate}>
                    <div className="bg-gray-700/50 p-4 rounded-lg mb-4">
                        <p className="font-bold text-lg">{displayName}</p>
                        <p className="text-sm text-gray-400">{contactToEdit.contact.username}</p>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="alias" className="block text-sm font-medium text-gray-300 mb-1">Alias</label>
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
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 font-semibold">Cancelar</button>
                        <button type="submit" disabled={loading} className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 font-semibold disabled:bg-gray-500">Guardar Cambios</button>
                    </div>
                </form>
            </div>
        </div>
    );
}