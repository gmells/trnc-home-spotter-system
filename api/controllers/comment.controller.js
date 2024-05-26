import Comment from "../models/comment.model.js";
import { errorHandler } from "../utility/error.js";

export const createComment = async (req, res, next) => {
  try {
    const comment = await Comment.create(req.body);
    return res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(errorHandler(404, "Comment not found"));
  }

  if (req.user.id !== comment.userRef) {
    return next(errorHandler(401, "You can only delete your own comment"));
  }

  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json("Comment has been deleted");
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(errorHandler(404, "Comment not found"));
  }

  if (req.user.id !== comment.userRef) {
    return next(errorHandler(401, "You can only delete your own comment"));
  }

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
};

export const getComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return next(errorHandler(404, "comment not found"));
    }

    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ propertyRef: req.params.propertyId });

    if (!comments.length) {
      return next(errorHandler(404, "No comments found for this property"));
    }

    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
