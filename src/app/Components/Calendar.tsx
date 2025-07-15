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
import { showSuccessAlert, showErrorAlert, showConfirmAlert } from '../../utils/alerts';

export default function Calendar() {
    const { user } = useUser();
    const [events, setEvents] = useState<EventInput[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEventInfo, setSelectedEventInfo] = useState<EventClickArg | DateSelectArg | null>(null);
    const [isOwner, setIsOwner] = useState(false);

    const fetchEvents = useCallback(async () => {
        if (!user) return;
        const { data, error } = await client
            .from('calendar_events')
            .select('*');

        if (error) {
            console.error("Error cargando eventos:", error);
            showErrorAlert("Error de Carga", "No se pudieron cargar los eventos del calendario.");
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

    const handleSelect = (selectInfo: DateSelectArg) => {
        setSelectedEventInfo(selectInfo);
        setIsOwner(true);
        setIsModalOpen(true);
    };

    const handleEventClick = (clickInfo: EventClickArg) => {
        setSelectedEventInfo(clickInfo);
        setIsOwner(clickInfo.event.extendedProps.owner_id === user?.id);
        setIsModalOpen(true);
    };

    const handleSaveEvent = async (eventData: Partial<EventInput> & { description?: string; color?: string }) => {
        if (!user) return;

        const dataToSave = {
            owner_id: user.id,
            title: eventData.title,
            description: eventData.description,
            start_time: eventData.start,
            end_time: eventData.end,
            all_day: eventData.allDay,
            color: eventData.color,
        };

        let error;
        if (eventData.id) {
            ({ error } = await client.from('calendar_events').update(dataToSave).eq('id', eventData.id));
        } else {
            ({ error } = await client.from('calendar_events').insert(dataToSave));
        }

        if (error) {
            showErrorAlert("Error al Guardar", "No se pudo guardar el evento. Por favor, inténtalo de nuevo.");
            console.error(error);
        } else {
            showSuccessAlert("¡Guardado!", "El evento se ha guardado correctamente.");
            setIsModalOpen(false);
            fetchEvents();
        }
    };

    const handleDeleteEvent = async (eventId: string) => {
        const isConfirmed = await showConfirmAlert(
            '¿Confirmas la eliminación?',
            'Esta acción no se puede deshacer.',
            'Sí, eliminar evento'
        );

        if (isConfirmed) {
            const { error } = await client.from('calendar_events').delete().eq('id', eventId);
            if (error) {
                // 6. Reemplazamos el alert() por nuestra alerta de error
                showErrorAlert("Error al Eliminar", "No se pudo eliminar el evento.");
                console.error(error);
            } else {
                // 7. Añadimos una alerta de éxito para la eliminación
                showSuccessAlert("¡Eliminado!", "El evento se ha eliminado del calendario.");
                setIsModalOpen(false);
                fetchEvents();
            }
        }
    };

    return (
        <div className="text-white p-4 bg-gray-800 rounded-lg">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                timeZone='locale'
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
