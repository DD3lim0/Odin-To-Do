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
    deleteTodoBtn,
    todoCardContainer, sortByFilter,

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
    deleteTodoElement, addTodoCard
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
        let id = selectedElement.dataset.id;
        let project = applicationProjectsArr.find(proj => proj.id === id);
        updateHeaderUI(project);
    }

})


renameBtn.addEventListener('click',()=>{
    let projectID = getIDOfActiveProject();
    console.log(projectID);
    let newName  = promptToRenameProject(findProject(projectID));

    applicationProjectsArr.find(el => el.id === projectID).name = newName;

    saveToLocalStroage();
    displayProjectsInUI();
    updateHeaderUI();

});


deleteProjetBtn.addEventListener('click', ()=>{

    if(document.querySelector('.active') &&  applicationProjectsArr.length > 1){


        let id = document.querySelector('.active').dataset.id

        if(applicationProjectsArr.find(project => project.id === id).arrTodos.length > 1 && confirm(`Delete project "${applicationProjectsArr.find(project => project.id === id).name}" and all its todos?`)){
            applicationProjectsArr = applicationProjectsArr.filter(el =>el.id !== id);
            saveToLocalStroage();
            displayProjectsInUI();
            id = document.querySelector('.active').dataset.id;
            let project = applicationProjectsArr.find(project => project.id === id)
            updateHeaderUI(project);

        }else{
            applicationProjectsArr = applicationProjectsArr.filter(el =>el.id !== id);
            saveToLocalStroage();
            displayProjectsInUI();
            id = document.querySelector('.active').dataset.id;
            let project = applicationProjectsArr.find(project => project.id === id)
            updateHeaderUI(project);
        }
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
            updateHeaderUI(project);
            displayProjectsInUI();
            toggleOverlay();
        }
        else{
            alert("The following fields MUST be filled out \n -Title\n -Due Date\n -Priority");
        }
});

todoCardContainer.addEventListener('click', (e)=>{
    let id;

    if(e.target.classList.contains('remove')){
        id = e.target.parentElement.dataset.id;
    }

    if(e.target.parentElement.classList.contains('remove')){
        id = e.target.parentElement.parentElement.dataset.id;
    }

    deleteTodoElement(id);

})

function loadApp(){
let id = document.querySelector('.active').dataset.id;
let project = applicationProjectsArr.find(project => project.id === id);
    updateHeaderUI(project);
}


// sortByFilter.addEventListener('change', ()=>{
//     let id = document.querySelector('.active').dataset.id;
//     let project = applicationProjectsArr.find(project => project.id === id);
//     let userInput = sortByFilter.value;
//     let sortedTodos;
//
//     switch (userInput){
//
//         case "Due Date (Ascending)":
//            sortedTodos = project.arrTodos.sort((a,b) => {a.title - b.title})
//             break;
//         case "Due Date (Descending)":
//             sortedTodos = project.arrTodos.sort((a,b)=>{b.title - a.title})
//             break;
//
//         case "Priority":
//             sortedTodos = project.arrTodos.sort((a,b)=>{a.priority - b.priority})
//             break;
//     }

// if(sortedTodos.length > 0){
//     todoCardContainer.innerText = "";
//
//     sortedTodos.forEach(todo => {
//         addTodoCard(todo);
//     })
//
// } else{
//     todoCardContainer.innerText = "No todos in this project yet."
// }
// updateHeaderUI(project);
// console.log(sortedTodos);
// });


displayProjectsInUI();
loadApp();




