import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function Action({
  comment,
  setEditMode,
  setInput,
  handleDeleteNode,
}) {
  return (
    <div>
      <button
        onClick={() => {
          setEditMode(comment.id);
          setInput(comment.message);
        }}
      >
        <FaEdit />
      </button>
      <button onClick={() => handleDeleteNode(comment.id)}>
        <FaTrash />
      </button>
    </div>
  );
}
