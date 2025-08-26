class Todo{

    constructor(title, description, dueDate ,priority) {
        this.#id = crypto.randomUUID();
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = priority;
    }
    getID(){
        return this.#id;
    }
    getTitle(){
        return this.#title;
    }

    setTitle(string){
        this.#title = string;
    }

    getDescription(){
        return this.#description;
    }

    setDescription(string){
        this.#description = string;
    }

    getDueDate(){
        return this.#dueDate;
    }

    setDueDate(string){
        this.#dueDate = string;
    }

    getPriority(){
        return this.#priority;
    }


    setPriority(string){
        this.#priority = string;
    }

}


export {Todo}