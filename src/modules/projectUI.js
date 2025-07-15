// projectUI
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

let formElementGlobal; 
let titleFormGlobal;
let inputTitleGlobal;
let spanErrorTitleGlobal;
let btnFormGlobal;

let isFormProjectOpening = false;
const getIsFormProjectOpening = () => {
    return isFormProjectOpening;
};
const setIsFormProjectOpening = (value) => {
    isFormProjectOpening = value;
};


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

const formProject = () => {
    const formElement = document.createElement("form");
    formElement.setAttribute("class", "form-modal");
    formElement.setAttribute("id", "form-modal-project");
    formElement.setAttribute("action", "submit");
    formElement.classList.add("hide");
    formElementGlobal = formElement;

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "X";
    closeBtn.classList.add("close-btn");
    closeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        closeFormProject();
    })

    const titleForm = document.createElement("h2");
    titleForm.classList.add("title-form", "title-form-project");
    titleForm.textContent = "Form Add Project";
    const labelTitle = document.createElement("label");
    const inputTitle = document.createElement("input");
    inputTitle.setAttribute("id", "project-title");
    inputTitle.setAttribute("type", "text");
    labelTitle.setAttribute("for", "project-title");
    labelTitle.textContent = "Title";
    
    const spanErrorTitle = document.createElement("span");
    spanErrorTitle.classList.add("error-msg", "error-msg-title-project");

    const btnForm = document.createElement("button");
    btnForm.classList.add("btn-form", "btn-form-project");
    btnForm.textContent = "Add";

    // Set global elements
    titleFormGlobal = titleForm;
    inputTitleGlobal = inputTitle;
    spanErrorTitleGlobal = spanErrorTitle;
    btnFormGlobal = btnForm;
    
    formElement.append(titleForm, closeBtn, labelTitle, inputTitle, spanErrorTitle, btnForm);

    formElement.addEventListener("submit", handleFormProject);
    return formElement;
}

const createProjectElement = (project) => {
    const formElement = document.querySelector("#form-modal-project");
    const divProject = document.createElement('div');
    const titleProject = document.createElement('h3');
    divProject.setAttribute('id', `project-${project.getId()}`);
    divProject.classList.add("project-item");
    titleProject.classList.add("title-project");
    titleProject.textContent = project.getName();
    
    // Buttons delete and edit in project
    const containerBtnProject = document.createElement('div');
    const btnDeleteProject = document.createElement('button');
    const btnEditProject = document.createElement('button');
    containerBtnProject.classList.add("container-btns-project");
    btnDeleteProject.textContent = `Delete`;
    btnEditProject.textContent = `Edit`;
    btnEditProject.classList.add("btn-edit-project");
    btnDeleteProject.classList.add("btn-delete-project");
    containerBtnProject.append(btnEditProject, btnDeleteProject);

    if (project.getName() === defaultProjectName) {    
        divProject.append(titleProject);
    } else {
        divProject.append(titleProject, containerBtnProject);
    }

    divProject.addEventListener('click', function () {
        setCurrentProject(project.getName());
        renderProjects(getAllProjects());
        renderTodos(getCurrentProject());
    })

    // Handle delete button
    btnDeleteProject.addEventListener('click', function (e) {
        e.stopPropagation();
        const wasCurrentProject = getCurrentProject().getName() === project.getName();  

        removeProject(project.getId(), project.getName());
        if (wasCurrentProject) {
            setCurrentProject(defaultProjectName);
        }

        renderProjects(getAllProjects());
        renderTodos(getCurrentProject());

    });
    
    // Handle edit button
    btnEditProject.addEventListener('click', function (e) {
        e.stopPropagation();
        projectCurrentEdit = project;
        isEditingProject = true;
        fillProjectForm(projectCurrentEdit);

        formElement.classList.remove("hide");
        modalForm.classList.remove("hide");
    });

    return divProject;
}

const fillProjectForm = (project) => {

    btnFormGlobal.textContent = "Submit";
    titleFormGlobal.textContent = "Form Edit Project";
    if (project) {
        inputTitleGlobal.value = project.getName();
    };
    return;
}


const handleFormProject = (e) => {
    e.preventDefault();
    spanErrorTitleGlobal.textContent = "";

    // Validation form project
    if (!inputTitleGlobal.value) {
        spanErrorTitleGlobal.textContent = "Title project is required!";
        return false;
    }
    
    if (isEditingProject) {
        projectCurrentEdit.setName(inputTitleGlobal.value);
        saveData();
        closeFormProject()
        renderProjects(getAllProjects());
        isEditingProject = false;
        projectCurrentEdit = null;
        return true;

    } else {
        // Add new project
        const checkAddProject = addProject(inputTitleGlobal.value);
    
        if (checkAddProject) {
            closeFormProject()
            renderProjects(getAllProjects());
            return true;
    
        } else {
            spanErrorTitleGlobal.textContent = "Title project already exist!";
        }

    }


}

const closeFormProject = () => {
    
    isEditingProject = false;
    projectCurrentEdit = null;
    btnFormGlobal.textContent = "Add";
    titleFormGlobal.textContent = "Form Add Project";
    inputTitleGlobal.value = "";
    spanErrorTitleGlobal.textContent = "";
    formElementGlobal.classList.add("hide");
    modalForm.classList.add("hide");
    setIsFormProjectOpening(false);
}

export {renderProjects, formProject, closeFormProject, getIsFormProjectOpening, setIsFormProjectOpening};