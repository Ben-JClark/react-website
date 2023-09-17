import { useEffect, useState } from "react";
// import { without } from "lodash";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

import ListProjects from "./ProjectList";
import DropDownButton from "./DropDown";
import AddProjects from "./AddProject";

export interface Project {
  projectName: string;
  projectIdentifier?: string;
  description: string;
  start_date: Date;
  end_date: Date;
}

const App = () => {
  // State that contains the project list
  const [projectList, setProjectList] = useState<Project[]>([]);
  // Keeps track of the number of states
  const [projectCount, setProjectCount] = useState<number>(0);

  //States for showing and closing the form
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Copy the current project list and add project, then set it again
  const addProject = (project: Project) => {
    // Add the project ID
    project.projectIdentifier = projectCount.toString();
    setProjectCount((prevCount) => prevCount + 1);

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
    const sortedData = [...projectList].sort(
      (p1, p2) => p1.start_date.getTime() - p2.start_date.getTime()
    );
    setProjectList(sortedData);
  };

  //Receive the request to filter by date descending
  const dateDsc = () => {
    const sortedData = [...projectList].sort(
      (p1, p2) => p2.start_date.getTime() - p1.start_date.getTime()
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
        const list: Project[] = data.map((projectData: Project) => {
          return {
            projectName: new String(projectData.projectName),
            projectIdentifier: new String(projectData.projectIdentifier),
            description: new String(projectData.description),
            start_date: new Date(projectData.start_date),
            end_date: new Date(projectData.end_date),
          };
        });

        //Update the projectList to the list of data obtained from data.json
        setProjectList(list);

        // Increment the project count by the number of projects read from the json file
        setProjectCount(list.length);

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
