<template>
    <div>
        <div class="flex justify-between gap-2">
            <h4 class="font-bold">{{ todo.title }} </h4>
            <CategoryTag :id="todo.category_id" />
        </div>
        <p>{{ todo.content }}</p>
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