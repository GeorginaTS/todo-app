<template>
  <div>
    <h2 class="text-xl font-bold">Todos List</h2>
    <ul class="flex flex-wrap gap-2" v-if="todos">
      <li v-for="item in todos" :key="item.id" class="border border-gray-800 rounded p-2">
        <RouterLink :to="'/' + item._id">
        <CardTodo :todo="item" />"
        </RouterLink>
        <div class="bg-stone-600 flex justify-between p-2"> <button @click="updateTodo(item._id)">update</button> <button
            @click="deleteTodo(item._id)">delete</button> </div>

      </li>
    </ul> 
  </div>
  <hr class="bg-stone-900 m-4 w-full ">
  <div class="flex justify-center">
    <AddTodoForm v-if="!updateForm"/>
    <UpdateTodoForm v-else :todoId="updateForm" />
  </div>
</template>
<script>
import AddTodoForm from "../components/AddTodoForm.vue";
import UpdateTodoForm from "../components/Update1TodoForm.vue";
import CardTodo from "../components/CardTodo.vue";

export default {
  name: "Home",
  components: { AddTodoForm, CardTodo, UpdateTodoForm },
  data() {
    return {
      todos: [],
      updateForm: 0
    }
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
        const response = await fetch(`http://localhost:3400/api/todos/${id}`, {
          method: "DELETE"
        });
        this.fetchTodos()
      } catch {
        console.error('Failed DeleteToDo');
      }
    },
    async updateTodo(id) {
        this.updateForm = id
    }
  }
}

</script>
<style>
button {
  background-color: white;
  margin: 1px;
  padding: 0.2rem;
}
</style>