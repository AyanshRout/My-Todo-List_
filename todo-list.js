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
          element.style["border"] = "solid"
          element.style["margin-top"] = "10px"
          element.style["height"] = "50px"
          element.style["width"] = "380.25px"
          element.style["border-color"] = "blue"
          element.style["border-width"] = "1px"
          element.style["box-shadow"] = "5px 5px 3px rgb(0, 0, 0, 0.5)"
          element.style["font-size"] = "12px"
          element.style["font-weight"] = "500"
          element.style["padding-left"] = "7px"
          element.innerText =  todo.title + ' ' + todo.dueDate
          const deleteButton = document.createElement('button')
          deleteButton.innerText = 'Delete'
          deleteButton.style["margin-left"] = "10px"
          deleteButton.style["margin-top"] = "4px"
          deleteButton.style["background-color"] = "rgb(29, 155, 240)"
          deleteButton.style["border"] = "none"
          deleteButton.style["border-radius"] = "3px"
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

