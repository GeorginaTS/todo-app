<template>
    <div class="bg-stone-200 w-[90%] flex flex-col gap-2 p-4 rounded-b-lg">
        <h2 class="text-xl font-bold">Update ToDo</h2>
        <form class="flex flex-col gap-2" @submit="addTodo" v-if="todo">
            Title: <input type="text" v-model="title">
            Content: <textarea v-model="content"></textarea>
            Category:
            <select v-model="category" class="text-black">
                <option v-for="item in categoriesStore.categories" :value="item._id">{{ item.name }}</option>
            </select>
            Status:
            <select v-model="status" class="text-black">
                <option v-for="item in statusStore.status" :value="item._id">{{ item.name }}</option>
            </select>
        </form>
        <button type="submit" @click="updateTodo(todo.id)"
            class="border border-stone-500 py-2 px-10 bg-white w-fit">Update</button>
        <div class="bg-slate-200 w-96 p-2" v-if="errors.length > 0">
            <div v-for="error in errors">Error: {{ error }}</div>
        </div>
    </div>
</template>
<script>
import { useCategoriesStore } from "../stores/categories"
import { useStatusStore } from "../stores/status"
import { useUserStore } from "../stores/user"

export default {
    name: "UpdateTodoForm",
    props: ["todoId"],
    inject: ["serverUrl"],
    data() {
        return {
            todo: { title: "ToDo init", content: "" },
            title: "",
            content: "",
            category: 0,
            status: 0,
            errors: []
        }
    },
    setup() {
        const categoriesStore = useCategoriesStore()
        const statusStore = useStatusStore()
        const userStore = useUserStore()
        return { categoriesStore, statusStore, userStore }
    },
    async mounted() {
        try {
            console.log("user_id", this.userStore.user._id)
            const response = await fetch(`${this.serverUrl}/todos/${this.todoId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${this.userStore.token}`
                    }
                }
            );
            const data = await response.json()
            const todo = data.data
            if (todo) {
                this.todo = todo
                this.title = this.todo.title
                this.content = this.todo.content
                this.category = this.todo.category_id
                this.status = this.todo.status_id
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
                const response = await fetch(`${this.serverUrl}/todos/${value}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${this.userStore.token}`
                        }
                    }
                )
                const data = await response.json()
                const todo = data.data
                if (todo) {
                    this.todo = todo
                    this.title = this.todo.title
                    this.content = this.todo.content
                    this.category = this.todo.category_id
                    this.status = this.todo.status_id
                } else {
                    this.todo = { title: "ToDo don't exist", content: "" }
                }

            } catch (error) {
                response.send({ msg: "Error", error: error.message })
            }
        },
    },
    methods: {
        verifyForm() {
            this.errors = []
            if (this.title.length < 9) {
                this.errors.push("Write Title, min length 8")
            }
            if (this.content.length < 9) {
                this.errors.push("Write content, , min length 8");
            }
            if (this.category == 0) {
                this.errors.push("Category is required")
            }
            if (this.status == 0) {
                this.errors.push("Status is required")
            }
            if (this.errors.length > 0) {
                return false
            } else {
                return true
            }
        },
        async updateTodo() {
            this.verifyForm()
            if (this.verifyForm()) {
                const newTodo = {
                    title: this.title,
                    content: this.content,
                    category_id: this.category,
                    user_id: this.userStore.user._id,
                    status_id: this.status
                }
                console.log("id", this.todoId, "newTodo:", newTodo)
                try {
                    const response = await fetch(`${this.serverUrl}/todos/${this.todoId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${this.userStore.token}`
                        },
                        body: JSON.stringify(newTodo)
                    })
                    const todo = await response.json()

                    this.$emit('todosUpdated', 1);

                    this.title = ""
                    this.content = ""
                    this.category = 0
                    this.status = 0
                    console.log("Todo updated", todo)

                } catch (error) {
                    console.log({ msg: "Error", error: error.message })
                }

            }
        }
    }
}
</script>
<style></style>