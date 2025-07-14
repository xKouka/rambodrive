// src/app/Components/EventModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { EventClickArg, EventInput } from '@fullcalendar/core';

// Interfaces
interface EventModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (eventData: Partial<EventInput> & { description?: string }) => void;
    onDelete: (eventId: string) => void;
    eventInfo: EventClickArg | { startStr: string, endStr: string } | null;
    isOwner: boolean;
}

export default function EventModal({ isOpen, onClose, onSave, onDelete, eventInfo, isOwner }: EventModalProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [allDay, setAllDay] = useState(false);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const isCreating = !('event' in (eventInfo || {}));

    const formatDateForInput = (dateStr: string, isAllDay: boolean) => {
        // Si no hay fecha, devuelve un string vacío
        if (!dateStr) return '';
        // Devuelve 'YYYY-MM-DD' para eventos de todo el día
        if (isAllDay) return dateStr.slice(0, 10);
        // Devuelve 'YYYY-MM-DDTHH:mm' para eventos con hora
        return dateStr.slice(0, 16);
    };

    // Este useEffect se ejecuta cuando el modal se abre o cambia el evento
    useEffect(() => {
        if (eventInfo) {
            if ('event' in eventInfo) { // Editando o viendo
                const { event } = eventInfo;
                const isAllDayEvent = event.allDay;
                setTitle(event.title);
                setDescription(event.extendedProps.description || '');
                setAllDay(isAllDayEvent);
                // Usamos la fecha de inicio del evento para ambos campos si es necesario
                const start = event.start ? event.start.toISOString() : new Date().toISOString();
                const end = event.end ? event.end.toISOString() : start;
                setStartTime(formatDateForInput(start, isAllDayEvent));
                setEndTime(formatDateForInput(end, isAllDayEvent));
            } else { // Creando
                setTitle('');
                setDescription('');
                setAllDay(false); // Por defecto al crear no es "todo el día"
                setStartTime(formatDateForInput(eventInfo.startStr, false));
                setEndTime(formatDateForInput(eventInfo.endStr, false));
            }
        }
    }, [eventInfo]);

    // --- INICIO DE LA CORRECCIÓN ---
    // Este nuevo useEffect reacciona a los cambios del checkbox 'allDay'
    useEffect(() => {
        // Cuando el estado de 'allDay' cambia, reformateamos las fechas
        setStartTime(prev => formatDateForInput(prev, allDay));
        setEndTime(prev => formatDateForInput(prev, allDay));
    }, [allDay]);
    // --- FIN DE LA CORRECCIÓN ---

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const eventData = {
            id: isCreating ? undefined : (eventInfo as EventClickArg).event.id,
            title,
            description,
            start: startTime,
            end: endTime,
            allDay,
        };
        onSave(eventData);
    };

    if (!isOpen || !eventInfo) return null;
    const canEdit = isCreating || isOwner;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center" onClick={onClose}>
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg text-white shadow-lg" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-semibold mb-6">{isCreating ? 'Crear Nuevo Evento' : 'Detalles del Evento'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium mb-1">Título</label>
                        <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} disabled={!canEdit} className="w-full p-2 rounded bg-gray-700 border border-gray-600 disabled:opacity-50" required />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium mb-1">Descripción</label>
                        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} disabled={!canEdit} className="w-full p-2 rounded bg-gray-700 border border-gray-600 disabled:opacity-50" rows={3}></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="start_time" className="block text-sm font-medium mb-1">Inicio</label>
                            <input id="start_time" type={allDay ? 'date' : 'datetime-local'} value={startTime} onChange={e => setStartTime(e.target.value)} disabled={!canEdit} className="w-full p-2 rounded bg-gray-700 border border-gray-600 disabled:opacity-50" />
                        </div>
                        <div>
                            <label htmlFor="end_time" className="block text-sm font-medium mb-1">Fin</label>
                            <input id="end_time" type={allDay ? 'date' : 'datetime-local'} value={endTime} onChange={e => setEndTime(e.target.value)} disabled={!canEdit} className="w-full p-2 rounded bg-gray-700 border border-gray-600 disabled:opacity-50" />
                        </div>
                    </div>
                    <div className="flex items-center pt-2">
                        <input id="all_day" type="checkbox" checked={allDay} onChange={e => setAllDay(e.target.checked)} disabled={!canEdit} className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500 disabled:opacity-50" />
                        <label htmlFor="all_day" className="ml-2 block text-sm">Todo el día</label>
                    </div>
                    <div className="flex justify-between items-center pt-4">
                        <div>
                            {(!isCreating && isOwner) && (
                                <button type="button" onClick={() => onDelete((eventInfo as EventClickArg).event.id)} className="px-4 py-2 rounded bg-red-600 hover:bg-red-500 font-semibold">Eliminar</button>
                            )}
                        </div>
                        <div className="flex gap-4">
                            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 font-semibold">Cancelar</button>
                            {canEdit && (
                                <button type="submit" className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 font-semibold">Guardar</button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}