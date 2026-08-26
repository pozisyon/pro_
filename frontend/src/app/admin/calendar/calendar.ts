import {
  Component,
  OnInit,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import {
  CalendarOptions,
  EventClickArg
} from '@fullcalendar/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import frLocale from '@fullcalendar/core/locales/fr.js';

import { CalendarService } from '../../core/services/calendar.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    FullCalendarModule
  ],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css'
})
export class Calendar implements OnInit {

  private readonly calendarService = inject(CalendarService);

  loading = true;
  selectedEvent: any = null; // Stocke l'événement sélectionné pour la modale

  calendarOptions: CalendarOptions = {
    plugins: [
      dayGridPlugin,
      timeGridPlugin,
      interactionPlugin,
      listPlugin
    ],
    locale: frLocale,
    initialView: 'dayGridMonth',
    height: 'auto',
    weekends: true,
    editable: false,
    selectable: true,
    eventDisplay: 'block',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    events: [],
    eventClick: this.onEventClick.bind(this)
  };

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.loading = true;
    this.calendarService
        .findEvents()
        .subscribe({
          next: events => {
            this.calendarOptions = {
              ...this.calendarOptions,
              events: events as any
            };
            this.loading = false;
          },
          error: error => {
            console.error('Erreur calendrier', error);
            this.loading = false;
          }
        });
  }

  onEventClick(clickInfo: EventClickArg): void {
    // Récupération des infos envoyées par CalendarService
    const props = clickInfo.event.extendedProps;

    this.selectedEvent = {
      title: clickInfo.event.title,
      start: clickInfo.event.start,
      color: clickInfo.event.backgroundColor,
      type: props['type'],
      status: props['status'],
      data: props['data']
    };
  }

  closeModal(): void {
    this.selectedEvent = null;
  }
}