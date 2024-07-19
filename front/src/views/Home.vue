<template>
   <div class="w-full">
    <div class="flex justify-center w-full">
      <div class="w-[80%] div_primary text-center p-2 rounded-lg" v-if="!addForm && !updateForm">
        <button @click="showAddForm()"  class="h-fit button_primary">Add New Task </button>
      </div>
      <AddTodoForm v-if="addForm" @todosUpdated="todosListUpdate" />
      <UpdateTodoForm v-if="updateForm" :todoId="updateForm" @todosUpdated="todosListUpdate" />
    </div>

    <div>
      <div v-if="statusStore" class="flex justify-between gap-4 m-2">
        <div v-for="status in statusStore.status" 
        :key="status._id" 
        :id="status._id"
        :value="status._id" class="w-full rounded-lg p-2"
          :style="{ backgroundColor: status.color }" 
          @dragover.prevent
          @drop.prevent="handleDrop"
          >
          <h3>{{ status.name }}</h3>
          <div>
            <ul class="flex flex-col gap-2 p-4">
              <li v-for="todo in todos.filter(element => element.status_id == status._id)" 
                :key="todo._id" 
                :id="todo._id"
                class="border border-gray-800 rounded p-2 flex flex-col gap-2 bg-white bg-opacity-50" draggable="true"
                @dragstart="handleDragStart(todo._id)"
                @dragend="handleDragEnd"
                >
                <RouterLink :to="'/auth/' + todo._id">
                  <CardTodo :todo="todo" />
                </RouterLink>
                <div class="bg-stone-200 flex justify-between gap-2 p-2 rounded" v-if="draggedItem != todo._id">
                  <button @click="showUpdateForm(todo._id)">✍️</button>
                  <button @click="deleteTodo(todo._id)">🗑️ </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
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
      addForm: 0,
      draggedItem: 0,
      dragZone: 0
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
    showUpdateForm(id) {
      this.addForm = 0
      this.updateForm = id
    },
    showAddForm() {
      this.updateForm = 0
      if (this.addForm) {
        this.addForm = 0
      } else {
        this.addForm = 1
      }
    },
    handleDragStart(id) {
      //event.dataTransfer.setData("item_id", event.target.id)
      this.draggedItem = id
    },
    handleDragEnd() {
      this.draggedItem = 0
      this.dragZone = 0
    },
    handleDragOver(event) {   
      this.dragZone = event.target.id
      console.log(`Drag over ${this.dragZone} item ${this.draggedItem}`)
    },
    async handleDrop(event) {
      this.dragZone = event.target.id
     // this.draggedItem = event.dataTransfer.getData("item_id")

      console.log(`DROP task ${this.draggedItem} into ${this.dragZone}`)
      // update status
      try {
        if(this.dragZone) {
          const response = await fetch(`http://localhost:3400/api/todos/${this.draggedItem}`, {
            method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({"status_id": this.dragZone})
          });
          console.log("Response fetch Patch", response)
          this.fetchTodos()
        }
      } catch {
        console.error('Failed Patch Status ToDo');
      }
      // fetch todos
    }
  }
}
</script>
<style></style>