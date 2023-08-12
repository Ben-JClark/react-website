import "../css/App.css";
import React, { useEffect, useRef, useState } from "react";
import { without } from "lodash";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import ListProjects from "./ProjectList";
import DropDownButton from "./DropDown";

const App = () => {
  //State that contain the project list
  const [projectList, setProjectList] = useState([]);

  //States for showing and closing the form
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Copy the current project list and add project, then set it again
  const addProject = (project) => {
    setProjectList((prevProjects) => [project, ...prevProjects]);
  };

  //Copy the current project list without project and set it again
  const deleteProject = (project) => {
    const newProjectList = without(projectList, project);
    setProjectList(newProjectList);
  };

  //Receive the request to filter by name ascending
  const nameAsc = () => {
    const sortedData = [...projectList].sort((p1, p2) =>
      p1.projectName.localeCompare(p2.projectName)
    );
    setProjectList(sortedData);
  };

  //Receive the request to filter by name descending
  const nameDsc = () => {
    const sortedData = [...projectList].sort((p1, p2) =>
      p2.projectName.localeCompare(p1.projectName)
    );
    setProjectList(sortedData);
  };

  //Receive the request to filter by date ascending
  const dateAsc = () => {
    const sortedData = [...projectList].sort((p1, p2) =>
      p2.start_date.localeCompare(p1.start_date)
    );
    setProjectList(sortedData);
  };

  //Receive the request to filter by date descending
  const dateDsc = () => {
    const sortedData = [...projectList].sort((p1, p2) =>
      p1.start_date.localeCompare(p2.start_date)
    );
    setProjectList(sortedData);
  };

  //useEffect is a hook
  useEffect(() => {
    const getProjects = async () => {
      try {
        //Get the json project data
        const res = await fetch("./data.json");
        const data = await res.json();

        //FOREACH project with a unique id add it to projectList
        const list = data.map((project) => {
          return project;
        });

        //Update the projectList to the list of data obtained from data.json
        setProjectList(list);
        return data;
      } catch (error) {
        alert("Cannot fetch project data");
      }
    };
    getProjects();
  }, []);

  //return the html list of projects
  return (
    <div className="App-header">
      <h1>Projects</h1>

      <Button onClick={handleShow}>Add Project</Button>
      <br></br>
      <DropDownButton
        nameAsc={nameAsc}
        nameDsc={nameDsc}
        dateAsc={dateAsc}
        dateDsc={dateDsc}
      />
      <br></br>
      <div>
        <ListProjects projects={projectList} deleteHandler={deleteProject} />
      </div>
      <div>
        <AddProjects
          addProject={addProject}
          show={show}
          setShow={setShow}
          handleShow={handleShow}
          handleClose={handleClose}
        />
      </div>
    </div>
  );
};

// Displays A Bootstrap Modal contains a form to submit form information
const AddProjects = (props) => {
  //references to all the textboxes in the form
  const projectIDRef = useRef(null);
  const projectNameRef = useRef(null);
  const projectDscrRef = useRef(null);
  const projectStartRef = useRef(null);
  const projectEndRef = useRef(null);

  //When the form is submitted handle adding a new project to the list
  const handleAdd = (e) => {
    e.preventDefault();
    console.log("Adding project");

    //Create a new project using the textbox input
    let newProject = {
      projectIdentifier: projectIDRef.current.value,
      projectName: projectNameRef.current.value,
      description: projectDscrRef.current.value,
      start_date: projectStartRef.current.value,
      end_date: projectEndRef.current.value,
    };

    //toggle the form to be hidden
    props.handleClose();
    //add the project to the list
    props.addProject(newProject);
  };

  //Return a bootstrap modal contianing a form to update the project list
  return (
    <div>
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal show={props.show} onHide={props.handleClose}>
          <Modal.Header>
            <Modal.Title>Add Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formId">
                <Form.Label>Project ID</Form.Label>
                <Form.Control
                  type="text"
                  ref={projectIDRef}
                  placeholder="e.g. 17"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Project Name</Form.Label>
                <Form.Control
                  type="text"
                  ref={projectNameRef}
                  placeholder="e.g. SQL Database"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDscr">
                <Form.Label>Project Description</Form.Label>
                <Form.Control
                  type="text"
                  ref={projectDscrRef}
                  placeholder="e.g. Stores user data"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formStart">
                <Form.Label>Project Start Date</Form.Label>
                <Form.Control
                  type="text"
                  ref={projectStartRef}
                  placeholder="YYYY-MM-DD HH:MM:SS"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEnd">
                <Form.Label>Project End Date</Form.Label>
                <Form.Control
                  type="text"
                  ref={projectEndRef}
                  placeholder="YYYY-MM-DD HH:MM:SS"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAdd}>
              Add Project
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default App;
