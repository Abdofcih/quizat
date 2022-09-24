import mongoose from "mongoose";

const GradeSchema = mongoose.Schema({
  quizId: { type: mongoose.Types.ObjectId, ref: "quiz" },
  userId: { type: mongoose.Types.ObjectId, ref: "user" },
  grade: { type: Number, min: 0 },
  message: String
});

export default mongoose.model("grade", GradeSchema);
