<template>
  <header class="bg-stone-200 flex flex-col justify-between items-center w-full h-18">
    <div class="flex justify-between w-full p-2  mx-2">
        <RouterLink to="/"><div class="flex gap-4">
          <div class="flex gap-1">
            <div class="w-4 div_green1 h-10 rounded-lg"></div>
            <div class="w-4 div_green2 h-10 rounded-lg"></div>
            <div class="w-4 div_green3 h-10 rounded-lg"></div>
          </div>
          <h1>
            <span class="text-4xl font-extrabold">toDo</span> <span class="text-stone-400">APP</span>
          </h1>
        </div>
        </RouterLink>
        <div>LoggedIn: {{userStore.loggedIn}}</div>
        <nav class="w-fit flex gap-2 items-center mx-2" v-if="userStore.loggedIn">
          <RouterLink to="/auth"><button>Home</button> </RouterLink>
          <RouterLink to="/auth"><button>Profile</button></RouterLink>
        </nav>
      </div>
      <hr />
    </header>
</template>
<script>
import { useUserStore } from "../stores/user"
export default {
  name:"Header",
  setup() {
        const userStore = useUserStore()
        return { userStore }
    },
    
}
</script>
