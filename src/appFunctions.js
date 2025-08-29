import {domRefElements} from "./domElement";
import {Project} from "./project";
import {Todo} from "./todo";
import {applicationProjects} from "./main";

export function createNewProject(){

    let name = requestProjectName();

    if(checkForValidInput(name))
    {
        let project = new Project(name);

        addToProjectArr(project);

        return project
    }
    else{
        return null;
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

function addToProjectArr(project){

    applicationProjects.push(project);

}

export function renderProjectUI(project){
    const container = domRefElements.projectContainer;

    let projElement = document.createElement('div');

    projElement.setAttribute('data-id',project.id);

    projElement.innerText = project.name;

    container.append(projElement);
}


