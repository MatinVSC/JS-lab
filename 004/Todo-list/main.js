let $ = document ;
let input = $.querySelector('input') ;
let todoForm = $.querySelector('.add') ;
let todoUl = $.querySelector('.todos') ;

function addNewTodo(todoValue) {

    let newTodoli = $.createElement('li')
    newTodoli.className = "list-group-item d-flex justify-content-between align-items-center"

    let newTodoSpan = $.createElement('span')
    newTodoSpan.innerHTML = todoValue
    
    let newTodoTrash = $.createElement('i')
    newTodoTrash.className = "fa fa-trash-o delete"

    newTodoli.append(newTodoSpan, newTodoTrash)
    todoUl.append(newTodoli)

    newTodoTrash.addEventListener('click', function (event){

        event.target.parentElement.remove()
    })
}

todoForm.addEventListener('submit', function (event){

    event.preventDefault()
})


input.addEventListener('keydown', function (event){

    let todoValue = event.target.value.trim()

    if (event.keyCode == '13'){
        if (todoValue) {
            input.value = ''
            addNewTodo(todoValue)
        }
    }
    
})