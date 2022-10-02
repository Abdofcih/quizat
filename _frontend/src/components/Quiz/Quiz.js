import React from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import "./Quiz.css";
import { QuizInfo } from "../index";
import formatDate from "../../utils/formatDate";

const Quiz = ({
  _id,
  title,
  subject,
  description,
  numberOfQuestions,
  bgUrl,
  createdAt
}) => {
  const { setEditQuiz, deleteQuiz } = useAppContext();
  const date = formatDate(createdAt);
  return (
    <article className="quizComponent">
      <header>
        <div className="mainQuizImage">
          <img src={bgUrl} alt={title} />
        </div>

        <h5>{title}</h5>
        <p>{description}</p>
      </header>
      <div className="content">
        {/* Content here */}
        <div className="content-center">
          <QuizInfo
            icon={<FaQuestionCircle />}
            text={`${numberOfQuestions} Questions`}
          ></QuizInfo>
          <div className={`status ${subject}`}>{subject}</div>
        </div>
        <footer>
          <div className="actions">
            <div>
              <Link
                to="/add-question"
                className="btn add-btn"
                onClick={() => setEditQuiz(_id)}
              >
                Add Question
              </Link>
            </div>
            <div>
              <Link
                to="/add-quiz"
                className="btn edit-btn"
                onClick={() => setEditQuiz(_id)}
              >
                Edit
              </Link>
              <button
                type="button"
                className="btn delete-btn"
                onClick={() => deleteQuiz(_id)}
              >
                Delete
              </button>
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
};

export default Quiz;
