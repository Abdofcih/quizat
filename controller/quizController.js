import Quiz from "../models/Quiz.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  UnAuthenticatedError,
  NotFoundError
} from "../errors/index.js";
import mongoose from "mongoose";

export const createQuiz = async (req, res) => {
  const { title, description, bgUrl } = req.body;

  if (!title) {
    console.log("please provide all quiz value");
    // return new BadRequestError("please provide all quiz value");
    throw new BadRequestError("please provide all quiz value");
  }
  // req.body is ready as a quiz instance
  req.body.createdBy = req.user.id;
  const quiz = await Quiz.create(req.body);
  res.status(StatusCodes.CREATED).json(quiz);
};
export const getAllQuizes = async (req, res) => {
  const { search, sort } = req.query;
  const queryObject = {
    createdBy: req.user.id
  };

  if (search) {
    // $regex:search find string that contain search
    //'i' for case insensitive match
    queryObject.position = { $regex: search, $options: "i" };
  }

  // quizzes get a promise need await or then, catch
  let result = Quiz.find(queryObject);
  // sorting
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("title");
  }
  if (sort === "z-a") {
    result = result.sort("-title");
  }
  //req.query.pageNum is a string
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result.skip(skip).limit(limit);

  const quizzes = await result;
  const totalQuizzes = await Quiz.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalQuizzes / limit);

  res.status(StatusCodes.OK).json({ quizzes, totalQuizzes, numOfPages });
};

export const deleteQuiz = async (req, res) => {
  res.send({ msg: "deleteQuiz Route works fine" });
};
export const updateQuiz = async (req, res) => {
  res.send({ msg: "updateQuiz Route works fine" });
};
export const getStats = async (req, res) => {
  res.send({ msg: "getStats Route works fine" });
};
