import React from "react";
import "./AddQuestion.css";
import {
  FormRow,
  SelectFormRow,
  ToggleRow,
  WrongAnswers
} from "../../../components";
import { useAppContext } from "../../../context/AppContext";

const AddQuestion = () => {
  const {
    isLoading,
    isEditingQuestion,
    questionTitleType,
    questionTitleTypeOptions,
    handleFormChange,
    questionTitle,
    questionTitleTypeAssetUrl,
    createQuestion,
    questionCorrectAnswer
  } = useAppContext();

  const handleSubmit = e => {
    e.preventDefault();
    createQuestion();
  };
  // use handleChange of the context
  const handleChange = e => {
    const { name, value } = e.target;
    console.log({ name, value });

    handleFormChange({ name, value });
  };
  return (
    <section className="editSubmitFormSection">
      <form className="form">
        <h3>{isEditingQuestion ? "Edit Question" : "Add Question"}</h3>
        <div className="form-center">
          <ToggleRow
            inputId="questionTitleType"
            value={questionTitleType}
            toggleValues={questionTitleTypeOptions}
            lableText="Question Type "
            name="questionTitleType"
            handleChange={handleChange}
            defaultValue={{ value: "text", label: "Title only" }}
          />

          <FormRow
            type="text"
            lableText="Question Title"
            name="questionTitle"
            value={questionTitle}
            handleChange={handleChange}
          />

          {/* Asset url */}
          {questionTitleType != "text" && (
            <FormRow
              type="text"
              lableText={`${questionTitleType} URL`}
              name="questionTitleTypeAssetUrl"
              value={questionTitleTypeAssetUrl}
              handleChange={handleChange}
            />
          )}
          {/* correct answer  */}
          <FormRow
            type="text"
            lableText="Correct Answer"
            name="questionCorrectAnswer"
            value={questionCorrectAnswer}
            handleChange={handleChange}
          />
          <WrongAnswers />
          <button
            type="submit"
            className="btn btn-block btn-submit"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Wait ..." : "submit"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddQuestion;
