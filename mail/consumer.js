import amqp from "amqplib";
import { sendEmail } from "./mailer.js";
import { welcomeTemplate } from "./templates.js";
import dotenv from "dotenv";
dotenv.config();
async function start() {
  try {
    const conn = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await conn.createChannel();

    const queue = "email_queue";
    await channel.assertQueue(queue, { durable: true });

    console.log("📩 Mail server running...");

    channel.consume(queue, async (msg) => {
      const data = JSON.parse(msg.content.toString());

      if (data.type === "WELCOME") {
        const html = welcomeTemplate(data.name);

        await sendEmail({
          to: data.to,
          subject: "Welcome to Friendly 🎉",
          html,
        });
      }

      channel.ack(msg);
    });

  } catch (err) {
    console.error("❌ Mail server error:", err);
  }
}
start()