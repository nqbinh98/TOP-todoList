import { Todo } from "./modules/todo";
import { Project } from "./modules/project";

const todoOne = new Todo('job1', 'create a todo list 1', '01-06-2025', 'high');
const todoTwo = new Todo('job2', 'create a todo list 2', '01-01-2025', 'low');

const project1 = new Project("Project one")
const project2 = new Project("Project two")
project1.addTodo(todoOne)
project1.addTodo(todoTwo)

console.log(project1.getName());
console.log(project1.getTodos());

const todosInProject1 = project1.getTodos();
if (todosInProject1.length > 0) {
    console.log(todosInProject1[0].getTitle());
    console.log(todosInProject1[0].getIsComplete());
    todosInProject1[0].toggleCompleted()
    console.log(todosInProject1[0].getIsComplete());
}
project1.removeTodo('job2');
console.log(project1.getTodos());

