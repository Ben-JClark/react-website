import { useEffect, useState } from "react";
// import { without } from "lodash";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

import ListProjects from "./ProjectList";
import DropDownButton from "./DropDown";
import AddProjects from "./AddProject";

export interface Project {
  projectName: string;
  projectIdentifier: string;
  description: string;
  start_date: string;
  end_date: string;
}

const App = () => {
  //State that contain the project list
  const [projectList, setProjectList] = useState<Project[]>([]);

  //States for showing and closing the form
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Copy the current project list and add project, then set it again
  const addProject = (project: Project) => {
    setProjectList((prevProjects) => [project, ...prevProjects]);
  };

  //Copy the current project list without project and set it again
  const deleteProject = (project: Project) => {
    const newProjectList = projectList.filter((item) => {
      return item != project;
    });
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
        const list: Project[] = data.map((project: Project) => {
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
        <ListProjects projectList={projectList} deleteHandler={deleteProject} />
      </div>
      <div>
        <AddProjects
          addProject={addProject}
          show={show}
          handleClose={handleClose}
        />
      </div>
    </div>
  );
};

export default App;
