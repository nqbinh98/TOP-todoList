import { saveData, getData } from "./storage";
import { Todo } from "./todo";
import { getCurrentProject, addTodoToProject, removeTodoFromProject } from "./appLogic";
// import { renderTodos } from "./todoUI";
const modalForm = document.querySelector("#modal-form");
let todoCurrentEdit = null;
let isEditingTodo = false;

const handleFormTodo = (e) => {
    e.preventDefault();
    const formTodo = document.querySelector("#form-modal-todo");
    const title = e.target.querySelector("#todo-title");
    const description = e.target.querySelector("#todo-description");
    const dueDate = e.target.querySelector("#todo-dueDate");
    const priority = e.target.querySelector("#todo-priority");
    const titleMsg = e.target.querySelector(".error-msg-title");
    const dueDateMsg = e.target.querySelector(".error-msg-dueDate");
    const descriptionMsg = e.target.querySelector(".error-msg-description");
    const spanError = e.target.querySelectorAll(".error-msg");
    spanError.forEach(span => span.textContent = "")
   
    // Validation form todo
    if (!title.value) {
        titleMsg.textContent = "Title is required!";
    }
    if (!description.value) {
        descriptionMsg.textContent = "Description is required!";
    }
    if (!dueDate.value) {
        dueDateMsg.textContent = "DueDate is required!";
    } 
    if (!title.value || !description.value || !dueDate.value) {
        return false;
    }

    console.log(title.value, description.value, dueDate.value);

    if (isEditingTodo) {
        todoCurrentEdit.setTitle(title.value);
        todoCurrentEdit.setDescription(description.value);
        todoCurrentEdit.setDueDate(dueDate.value);
        todoCurrentEdit.setPriority(priority.value);
        isEditingTodo = false;
        todoCurrentEdit = null;
    } else {

        const addTodo = addTodoToProject(getCurrentProject().getName(), title.value, description.value, dueDate.value, priority.value)
        if (!addTodo) {
            return false;
        }
    }
    saveData();
    formTodo.classList.add("hide");
    modalForm.classList.add("hide");
    renderTodos(getCurrentProject())
    return true;

}

const resetFormTodo = (modalForm) => {
    const spanError = document.querySelectorAll(".error-msg");
    spanError.forEach(span => span.textContent = "");

    const formTodo = modalForm.querySelector(".form-modal");
    const inputsTodo = formTodo.querySelectorAll("input");
    const selectTodo = formTodo.querySelector("select");
    inputsTodo.forEach(input => input.value = "");
    selectTodo.value = "high";
    isEditingTodo = false;
    todoCurrentEdit = null;
}

const formAddTodo = () => {
    const formTodo = document.createElement("form");
    formTodo.setAttribute("class", "form-modal");
    formTodo.setAttribute("id", "form-modal-todo");
    formTodo.setAttribute("action", "submit");
    formTodo.classList.add("hide");

    const titleForm = document.createElement("h2");
    titleForm.classList.add("title-form");
    const labelTitle = document.createElement("label");
    const labelDescription = document.createElement("label");
    const labelDueDate = document.createElement("label");
    const labelPriority = document.createElement("label");
    const inputTitle = document.createElement("input")
    const inputDescription = document.createElement("input")
    const inputDueDate = document.createElement("input")
    const selectPriority = document.createElement("select")
    const optionHigh = document.createElement("option");
    const optionMedium = document.createElement("option");
    const optionLow = document.createElement("option");
    const btnFormTodo = document.createElement("button");

    const spanErrorTitle = document.createElement("span");
    spanErrorTitle.classList.add("error-msg", "error-msg-title");
    const spanErrorDueDate = document.createElement("span");
    spanErrorDueDate.classList.add("error-msg", "error-msg-dueDate");
    const spanErrorDescription = document.createElement("span");
    spanErrorDescription.classList.add("error-msg", "error-msg-description");

    labelTitle.setAttribute("for", "todo-title");
    labelTitle.textContent = "Title";
    labelDescription.setAttribute("for", "todo-description");
    labelDescription.textContent = "Description";
    labelDueDate.setAttribute("for", "todo-dueDate");
    labelDueDate.textContent = "DueDate";
    labelPriority.setAttribute("for", "todo-priority");
    labelPriority.textContent = "Priority";
    inputTitle.setAttribute("id", "todo-title");
    inputTitle.setAttribute("type", "text");
    inputDescription.setAttribute("id", "todo-description");
    inputDescription.setAttribute("type", "text");
    inputDueDate.setAttribute("id", "todo-dueDate");
    inputDueDate.setAttribute("type", "date");
    selectPriority.setAttribute("id", "todo-priority");
    optionHigh.textContent = "High";
    optionMedium.textContent = "Medium";
    optionLow.textContent = "Low";
    optionHigh.setAttribute("value", "high");
    optionMedium.setAttribute("value", "medium");
    optionLow.setAttribute("value", "low");
    btnFormTodo.classList.add("btn-form");
    btnFormTodo.classList.add("btn-add-todo");

    // inputDescription.setAttribute("required", "");
    // inputTitle.setAttribute("required", "");
    // inputDueDate.setAttribute("required", "");

    titleForm.textContent = "Form Add Todo";
    btnFormTodo.textContent = "Add"
    selectPriority.append(optionHigh, optionMedium, optionLow);
    formTodo.append(titleForm, labelTitle, inputTitle, spanErrorTitle, labelDescription, inputDescription, spanErrorDescription, labelDueDate, inputDueDate, spanErrorDueDate, labelPriority, selectPriority, btnFormTodo);
    
    formTodo.addEventListener("submit", handleFormTodo);
    return formTodo;
}

