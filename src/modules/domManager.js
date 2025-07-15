// domManager

import {
    defaultProjectName,
    getAllProjects,
    getProject,
    setCurrentProject,
    getCurrentProject
} from "./appLogic";

import { renderTodos, formTodo, closeFormTodo, getIsFormTodoOpening, setIsFormTodoOpening, handleFormTodo } from "./todoUI";
import { renderProjects, formProject, closeFormProject, getIsFormProjectOpening, setIsFormProjectOpening, handleFormProject} from "./projectUI";


export const initializeUI = () => {
    const allProjects = getAllProjects();
    const modalForm = document.querySelector("#modal-form");
    modalForm.append(formTodo());
    modalForm.append(formProject());

    renderProjects(allProjects);
    setCurrentProject(defaultProjectName);
    renderTodos(getCurrentProject());
    const btnAddTodo = document.querySelector('#btn-add-todo');
    btnAddTodo.addEventListener('click', function (e) {
        setIsFormTodoOpening(true);
        const formTodo = document.querySelector("#form-modal-todo");
        formTodo.classList.remove("hide");
        modalForm.classList.remove("hide");
    });
    
    const btnAddProject = document.querySelector('#btn-add-project');
    btnAddProject.addEventListener("click", function () {
        setIsFormProjectOpening(true);
        const formProject = document.querySelector("#form-modal-project");
        formProject.classList.remove("hide");
        modalForm.classList.remove("hide");

    });

    document.addEventListener("keydown", function (e) {
        if (e.key === 'Escape') {
            if (getIsFormProjectOpening()) {
                closeFormProject();
                setIsFormProjectOpening(false);
                return;
            }

            if (getIsFormTodoOpening()) {
                closeFormTodo();
                setIsFormTodoOpening(false);
                return;
            }
        } 
    });

}

