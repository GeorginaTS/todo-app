<template>
  <div class="w-full">
    <div class="flex justify-center w-full">
      <AddTodoForm v-if="addForm" @todosUpdated="todosListUpdate"/>
      <button @click="showAddForm()" v-if="!addForm && !updateForm" class="h-fit">Add New Task </button>
      <UpdateTodoForm v-if="updateForm" :todoId="updateForm" @todosUpdated="todosListUpdate"/> 
    </div>
    
    <div>
      <ul v-if="statusStore" class="flex justify-between gap-4 m-2">
        <li v-for="item in statusStore.status" :value="item._id" class="w-full rounded-lg p-2"
          :style="{ backgroundColor: item.color }">
          <h3>{{ item.name }}</h3>
          <div>
            <ul class="flex flex-col gap-2 p-4">
              <li v-for="todo in todos.filter(element => element.status_id == item._id)" :key="todo._id"
                class="border border-gray-800 rounded p-2 flex flex-col gap-2 bg-white bg-opacity-50">
                <RouterLink :to="'/auth/' + todo._id">
                  <CardTodo :todo="todo" />
                </RouterLink>
                <div class="bg-stone-200 flex justify-between gap-2 p-2 rounded"> 
                  <button @click="updateTodo(todo._id)">✍️</button>
                  <button @click="deleteTodo(todo._id)">🗑️ </button>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <ul class="flex flex-wrap gap-2" v-if="todos">

    </ul>
  </div>

</template>
<script>

import UpdateTodoForm from "../components/Update1TodoForm.vue";
import AddTodoForm from "../components/AddTodoForm.vue";
import CardTodo from "../components/CardTodo.vue";
import { useStatusStore } from "../stores/status"
export default {
  name: "Home",
  components: { CardTodo, AddTodoForm, UpdateTodoForm },
  data() {
    return {
      todos: [],
      updateForm: 0,
      addForm:0
    }
  },
  setup() {
    const statusStore = useStatusStore()
    return { statusStore }
  },
  async created() {
    try {
      const response = await fetch("http://localhost:3400/api/todos")
      const data = await response.json()
      this.todos = data.data
    }
    catch (error) {
      console.log(error)
    }
  },
  methods: {
    todosListUpdate() {
      this.updateForm = 0
      this.addForm = 0
      this.fetchTodos()
    },
    async fetchTodos() {
      try {
        const response = await fetch("http://localhost:3400/api/todos")
        const data = await response.json()
        this.todos = data.data
      }
      catch (error) {
        console.log(error)
      }
    },
    async deleteTodo(id) {
      try {
        const result = confirm("Are you sure to delete Todo?")
        if (result) {
          const response = await fetch(`http://localhost:3400/api/todos/${id}`, {
            method: "DELETE"
          });
          this.fetchTodos()
        }
      } catch {
        console.error('Failed DeleteToDo');
      }
    },
    updateTodo(id) {
      this.addForm = 0
      this.updateForm = id
    },
    showAddForm() {
      this.updateForm = 0
      if (this.addForm) {
        this.addForm=0
      } else {
        this.addForm=1
      } 
    }
  }
}
</script>
<style></style>