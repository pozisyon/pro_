import { EventInput } from '@fullcalendar/core';

export interface CalendarEvent extends EventInput {

    id: string;

    title: string;

    start: string;

    end?: string;

    color: string;

    extendedProps: {

        type: 'VISIT' | 'APPOINTMENT';

        entityId: number;

        status: string;

        data: any;

    };

}