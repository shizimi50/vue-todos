// https://jp.vuejs.org/v2/examples/todomvc.html
// ローカルストレージ API の使用
const STORAGE_KEY = 'todos-vuejs-demo' // localStorageのキー
const todoStorage = {
  fetch: function () {
    const todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

const app = new Vue({
  el: '#app',
  data: function () {
    return {
      todos: [],
      newTask: '',
      type: 'add',
      id: '',
      isCompleted: false,
      editedTask: null
    }
  },
  watch: {
    todos: {
      handler: function (todos) {
        todoStorage.save(todos)
      },
      deep: true
    }
  },
  created () {
    this.todos = todoStorage.fetch()
  },
  methods: {
    editTodo: function () {
      const id = this.id
      this.todos[id].task = this.newTask
      todoStorage.save()
      this.newTask = ''
    },
    selectEditTodo: function (todo) {
      this.type = 'edit'
      this.id = todo.id
      this.newTask = todo.task
    },
    deleteTodo: function (todo) {
      const index = this.todos.indexOf(todo)
      this.todos.splice(index, 1)
      localStorage.removeItem(todo)
      console.log('deleteTodos!!')
    },
    submitTodo: function () {
      if (this.newTask === '') return
      this.todos.push(
        {
          task: this.newTask,
          editedTask: null
        }
      )
      todoStorage.save()
      this.newTask = ''
    }
  }
})
app.$mount('#app')
