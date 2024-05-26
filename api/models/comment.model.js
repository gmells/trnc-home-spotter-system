import mongoose from "mongoose";
const getCurrentDateTimeFormatted = () => {
  const currentDate = new Date();
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = currentDate.getFullYear();
  return `${hours}:${minutes}, ${day}-${month}-${year}`;
};
const commentSchema = new mongoose.Schema(
  {
    propertyRef: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    userRef: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      default:
        "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png",
    },

    username: {
      type: String,
      unique: true,
      default: null,
      required: true,
    },

    time: {
      type: String,
      default: getCurrentDateTimeFormatted,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
