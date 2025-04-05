"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Plus, Trash2 } from "lucide-react";

export default function AddTask() {
  const [task, setTask] = useState({
    title: "",
    content: "",
    status: "none",
    userId: " ",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("/api/tasks", task);
      toast.success("🎉 Task added successfully!", { position: "top-right" });
      setTask({
        title: "",
        content: "",
        status: "none",
        userId: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Something went wrong! 😥", { position: "top-right" });
    }
  };

  const handleClear = () => {
    setTask({
      title: "",
      content: "",
      status: "none",
      userId: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center justify-start px-4 py-8">
      <img
        src="https://cdn.pixabay.com/photo/2021/09/20/22/15/add-6641966_1280.png"
        alt="Task animation"
        className="w-32 h-32 mb-4 rounded-full shadow-lg"
      />
      <h2 className="text-3xl font-bold text-center mb-6">Add New Task</h2>

      <div className="w-full max-w-xl bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-green-400 font-semibold mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              placeholder="Enter task title"
              required
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-white/50"
            />
          </div>

          <div>
            <label className="block text-green-400 font-semibold mb-1">Content</label>
            <textarea
              name="content"
              value={task.content}
              onChange={handleChange}
              placeholder="Enter task details"
              required
              rows={4}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-white/50"
            />
          </div>

          <select
  name="status"
  value={task.status}
  onChange={handleChange}
  className="w-full p-2 bg-gray-800 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="none">Select Status</option>
  <option value="pending">Pending</option>
  <option value="completed">Completed</option>
</select>
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 transition text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
            >
              <Plus size={18} /> Add Task
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="flex-1 bg-red-600 hover:bg-red-700 transition text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
            >
              <Trash2 size={18} /> Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
