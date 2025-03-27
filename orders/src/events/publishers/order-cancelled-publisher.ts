import { OrderCancelledEvent, Publisher, Subjects } from '@ticketingaa/common';

export class OrderCAncelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
