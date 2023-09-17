import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";

import { Project } from "./App";
import DateTimePicker from "./DateTimePicker";

interface AddProjectProps {
  addProject: (p: Project) => void;
  show: boolean;
  handleClose: () => void;
}

// Displays A Bootstrap Modal contains a form to submit form information
const AddProjects = ({ addProject, show, handleClose }: AddProjectProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  //references to all the textboxes in the form
  const projectNameRef = useRef<HTMLInputElement | null>(null);
  const projectDscrRef = useRef<HTMLInputElement | null>(null);

  //When the form is submitted handle adding a new project to the list
  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Check input isn't null and input contain the correct characters
    if (isInputValid()) {
      console.log("Adding project");

      //Create a new project using the textbox input
      let newProject: Project = {
        projectName: projectNameRef.current!.value,
        description: projectDscrRef.current!.value,
        start_date: startDate!,
        end_date: endDate!,
      };

      //toggle the form to be hidden
      handleClose();
      //add the project to the list
      addProject(newProject);
    } else {
      // TODO: Provide more useful error messages
      console.log("Invalid input");
    }
  };

  /**
   * Checks that the user has filled out the Add Project form correctly
   * @returns True if the input is valid, else false.
   */
  const isInputValid = (): boolean => {
    // Regex only returns true if the characters only contain letters, numbers, or spaces. Must be at least length 1.
    const textRegex = /^[a-zA-Z0-9 ]+$/;

    // Check the project name is valid and not empty
    if (
      projectNameRef.current != null &&
      textRegex.test(projectNameRef.current.value)
    ) {
      // Check the project description is valid and not empty
      if (
        projectDscrRef.current != null &&
        textRegex.test(projectDscrRef.current.value)
      ) {
        // Check the start and end dates aren't empty
        if (startDate != null && endDate != null) {
          // Check the start date comes before the end date
          if (startDate <= endDate) {
            return true;
          } else {
            alert("Please choose a start date that comes before an end date");
          }
        } else {
          alert("Please enter a Start Date and End Date");
        }
      } else {
        alert(
          "Please enter a Project Description consisting of letters and numbers"
        );
      }
    } else {
      alert("Please enter a Project Name consisting of letters and numbers");
    }
    return false;
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
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Project Name</Form.Label>
                <Form.Control
                  type="text"
                  ref={projectNameRef}
                  placeholder="e.g. SQL Database"
                  maxLength={50}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDscr">
                <Form.Label>Project Description</Form.Label>
                <Form.Control
                  type="text"
                  ref={projectDscrRef}
                  placeholder="e.g. Stores user data"
                  maxLength={100}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formStart">
                <DateTimePicker
                  label="Project Start Date"
                  name="endTimePicker"
                  selected={startDate}
                  onChange={setStartDate}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEnd">
                <DateTimePicker
                  label="Project End Date"
                  name="startTimePicker"
                  selected={endDate}
                  onChange={setEndDate}
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
