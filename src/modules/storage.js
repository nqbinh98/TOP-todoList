import {
    initializeDefaultProject,
    addProject,
    removeProject,
    getProject,
    getAllProjects,
    addTodoToProject,
    removeTodoFromProject,
    toggleTodoCompletion,
    defaultProjectName
} from "./appLogic";
import { Project } from "./project";
import { Todo } from "./todo";

const saveData = () => {
    localStorage.setItem('projects', JSON.stringify(getAllProjects()))
};

const getData = () => {
    const data = localStorage.getItem('projects')
    if (!data) {
        return [];
    }
    const parsedProjects = JSON.parse(data);
    const hydratedProjects = parsedProjects.map(project => {

        const projectInstance = new Project (project._name);
        
        project._todos.map(todo => {
            const todoInstance = new Todo (todo._title, todo._description, todo._dueDate, todo._priority)
            todoInstance.setIsComplete(todo._isComplete);
            projectInstance.addTodo(todoInstance);  
        })
        return projectInstance;
    })
    // console.log(parsedProjects)
    return hydratedProjects;
}

export {
    saveData,
    getData
}

