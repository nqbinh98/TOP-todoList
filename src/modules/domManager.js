import {
    defaultProjectName,
    getAllProjects,
    getProject,
} from "./appLogic";

import { renderTodos } from "./todoUI";
import { renderProjects } from "./projectUI";

export const initializeUI = () => {
    const allProjects = getAllProjects();
    const defaultProject = getProject(defaultProjectName);

    renderProjects(allProjects);
    renderTodos(defaultProject);
}

