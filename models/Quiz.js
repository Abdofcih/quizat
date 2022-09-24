import mongoose from "mongoose";

const QuizSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      maxLength: 100
    },
    description: {
      type: String,
      maxLength: 250
    },
    bgUrl: String,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "Owner must be ecxist"]
    }
  },
  { timestamps: true }
);

export default mongoose.model("quiz", QuizSchema);