const renderTodos = (project) => {

    const todosDisplay = document.querySelector("#todos-display");
    todosDisplay.textContent = ``;
    if (project) {
        const projectTodos = project.getTodos();
        projectTodos.forEach(todo => {
            const divTodo = createTodoElement(todo);
            todosDisplay.append(divTodo);
        })
    }
}

const createTodoElement = (todo) => {
    const formTodo = document.querySelector("#form-modal-todo");
    const divTodo = document.createElement('div');
    const titleTodo = document.createElement('h3');
    const descriptionTodo = document.createElement('p');
    const dueDateTodo = document.createElement('p');
    const priorityTodo = document.createElement('p');
    const checkTodo = document.createElement('input');
    const labelTodo = document.createElement('label');
    const btnContainer = document.createElement('div');
    const deleteBtn = document.createElement('button');
    const editBtn = document.createElement('button');
    btnContainer.append(editBtn, deleteBtn);

    divTodo.setAttribute('data-todo-id', `todo-${todo.getId()}`);
    divTodo.setAttribute('class', 'todo-item');
    titleTodo.textContent = `${todo.getTitle()}`;
    descriptionTodo.textContent = `Description: ${todo.getDescription()}`;
    dueDateTodo.textContent = `Due date: ${todo.getDueDate()}`;
    priorityTodo.textContent = `Priority: ${todo.getPriority()}`;
    labelTodo.textContent = "Complete: "
    checkTodo.setAttribute("type", "checkbox");
    checkTodo.checked = todo.getIsCompleted();
    checkTodo.addEventListener("click", function () {
        todo.toggleCompleted();
        checkTodo.checked = todo.getIsCompleted();
        saveData();
    });
    btnContainer.classList.add("btn-container-todo")
   
    // Delete todo button
    deleteBtn.classList.add("btn-delete-todo");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function (e) {
        const projectName = getCurrentProject().getName();
        const todoTitle = todo.getTitle();
        const todoId = todo.getId();
        removeTodoFromProject(projectName, todoId, todoTitle);
        renderTodos(getCurrentProject());

    });

    // Edit todo button
    editBtn.classList.add("btn-edit-todo");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", function () {
        todoCurrentEdit = todo;
        isEditingTodo = true;
        fillTodoForm(todoCurrentEdit);
        formTodo.classList.remove("hide");
        modalForm.classList.remove("hide");
    });
    
    divTodo.append(titleTodo, descriptionTodo, dueDateTodo, priorityTodo, labelTodo, checkTodo, btnContainer);
    return divTodo;
}

const fillTodoForm = (todo) => {

    const inputTitle = document.querySelector("#todo-title");
    const inputDescription = document.querySelector("#todo-description");
    const inputDueDate = document.querySelector("#todo-dueDate");
    const selectPriority = document.querySelector("#todo-priority");
    const titleForm = document.querySelector(".title-form");
    const btnFormTodo = document.querySelector(".btn-add-todo");

    titleForm.textContent = "Form Edit Todo";
    btnFormTodo.textContent = "Submit"

    if (todo) {
        inputTitle.value = todo.getTitle();
        inputDescription.value = todo.getDescription();
        inputDueDate.value = todo.getDueDate();
        selectPriority.value = todo.getPriority();
    }
}

export {renderTodos, createTodoElement, formAddTodo, resetFormTodo};