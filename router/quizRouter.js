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
  .post(createQuiz)
  .get(getAllQuizzes);
router
  .route("/:id")
  .delete(deleteQuiz) //post to patch -********
  .patch(updateQuiz);
/* router.delete("/:id", AuthenticateUser, deleteQuiz); */
router.route("/stats").get(getStats);

export default router;
