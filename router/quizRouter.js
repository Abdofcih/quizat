import express from "express";
import AuthenticateUser from "../middleware/auth.js";
import {
  createQuiz,
  getAllQuizzes,
  deleteQuiz,
  updateQuiz,
  getStats
} from "../controller/quizController.js";

const router = express.Router();

router
  .route("/")
  .post(AuthenticateUser, createQuiz)
  .get(AuthenticateUser, getAllQuizzes);
router
  .route("/:id")
  .delete(AuthenticateUser, deleteQuiz) //post to patch -********
  .patch(AuthenticateUser, updateQuiz);
/* router.delete("/:id", AuthenticateUser, deleteQuiz); */
router.route("/stats").get(AuthenticateUser, getStats);

export default router;
