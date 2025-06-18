import { saveData, getData } from "./storage";
import { Todo } from "./todo";
import { getCurrentProject, addTodoToProject, removeTodoFromProject } from "./appLogic";
// import { renderTodos } from "./todoUI";

const handleFormTodo = (e) => {
    e.preventDefault();
    const modalFormTodo = document.querySelector("#modal-form");
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

    const addTodo = addTodoToProject(getCurrentProject().getName(), title.value, description.value, dueDate.value, priority.value)
    if(addTodo) {
        saveData();
        modalFormTodo.classList.toggle("hide");
        renderTodos(getCurrentProject())
        return true;
    } else {
        return false
    }
}

const resetFormAddTodo = (modalFormTodo) => {
    const spanError = document.querySelectorAll(".error-msg");
    spanError.forEach(span => span.textContent = "");

    // modalFormTodo.classList.toggle("hide");
    const formTodo = modalFormTodo.querySelector(".form-add-todo");
    const inputsTodo = formTodo.querySelectorAll("input");
    const selectTodo = formTodo.querySelector("select");
    inputsTodo.forEach(input => input.value = "");
    selectTodo.value = "high";
}

const formAddTodo = () => {
    const formTodo = document.createElement("form");
    formTodo.setAttribute("class", "form-add-todo");
    formTodo.setAttribute("action", "submit");

    const titleForm = document.createElement("h2");
    titleForm.textContent = "Form Add Todo";
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


    inputTitle.setAttribute("id", "todo-title");
    inputTitle.setAttribute("type", "text");
    inputDescription.setAttribute("id", "todo-description");
    inputDescription.setAttribute("type", "text");
    inputDueDate.setAttribute("id", "todo-dueDate");
    inputDueDate.setAttribute("type", "date");
    selectPriority.setAttribute("id", "todo-priority");
    labelTitle.setAttribute("for", "todo-title");
    labelTitle.textContent = "Title";
    labelDescription.setAttribute("for", "todo-description");
    labelDescription.textContent = "Description";
    labelDueDate.setAttribute("for", "todo-dueDate");
    labelDueDate.textContent = "DueDate";
    labelPriority.setAttribute("for", "todo-priority");
    labelPriority.textContent = "Priority";
    optionHigh.textContent = "High";
    optionMedium.textContent = "Medium";
    optionLow.textContent = "Low";
    optionHigh.setAttribute("value", "high");
    optionMedium.setAttribute("value", "medium");
    optionLow.setAttribute("value", "low");
    btnFormTodo.classList.add("btn-add-todo");
    btnFormTodo.classList.add("btn-form");
    btnFormTodo.textContent = "Add"
    // inputDescription.setAttribute("required", "");
    // inputTitle.setAttribute("required", "");
    // inputDueDate.setAttribute("required", "");

    selectPriority.append(optionHigh, optionMedium, optionLow);
    formTodo.append(titleForm, labelTitle, inputTitle, spanErrorTitle, labelDescription, inputDescription, spanErrorDescription, labelDueDate, inputDueDate, spanErrorDueDate, labelPriority, selectPriority, btnFormTodo);
    
    formTodo.addEventListener("submit", handleFormTodo);
    return formTodo;
}



const renderTodos = (project) => {

    const todosDisplay = document.querySelector("#todos-display");
    const modalFormTodo = document.querySelector("#modal-form");
    // console.log(modalFormTodo);

    const projectTodos = project.getTodos();
    todosDisplay.textContent = ``;

    projectTodos.forEach(todo => {
        const divTodo = createTodoElement(todo);
        todosDisplay.append(divTodo);
    })
}

const createTodoElement = (todo) => {
    const divTodo = document.createElement('div');
    const titleTodo = document.createElement('h3');
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
    deleteBtn.classList.add("btn-delete-todo");
    deleteBtn.addEventListener("click", function (e) {
        //  = (projectName, todoTitle)
        // console.log(e.target.parentElement.parentElement);
        const projectName = getCurrentProject().getName();
        const todoTitle = todo.getTitle();
        removeTodoFromProject(projectName, todoTitle);
        // renderTodos()
        renderTodos(getCurrentProject());

    })
    editBtn.classList.add("btn-edit-todo");
    deleteBtn.textContent = "Delete";
    editBtn.textContent = "Edit";
    divTodo.append(titleTodo, dueDateTodo, priorityTodo, labelTodo, checkTodo, btnContainer);
    return divTodo;
}

export {renderTodos, createTodoElement, formAddTodo, resetFormAddTodo};