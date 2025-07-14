'use client';

import React, { useState, useEffect, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import { EventClickArg, EventInput, DateSelectArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

import { client } from '../supabase-client';
import { useUser } from '../contexts/UserContext';
import EventModal from './EventModal';

export default function Calendar() {
    const { user } = useUser();
    const [events, setEvents] = useState<EventInput[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEventInfo, setSelectedEventInfo] = useState<EventClickArg | DateSelectArg | null>(null);
    const [isOwner, setIsOwner] = useState(false);

    // Cargar eventos desde Supabase
    const fetchEvents = useCallback(async () => {
        if (!user) return;
        const { data, error } = await client
            .from('calendar_events')
            .select('*');

        if (error) {
            console.error("Error cargando eventos:", error);
            return;
        }

        const formattedEvents = data.map(event => ({
            id: event.id,
            title: event.title,
            start: event.start_time,
            end: event.end_time,
            allDay: event.all_day,
            color: event.color,
            extendedProps: {
                description: event.description,
                owner_id: event.owner_id
            }
        }));
        setEvents(formattedEvents);
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchEvents();
        }
    }, [user, fetchEvents]);

    // Manejar la creación de un nuevo evento al seleccionar fechas
    const handleSelect = (selectInfo: DateSelectArg) => {
        setSelectedEventInfo(selectInfo);
        setIsOwner(true); // Al crear, eres el dueño
        setIsModalOpen(true);
    };

    // Manejar el clic en un evento existente
    const handleEventClick = (clickInfo: EventClickArg) => {
        setSelectedEventInfo(clickInfo);
        setIsOwner(clickInfo.event.extendedProps.owner_id === user?.id);
        setIsModalOpen(true);
    };

    // Guardar (crear o actualizar) un evento
    const handleSaveEvent = async (eventData: Partial<EventInput> & { description?: string }) => {
        if (!user) return;

        const dataToSave = {
            owner_id: user.id,
            title: eventData.title,
            description: eventData.description,
            start_time: eventData.start,
            end_time: eventData.end,
            all_day: eventData.allDay,
        };

        let error;
        if (eventData.id) { // Actualizar evento existente
            ({ error } = await client.from('calendar_events').update(dataToSave).eq('id', eventData.id));
        } else { // Crear nuevo evento
            ({ error } = await client.from('calendar_events').insert(dataToSave));
        }

        if (error) {
            alert("Error al guardar el evento.");
            console.error(error);
        } else {
            setIsModalOpen(false);
            fetchEvents(); // Recargar eventos
        }
    };

    // Eliminar un evento
    const handleDeleteEvent = async (eventId: string) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este evento?")) {
            const { error } = await client.from('calendar_events').delete().eq('id', eventId);
            if (error) {
                alert("Error al eliminar el evento.");
                console.error(error);
            } else {
                setIsModalOpen(false);
                fetchEvents(); // Recargar eventos
            }
        }
    };

    return (
        <div className="text-white p-4 bg-gray-800 rounded-lg">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                timeZone='locale' // <-- LA LÍNEA CLAVE PARA CORREGIR LA ZONA HORARIA
                weekends={true}
                events={events}
                locale={esLocale}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                selectable={true}
                select={handleSelect}
                eventClick={handleEventClick}
            />

            <EventModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveEvent}
                onDelete={handleDeleteEvent}
                eventInfo={selectedEventInfo}
                isOwner={isOwner}
            />
        </div>
    );
}