import { Project } from "./project";
import {
    saveData,
    getData
} from "./storage";
import {
    defaultProjectName,
    getAllProjects,
    removeProject,
    setCurrentProject,
    getCurrentProject,
    addProject,
} from "./appLogic";
import { renderTodos } from "./todoUI";
const modalForm = document.querySelector("#modal-form");
let projectCurrentEdit = null;
let isEditingProject = false;

const renderProjects = (projects) => {
    const projectsSidebar = document.querySelector("#projects-sidebar");
    projectsSidebar.textContent = "";

    projects.forEach(project => {
        const divProject = createProjectElement(project);
        projectsSidebar.append(divProject);
        
    })
    
    const currentProject = getCurrentProject();
    if (currentProject) {
        const currentActiveProjectElement = document.querySelector(`#project-${currentProject.getId()}`)

        if (currentActiveProjectElement) {

            const elementProjects = projectsSidebar.querySelectorAll('.project-item');
            elementProjects.forEach(project => {
                project.classList.remove("active");
            })

            currentActiveProjectElement.classList.add("active");
        }
    }
    

}

const createProjectElement = (project) => {
    const projectsSidebar = document.querySelector("#projects-sidebar");
    const divProject = document.createElement('div');
    const titleProject = document.createElement('h3');
    const containerBtnProject = document.createElement('div');
    const btnDeleteProject = document.createElement('button');
    const btnEditProject = document.createElement('button');
    btnDeleteProject.textContent = `Delete`;
    btnEditProject.textContent = `Edit`;
    containerBtnProject.classList.add("container-btns-project");
    btnEditProject.classList.add("btn-edit-project");
    btnDeleteProject.classList.add("btn-delete-project");
    titleProject.classList.add("title-project");
    titleProject.textContent = project.getName();
    divProject.setAttribute('id', `project-${project.getId()}`);
    divProject.classList.add("project-item");
    containerBtnProject.append(btnEditProject, btnDeleteProject);
    divProject.append(titleProject, containerBtnProject);

    divProject.addEventListener('click', function () {
        setCurrentProject(project.getName());
        renderProjects(getAllProjects());
        renderTodos(getCurrentProject());
    })

    btnDeleteProject.addEventListener('click', function (e) {
        e.stopPropagation();
        const wasCurrentProject = getCurrentProject().getName() === project.getName();  

        removeProject(project.getId(), project.getName());
        if (wasCurrentProject) {
            setCurrentProject(defaultProjectName);
        }

        renderProjects(getAllProjects());
        renderTodos(getCurrentProject());

    })
    // btnEditProject.addEventListener('click', function () {
    //     console.log(project)
    // })

    return divProject;
}

const formProject = () => {
    const formElement = document.createElement("form");
    formElement.setAttribute("class", "form-modal");
    formElement.setAttribute("id", "form-modal-project");
    formElement.setAttribute("action", "submit");
    formElement.classList.add("hide");

    const titleForm = document.createElement("h2");
    titleForm.classList.add("title-form");
    titleForm.textContent = "Form Add Project";
    const labelTitle = document.createElement("label");
    const inputTitle = document.createElement("input");
    inputTitle.setAttribute("id", "project-title");
    inputTitle.setAttribute("type", "text");
    labelTitle.setAttribute("for", "project-title");
    labelTitle.textContent = "Title";

    const spanErrorTitle = document.createElement("span");
    spanErrorTitle.classList.add("error-msg", "error-msg-title");

    const btnForm = document.createElement("button");
    btnForm.classList.add("btn-form");
    btnForm.textContent = "Add";

    formElement.append(titleForm, labelTitle, inputTitle, spanErrorTitle, btnForm);
    formElement.addEventListener("submit", handleFormProject)
    return formElement;
}
const handleFormProject = (e) => {
    e.preventDefault();
    const formProject = document.querySelector("#form-modal-project");
    const titleInput = e.target.querySelector("#project-title");
    const spanError = e.target.querySelector(".error-msg");
    spanError.textContent = "";
    
    if (!titleInput.value) {
        spanError.textContent = "Title project is required!";
        return false;
    }
    // Add new project
    const checkAddProject = addProject(titleInput.value);

    modalForm.classList.add("hide");
    formProject.classList.add("hide");
    console.log(getAllProjects());
    renderProjects(getAllProjects());
    return true;

}
export {renderProjects, formProject};