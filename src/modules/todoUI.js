import { saveData, getData } from "./storage";
import { Todo } from "./todo";

const handleFormTodo = (e) => {
    e.preventDefault();
    const title = e.target.querySelector("#todo-title");
    const description = e.target.querySelector("#todo-description");
    const dueDate = document.querySelector("#todo-dueDate");
    const priority = document.querySelector("#todo-priority");
    const spanError = document.querySelectorAll(".error-msg");
    const titleMsg = document.querySelector(".error-msg-title");
    const dueDateMsg = document.querySelector(".error-msg-dueDate");
    const descriptionMsg = document.querySelector(".error-msg-description");
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
    return true
}

const formAddTodo = () => {
    const formTodo = document.createElement("form");
    formTodo.setAttribute("class", "form-add-todo");
    formTodo.setAttribute("action", "submit");

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
    formTodo.append(labelTitle, inputTitle, spanErrorTitle, labelDescription, inputDescription, spanErrorDescription, labelDueDate, inputDueDate, spanErrorDueDate, labelPriority, selectPriority, btnFormTodo);
    
    formTodo.addEventListener("submit", handleFormTodo);
    return formTodo;
}

const renderTodos = (project) => {
    const todosDisplay = document.querySelector("#todos-display");
    const modalFormTodo = document.querySelector("#modal-form");
    console.log(modalFormTodo);
    const projectTodos = project.getTodos();
    todosDisplay.textContent = ``;

    projectTodos.forEach(todo => {
        const divTodo = createTodoElement(todo);
        todosDisplay.append(divTodo);
    })
    const btnAddTodo = document.createElement('button');
    btnAddTodo.textContent = "Add";
    btnAddTodo.classList.add('btnTodo-add');
    btnAddTodo.addEventListener('click', function (e) {
        modalFormTodo.classList.toggle("hide");
        modalFormTodo.append(formAddTodo());
    });

    todosDisplay.append(btnAddTodo);
}

const createTodoElement = (todo) => {
    const divTodo = document.createElement('div');
    const titleTodo = document.createElement('h3');
    const dueDateTodo = document.createElement('p');
    const priorityTodo = document.createElement('p');
    const checkTodo = document.createElement('input');
    const labelTodo = document.createElement('label');
    
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
    
    divTodo.append(titleTodo, dueDateTodo, priorityTodo, labelTodo, checkTodo);
    return divTodo;
}

export {renderTodos, createTodoElement};