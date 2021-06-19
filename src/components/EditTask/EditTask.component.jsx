import React from "react";
import Button from "../Button/Button.component";
import { useState } from "react";
import FormInput from "../FormInputs/FormInputs.component";
import axios from "axios";
import { connect } from "react-redux";
import { useEffect } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const EditTask = ({
  taskId,
  userId,
  token,
  handleCloseEdit,
  handleDeleteTask,
  currentTasks,
}) => {
  const [formData, setFormData] = useState({
    description: "",
    time: "12:00am",
    date: "",
  });

  useEffect(() => {
    axios
      .get(
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
        let resTime = response.data.results.task_time;
        var convertedTime 
        if(parseInt(resTime / 3600) > 12){
          convertedTime = `${parseInt(resTime / 3600) - 12}:${((resTime%3600)/60).toString().padStart(2, '0')}pm`
        }else{

          convertedTime = `${parseInt(resTime / 3600)}:${((resTime%3600)/60).toString().padStart(2, '0')}am`
        } 
        console.log(convertedTime);
        setFormData({
          description: response.data.results.task_msg,
          time:convertedTime,
          date: response.data.results.task_date,
        });
      });
  }, [taskId, token]);

  const { description, time, date } = formData;

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submited");
    console.log(description, time, date);

    let tim = time.substring(time.length - 2, time.length);

    let t = time.substring(0, time.length - 2);
    let a = t.split(":");
    let timeSec = +a[0] * 60 * 60 + +a[1] * 60;
    if (tim === "pm") {
      timeSec += 43200;
    }

    let timeNow = new Date();
    let timeZone = -timeNow.getTimezoneOffset() * 60 * 60;

    axios
      .put(
        "https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38/" +
          taskId,
        {
          assigned_user: userId,
          task_date: date,
          task_time: timeSec,
          is_completed: 0,
          time_zone: timeZone,
          task_msg: description,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data.results);
        currentTasks.map((task, index) =>
          task.id === response.data.results.id
            ? (currentTasks[index] = response.data.results)
            : null
        );
        handleCloseEdit(taskId);
      });
  };
  return (
    <div className="container-description">
      <FormInput
        type="text"
        label="Task Description"
        onChange={handleChange}
        value={description}
        name="description"
        icon={<i className="far fa-id-badge"></i>}
      />
      <div className="dateAndTime">
        <FormInput
          type="date"
          label="Date"
          onChange={handleChange}
          value={date}
          name="date"
          icon={<i className="far fa-calendar-alt"></i>}
          method="date"
        />
        <FormInput
          type="time"
          label="Time"
          onChange={handleChange}
          value={time}
          name="time"
          method="time"
          icon={<i class="far fa-clock"></i>}
        />
      </div>
      <FormInput
        type="text"
        label="Assign User"
        value={"Subi Sir"}
        name="assignUser"
        onChange={handleChange}
        icon={<i className="fas fa-sort"></i>}
      />
      <div className="description-footer">
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="tooltip-top">Delete Task</Tooltip>}
        >
          <i
            className="far fa-trash-alt"
            onClick={() => handleDeleteTask(taskId)}
          ></i>
        </OverlayTrigger>

        <Button
          type="cancel"
          text="cancel"
          onClick={() => handleCloseEdit(taskId)}
        />
        <Button type="save" text="save" onClick={handleSubmit} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  userId: state.user.userId,
  currentTasks: state.tasks.allTasks,
});

export default connect(mapStateToProps)(EditTask);
