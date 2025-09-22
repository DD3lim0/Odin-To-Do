import {descriptionElement, dueDateElement, priorityElement, projectContainer, titleElement, projectHeaderTodoCount,projectHeaderName, todoCardContainer} from "./domElement";
import {Project} from "./project";
import {Todo} from "./todo";
import {applicationProjectsArr} from "./main";

export function createNewProject(){

    let name = requestProjectName();

    if(checkForValidInput(name))
    {
        return new Project(name);

    }
}

function requestProjectName(){
    return prompt("Enter New Project Name");
}

function checkForValidInput(inputValue){

    if(inputValue !== null){
        return inputValue;
    }
    else{
       return alert("Invalid Input, Please Try Again...")
    }
}

export function addToProjectArr(project){

    applicationProjectsArr.push(project);

}

export function renderProjectUI(project){
    const container = projectContainer;

    let projElement = document.createElement('div');

    projElement.classList.add("selectableProject");
    removeActiveClassFromProjects();
    projElement.classList.add("active");


    projElement.setAttribute('data-id',project.id);

    container.append(projElement);

    let startContainer = document.createElement("div");
    startContainer.classList.add("start");


    projElement.append(startContainer);

    let coloredIcon = document.createElement("div");
    coloredIcon.classList.add("colorIcon");

    startContainer.append(coloredIcon);

    let projectNameElement = document.createElement("h4");
    projectNameElement.classList.add("projectName");

    projectNameElement.innerText = project.name;

    startContainer.append(projectNameElement);


    let endContainer = document.createElement("div");
    endContainer.classList.add("end");

    projElement.append(endContainer);


    let numOfTodos = document.createElement("div");
    numOfTodos.innerText = String(project.arrTodos.length);

    endContainer.append(numOfTodos);
}

export function saveToLocalStroage(){

    let data = JSON.stringify(applicationProjectsArr);
    localStorage.setItem("projects",data);
}


export function getIDOfActiveProject(){
    let activeProjectElement = document.querySelector('.active');

    if(activeProjectElement){
        return activeProjectElement.dataset.id;
    }else{
        alert("Make Sure A Project Is Selected");
    }
}

export function  removeActiveClassFromProjects(){
    document.querySelectorAll('.active').forEach(element =>{
        element.classList.remove('active');
    })
}


export function findProject (id){
    return applicationProjectsArr.find(el=> el.id === id);

}

export function promptToRenameProject (project) {
   return prompt("Enter the New Project name", project.name)
}

export function displayProjectsInUI(){
    let ProjArr = JSON.parse(localStorage.getItem("projects"))|| applicationProjectsArr;

    projectContainer.innerHTML = "";

    ProjArr.forEach(project => renderProjectUI(project))
}

export function displayFilteredProjectsInUI(filteredArray){
    let filtered = filteredArray;

    projectContainer.innerHTML = "";

    filtered.forEach(project => renderProjectUI(project))
}


export function toggleOverlay(){
    document.querySelector('.overlay').classList.toggle('open');
}

export function getProjectArrFromLocalStorage(){

    if(localStorage.getItem("projects")){
        let arr = JSON.parse(localStorage.getItem("projects"));

        return  arr.map(object => {
            let project = new Project(object.name);
            project.id = object.id;
            project.arrTodos = object.arrTodos;
            return project
        });
    }
}


export function clearTodoFormInputFields(){
titleElement.value = "";
descriptionElement.value ="";
dueDateElement.value ="";
priorityElement.value ="";
}

function updateHeaderWithProjectInfo(activeProject){
    if(activeProject.id === getIDOfActiveProject()){
        projectHeaderName.innerHTML = activeProject.name;
        projectHeaderTodoCount.innerText = activeProject.arrTodos.length;
    }
}

export function addTodoCard(todo){
    let todoCard = document.createElement('div');
    todoCard.classList.add('TodoCard');

    let checkbox = document.createElement('input');
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", "completed");
    checkbox.setAttribute("name", "completed");
    // append to todoCard
    todoCard.append(checkbox)

    let detailContainer = document.createElement('div');
    detailContainer.classList.add('todoDetailContainer')
//     append to todoCard
    todoCard.append(detailContainer);

    let projectName = document.createElement('h5');
    projectName.classList.add("todoName");
    projectName.innerText = `${todo.title}`;
//     append to detailContainer
    detailContainer.append(projectName);


    let additionalContainer = document.createElement('div');
    additionalContainer.classList.add('additionalDetailContainer');
//     append to detailContainer
    detailContainer.append(additionalContainer);


    let piorityUI =document.createElement('div');
    piorityUI.classList.add('priorityUI');
    piorityUI.innerText = `Priority: ${todo.priority.toLowerCase()}`;
    // append to additonalContainer
    additionalContainer.append(piorityUI);

    let dueUI = document.createElement('div');
    dueUI.classList.add('dueUI');
    dueUI.innerText = `Due: ${todo.dueDate}`;
    // append to additonalContainer
    additionalContainer.append(dueUI);

    let noteUI = document.createElement('div');
    noteUI.classList.add('noteUI');
    noteUI.innerText = `${todo.description}`;
    // append to additonalContainer
    additionalContainer.append(noteUI);


    let actionContainer = document.createElement('div');
    actionContainer.dataset.id = todo.id;
    actionContainer.classList.add("todoActions");


    //append to todoCard
    todoCard.append(actionContainer)

    let btnContainer1 = document.createElement('button');
    btnContainer1.classList.add('edit');
    //append to actionContainer
    actionContainer.append(btnContainer1);

    let editIcon = document.createElement('i');
    editIcon.classList.add('fa-solid');
    editIcon.classList.add('fa-pen-to-square');
    //append to btnContainer1
    btnContainer1.append(editIcon);

    let btnContainer2 = document.createElement('button');
    btnContainer2.classList.add('remove');
    //append to actionContainer
    actionContainer.append(btnContainer2);


    let removeIcon = document.createElement('i');
    removeIcon.classList.add('fa-solid');
    removeIcon.classList.add('fa-trash');
    //append to btnContainer2
    btnContainer2.append(removeIcon);


    todoCardContainer.append(todoCard);

}

export function displayProjectTodoCards(project){
    if(project.arrTodos.length > 0){
        todoCardContainer.innerText = "";

        project.arrTodos.forEach(todo => {
            addTodoCard(todo);
        })

    } else{
       todoCardContainer.innerText = "No todos in this project yet."
    }

}
export function updateHeaderUI(activeProject){
    updateHeaderWithProjectInfo(activeProject);
    displayProjectTodoCards(activeProject);
}

export function deleteTodoElement(todoID){

    let projectID = document.querySelector('.active').dataset.id;
    let projObject = applicationProjectsArr.find(project=> project.id === projectID);

     projObject.arrTodos = projObject.arrTodos.filter(todo=> todo.id !== todoID);

    saveToLocalStroage();
    updateHeaderUI(projObject);
    displayProjectsInUI(projObject);

}


