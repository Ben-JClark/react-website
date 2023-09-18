import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { Project } from "./App";

interface ProjectListProps {
  projectList: Project[];
  deleteHandler: (project: Project) => void;
}

//Add The form to the page as a list
const ListProjects = ({ projectList, deleteHandler }: ProjectListProps) => {
  return (
    <div>
      {projectList.map((project: Project) => (
        <Card
          className="card mb-3"
          border="primary"
          key={project.projectIdentifier}
        >
          <Card.Header className="displayBar">
            Project starts on {project.start_date.getDate()}-
            {project.start_date.getMonth() + 1}-
            {project.start_date.getFullYear()}
          </Card.Header>
          <Card.Body>
            <Card.Title className="displayTitle">
              {project.projectName}
            </Card.Title>
            <Card.Text className="displaySub">
              {project.description} <br></br>
              Project Ends on {project.end_date.getDate()}-
              {project.end_date.getMonth() + 1}-{project.end_date.getFullYear()}
            </Card.Text>
            <Button variant="primary" onClick={() => deleteHandler(project)}>
              Remove
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default ListProjects;
