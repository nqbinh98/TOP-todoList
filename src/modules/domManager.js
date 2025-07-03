import {
    defaultProjectName,
    getAllProjects,
    getProject,
    setCurrentProject,
    getCurrentProject
} from "./appLogic";

import { renderTodos, formAddTodo, resetFormTodo } from "./todoUI";
import { renderProjects, formProject } from "./projectUI";


export const initializeUI = () => {
    const allProjects = getAllProjects();
    const modalForm = document.querySelector("#modal-form");
    modalForm.append(formAddTodo());
    modalForm.append(formProject());

    renderProjects(allProjects);
    setCurrentProject(defaultProjectName);
    renderTodos(getCurrentProject());
    const btnAddTodo = document.querySelector('#btn-add-todo');
    btnAddTodo.addEventListener('click', function (e) {
        const formTodo = document.querySelector("#form-modal-todo");
        formTodo.classList.toggle("hide");
        modalForm.classList.toggle("hide");
        resetFormTodo(modalForm);
    });
    
    const btnAddProject = document.querySelector('#btn-add-project');
    btnAddProject.addEventListener("click", function () {
        const formProject = document.querySelector("#form-modal-project");
        formProject.classList.toggle("hide");
        modalForm.classList.toggle("hide");

    })
}

