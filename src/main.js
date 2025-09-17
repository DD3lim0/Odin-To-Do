import {
    addProjectBtn,
    deleteProjetBtn,
    renameBtn,
    projectContainer,
    filterSearch,
    todoBtn,
    cancelBtn, saveBtn
} from "./domElement.js";
import './style.css'
import {
    createNewProject,
    renderProjectUI,
    addToProjectArr,
    saveToLocalStroage,
    getIDOfActiveProject,
    removeActiveClassFromProjects,
    findProjectToRename,
    promptToRenameProject,
    displayProjectsInUI,
    displayFilteredProjectsInUI,
    toggleOverlay,
    getProjectArrFromLocalStorage,
    clearTodoFormInputFields
} from "./appFunctions";
import {Project} from "./project";


export let applicationProjectsArr = getProjectArrFromLocalStorage() || [ new Project("Default")] ;


addProjectBtn.addEventListener('click',() => {
    let project = createNewProject();

    if(project){
        addToProjectArr(project);
        saveToLocalStroage();
    }

    displayProjectsInUI();
});

projectContainer.addEventListener('click', (e)=>{
    removeActiveClassFromProjects();
console.log(e.target);
    if( e.target.classList.contains("selectableProject"))
        e.target.classList.add('active');

})


renameBtn.addEventListener('click',()=>{
    let projectID = getIDOfActiveProject();
    let newName  = promptToRenameProject(findProjectToRename(projectID));

    applicationProjectsArr.find(el => el.id = projectID).name = newName;

    saveToLocalStroage();

    displayProjectsInUI();

});


deleteProjetBtn.addEventListener('click', ()=>{

    if(document.querySelector('.active') &&  applicationProjectsArr.length > 1){
        let id = document.querySelector('.active').dataset.id
        applicationProjectsArr = applicationProjectsArr.filter(el =>el.id !== id);
        saveToLocalStroage();
        displayProjectsInUI();
    }
    else{

       return alert("At Least One Project Must Be Present");
    }

})


filterSearch.addEventListener('input', ()=>{
    let filteredArr = applicationProjectsArr.filter(project => project.name.toLowerCase().includes(filterSearch.value.toLowerCase()))
    displayFilteredProjectsInUI(filteredArr);

})


todoBtn.addEventListener('click', ()=>{
    if(document.querySelector('.active')){
        toggleOverlay();
    }
})

cancelBtn.addEventListener('click',toggleOverlay);

saveBtn.addEventListener('click', ()=>{
        let titleElement = document.querySelector('#title');
        let descriptionElement = document.querySelector('#description');
        let dueDateElement = document.querySelector('#dueDate');
        let priorityElement = document.querySelector('#priority');

        if(titleElement.value.length > 0 && dueDateElement.value.length > 0 && priorityElement.value.length > 0 ){
            let title = titleElement.value;
            let description = descriptionElement.value;
            let dueDate = dueDateElement.value;
            let  priority = priorityElement.value;
            let ActiveProjectID = document.querySelector('.active').dataset.id;


            applicationProjectsArr.find(project=>project.id === ActiveProjectID).addTodoItem(title, description,dueDate,priority);
            saveToLocalStroage();
            clearTodoFormInputFields();
        }
        else{
            alert("The following fields MUST be filled out \n -Title\n -Due Date\n -Priority");
        }
});


displayProjectsInUI();



