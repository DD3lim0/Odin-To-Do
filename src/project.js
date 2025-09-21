import {Todo} from "./todo";

class Project{

    constructor(name) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.arrTodos = [];
    }

    getProjectName(){
        return this.name;
    }

    setProjectName(string){
        this.name = string;
    }

    addTodoItem(title, description, dueDate ,priority){

        let todo = new Todo(title, description, dueDate ,priority);

        this.arrTodos.push(todo);
    }

    deleteTodoItem(id){
        this.arrTodos = this.arrTodos.filter((todo.id !== id));
    }

    editTodoItem(id){
       let index =  this.arrTodos.findIndex(todo => todo.id === id);
       let element = this.arrTodos[index];

    }

    getTodoArr(){
        return this.arrTodos;
    }

}


export {Project}