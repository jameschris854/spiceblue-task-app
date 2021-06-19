import React from "react";
import { connect } from "react-redux";
import "./ContainerTitle.styles.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

//header for the main container
const ContainerTitle = ({ handleAddTask, tasks }) => {
  return (
    <div className="container-title">
      <div className="titleEl">TASKS</div>
      <div className="tasks-number titleEl">{tasks.length}</div>
      
      <div className="add-btn" onClick={handleAddTask} >
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="tooltip-top">New Task</Tooltip>}
        >
          <div>+</div> 
        </OverlayTrigger>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.tasks.allTasks,
});

export default connect(mapStateToProps)(ContainerTitle);
