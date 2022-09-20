import User from "../models/User.js";

import { StatusCodes } from "http-status-codes";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new Error("ME: please provide all values");
  }
  const userAlreadyExist = await User.findOne({ email });
  if (userAlreadyExist) {
    console.log(userAlreadyExist);

    throw new Error("ME: Email already in use");
  }
  const newUser = await User.create({ name, email, password });

  const token = newUser.createJWT();

  res.status(StatusCodes.CREATED).send({
    user: newUser,
    token
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Please provide Email and password");
  }
  const lowerCaseEmail = email.toLocaleLowerCase();
  console.log(email, password, lowerCaseEmail);

  const user = await User.findOne({ email: lowerCaseEmail });
  console.log(user);

  if (!user) {
    throw new Error("invalid email or password");
  }
  console.log("test pass");

  const isPasswordCorrect = await user.comparePassword(password);
  console.log(" pass", isPasswordCorrect);
  if (!isPasswordCorrect) {
    throw new Error("Password : invalid email or password");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).send({ user, token });
};

export const updateUser = (req, res) => {
  res.send({ msg: "update route works" });
};
