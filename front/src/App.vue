<template>
  <h1 class="text-3xl font-bold underline">
    Hello world! 
  </h1>
  <hr class="m-2">
  <RouterView />

</template>
<script>
import { useCategoriesStore } from "./stores/categories"
import { useStatusStore } from "./stores/status"
export default {
  name: "App",
  data() {
    return {

    }
  },
  setup() {
    const categoriesStore = useCategoriesStore()
    const statusStore = useStatusStore()
    return { categoriesStore, statusStore }
  },
  async created() {
      this.fetchCategories()
      this.fetchStatus()
  },
  methods: {
    async fetchCategories(){
      try {
        const response = await fetch("http://localhost:3400/api/categories")
        const categories = await response.json()
        //console.log("Categories", categories.data)
        this.categoriesStore.addCategories(categories.data)
      } catch(error) {
        console.log("Error fetchCategories", error.message)
      }
    },
    async fetchStatus(){
      try {
        const response2 = await fetch("http://localhost:3400/api/status")
        const status = await response2.json()
        this.statusStore.addStatus(status.data)
       // console.log("Status", status.data, this.statusStore.status)
      } catch(error) {
        console.log("Error fetchStatus", error.message)
      }
    }
  }
}
</script>
<style></style>
