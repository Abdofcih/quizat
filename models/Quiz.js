import mongoose from "mongoose";

const QuizSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      maxLength: 100
    },
    subject: {
      type: String,
      enum: ["english", "programing", "math", "marketing"],
      default: "english"
    },
    description: {
      type: String,
      maxLength: 250
    },
    bgUrl: String,
    numberOfQuestions: {
      type: Number,
      default: 0
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "Owner must exist"]
    }
  },
  { timestamps: true }
);

export default mongoose.model("quiz", QuizSchema);
