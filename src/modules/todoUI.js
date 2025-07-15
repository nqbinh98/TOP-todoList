// todoUI
import { saveData, getData } from "./storage";
import { getCurrentProject, addTodoToProject, removeTodoFromProject } from "./appLogic";
import { format, isPast, isToday, isTomorrow, differenceInDays, parseISO } from "date-fns";
const modalForm = document.querySelector("#modal-form");
let todoCurrentEdit = null;
let isEditingTodo = false;
let isFormTodoOpening = false;

let formElementGlobal; 
let titleFormGlobal;
let inputTitleGlobal;
let inputDescriptionGlobal;
let inputDueDateGlobal;
let selectPriorityGlobal;
let btnFormGlobal;
let spanErrorTitleGlobal;
let spanErrorDueDateGlobal;
let spanErrorDescriptionGlobal;
let spanErrorGlobal;
let inputsTodoGlobal;

const getIsFormTodoOpening = () => {
    return isFormTodoOpening;
};
const setIsFormTodoOpening = (value) => {
    isFormTodoOpening = value;
};

const formTodo = () => {
    const formElement = document.createElement("form");
    formElement.setAttribute("class", "form-modal");
    formElement.setAttribute("id", "form-modal-todo");
    formElement.setAttribute("action", "submit");
    formElement.classList.add("hide");
    formElementGlobal = formElement;

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "X";
    closeBtn.classList.add("close-btn");
    closeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        closeFormTodo();
    })

    const titleForm = document.createElement("h2");
    titleForm.classList.add("title-form", "title-form-todo");
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
    spanErrorTitle.classList.add("error-msg", "error-msg-title-todo");
    const spanErrorDueDate = document.createElement("span");
    spanErrorDueDate.classList.add("error-msg", "error-msg-dueDate-todo");
    const spanErrorDescription = document.createElement("span");
    spanErrorDescription.classList.add("error-msg", "error-msg-description-todo");

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
    btnFormTodo.classList.add("btn-form", "btn-form-todo");

    inputDescription.setAttribute("required", "");
    inputTitle.setAttribute("required", "");
    inputDueDate.setAttribute("required", "");

    titleForm.textContent = "Form Add Todo";
    btnFormTodo.textContent = "Add"
    selectPriority.append(optionHigh, optionMedium, optionLow);
    formElement.append(titleForm, closeBtn, labelTitle, inputTitle, spanErrorTitle, labelDescription, inputDescription, spanErrorDescription, labelDueDate, inputDueDate, spanErrorDueDate, labelPriority, selectPriority, btnFormTodo);
    formElement.addEventListener("submit", handleFormTodo);
    
    titleFormGlobal = titleForm;
    inputTitleGlobal = inputTitle;
    inputDescriptionGlobal = inputDescription;
    inputDueDateGlobal = inputDueDate;
    selectPriorityGlobal = selectPriority;
    btnFormGlobal = btnFormTodo;
    spanErrorTitleGlobal = spanErrorTitle;
    spanErrorDueDateGlobal = spanErrorDueDate;
    spanErrorDescriptionGlobal = spanErrorDescription;
    spanErrorGlobal = formElement.querySelectorAll(".error-msg");
    inputsTodoGlobal = formElement.querySelectorAll("input");
    return formElement;
}

