import {descriptionElement, dueDateElement, priorityElement, projectContainer, titleElement, projectHeaderTodoCount,projectHeaderName, todoCardContainer} from "./domElement";
import {Project} from "./project";
import {Todo} from "./todo";
import {applicationProjectsArr} from "./main";

export function createNewProject(){

    let name = requestProjectName();

    if(checkForValidInput(name))
    {
        let project = new Project(name);
        return project;
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

export function addTodoCard(project){

}

export function displayProjectTodoCards(project){
    if(project.arrTodos.length > 0){
        todoCardContainer.innerText = "";

        project.arrTodos.forEach(todo => {
            addTodoCard(todo);
            console.log("hello")
        })

    } else{
       todoCardContainer.innerText = "No todos in this project yet."
    }

}
export function updateHeaderUI(activeProject){
    updateHeaderWithProjectInfo(activeProject);
    displayProjectTodoCards(activeProject);
}