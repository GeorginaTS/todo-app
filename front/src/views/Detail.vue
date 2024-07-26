<template>
    <div class="flex flex-col items-center h-full gap-2" v-if="todo">
        <h1 class="w-[90%] bg-green1 p-4  rounded-lg">{{ todo.title }}</h1>
        <div class="w-[90%] p-2 bg-white border border-green2 flex flex-col rounded-lg">
            <div class="flex  justify-between items-center p-4">
                <CategoryTag :id="todo.category_id" v-if="todo.category_id" />
                <StatusTag :id="todo.status_id" v-if="todo.status_id" />
            </div>
            <p class="p-4 bg-white opacity-55">{{ todo.content }}</p>
        </div>
        <div class="text-xs flex justify-end p-2 w-[90%] bg-green3 rounded-lg">{{ todo.createdAt }}</div>
    </div>
</template>
<script>
import CategoryTag from "../components/CategoryTag.vue";
import StatusTag from "../components/StatusTag.vue";

import { useUserStore } from "../stores/user"

export default {
    name: "Detail",
    inject: ["serverUrl"],
    data() {
        return {
            todo: {},
            id: this.$route.params.id,
            category: {}
        }
    },
    setup() {

        const userStore = useUserStore()
        return { userStore }
    },
    components: { CategoryTag, StatusTag },
    async mounted() {

        try {
            const response = await fetch(`${this.serverUrl}/todos/${this.id}`,
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
            } else {
                this.todo = { title: "ToDo don't exist", content: "" }
            }
        } catch {
            console.error('Failed');
            this.$router.push("/")
        }
    }

}
</script>
<style></style>