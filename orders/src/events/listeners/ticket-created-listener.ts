import { Listener, Subjects, TicketCreatedEvent } from '@ticketingaa/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Ticket } from '../../models/ticket';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { id, title, price } = data;

    const ticket = Ticket.build({
      id,
      title,
      price,
    });
    await ticket.save();

    msg.ack();
  }
}

// the thing is we include version in our records
// when udpating/creating/deleting a record
// => we include the version in our event
// if the version of the event is not greater than
// the version in the duplicated db in the secondary service
// => then the events are not in sync , and we should refuse this event
// the versioning of the db on the primary service should be
