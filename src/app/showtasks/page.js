"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { BadgeCheck, Hourglass, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

export default function ShowTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to load tasks", err);
      toast.error("Failed to fetch tasks.");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      toast.success("🗑️ Task deleted!");
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Could not delete task.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6 py-10">
      <h2 className="text-4xl font-bold text-center mb-10">📝 My Task Board</h2>

      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <img
            src="https://i.pinimg.com/originals/43/93/50/439350f0c9be56b19f576155572bc14f.gif"
            alt="No tasks"
            className="w-56 h-56 mb-6 rounded-full shadow-md"
          />
          <p className="text-xl text-gray-400">You don’t have any tasks yet. Let’s get productive!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 space-y-4 hover:scale-[1.02]"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">{task.title}</h3>
                <span
                  className={`px-2 py-1 text-sm rounded-full flex items-center gap-1 font-medium ${
                    task.status === "completed"
                      ? "bg-green-600 text-white"
                      : "bg-yellow-500 text-black"
                  }`}
                >
                  {task.status === "completed" ? (
                    <>
                      <BadgeCheck size={16} /> Completed
                    </>
                  ) : (
                    <>
                      <Hourglass size={16} /> Pending
                    </>
                  )}
                </span>
              </div>

              <p className="text-sm text-gray-300">{task.content}</p>

              <div className="flex justify-between items-center text-xs text-gray-400">
                <div>
                  <div>🗓 Created: {new Date(task.createdAt).toLocaleDateString()}</div>
                  <div>🕒 Updated: {new Date(task.updatedAt).toLocaleDateString()}</div>
                </div>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-500 hover:text-red-600 transition"
                  title="Delete task"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
