import { PaymentCreatedEvent, Publisher, Subjects } from '@ticketingaa/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
