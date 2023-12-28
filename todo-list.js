const createCursor = (x  , y) =>{
    const cursor = document.createElement('div')
    cursor.className = 'cursor'
    cursor.style.left = `${x}px`
    cursor.style.top = `${y}px`
    return cursor
}
const removeCursorFromDom = cursor =>{
    const timeout = setTimeout(()=> {
        cursor.remove()
        clearTimeout(timeout)

    },1000)

}
window.addEventListener('click', event =>{
    const cursor = createCursor(event.pageX, event.pageY)
    document.body.append(cursor)
    removeCursorFromDom(cursor)
})

let todos
  const savedTodos = JSON.parse(localStorage.getItem('todos'))

  if (Array.isArray(savedTodos)) {
      todos = savedTodos
 
  }
  else {
      todos = [{}]
  }
  showTodo()

  function createTodo(title, dueDate) {
      const id = new Date().getTime();
      todos.push({
          title: title,
          dueDate: dueDate,
          id: '' + id
      })
      saveTodo()
  }
  function removeTodo(idToDelete) {
      todos = todos.filter(todo => todo.id !== idToDelete)
      showTodo()
      saveTodo()
  }

  function saveTodo() {
      localStorage.setItem('todos', JSON.stringify(todos))
  }

  function ClearTodo() {
      const response = confirm("Are you sure you want to do that?")
      if(response === true) {
          todos = todos.filter(todo => false)
          showTodo()
          saveTodo()
      } else {
          return
      }
  }

  //View Section
  function showTodo() {
      document.getElementById('todo-list').innerHTML = ''
      todos.forEach(function (todo) {
          let element = document.createElement('div')
          element.classList.add("div")
          element.style["padding-left"] = "7px"
          element.innerText =  todo.title + ' ' + todo.dueDate
          const deleteButton = document.createElement('button')
          deleteButton.innerText = 'Delete'
          deleteButton.classList.add("delete")
          deleteButton.onclick = deleteTodo
          deleteButton.id = todo.id
          element.appendChild(deleteButton)
          const todoList = document.getElementById("todo-list")
          todoList.appendChild(element)

      })
  }

  // Controller Section
  function AddTodo() {
      let textbox = document.getElementById("todo-title")
      let title = textbox.value
      let datePicker = document.getElementById("date")
      let dueDate = datePicker.value
      if (title.trim() === "") {
          alert("You must enter a valid task name.")
          return
      }
      if (dueDate === "") {
          alert("You must enter a valid date.")
          return
      }
      if (title.length > 130) {
        alert("You must enter a string less than 131 characters.")
          return

      }
      textbox.value = ""
      datePicker.value = ""
      createTodo(title, dueDate)
      showTodo()
  }
  function deleteTodo(event) {
      const deleteButton = event.target
      const idToDelete = deleteButton.id
      removeTodo(idToDelete)

  }
