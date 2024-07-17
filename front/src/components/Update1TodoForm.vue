<template>
    <div class="bg-stone-200 w-[90%] flex flex-col gap-2 p-4">
        <h2 class="text-xl font-bold">Update ToDo with id: {{ todoId }}</h2>
        <form class="flex flex-col gap-2" @submit="addTodo" v-if="todo">
            {{ todo }}
            Title: <input type="text" v-model="title">
            Content: <textarea v-model="content"></textarea>
            Category:
            <select v-model="category" class="text-black">
                <option value="0">Select One</option>
                <option v-for="item in categoriesStore.categories" :value="item.id">{{ item.name }}</option>
            </select>
        </form>
        <button type="submit" @click="updateTodo(todo.id)"
            class="border border-stone-500 py-2 px-10 bg-white w-fit">Update</button>
    </div>
</template>
<script>
import { useCategoriesStore } from "../stores/categories"
export default {
    name: "UpdateTodoForm",
    props: ["todoId"],
    data() {
        return {
            todo: { title: "ToDo init", content: "" },
            title: "",
            content: "",
            category: 0
        }
    },
    setup() {
        const categoriesStore = useCategoriesStore()
        return { categoriesStore }
    },
    async mounted() {
        try {
            const response = await fetch(`http://localhost:3400/api/todos/${this.todoId}`);
            const data = await response.json()
            //console.log("todo", todo[0])
            const todo = data.data
            if (todo) {
                this.todo = todo
                this.title = this.todo.title
                this.content = this.todo.content
                this.category = this.todo.idcategory
            } else {
                this.todo = { title: "ToDo dpon't exist", content: "" }
            }

        } catch {
            console.error('Failed');
        }
    },
    watch: {
        async todoId(value) {

            try {
                const response = await fetch(`http://localhost:3400/api/todos/${value}`)
                const data = await response.json()
                const todo = data.data
                if (todo[0]) {
                    this.todo = todo[0]
                    this.title = this.todo.title
                    this.content = this.todo.content
                    this.category = this.todo.idcategory
                } else {
                    this.todo = { title: "ToDo don't exist", content: "" }
                }

            } catch (error) {
                response.send({ msg: "Error", error: error.message })
            }
        },

    },
    methods: {
        async updateTodo() {
            const newTodo = {
                title: this.title,
                content: this.content,
                idcategory: this.category,
                iduser: 1,
                status: 1
            }
            console.log("id", this.todoId, "newTodo:", newTodo)
            try {
                const response = await fetch(`http://localhost:3001/api/todos/${this.todoId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newTodo)
                })
                const todo = await response.json()
                this.title = ""
                this.content = ""
                this.category = 0
                console.log("Todo updated", todo)

            } catch (error) {
                console.log({ msg: "Error", error: error.message })
            }

        }
    }

}
</script>
<style></style>