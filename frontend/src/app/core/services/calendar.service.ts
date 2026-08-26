import { Injectable, inject } from '@angular/core';
import { forkJoin, map, Observable, catchError, of } from 'rxjs';
import { CalendarEvent } from '../models/calendar-event';
import { VisitService } from './visit.service';
import { AppointmentService } from './appointment.service';
import { PropertyVisitResponse } from '../models/property-visit';
import { AppointmentResponse } from '../models/appointment';

@Injectable({
    providedIn: 'root'
})
export class CalendarService {

    private readonly visitService = inject(VisitService);
    private readonly appointmentService = inject(AppointmentService);

    findEvents(): Observable<CalendarEvent[]> {
        return forkJoin({
            // Securisation : Si l'API des visites échoue, on renvoie un tableau vide
            visits: this.visitService.findAll().pipe(
                catchError(error => {
                    console.error('Erreur lors du chargement des visites :', error);
                    return of([]);
                })
            ),
            // Securisation : Si l'API des rendez-vous échoue, on renvoie un tableau vide
            appointments: this.appointmentService.findAll().pipe(
                catchError(error => {
                    console.error('Erreur lors du chargement des rendez-vous :', error);
                    return of([]);
                })
            )
        }).pipe(
            map(result => {
                const visitEvents = (result.visits || []).map(v => this.visitToEvent(v));
                const appointmentEvents = (result.appointments || []).map(a => this.appointmentToEvent(a));

                return [...visitEvents, ...appointmentEvents];
            })
        );
    }

    private visitToEvent(visit: PropertyVisitResponse): CalendarEvent {
        return {
            id: `visit-${visit.id}`,
            title: `🏠 ${visit.propertyTitle || 'Visite'}`,
            start: visit.dateVisite,
            color: this.visitColor(visit.statut),
            extendedProps: {
                type: 'VISIT',
                entityId: visit.id,
                status: visit.statut,
                data: visit
            }
        };
    }

    private appointmentToEvent(appointment: AppointmentResponse): CalendarEvent {
        return {
            id: `appointment-${appointment.id}`,
            title: `🤝 ${appointment.sujet || 'Rendez-vous'}`,
            start: appointment.dateDebut,
            color: this.appointmentColor(appointment.statut),
            extendedProps: {
                type: 'APPOINTMENT',
                entityId: appointment.id,
                status: appointment.statut,
                data: appointment
            }
        };
    }

    private visitColor(status: string): string {
        switch (status) {
            case 'CONFIRMEE': return '#2563eb';
            case 'TERMINEE':  return '#16a34a';
            case 'ANNULEE':   return '#dc2626';
            default:          return '#f59e0b';
        }
    }

    private appointmentColor(status: string): string {
        switch (status) {
            case 'CONFIRME': return '#16a34a';
            case 'ANNULE':   return '#dc2626';
            case 'TERMINE':  return '#2563eb';
            default:         return '#f59e0b';
        }
    }
}