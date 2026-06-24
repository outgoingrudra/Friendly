import amqp from "amqplib";

let channel, connection;

export async function connectRabbitMQ() {
  try {
    connection = await amqp.connect(process.env.RABBITMQ_URL);

    connection.on("error", (err) => {
      console.log("🐰 RabbitMQ connection error:", err.message);
    });

    connection.on("close", () => {
      console.log("🐰 RabbitMQ connection closed. Reconnecting in 5s...");
      channel = null;
      setTimeout(connectRabbitMQ, 5000);
    });

    channel = await connection.createChannel();

    channel.on("error", (err) => {
      console.log("🐰 RabbitMQ channel error:", err.message);
    });

    console.log("🐰 RabbitMQ connected");

    return channel;
  } catch (err) {
    console.log("🐰 RabbitMQ connection failed:", err.message, "Retrying in 5s...");
    setTimeout(connectRabbitMQ, 5000);
  }
}

export function getChannel() {
  return channel;
}