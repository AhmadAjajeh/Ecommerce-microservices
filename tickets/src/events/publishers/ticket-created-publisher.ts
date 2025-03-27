import { Publisher, Subjects, TicketCreatedEvent } from '@ticketingaa/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
