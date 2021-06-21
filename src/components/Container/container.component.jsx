import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import EditTask from "../EditTask/EditTask.component";
import ContainerTitle from "../ContainerTitle/ContainerTitle.component";
import AddTask from "../AddTask/AddTask.component";
import Task from "../Task/Task.component";
import { setAllTasks } from "../../redux/task/task.action";
import { useEffect } from "react";

import "./container.styles.css";
import { useState } from "react";
import { setDropdownUser } from "../../redux/user/user.action";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const MainContainer = ({ token, setAllTasks, tasks, setDropDownUsers }) => {
  //local component state using hooks to keep track of editing tasks and add task toggle
  const [isaddTask, setIsAddTask] = useState(true);
  const [editTasks, setEditTasks] = useState([]);

  const handleAddBtn = (view) => {
    setIsAddTask(view);
  };

  // feching and updating redux store with Tasks data
  useEffect(() => {
    axios
      .get(
        "https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38",
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((response) => setAllTasks(response.data.results));

    axios
      .get("https://stage.api.sloovi.com/team", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => setDropDownUsers(response.data.results));
  }, [token, setAllTasks, setDropDownUsers]);


  // Toggling the state for tasks opened to be edited using an array of ids
  const handleEditBtn = (taskId) => {
    setEditTasks((prev) => {
      return [...prev, taskId];
    });
  };
  // Toggling the state for tasks opened to be edited using an array of ids
  const handleCloseEdit = (taskId) => {
    setEditTasks(editTasks.filter((task_Id) => !(taskId === task_Id)));
  };

  //handling delete using api endpoint and also locally updating the state
  const handleDeleteTask = (taskId) => {
    confirmAlert({
      title:window.location.hostname+" says",
      message: "Are you sure you want to delete this Task?",
      buttons: [
        {
          label: "Ok",
          onClick: () =>
            axios
              .delete(
                "https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38/" +
                  taskId,
                {
                  headers: {
                    Authorization: "Bearer " + token,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((response) => {
                if (response.data.code === 204) {
                  console.log("localUpdate");
                  let updatedTask = tasks.filter(
                    (task) => !(task.id === taskId)
                  );
                  setAllTasks(updatedTask);
                }
              }),
        },
        {
          label: "Cancel",
          onClick: () => null,
        },
      ],
      overlayClassName: "delete-alert",
    });
  };

  return (
    <div className="main-container">
      <ContainerTitle handleAddTask={() => handleAddBtn(true)} />
      {isaddTask ? (
        <AddTask handleAddBtn={() => handleAddBtn(false)} />
      ) : (
        <div className="tasks-container">
          {tasks[0]
            ? tasks.map((task) =>
                editTasks.includes(task.id) ? (
                  <EditTask
                    key={task.id}
                    taskId={task.id}
                    handleCloseEdit={handleCloseEdit}
                    handleDeleteTask={handleDeleteTask}
                  />
                ) : (
                  <Task
                    key={task.id}
                    taskId={task.id}
                    description={task.task_msg}
                    date={task.task_date}
                    handleEditBtn={handleEditBtn}
                  />
                )
              )
            : null}
        </div>
      )
      }
    </div>
  );
};
const mapStateToProps = (state) => ({
  token: state.user.token,
  tasks: state.tasks.allTasks,
});

const mapDispatchToProps = (dispatch) => ({
  setAllTasks: (tasks) => dispatch(setAllTasks(tasks)),
  setDropDownUsers: (users) => dispatch(setDropdownUser(users)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
