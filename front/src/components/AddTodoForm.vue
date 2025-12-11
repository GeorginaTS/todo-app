<template>
    <div class="bg-stone-200 w-[90%] flex flex-col gap-2 p-4 rounded-b-lg">
        <h2 class="text-xl font-bold">Add a new ToDo</h2>
        <div class="flex flex-col gap-2">
            Title: <input type="text" v-model="title">
            Content: <textarea v-model="content"></textarea>
            Category:
            <select v-model="category" class="text-black">
                <option value="0">Select One</option>
                <option v-for="item in categoriesStore.categories" :value="item._id">{{ item.name }}</option>
            </select>
        </div>
        <button  @click="addTodo" class="button_primary w-fit px-10 h-fit">Add</button>
        <div class="bg-slate-200 w-96 p-2" v-if="errors.length>0">
            <div v-for="error in errors">Error: {{ error }}</div>
        </div>
    </div>
</template>
<script>
import { useCategoriesStore } from "../stores/categories"
import { useUserStore } from "../stores/user"
export default {
    name: "AddTodoForm",
    inject: ["serverUrl"],
    data() {
        return {
            title: "",
            content: "",
            category: 0,
            errors: []
        }
    },
    setup() {
        const categoriesStore = useCategoriesStore()
        const userStore = useUserStore()
        return { categoriesStore, userStore }
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
            if (this.errors.length > 0) {
                return false
            } else {
                return true
            }
        },
        async addTodo() {
            this.verifyForm()
            if (this.verifyForm()) {
                const newTodo = {
                    title: this.title,
                    content: this.content,
                    category_id: this.category,
                    user_id: this.userStore.user._id,
                    status_id: "67dd83badd8452a4cfb9014e"
                }
                console.log(newTodo)
                try {
                    const response = await fetch(`${this.serverUrl}/todos`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${this.userStore.token}`
                        },
                        body: JSON.stringify(newTodo)
                    })
                    const data = await response.json()
                    this.$emit('todosUpdated', 1);

                    this.title = ""
                    this.content = ""
                    this.category = 0
                    console.log(data)

                } catch (error) {
                    response.send({ msg: "Error", error: error.message })
                }

            }
        }
    }
}
</script>
<style></style>