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
      const bufferMessage = Buffer.from(JSON.stringify(message));
      const sent = this.channel.sendToQueue(queueName, bufferMessage, { persistent: true });
      if (!sent) {
        console.error(`Failed to send message to queue ${queueName}: Queue is full or not ready.`);
        throw new Error(`Failed to send message to queue ${queueName}`);
      }
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

  async close() {
    try {
      if (this.channel) {
        await this.channel.close();
        console.log('RabbitMQ channel closed');
      }
      if (this.connection) {
        await this.connection.close();
        console.log('RabbitMQ connection closed');
      }
    } catch (error) {
      console.error('Failed to close RabbitMQ connection:', error);
    }
  }
}
