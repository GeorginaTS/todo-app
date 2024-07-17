<template>
    <div>
        <h3 class="font-bold">{{ todo.title }} 
            <CategoryTag :id="todo.category_id" />

        </h3>
        <p>{{ todo.content }}</p>
        <p class="text-xs">User: {{ todo.user_id }}</p>
        <h4><StatusTag :id="todo.status_id"/></h4>
    </div>
</template>
<script>
import CategoryTag from "./CategoryTag.vue";
import StatusTag from "./StatusTag.vue";

export default {
    name: "CardTodo",
    props: ["todo"],
    components: { CategoryTag, StatusTag },
    data() {
        return {

        }
    }

}
</script>
<style></style>