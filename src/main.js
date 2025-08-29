import{domRefElements} from "./domElement.js";
import{createNewProject,renderProjectUI} from "./appFunctions";


export let applicationProjects=[]
domRefElements.createProjectBtn.addEventListener('click',() => {
    let project = createNewProject();

    if(project){
        renderProjectUI(project);
    }

});

