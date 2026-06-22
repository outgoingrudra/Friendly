import User from "../models/user.js";
import Connection from "../models/connection.js";
import mongoose from "mongoose";
import imagekit from "../configs/imagekit.js";

export async function Feed(req, res) {
  try {
    const { _id } = req.user;
    let { skipCount = 0, limitCount = 5 } = req.query;

    skipCount = parseInt(skipCount);
    limitCount = parseInt(limitCount);

    if (isNaN(skipCount) || skipCount < 0) skipCount = 0;
    if (isNaN(limitCount) || limitCount < 1) limitCount = 5;

    limitCount = limitCount > 20 ? 20 : limitCount;

    const connections = await Connection.find({
      $or: [{ fromUserId: _id }, { toUserId: _id }],
    });
    const hideUserIds = new Set();
    hideUserIds.add(_id);
    connections.forEach((conn) => {
      hideUserIds.add(conn.fromUserId);
      hideUserIds.add(conn.toUserId);
    });

    const users = await User.find(
      { _id: { $nin: Array.from(hideUserIds) } },
      "name image bio",
    )
      .limit(limitCount)
      .skip(skipCount);
    res.json({
      success: true,
      message: "Users fetched successfully ✅",
      users: users,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Internal Server Error " });
  }
}

export async function profile(req, res) {
  try {
    const user = req.user;

    const { password, __v, ...safeUser } = user.toObject();

    res.json({
      success: true,
      message: "User fetched successfully ✅",
      user: safeUser,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function findUser(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.json({ success: false, message: "Invalid request ❌" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({ success: false, message: "Invalid user id ❌" });
    }

    const user = await User.findById(id).select(
      "name bio image city gender createdAt",
    );

    if (!user) {
      return res.json({ success: false, message: "User not found ❌" });
    }

    res.json({
      success: true,
      message: "User fetched successfully ✅",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Internal Server Error" });
  }
}

export async function updateUser(req, res) {
  try {
    const user = req.user;

    if (!user) {
      return res.json({ success: false, message: "User not logged in" });
    }

    const { name, bio, gender, city } = req.body;

    if (!name && !bio && !gender && !city) {
      return res.json({ success: false, message: "Nothing to update" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          ...(name && { name }),
          ...(bio && { bio }),
          ...(gender && { gender }),
          ...(city && { city }),
        },
      },
      { new: true },
    ).select("-password");

    res.json({
      success: true,
      message: "User updated successfully ✅",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
export async function uploadImage(req, res) {
  try {
    const user = req.user;

    const { image, fileName } = req.body;

    if (!image) {
      return res.json({ success: false, message: "No image provided ❌" });
    }

    const uploadResponse = await imagekit.upload({
      file: image,
      fileName: fileName || "upload.jpg",
      transformation: {
        pre: "q-60,f-webp",
      },
    });

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $set: { image: uploadResponse.url } },
      { new: true },
    ).select("-password -__v");

    res.json({
      success: true,
      message: "Image uploaded successfully ✅",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Upload failed ❌" });
  }
}