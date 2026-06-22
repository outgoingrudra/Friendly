import { getChannel } from "../configs/rabbitmq.js";

export function sendEmailToQueue(data) {
  const channel = getChannel();

  const queue = "email_queue";

  channel.assertQueue(queue, { durable: true });

  channel.sendToQueue(
    queue,
    Buffer.from(JSON.stringify(data)),
    { persistent: true }
  );

  console.log("📨 Email queued");
}