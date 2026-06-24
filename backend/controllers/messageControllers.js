import Chat from "../models/chat.js";
import Message from "../models/message.js";
import { getIO } from "../utils/socket.js";

export async function sendMessage(req, res) {
  try {
    const userId = req.user._id;
    const { chatId, text } = req.body;

    if (!chatId || !text?.trim()) {
      return res.json({
        success: false,
        message: "Chat id and message are required",
      });
    }

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.json({
        success: false,
        message: "Chat not found",
      });
    }

    const isParticipant = chat.participants.some((participant) =>
      participant.equals(userId),
    );

    if (!isParticipant) {
      return res.json({
        success: false,
        message: "Unauthorized",
      });
    }

    const message = await Message.create({
      chatId,
      sender: userId,
      text: text.trim(),
      seenBy: [userId],
    });

    chat.lastMessage = message._id;
    await chat.save();

    const io = getIO();

    io.to(chatId).emit("messageReceived", message);

    return res.json({
      success: true,
      message: "Message sent successfully",
      data: message,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: "Something went wrong",
    });
  }
}



export async function getMessage(req, res) {
  try {
    const userId = req.user._id;
    const { chatId } = req.params;

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.json({
        success: false,
        message: "Chat not found",
      });
    }

    const isParticipant = chat.participants.some((participant) =>
      participant.equals(userId),
    );

    if (!isParticipant) {
      return res.json({
        success: false,
        message: "Unauthorized",
      });
    }

    const messages = await Message.find({ chatId })
      .populate("sender", "name image")
      .sort({ createdAt: 1 });

    return res.json({
      success: true,
      messages,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
export async function markAsSeen(req, res) {
  try {
    const userId = req.user._id;
    const { chatId } = req.params;

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.json({
        success: false,
        message: "Chat not found",
      });
    }

    const isParticipant = chat.participants.some((participant) =>
      participant.equals(userId),
    );

    if (!isParticipant) {
      return res.json({
        success: false,
        message: "Unauthorized",
      });
    }

    await Message.updateMany(
      {
        chatId,
        sender: { $ne: userId },
      },
      {
        $addToSet: {
          seenBy: userId,
        },
      },
    );

    return res.json({
      success: true,
      message: "Messages marked as seen",
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
