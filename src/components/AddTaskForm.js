import React from "react";
import { addTask } from "../redux/task";
import { useDispatch } from "react-redux";

export default function AddTaskForm() {
  const dispatch = useDispatch();
  const username = localStorage.getItem("username");
  const useremail = localStorage.getItem("useremail");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addTask({
        id: Math.floor(Math.random() * 1000000),
        task: e.target.info.value,
        email: useremail,
        completed: false,
      })
    );
    e.target.info.value = "";
  };
  return (
    <div className="text-center py-5 font-bold flex justify-around items-center">
      <h2 className="text-3xl">{username} tasks</h2>
      <form className="bg-gray-400 p-4 rounded-md" onSubmit={handleSubmit}>
        <label className="block text-lg font-medium  text-gray-900">
          Add New Task
        </label>
        <div className="mt-2">
          <textarea
            id="info"
            name="info"
            placeholder="Add your task info here"
            className="block w-[350px] rounded-md border-0 py-1.5 px-1.5 placeholder:text-gray-300"
          />
        </div>
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            className="text-center bg-gray-300 rounded-md p-1 text-sm"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
