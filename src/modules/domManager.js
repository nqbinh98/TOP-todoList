import {
    defaultProjectName,
    getAllProjects,
    getProject,
    setCurrentProject,
    getCurrentProject
} from "./appLogic";

import { renderTodos, formAddTodo, resetFormAddTodo } from "./todoUI";
import { renderProjects } from "./projectUI";


export const initializeUI = () => {
    const allProjects = getAllProjects();
    const modalFormTodo = document.querySelector("#modal-form");
    const todosContent = document.querySelector("#todos-content");
    // const defaultProject = getProject(defaultProjectName);
    modalFormTodo.append(formAddTodo());
    resetFormAddTodo(modalFormTodo);

    renderProjects(allProjects);
    setCurrentProject(defaultProjectName);
    renderTodos(getCurrentProject());
    const btnAddTodo = document.createElement('button');
    btnAddTodo.textContent = "Add";
    btnAddTodo.classList.add('btnTodo-add');
    btnAddTodo.addEventListener('click', function (e) {
        modalFormTodo.classList.toggle("hide");
        resetFormAddTodo(modalFormTodo);
    });
    todosContent.append(btnAddTodo);

}

