<template>
  <header class="bg-stone-200 flex flex-col justify-between items-center w-full h-18">
    <Header />
  </header>
  <main class="h-full w-full">
    <RouterView class="h-full w-full" />
  </main>
  <footer class="h-8 div_primary w-full text-white flex justify-center items-center">
    Todo app. made by Georgina on july 2024
  </footer>
</template>
<script>
import { useCategoriesStore } from "./stores/categories"
import { useStatusStore } from "./stores/status"
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {Header},
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
    async fetchCategories() {
      try {
        const response = await fetch("http://localhost:3400/api/categories")
        const categories = await response.json()
        //console.log("Categories", categories.data)
        this.categoriesStore.addCategories(categories.data)
      } catch (error) {
        console.log("Error fetchCategories", error.message)
      }
    },
    async fetchStatus() {
      try {
        const response2 = await fetch("http://localhost:3400/api/status")
        const status = await response2.json()
        this.statusStore.addStatus(status.data)
        // console.log("Status", status.data, this.statusStore.status)
      } catch (error) {
        console.log("Error fetchStatus", error.message)
      }
    },

  }
}
</script>
<style></style>
