import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveTask, completeTask, deleteTask, updateTask } from "../redux/task";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import AddTaskForm from "./AddTaskForm";

export default function Tasks() {
  const [taskToEdit, setTaskToEdit] = useState(-2);
  const { tasks } = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const useremail = localStorage.getItem("useremail");
  const userTasks = tasks?.filter((task) => task.email === useremail);

  const handleUpdate = (e, task) => {
    e.preventDefault();
    dispatch(updateTask({ ...task, task: e.target.newTask.value }));
    setTaskToEdit(-2);
  };
  useEffect(() => {
    if (localStorage.getItem("userTasks")) {
      const savedTasks = JSON.parse(localStorage.getItem("userTasks"));
      dispatch(saveTask(savedTasks));
    }
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-1 px-10 py-5">
      <AddTaskForm />
      <div className="flex justify-around bg-gray-400 font-bold py-3 rounded-md">
        <div className="text-center w-96">
          <h3>TaskID</h3>
        </div>
        <div className="text-center w-96">
          <h3>Task info</h3>
        </div>
        <div className="text-center w-96">
          <h3>stutes</h3>
        </div>
        <div className="text-center w-40"></div>
      </div>
      {userTasks?.length === 0 ? (
        <div className="font-bold flex justify-center items-center h-[400px] text-xl">
          <p>There is No Tasks Asgined</p>
        </div>
      ) : (
        <>
          {userTasks.map((task) => (
            <div
              className="bg-gray-300 flex justify-around py-2 rounded-md "
              key={task.id}
            >
              <div className="text-center w-96">
                <p>{task.id}</p>
              </div>
              <div className="text-center w-96 ">
                {taskToEdit === task.id ? (
                  <form onSubmit={(e) => handleUpdate(e, task)}>
                    <textarea
                      className="w-[350px]"
                      defaultValue={task.task}
                      name="newTask"
                    />
                    <button
                      className="text-center bg-gray-400 rounded-md p-1 text-sm"
                      type="submit"
                    >
                      Update
                    </button>
                  </form>
                ) : (
                  <p className="break-words">{task.task}</p>
                )}
              </div>
              <div className="text-center w-96">
                <p>{task.completed ? "completed" : "on going"}</p>
              </div>
              <div className="text-center bg-gray-400 rounded-md p-1 text-sm h-8">
                <button
                  onClick={() => {
                    dispatch(completeTask(task));
                  }}
                >
                  {task.completed ? "Mark as Uncomplete" : "Mark as Completed"}
                </button>
              </div>
              <div className="text-center pt-1">
                <BsTrash
                  color="red"
                  className="cursor-pointer"
                  onClick={() => {
                    dispatch(deleteTask(task));
                  }}
                />
              </div>
              <div className="text-center pt-1">
                <FiEdit
                  color="green"
                  className="cursor-pointer"
                  onClick={() => {
                    setTaskToEdit(task.id);
                  }}
                />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
