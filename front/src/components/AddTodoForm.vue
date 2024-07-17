<template>
    <div class="bg-stone-200 w-[90%] flex flex-col gap-2 p-4">
        <h2 class="text-xl font-bold">Add a new ToDo</h2>
        <form class="flex flex-col gap-2" @submit="addTodo">
        Title: <input type="text"  v-model="title"> 
        Content: <textarea v-model="content"></textarea> 
        Category: 
        <select v-model="category" class="text-black">
            <option value="0">Select One</option>
            <option v-for="item in categoriesStore.categories" :value="item.id">{{item.name}}</option>
        </select>
        </form>
        <button type="submit" @click="addTodo" class="border border-stone-500 py-2 px-10 bg-white w-fit">Add</button>
    </div>
</template>
<script>
import {useCategoriesStore} from "../stores/categories"
export default {
    name:"AddTodoForm",
    data() {
        return {
            title:"",
            content:"",
            category: 0
        }
    },
    setup() {
    const categoriesStore = useCategoriesStore()
    return { categoriesStore }
  },
    methods: {
        async addTodo() {
            const newTodo = {
                title: this.title,
                content: this.content,
                idcategory: this.category,
                iduser: 1,
                status: 1
            }
            console.log(newTodo)
            try {
                const response = await fetch("http://localhost:3400/api/todos", {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify(newTodo)
                })
                const data = await response.json()
                this.title =""
                this.content =""
                this.category = 0
                console.log(data)
                
            } catch(error) {
                response.send({msg: "Error", error: error.message})
            }

        }
    }
    
}
</script>
<style>
    
</style>