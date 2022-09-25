import express from "express";
//import AuthenticateUser from "../middleware/auth.js";
import {
  createQuestion,
  getQuizQuestions,
  deleteQuestion,
  updateQuestion
} from "../controller/questionController.js";

const router = express.Router();

router
  .route("/")
  .post(createQuestion)
  .get(getQuizQuestions);
router
  .route("/:id")
  .delete(deleteQuestion)
  .patch(updateQuestion);

export default router;
