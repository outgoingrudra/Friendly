import amqp from "amqplib";

let channel, connection;
export async function connectRabbitMQ() {
  try {
    connection = await amqp.connect(process.env.RABBITMQ_URL);

    connection.on("error", (err) => {
      console.log("🐰 RabbitMQ connection error:", err.message);
    });

    connection.on("close", () => {
      console.log("🐰 RabbitMQ connection closed.");
      channel = null;
      // ❌ setTimeout hatao — Vercel pe retry mat karo
    });

    channel = await connection.createChannel();

    channel.on("error", (err) => {
      console.log("🐰 RabbitMQ channel error:", err.message);
    });

    console.log("🐰 RabbitMQ connected");
    return channel;
  } catch (err) {
    console.log("🐰 RabbitMQ connection failed:", err.message);
    // ❌ setTimeout hatao — bas log karo aur return karo
  }
}
export function getChannel() {
  return channel;
}