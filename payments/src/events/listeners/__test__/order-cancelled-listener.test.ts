import mongoose from 'mongoose';
import { Order } from '../../../models/order';
import { natsWrapper } from '../../../nats-wrapper';
import { OrderCancelledListener } from '../order-cancelled-listener';
import { OrderCancelledEvent, OrderStatus } from '@ticketingaa/common';
import { Message } from 'node-nats-streaming';

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const orderId = new mongoose.Types.ObjectId().toHexString();

  const order = Order.build({
    id: orderId,
    price: 10,
    status: OrderStatus.Created,
    userId: 'test',
    version: 0,
  });
  await order.save();

  const data: OrderCancelledEvent['data'] = {
    id: orderId,
    ticket: {
      id: 'test',
    },
    version: 1,
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, order, data, orderId, msg };
};

it('updates the status of the order', async () => {
  const { listener, data, msg, orderId, order } = await setup();

  await listener.onMessage(data, msg);

  const updateOrder = await Order.findById(orderId);

  expect(updateOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('acks the message', async () => {
  const { listener, data, msg, orderId, order } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
