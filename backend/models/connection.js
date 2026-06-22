import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "accepted"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate requests in same direction
connectionSchema.index(
  {
    fromUserId: 1,
    toUserId: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model("Connection", connectionSchema);