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
      required: [true, "company is required"],
      maxLength: 250
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "Owner must be ecxist"]
    },
    students: [{ type: mongoose.Types.ObjectId, ref: "user" }]
  },
  { timestamps: true }
);

export default mongoose.model("quiz", QuizSchema);
