// Seleção de elementos
// ações todo
const contextForm = document.querySelector("#context-form");
const contextInput = document.querySelector("#context-input");
const listTodo = document.querySelector("#list-todo");
const formEdit = document.querySelector("#form-edit");
const inputEdit = document.querySelector("#input-edit");
const editCancel = document.querySelector("#edit-cancel");

let oldInputValue;
// Funções
const toggleForms =() =>{
    formEdit.classList.toggle("hide")
    contextForm.classList.toggle("hide")
    listTodo.classList.toggle("hide")
}
const saveTodo = (text) =>{
    // Variavel geral
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    // inserindo texto
    todoTitle.innerText = text;
    // Inserindo h3
    todo.appendChild(todoTitle);

    // button create 
    const doneBtn = document.createElement("button")
    // class para finalizar tarefa
    doneBtn.classList.add("finish-todo")
    // colocar o iconer dentrou  do doneBtn
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    // agora precisamos colocar ele no todo 
    todo.appendChild(doneBtn)

    // edição create
    const editBtn = document.createElement("button")
    // class para editar tarefa
    editBtn.classList.add("edit-todo")
    // colocar o iconer dentrou  do editBtn
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    // agora precisamos colocar ele no todo 
    todo.appendChild(editBtn)

    // delete create
    const deleceBtn = document.createElement("button")
    // class para deletar tarefa
    deleceBtn.classList.add("delete-todo")
    // colocar o iconer dentrou  do deleceBtn
    deleceBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    // agora precisamos colocar ele no todo 
    todo.appendChild(deleceBtn)

// colocar na lista geral
    listTodo.appendChild(todo)

    // input em branco depois do usuario digitar
    contextInput.value = "";
    contextInput.focus();


}

const updateTodo = (text) =>{
    const todos = document.querySelectorAll(".todo")
    todos.forEach((todo) =>{

        let contextTitle = todo.querySelector("h3")
        
        if(contextTitle.innerText === oldInputValue){
            contextTitle.innerText = text
        }
    })
}

// Eventos
// Create new task
contextForm.addEventListener("submit", (createTask) => {
    createTask.preventDefault();
    // Criar nova tarefa / create new task;
    const inputValue = contextInput.value
    // Validação
    if(inputValue){
        // save todo
        saveTodo(inputValue) 
    }
  });

//   Button
document.addEventListener("click" , (eventoClick) =>{

    const targetEl = eventoClick.target;
    // selecionar div mais proxima 
    const parentEl = targetEl.closest("div");
    let contextTitle;


if(parentEl && parentEl.querySelector("h3")){
    contextTitle = parentEl.querySelector("h3").innerText;
}
    // Tarefa Feita
    if(targetEl.classList.contains("finish-todo")){
        parentEl.classList.toggle("done")
    }

    // Remover tarefa /remove tasks
    if(targetEl.classList.contains("delete-todo")){
        parentEl.remove();
    }

    // edit tasks / editar tarefas
   
    if(targetEl.classList.contains("edit-todo")){
    // Mostrar editação
    toggleForms()

    inputEdit.value = contextTitle;
    oldInputValue = contextTitle;
    }
});

// cancel
editCancel.addEventListener("click" , (cancelar) =>{
    cancelar.preventDefault();
    
    toggleForms();
})

formEdit.addEventListener("submit", (completo) =>{
    completo.preventDefault();
    // trocar valor dos inputs
    const editInputValue = inputEdit.value

    if(editInputValue){
    updateTodo(editInputValue)
    }

    toggleForms()
})