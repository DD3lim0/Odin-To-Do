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

    addTodoItem(Todo){
        this.arrTodos.push(Todo);
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