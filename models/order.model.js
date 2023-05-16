import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["created", "canceled"],
    required: true,
  },
  total: {
    type: Number,
    required: false,
  },
  items: {
    type: [
      {
        item: { type: mongoose.Types.ObjectId, ref: "Item" },
        quantity: {
          type: Number,
        },
      },
    ],
  },
});
export default mongoose.model("Order", orderSchema);
