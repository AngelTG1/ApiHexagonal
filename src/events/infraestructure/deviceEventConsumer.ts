import { RabbitMQ } from './RabbitMQ';

export class DeviceEventConsumer {
  private rabbitMQ: RabbitMQ;

  constructor() {
    this.rabbitMQ = new RabbitMQ();
    this.rabbitMQ.connect();
    this.rabbitMQ.createQueue('device-status-changed');
  }

  start() {
    this.rabbitMQ.consumeMessages('device-status-changed', (msg) => {
      if (msg !== null) {
        const messageContent = JSON.parse(msg.content.toString());
        console.log('Device status changed:', messageContent);  // Log the received message
        this.rabbitMQ.ackMessage(msg);
      }
    });
  }
}

const deviceEventConsumer = new DeviceEventConsumer();
deviceEventConsumer.start();
