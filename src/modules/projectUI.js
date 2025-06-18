import { Project } from "./project";
import {
    saveData,
    getData
} from "./storage";
import {
    defaultProjectName,
    getAllProjects,
    getProject,
    setCurrentProject,
    getCurrentProject
} from "./appLogic";
import { renderTodos } from "./todoUI";


const renderProjects = (projects) => {
    const projectsSidebar = document.querySelector("#projects-sidebar");
    projects.forEach(project => {
        const divProject = document.createElement('div');
        divProject.textContent = `${project.getName()}`;
        divProject.setAttribute('id', `project-${project.getName()}`);
        divProject.classList.add("project-item");
        if (project.getName() === defaultProjectName) {
            divProject.classList.add("active");
        }
        divProject.addEventListener('click', function (e) {
            const elementProjects = projectsSidebar.querySelectorAll('div');
            elementProjects.forEach(project => {
                project.classList.remove("active")
            })
            divProject.classList.add("active");
            setCurrentProject(e.target.textContent);
            renderTodos(getCurrentProject());
        })
        projectsSidebar.append(divProject);
    })
    
}

export {renderProjects};