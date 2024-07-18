<template>
  <header class="bg-stone-200 flex flex-col justify-between items-center p-4 w-full h-18">
    <div class="flex justify-between w-full">
    <div class="flex gap-4">
      <div class="flex gap-1">
        <div class="w-4 div_green1 h-10 rounded-lg"></div>
        <div class="w-4 div_green2 h-10 rounded-lg"></div>
        <div class="w-4 div_green3 h-10 rounded-lg"></div>
      </div>
      <h1 class="">
        Hello App
      </h1>
    </div>
    <nav class="w-fit flex gap-2 p-2">
      <RouterLink to="/auth"><button>Home</button> </RouterLink>
      <RouterLink to="/auth"><button>Profile</button></RouterLink>
    </nav>
  </div>
  <hr />
  </header>
  <main class="h-full">
    <RouterView class="h-full" />
  </main>
  <footer class="h-8 bg-black w-full text-white text-center">
    Todo app. made by Georgina on july 2024
  </footer>
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
