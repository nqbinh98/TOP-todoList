// src\modules\appLogic.js

import { Todo } from "./todo";
import { Project } from "./project";

let allProjects = [];
const defaultProjectName = "Inbox";

// --- Manage Project ---
const initializeDefaultProject = () => {
    if (allProjects.length === 0) {
        const defaultProject = new Project(defaultProjectName);
        allProjects.push(defaultProject);
    }
};

const addProject = (projectName) => {
    const projectExists = allProjects.some(project => project.getName() === projectName)
    if (projectExists) {
        console.warn(`Project ${projectName} already exist`)
        return null;
    }
    const newProject = new Project(projectName);
    allProjects.push(newProject);
    return newProject;
};

const removeProject = (projectName) => {
    const projectExists = allProjects.some(project => project.getName() === projectName)
    if (!projectExists) {
        console.warn(`Project ${projectName} not found to remove`);
        return false;
    }
    allProjects = allProjects.filter(project => project.getName() !== projectName);
    console.log(`Project ${projectName} has been remove`)
    return true;

};

const getProject = (projectName) => {
    return allProjects.find(project => project.getName() === projectName);
};

const getAllProjects = () => {
    return [...allProjects];
};

// --- Manage Todo ---
const addTodoToProject = (projectName, title, description, dueDate, priority) => {
    const targetProject = getProject(projectName);
    if (!targetProject) {
        console.warn(`Project ${projectName} not found. Cannot add todo`);
        return null;
    }
    const newTodo = new Todo(title, description, dueDate, priority);
    targetProject.addTodo(newTodo);
    console.log(`Add todo ${title} to ${targetProject.getName()} success`);
    return newTodo;
};

const removeTodoFromProject = (projectName, todoTitle) => {
    const targetProject = getProject(projectName);
    if (!targetProject) {
        console.warn(`Project ${projectName} not found. Cannot remove todo`);
        return false;
    }
    const checkRemoved = targetProject.removeTodo(todoTitle);
    if (checkRemoved) {
        console.log(`Todo ${todoTitle} removed successfully from project ${targetProject.getName()}.`);
        return true;
    } else {
        console.log(`Todo ${todoTitle} not found in project ${targetProject.getName()}. Cannot remove`);
        return false;
    }
};

const toggleTodoCompletion = (projectName, todoTitle) => {
    const targetProject = getProject(projectName);
    if (!targetProject) {
        console.warn(`Project ${projectName} not found. Cannot toggle todo`);
        return false;
    }
    const todosArray = targetProject.getTodos();
    const targetTodo = todosArray.find(todo => todo.getTitle() === todoTitle);
    if (targetTodo) {
        targetTodo.toggleCompleted();
        console.log(`Toggle todo ${todoTitle} completion in project ${targetProject.getName()} success.`);
        return true;
    } else {
        console.log(`Cannot found todo ${todoTitle} in project ${targetProject.getName()}.`);
        return false;
    }

};

export {
    initializeDefaultProject,
    addProject,
    removeProject,
    getProject,
    getAllProjects,
    addTodoToProject,
    removeTodoFromProject,
    toggleTodoCompletion,
    defaultProjectName
}