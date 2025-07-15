'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { client } from '../supabase-client';
import { useUser } from '../contexts/UserContext';
import AddContactModal from './AddContactModal';
import EditContactModal from './EditContactModal';
import { showConfirmAlert, showErrorAlert, showSuccessAlert } from '../../utils/alerts';

// --- Interfaces y Tipos ---
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
const getInitials = (name: string): string => {
    const names = name.split(' ');
    const firstInitial = names[0]?.[0] || '';
    const lastInitial = names.length > 1 ? names[names.length - 1]?.[0] || '' : '';
    return `${firstInitial}${lastInitial}`.toUpperCase();
};

function ContactCard({ contactRelation, onEdit, onDelete }: {
    contactRelation: ContactRelation;
    onEdit: () => void;
    onDelete: () => void;
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const contactProfile = contactRelation.contact;
    const displayName = contactRelation.alias || contactProfile.full_name || contactProfile.username;
    const initials = getInitials(displayName);
    const avatarColor = contactRelation.avatar_color || 'bg-gray-500';

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) setIsMenuOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuRef]);

    return (
        <div className="bg-gray-800 rounded-xl shadow-lg hover:shadow-blue-500/20 p-4 flex flex-col items-center text-center group relative">
            <div className="absolute top-2 right-2">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-1.5 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                </button>
                {isMenuOpen && (
                    <div ref={menuRef} className="absolute right-0 mt-2 w-40 bg-gray-900 border border-gray-700 rounded-md shadow-lg z-10 text-left">
                        <a onClick={(e) => { e.preventDefault(); onEdit(); setIsMenuOpen(false); }} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer">Editar</a>
                        <a onClick={(e) => { e.preventDefault(); onDelete(); setIsMenuOpen(false); }} className="block px-4 py-2 text-sm text-red-400 hover:bg-gray-700 cursor-pointer">Eliminar</a>
                    </div>
                )}
            </div>
            <div className={`w-20 h-20 rounded-full ${avatarColor} flex items-center justify-center mb-4 text-white text-2xl font-bold`}>
                {initials}
            </div>
            <h3 className="font-bold text-white text-lg truncate w-full" title={displayName}>{displayName}</h3>
            <p className="text-sm text-gray-400 truncate w-full" title={contactProfile.username}>{contactProfile.username}</p>
        </div>
    );
}

export default function Contacts() {
    const { user } = useUser();
    const [contacts, setContacts] = useState<ContactRelation[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [contactToEdit, setContactToEdit] = useState<ContactRelation | null>(null);

    const fetchContacts = useCallback(async () => {
        if (!user) {
            setLoading(false);
            return;
        }
        try {
            const { data, error } = await client
                .from('contacts')
                .select(`id, alias, avatar_color, contact:contact_id ( id, username, full_name )`)
                .eq('owner_id', user.id);

            if (error) throw error;

            if (data) {
                const validContacts = data
                    .filter(d => d.contact)
                    .map(d => ({
                        id: Number(d.id),
                        alias: d.alias,
                        avatar_color: d.avatar_color,
                        contact: d.contact,
                    })) as unknown as ContactRelation[];

                setContacts(validContacts);
            } else {
                setContacts([]);
            }

        } catch (error) {
            console.error("Error cargando contactos:", error);
            showErrorAlert("Error de Carga", "No se pudieron cargar tus contactos.");
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchContacts();
    }, [fetchContacts]);

    const handleDeleteContact = async (contactId: number, contactName: string) => {
        const isConfirmed = await showConfirmAlert(
            '¿Eliminar Contacto?',
            `¿Estás seguro de que quieres eliminar a ${contactName} de tus contactos?`,
            'Sí, eliminar'
        );

        if (isConfirmed) {
            try {
                const { error } = await client.from('contacts').delete().eq('id', contactId);
                if (error) throw error;

                showSuccessAlert('¡Eliminado!', `${contactName} ha sido eliminado de tus contactos.`);
                setContacts(prevContacts => prevContacts.filter(c => c.id !== contactId));

            } catch (error) {
                showErrorAlert("Error", "No se pudo eliminar el contacto.");
                console.error(error);
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Contactos</h2>
                <button onClick={() => setIsAddModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 font-semibold">Añadir Contacto</button>
            </div>
            {loading ? (<p className="text-center text-gray-400 mt-8">Cargando...</p>)
                : contacts.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        <p>Tu libreta de contactos está vacía.</p>
                        <button onClick={() => setIsAddModalOpen(true)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">Añadir tu primer contacto</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {contacts.map((c) => (
                            <ContactCard
                                key={c.id}
                                contactRelation={c}
                                onEdit={() => setContactToEdit(c)}
                                onDelete={() => handleDeleteContact(c.id, c.alias || c.contact.full_name || c.contact.username)}
                            />
                        ))}
                    </div>
                )}

            <AddContactModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onContactAdded={() => { setIsAddModalOpen(false); fetchContacts(); }}
            />
            <EditContactModal
                isOpen={!!contactToEdit}
                onClose={() => setContactToEdit(null)}
                onContactUpdated={() => { setContactToEdit(null); fetchContacts(); }}
                contactToEdit={contactToEdit}
            />
        </div>
    );
}
