<template>
  <Header />
  <main class="h-full w-full">
    <RouterView />
  </main>
  <footer class="h-8 bg-primaryColor w-full text-white flex justify-center items-center">
    Todo app. made by Georgina on july 2024 
  </footer>
</template>
<script>
import { useCategoriesStore } from "./stores/categories"
import { useStatusStore } from "./stores/status"
import { useUserStore } from "./stores/user"
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {Header},
  inject: ["hostUrl", "serverUrl"],
  data() {
    return {
    }
  },
  setup() {
    const categoriesStore = useCategoriesStore()
    const statusStore = useStatusStore()
    const userStore = useUserStore()
    return { categoriesStore, statusStore, userStore }
  },
  async mounted() {
    this.fetchCategories()
    this.fetchStatus()
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await fetch(`${this.serverUrl}/categories`)
        const categories = await response.json()
        //console.log("Categories", categories.data)
        this.categoriesStore.addCategories(categories.data)
      } catch (error) {
        console.log("Error fetchCategories", error.message)
      }
    },
    async fetchStatus() {
      try {
        const response2 = await fetch(`${this.serverUrl}/status`)
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
