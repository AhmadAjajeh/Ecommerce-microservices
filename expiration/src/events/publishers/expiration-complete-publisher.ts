import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from '@ticketingaa/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
