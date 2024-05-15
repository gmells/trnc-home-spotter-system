import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utility/error.js";
import Property from "../models/property.model.js";

export const test = (req, res) => {
  res.json({ message: "API route is working!" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(
      errorHandler(401, "Update access granted to User's own account Only")
    );
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(
      errorHandler(401, "Delete access granted to User's own account Only")
    );
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getUserProperties = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const properties = await Property.find({ userRef: req.params.id });
      res.status(200).json(properties);
    } catch (error) {
      next(error);
    }
  } else {
    return next(
      errorHandler(401, "You can only view your own property listing!")
    );
  }
};

export const getUser = async (req, res, next) => {
  console.log("helooo");
  try {
    const user = await User.find({ _id: req.params.id });

    if (!user) return next(errorHandler(404, "User not found!"));

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
