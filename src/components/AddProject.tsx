import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useRef } from "react";
import Button from "react-bootstrap/Button";

import { Project } from "./App";

interface AddProjectProps {
  addProject: (p: Project) => void;
  show: boolean;
  handleClose: () => void;
}

// Displays A Bootstrap Modal contains a form to submit form information
const AddProjects = ({ addProject, show, handleClose }: AddProjectProps) => {
  //references to all the textboxes in the form
  const projectIDRef = useRef<HTMLInputElement | null>(null);
  const projectNameRef = useRef<HTMLInputElement | null>(null);
  const projectDscrRef = useRef<HTMLInputElement | null>(null);
  const projectStartRef = useRef<HTMLInputElement | null>(null);
  const projectEndRef = useRef<HTMLInputElement | null>(null);

  //When the form is submitted handle adding a new project to the list
  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isInputValid()) {
      console.log("Adding project");

      //Create a new project using the textbox input
      // WARING '!' supresses typescript warings for null types
      let newProject: Project = {
        projectIdentifier: projectIDRef.current!.value,
        projectName: projectNameRef.current!.value,
        description: projectDscrRef.current!.value,
        start_date: projectStartRef.current!.value,
        end_date: projectEndRef.current!.value,
      };

      //toggle the form to be hidden
      handleClose();
      //add the project to the list
      addProject(newProject);
    } else {
      console.log("Invalid input");
    }
  };

  const isInputValid = (): boolean => {
    // TODO: validate input with regular expressions

    if (!projectIDRef.current) return false;
    else if (!projectNameRef.current) return false;
    else if (!projectDscrRef.current) return false;
    else if (!projectStartRef.current) return false;
    else if (!projectEndRef.current) return false;

    return true;
  };

  //Return a bootstrap modal contianing a form to update the project list
  return (
    <div>
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal show={show} onHide={handleClose}>
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
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {
              <Button variant="primary" onClick={handleAdd}>
                Add Project
              </Button>
            }
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AddProjects;
