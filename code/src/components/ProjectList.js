import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

//Add The form to the page as a list
const ListProjects = (props) => {
  return (
    <div>
      {props.projects.map((project) => (
        <Card className="card" key={project.projectIdentifier}>
          <Card.Header className="displayBar">
            Started on {project.start_date}
          </Card.Header>
          <Card.Body>
            <Card.Title className="displayTitle">
              {project.projectName}
            </Card.Title>
            <Card.Text className="displaySub">
              {project.description} <br></br>
              Ends on {project.end_date}
            </Card.Text>
            <Button
              variant="primary"
              onClick={() => props.deleteHandler(project)}
            >
              Remove
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default ListProjects;
