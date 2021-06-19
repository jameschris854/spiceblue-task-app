import React from "react";
import { connect } from "react-redux";
import "./Task.styles.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const Task = (
  { userProPic, description, date, taskId, handleEditBtn },
  otherProps
) => {
  return (
    <div className="task-container" {...otherProps}>
      <div className="propic">
        <img src={userProPic} alt="" />
      </div>
      <div className="task-details">
        <div className="task-description">{description}</div>
        <div className="task-time">{date}</div>
      </div>
      <div className="task-options">
        <div className="tick">
          <i className="fas fa-check"></i>
        </div>
        <div className="edit-wrapper">
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="tooltip-top">Snooze this Task in your inbox at a later date</Tooltip>}
          >
            <div className="snooze">
              <i className="fas fa-bell-slash"></i>
            </div>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="tooltip-top">Edit This Task</Tooltip>}
          >
            <div className="edit-task" onClick={() => handleEditBtn(taskId)}>
              <i className="fas fa-pen"></i>
            </div>
          </OverlayTrigger>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userProPic: state.user.userProPic,
});

export default connect(mapStateToProps)(Task);
