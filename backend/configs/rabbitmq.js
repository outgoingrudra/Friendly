import amqp from "amqplib";

let channel, connection;

export async function connectRabbitMQ() {
  connection = await amqp.connect(process.env.RABBITMQ_URL);
  channel = await connection.createChannel();

  console.log("🐰 RabbitMQ connected");

  return channel;
}

export function getChannel() {
  return channel;
}