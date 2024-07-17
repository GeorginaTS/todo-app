<template>
    <div class="bg-slate-400 rounded text-xs w-16 text-center h-fit" v-if="category">
{{ category.name }} 
    </div>
</template>
<script>
import { useCategoriesStore } from "../stores/categories"
export default {
    name: "CategoryTag",
    data() {
        return{
            category:{}
        }
    },
    props: ["id"],
    setup() {
        const categoriesStore = useCategoriesStore()
        return { categoriesStore }
    },
    created() {      
        this.category = this.categoriesStore.categories.find((item) => item.id == this.id)
    }

}
</script>
<style></style>