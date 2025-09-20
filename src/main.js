import {
    addProjectBtn,
    deleteProjetBtn,
    renameBtn,
    projectContainer,
    filterSearch,
    todoBtn,
    cancelBtn,
    saveBtn,
    titleElement,
    descriptionElement,
    dueDateElement,
    priorityElement,
    deleteTodoBtn
} from "./domElement.js";
import './style.css'
import {
    createNewProject,
    renderProjectUI,
    addToProjectArr,
    saveToLocalStroage,
    getIDOfActiveProject,
    removeActiveClassFromProjects,
    findProject,
    promptToRenameProject,
    displayProjectsInUI,
    displayFilteredProjectsInUI,
    toggleOverlay,
    getProjectArrFromLocalStorage,
    clearTodoFormInputFields,
    updateHeaderUI,
    deleteTodoElement
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
    updateHeaderUI(project);
});

projectContainer.addEventListener('click', (e)=>{
    removeActiveClassFromProjects();

    if( e.target.classList.contains("selectableProject")) {

         e.target.classList.add('active');
         let selectedElement = document.querySelector('.active');
         console.log(selectedElement);
        let id = selectedElement.dataset.id;
        console.log(id);
        let project = findProject(id);
        console.log(project);
        updateHeaderUI(project);
    }

})


renameBtn.addEventListener('click',()=>{
    let projectID = getIDOfActiveProject();
    let newName  = promptToRenameProject(findProject(projectID));

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

        if(titleElement.value.length > 0 && dueDateElement.value.length > 0 && priorityElement.value.length > 0 ){
            let title = titleElement.value;
            let description = descriptionElement.value;
            let dueDate = dueDateElement.value;
            let  priority = priorityElement.value;
            let ActiveProjectID = document.querySelector('.active').dataset.id;


            let project = applicationProjectsArr.find(project=>project.id === ActiveProjectID);
                project.addTodoItem(title, description,dueDate,priority);
            saveToLocalStroage();
            clearTodoFormInputFields();
            console.log(project)
            updateHeaderUI(project);
            displayProjectsInUI();
        }
        else{
            alert("The following fields MUST be filled out \n -Title\n -Due Date\n -Priority");
        }
});


deleteTodoBtn.addEventListener('click',(e)=>{
    let todoID = e.target.parentElement.dataset.id;
    deleteTodoElement(todoID);
})


displayProjectsInUI();



