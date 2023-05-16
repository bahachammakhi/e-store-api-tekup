import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  image: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 0,
  },
});
export default mongoose.model("Item", itemSchema);
