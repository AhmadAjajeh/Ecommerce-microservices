import { Publisher, OrderCreatedEvent, Subjects } from '@ticketingaa/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
