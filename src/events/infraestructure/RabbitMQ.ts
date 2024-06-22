import amqp from 'amqplib';

const RABBITMQ_URL = 'amqp://arquesoft_manager:111contra111@localhost';

export class RabbitMQ {
  private connection?: amqp.Connection;
  private channel?: amqp.Channel;

  async connect() {
    try {
      this.connection = await amqp.connect(RABBITMQ_URL);
      this.channel = await this.connection.createChannel();
      console.log('Connected to RabbitMQ');
    } catch (error) {
      console.error('Failed to connect to RabbitMQ:', error);
      throw error;
    }
  }

  async createQueue(queueName: string) {
    if (!this.channel) {
      throw new Error('Channel is not initialized');
    }
    try {
      await this.channel.assertQueue(queueName, { durable: true });
      console.log(`Queue created: ${queueName}`);
    } catch (error) {
      console.error(`Failed to create queue ${queueName}:`, error);
      throw error;
    }
  }

  async sendMessage(queueName: string, message: any) {
    if (!this.channel) {
      throw new Error('Channel is not initialized');
    }
    try {
      this.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), { persistent: true });
      console.log(`Message sent to queue ${queueName}:`, message);
    } catch (error) {
      console.error(`Failed to send message to queue ${queueName}:`, error);
      throw error;
    }
  }

  async consumeMessages(queueName: string, callback: (msg: amqp.ConsumeMessage | null) => void) {
    if (!this.channel) {
      throw new Error('Channel is not initialized');
    }
    try {
      await this.channel.consume(queueName, callback, { noAck: false });
      console.log(`Consuming messages from queue ${queueName}`);
    } catch (error) {
      console.error(`Failed to consume messages from queue ${queueName}:`, error);
      throw error;
    }
  }

  ackMessage(msg: amqp.Message) {
    if (!this.channel) {
      throw new Error('Channel is not initialized');
    }
    try {
      this.channel.ack(msg);
    } catch (error) {
      console.error('Failed to acknowledge message:', error);
      throw error;
    }
  }

  close() {
    if (this.connection) {
      this.connection.close();
      console.log('Connection to RabbitMQ closed');
    }
  }
}
