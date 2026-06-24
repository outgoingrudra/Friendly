import Chat from "../models/chat.js";
import Connection from "../models/connection.js";
import User from "../models/user.js";
export async function getChat(req, res) {
  try {
    const userId = req.user._id;
    const targetUserId = req.params.id;

    if (userId.equals(targetUserId)) {
      return res.json({
        success: false,
        message: "Can't create a chat with own id",
      });
    }

    const targetUser = await User.findOne({ _id: targetUserId });

    if (!targetUser) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    let chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    });
    let found = chat;

    if (!chat) {
      const connection = await Connection.findOne({
        $or: [
          { fromUserId: userId, toUserId: targetUserId },
          { fromUserId: targetUserId, toUserId: userId },
        ],
        status: "accepted",
      });
      if (!connection) {
        return res.json({
          success: false,
          message: "You can only send messages to your friends !",
        });
      }
      chat = new Chat({
        participants: [userId, targetUserId],
      });
      await chat.save();
    }
    return res.json({
      success: true,
      message: found
        ? "Chat fetched successfully "
        : "Chat Created Successfully",
      chat,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Something went wrong",
    });
  }
}



export async function getAllChats(req, res) {
  try {
    const userId = req.user._id;

    const chats = await Chat.find({
      participants: userId,
    })
      .populate("participants", "name image")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });

    const formattedChats = chats.map((chat) => {
      const otherUser = chat.participants.find(
        (participant) => !participant._id.equals(userId)
      );

      return {
        _id: chat._id,
        user: otherUser,
        lastMessage: chat.lastMessage,
        updatedAt: chat.updatedAt,
      };
    });

    return res.json({
      success: true,
      message: "Chats fetched successfully",
      chats: formattedChats,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: "Something went wrong",
    });
  }
}