const handleFormTodo = (e) => {
    e.preventDefault();
    spanErrorGlobal.forEach(span => span.textContent = "")
   
    // Validation form todo
    if (!inputTitleGlobal.value) {
        spanErrorTitleGlobal.textContent = "Title is required!";
    }
    if (!inputDescriptionGlobal.value) {
        spanErrorDescriptionGlobal.textContent = "Description is required!";
    }
    if (!inputDueDateGlobal.value) {
        spanErrorDueDateGlobal.textContent = "DueDate is required!";
    } 
    if (!inputTitleGlobal.value || !inputDescriptionGlobal.value || !inputDueDateGlobal.value) {
        return false;
    }

    if (isEditingTodo) {
        todoCurrentEdit.setTitle(inputTitleGlobal.value);
        todoCurrentEdit.setDescription(inputDescriptionGlobal.value);
        todoCurrentEdit.setDueDate(inputDueDateGlobal.value);
        todoCurrentEdit.setPriority(selectPriorityGlobal.value);
        isEditingTodo = false;
        todoCurrentEdit = null;
        saveData();

    } else {

        const addTodo = addTodoToProject(getCurrentProject().getName(), inputTitleGlobal.value, inputDescriptionGlobal.value, inputDueDateGlobal.value, selectPriorityGlobal.value)
        if (!addTodo) {
            return false;
        }
    }
    closeFormTodo();
    renderTodos(getCurrentProject())
    return true;

}

const closeFormTodo = () => {    
    spanErrorGlobal.forEach(span => span.textContent = "");
    titleFormGlobal.textContent = "Form Add Todo";
    btnFormGlobal.textContent = "Add";
    inputsTodoGlobal.forEach(input => input.value = "");

    formElementGlobal.classList.add("hide");
    modalForm.classList.add("hide");
    selectPriorityGlobal.value = "high";
    isEditingTodo = false;
    todoCurrentEdit = null;
}


const renderTodos = (project) => {

    const todosDisplay = document.querySelector("#todos-display");
    todosDisplay.textContent = ``;
    if (project) {
        let projectTodos = project.getTodos();

        // Arrange Todos 
        projectTodos.sort((a, b) => {
            const dateA = parseISO(a.getDueDate());
            const dateB = parseISO(b.getDueDate());
            return dateA.getTime() - dateB.getTime();
        });

        projectTodos.forEach(todo => {
            const divTodo = createTodoElement(todo);
            todosDisplay.append(divTodo);
        });
    }
}

const createTodoElement = (todo) => {
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

    const rawDueDate = todo.getDueDate();
    const dateObject = new Date(rawDueDate + 'T00:00:00');
    dueDateTodo.textContent = `Due date: ${format(dateObject, 'PPP')}`;

    if (isPast(dateObject) && !isToday(dateObject)) {
        divTodo.classList.add('overdue'); // Thêm class CSS để đổi màu đỏ
        dueDateTodo.textContent += ' (Overdue)';
    } else if (isToday(dateObject)) {
        divTodo.classList.add('due-today'); // Màu vàng
        dueDateTodo.textContent += ' (Today)';
    } else if (isTomorrow(dateObject)) {
        divTodo.classList.add('due-tomorrow'); // Màu xanh nhạt
        dueDateTodo.textContent += ' (Tomorrow)';
    } else {
        const daysRemaining = differenceInDays(dateObject, new Date());
        if (daysRemaining > 0) {
            dueDateTodo.textContent += ` (in ${daysRemaining} days)`;
        }
    }

    titleTodo.textContent = `${todo.getTitle()}`;
    descriptionTodo.textContent = `Description: ${todo.getDescription()}`;
    // dueDateTodo.textContent = `Due date: ${todo.getDueDate()}`;
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

        formElementGlobal.classList.remove("hide");
        modalForm.classList.remove("hide");

    });
    
    divTodo.append(titleTodo, descriptionTodo, dueDateTodo, priorityTodo, labelTodo, checkTodo, btnContainer);
    return divTodo;
}

const fillTodoForm = (todo) => {

    titleFormGlobal.textContent = "Form Edit Todo";
    btnFormGlobal.textContent = "Submit"

    if (todo) {
        inputTitleGlobal.value = todo.getTitle();
        inputDescriptionGlobal.value = todo.getDescription();
        inputDueDateGlobal.value = todo.getDueDate();
        selectPriorityGlobal.value = todo.getPriority();
    }
}

export {renderTodos, createTodoElement, formTodo, closeFormTodo, getIsFormTodoOpening, setIsFormTodoOpening};