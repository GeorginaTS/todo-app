<template>
  <header class="bg-stone-200 flex flex-col justify-between items-center w-full h-18">
    <div class="flex justify-between w-full px-8 py-2">
        <RouterLink to="/" v-if="!userStore.loggedIn"><div class="flex gap-4">
          <div class="flex gap-1">
            <div class="w-4 bg-green1 h-10 rounded-lg"></div>
            <div class="w-4 bg-green2 h-10 rounded-lg"></div>
            <div class="w-4 bg-green3 h-10 rounded-lg"></div>
          </div>
          <h1>
            <span class="text-4xl font-extrabold">toDo</span> <span class="text-stone-400">APP</span>
          </h1>
        </div>
        </RouterLink>
        <RouterLink to="/auth" v-else><div class="flex gap-4">
          <div class="flex gap-1">
            <div class="w-4 bg-green1 h-10 rounded-lg"></div>
            <div class="w-4 bg-green2 h-10 rounded-lg"></div>
            <div class="w-4 bg-green3 h-10 rounded-lg"></div>
          </div>
          <h1>
            <span class="text-4xl font-extrabold">toDo</span> <span class="text-stone-400">APP</span>
          </h1>
        </div>
        </RouterLink>
        <nav class="w-fit flex gap-2 items-center mx-2" v-if="userStore.loggedIn">
          <RouterLink to="/auth/profile"><div class="w-10 h-10 flex justify-center items-center rounded-full text-white font-bold hover:bg-green3  bg-primaryColor">{{userStore.user.name[0]}}</div></RouterLink>
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
