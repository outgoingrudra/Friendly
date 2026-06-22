import Connection from "../models/connection.js";
import User from "../models/user.js";
import mongoose from "mongoose";

export async function getAllConnections(req, res) {
  try {
    const { _id } = req.user;
    const connections = await Connection.find({
      status: "accepted",
      $or: [{ fromUserId: _id }, { toUserId: _id }],
    })
    .populate("fromUserId","name image bio")
    .populate("toUserId","name image bio");

    return res.json({ success: true, connections: connections });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Internal Server Error " });
  }
}

export async function getAllRequests(req, res) {    
  try {
    const { _id } = req.user;
    const connections = await Connection.find({
      status: "pending",
      toUserId: _id,
    }).populate("fromUserId","name image bio");

    res.json({ success: true, connectionRequests: connections });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Internal Server Error " });
  }
}

export async function sendConnection(req, res) {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.userId;
    if (fromUserId.toString() === toUserId) {
      return res.json({
        success: false,
        message: "Cannot connect with yourself",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(toUserId)) {
      return res.json({
        success: false,
        message: "Invalid user id",
      });
    }

    const userExists = await User.exists({ _id: toUserId });

    if (!userExists) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    const existingConnection = await Connection.findOne({
      $or: [
        { fromUserId: fromUserId, toUserId: toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (existingConnection) {
      return res.json({
        success: false,
        message: "Connection already exists ",
      });
    }
    const connection = new Connection({
      fromUserId,
      toUserId,
    });
    await connection.save();
    return res.json({
      success: true,
      message: "Connection Sent Successfully !",
      connection: connection,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Internal Server Error " });
  }
}

export async function acceptConnection(req, res) {
  try {
    const { _id } = req.user;
    const { connectionId } = req.params;

    const connectionExists = await Connection.findOne({
      _id: connectionId,
      status: "pending",
      toUserId: _id,
    });
    if (!connectionExists) {
      return res.json({ success: false, message: "Invalid connections" });
    }
    connectionExists.status = "accepted";
    await connectionExists.save();
    return res.json({
      success: true,
      message: "connection accepted successfully",
      connection: connectionExists,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Internal Server Error " });
  }
}

export async function rejectConnection(req, res) {
  try {
    const { _id } = req.user;
    const { connectionId } = req.params;

    const connection = await Connection.findOneAndDelete({
      _id: connectionId,
      toUserId: _id,
      status: "pending",
    });
    if (!connection) {
      return res.json({ success: false, message: "Connection doesn't exist" });
    }
    return res.json({
      success: true,
      message: "connection rejected successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Internal Server Error " });
  }
}



export async function removeConnection(req,res) {
      try {
        const {_id} = req.user
        const {connectionId} = req.params
        const connection = await Connection.findOneAndDelete({
          _id : connectionId ,
          status :"accepted",
          $or:[
            {fromUserId : _id},
            {toUserId :_id}
          ]
        })

        if(!connection){
          return res.json({success:false , message : " No Such connection Existed !"})
        }
        return res.json({success: true  , message : " Connection Removed Successfully"})
      } catch (error) {
        return res.json({success:false , message : " Internal Server Error !"})
      }
}