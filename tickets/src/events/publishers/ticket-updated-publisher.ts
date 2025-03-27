import { Publisher, Subjects, TicketUpdatedEvent } from '@ticketingaa/common';

export class TicketUpdatedPublsher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
