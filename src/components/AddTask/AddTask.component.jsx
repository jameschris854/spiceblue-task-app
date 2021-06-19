import React from "react";
import "./AddTask.styles.css";
import Button from "../Button/Button.component";
import { useState } from "react";
import FormInput from "../FormInputs/FormInputs.component";
import axios from "axios";
import { connect } from "react-redux";
import { setAllTasks } from "../../redux/task/task.action";

const AddTask = ({
  handleAddBtn,
  userId,
  token,
  updateTasks,
  currentTasks,
}) => {
  const [formData, setFormData] = useState({
    description: "",
    time: "",
    date: "",
  });
  /** */
  const { description, time, date } = formData;

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  /**
   * @name handleSubmit
   * @param {} e
   * @description
   */

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
    console.log(timeZone);
    axios
      .post(
        "https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38",
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
        currentTasks.unshift(response.data.results);
        updateTasks(currentTasks);
      })
      .then(() => handleAddBtn());
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
          method='date'
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
        <Button type="cancel" text="cancel" onClick={handleAddBtn} />
        <Button type="save" text="save" onClick={handleSubmit} />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateTasks: (newTasks) => dispatch(setAllTasks(newTasks)),
});

const mapStateToProps = (state) => ({
  token: state.user.token,
  userId: state.user.userId,
  currentTasks: state.tasks.allTasks,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
