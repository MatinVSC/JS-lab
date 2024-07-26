

class Todo {
    constructor (title) {
        this.title = title
        this.isComplete = false
    }
};

class TodoList {
    constructor (todoContainer) {
        this.todoContainer = todoContainer
        this.todos = JSON.parse(localStorage.getItem('todo')) || []
        this.todoInput = document.querySelector('input')
        this.addBtn = document.querySelector('#addButton')
        this.clearBtn = document.querySelector('#clearButton')

        this.render();
    };

    render () {
        this.todoContainer.innerHTML = "";
        this.addBtn.addEventListener('click', () => {
            this.addNewTodo(this.todoInput.value);
        });
        this.clearBtn.addEventListener('click', () => {
            this.clearTodos();
        });

        this.addTodoToDom();
        this.saveLocal();
    };

    addTodoToDom () {
        console.log('dom added');
        this.todoContainer.innerHTML = "";

        this.todos.map( (todo, todoIndex) => {
            let li = document.createElement('li');
            li.classList = 'completed well';

            let todoTitle = document.createElement('lable');
            todoTitle.innerHTML = todo.title;
            todo.isComplete ? todoTitle.classList.add('todo-completed') : null

            let completeBtn = document.createElement('button');
            completeBtn.classList = 'btn btn-success';
            completeBtn.innerHTML = 'Complete';
            completeBtn.addEventListener('click', (event) => {
                event.target.previousSibling.classList.toggle('todo-completed')
                todo.isComplete = !todo.isComplete
                this.saveLocal();
                this.addTodoToDom();
            });

            let removeBtn = document.createElement('button');
            removeBtn.classList = 'btn btn-danger';
            removeBtn.innerHTML = 'Remove';
            removeBtn.addEventListener('click', (event) => {
                this.todoContainer.removeChild(li);
                let mainTodoIndex = this.todos.findIndex((todo, index) => index === todoIndex);
                this.todos.splice(mainTodoIndex, 1);
                this.saveLocal();
                this.addTodoToDom();
            });

            li.append(todoTitle, completeBtn, removeBtn);
            this.todoContainer.append(li);
        });
    };

    saveLocal () {
        localStorage.setItem('todo', JSON.stringify(this.todos));
    };

    addNewTodo (newTodoTitle) {
        console.log('add', newTodoTitle);

        if (newTodoTitle.trim()) {
            this.todos.push(new Todo(newTodoTitle));
            this.saveLocal();
            this.addTodoToDom();
            this.todoInput.value = '';
        }
    };

    clearTodos () {
        console.log('delete');

        this.todos = [];
        this.render();
        this.saveLocal();
    };
};


new TodoList(document.querySelector('#todoList'));