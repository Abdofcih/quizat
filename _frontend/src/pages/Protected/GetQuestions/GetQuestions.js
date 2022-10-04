import React, { useEffect } from "react";
import "./GetQuestions.css";
import { useAppContext } from "../../../context/AppContext";
import { Loading, Question } from "../../../components";
import { Link, useNavigate } from "react-router-dom";
const GetQuestions = () => {
  const {
    isLoading,
    questionQuiz,
    quizQuestions,
    getQuizQuestion,
    setEditQuiz,
    IdOfQuestionQuiz
  } = useAppContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!IdOfQuestionQuiz) {
      navigate("/quizzes");
    }
    getQuizQuestion();
  }, []);
  const { title, numberOfQuestions } = questionQuiz;
  if (isLoading) {
    return <Loading center />;
  }
  return (
    <section className="getQuestionPage">
      <h2>Quiz : {title}</h2>
      <div className=" questionNum divRow">
        <h4>
          {numberOfQuestions} question{numberOfQuestions > 1 ? "s" : ""} found
        </h4>

        <Link to="/add-question" className="btn green-btn">
          + Add question
        </Link>
      </div>

      {quizQuestions.map((question, index) => {
        return <Question key={question._id} index={index + 1} {...question} />;
      })}
    </section>
  );
};

export default GetQuestions;
