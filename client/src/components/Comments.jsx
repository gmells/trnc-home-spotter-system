import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Comments({ propertyId, currentUserId, name, avatar }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/comment/property/${propertyId}`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [propertyId]);

  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };

  const handlePostComment = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const currentTimeISOString = currentTime.toISOString();
      const response = await axios.post(`/api/comment/create`, {
        message: newComment,
        propertyRef: propertyId,
        userRef: currentUserId,
        username: name,
        avatar: avatar,

        // Add other required properties here if needed
      });
      setComments([...comments, response.data]);
      setNewComment(""); // Clear the input after posting the comment
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div className="text-white">
      <h3>Comments</h3>

      <ul role="list" class="divide-y divide-gray-100">
        {comments.length === 0 ? (
          <p>No comments available</p>
        ) : (
          comments.map((comment) => (
            <li class="flex justify-between gap-x-6 py-5">
              <div class="flex min-w-0 gap-x-4">
                <img
                  class="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={comment.avatar}
                  alt=""
                />
                <div class="min-w-0 flex-auto">
                  <p class="text-sm font-semibold leading-6 text-white">
                    {comment.message}
                  </p>
                  <p class="mt-1 truncate text-xs leading-5 text-white">
                    {comment.username}
                  </p>
                </div>
              </div>
              <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p class="mt-1 text-xs leading-5 text-white">
                  Posted on <p>{comment.time}</p>
                </p>
              </div>
            </li>
          ))
        )}
      </ul>

      <form onSubmit={handlePostComment}>
        <div class="sm:col-span-2">
          <div class="mt-2.5">
            <textarea
              value={newComment}
              onChange={handleInputChange}
              placeholder="Write your comment here..."
              rows="4"
              class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            ></textarea>
          </div>
        </div>
        <div class="mt-10">
          <button
            type="submit"
            class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
}
