import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useRef } from "react";
import Button from "react-bootstrap/Button";

export interface AddProjectProps {
  addProject: (p: project)
  isVisable: boolean | undefined;
  onClose: () => void;
}

interface ProjectProps{
  
}

// Displays A Bootstrap Modal contains a form to submit form information
const AddProjects = ({ isVisable, onClose }: ProjectProps) => {
  //references to all the textboxes in the form
  const projectIDRef = useRef(null);
  const projectNameRef = useRef(null);
  const projectDscrRef = useRef(null);
  const projectStartRef = useRef(null);
  const projectEndRef = useRef(null);

  //When the form is submitted handle adding a new project to the list
  /*   const handleAdd = (e: React.MouseEventHandler<HTMLButtonElement>) => {
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
    onClose();
    //add the project to the list
    // onShow();
  }; */

  //Return a bootstrap modal contianing a form to update the project list
  return (
    <div>
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal show={isVisable} onHide={onClose}>
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
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            {/* <Button variant="primary" onClick={handleAdd}>
              Add Project
            </Button> */}
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AddProjects;
