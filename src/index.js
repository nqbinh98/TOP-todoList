import { Todo } from "./modules/todo";
import { Project } from "./modules/project";
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
} from './modules/appLogic';

import {
    saveData,
    getData
} from './modules/storage'

import { initializeUI } from "./modules/domManager";

initializeUI();
console.log('--- Kiểm tra Khởi tạo Dự án Mặc định ---');
initializeDefaultProject();


let projects = getAllProjects();
console.log('Tất cả Projects sau khi khởi tạo:', projects);
// Mong đợi: 1 project tên "Inbox"

// console.log('\n--- Kiểm tra Thêm Todo vào Dự án Mặc định ---');
// addTodoToProject(defaultProjectName, 'Learn JavaScript', 'Master JS fundamentals', '2025-12-31', 'high');
// addTodoToProject(defaultProjectName, 'Build Todo App', 'Finish this project', '2025-06-30', 'high');
// projects = getAllProjects();
// console.log('Projects sau khi thêm Todos:', projects);
// console.log('Todos trong "Inbox":', getProject(defaultProjectName).getTodos());
// Mong đợi: "Inbox" project có 2 Todos

// console.log('\n--- Kiểm tra Thêm Project Mới và Todo vào đó ---');
// addProject('Work');
// addTodoToProject('Work', 'Run marathon', 'For marketing new shoes', '2025-06-08', 'high');
// addTodoToProject('Work', 'Send report', 'To manager', '2025-06-05', 'high');
// projects = getAllProjects();
// console.log('Tất cả Projects sau khi thêm Project "Work":', projects);
// console.log('Todos trong "Work":', getProject('Work').getTodos());
// Mong đợi: 2 projects ("Inbox", "Work"), mỗi project có Todos riêng

// console.log('\n--- Kiểm tra Chuyển đổi trạng thái Todo ---');
// console.log('Trạng thái "Learn JavaScript" trước khi đổi:', getProject(defaultProjectName).getTodos().find(todo => todo.getTitle() === 'Learn JavaScript').getIsComplete());
// toggleTodoCompletion(defaultProjectName, 'Learn JavaScript');
// console.log('Trạng thái "Learn JavaScript" sau khi đổi:', getProject(defaultProjectName).getTodos().find(todo => todo.getTitle() === 'Learn JavaScript').getIsComplete());
// Mong đợi: Trạng thái chuyển từ false sang true

// console.log('\n--- Kiểm tra Xóa Todo ---');
// console.log('Todos trong "Inbox" trước khi xóa:', getProject(defaultProjectName).getTodos().map(todo => todo.getTitle()));
// removeTodoFromProject(defaultProjectName, 'Build Todo App');
// removeTodoFromProject('Work', 'Run marathon');
// removeTodoFromProject('Work', 'Send report');
// console.log('Todos trong "Inbox" sau khi xóa:', getProject(defaultProjectName).getTodos().map(todo => todo.getTitle()));
// Mong đợi: "Build Todo App" đã bị xóa khỏi "Inbox"

// console.log('\n--- Kiểm tra Xóa Project ---');
// console.log('Tất cả Projects trước khi xóa "Work":', getAllProjects().map(p => p.getName()));
// removeProject('Work');
// console.log('Tất cả Projects sau khi xóa "Work":', getAllProjects().map(p => p.getName()));
// Mong đợi: Project "Work" đã bị xóa

// saveData()

