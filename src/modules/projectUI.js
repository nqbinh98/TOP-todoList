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
        const titleProject = document.createElement('h3');
        const containerBtnProject = document.createElement('div');
        const btnDeleteProject = document.createElement('button');
        const btnEditProject = document.createElement('button');
        btnDeleteProject.textContent = `Delete`;
        btnEditProject.textContent = `Edit`;
        btnDeleteProject.classList.add("btn-delete-project")
        btnEditProject.classList.add("btn-edit-project")
        titleProject.classList.add("title-project")
        titleProject.textContent = `${project.getName()}`;
        divProject.setAttribute('id', `project-${project.getName()}`);
        divProject.classList.add("project-item");
        containerBtnProject.append(btnEditProject, btnDeleteProject);
        divProject.append(titleProject, containerBtnProject);
        
        if (project.getName() === defaultProjectName) {
            divProject.classList.add("active");
        }
        divProject.addEventListener('click', function (e) {
            const elementProjects = projectsSidebar.querySelectorAll('.project-item');
            const titleActive = divProject.querySelector('.title-project');
            elementProjects.forEach(project => {
                project.classList.remove("active");
            })
            divProject.classList.add("active");
            setCurrentProject(titleActive.textContent);
            renderTodos(getCurrentProject());
        })
        projectsSidebar.append(divProject);
    })
    
}

export {renderProjects};