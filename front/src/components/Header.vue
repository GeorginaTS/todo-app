<template>
    <div class="flex justify-between w-full p-2  mx-2">
        <RouterLink to="/"><div class="flex gap-4">
          <div class="flex gap-1">
            <div class="w-4 div_green1 h-10 rounded-lg"></div>
            <div class="w-4 div_green2 h-10 rounded-lg"></div>
            <div class="w-4 div_green3 h-10 rounded-lg"></div>
          </div>
          <h1 class="">
            Hello App
          </h1>
        </div>
        </RouterLink>
        <nav class="w-fit flex gap-2 items-center mx-2">
          <RouterLink to="/auth"><button>Home</button> </RouterLink>
          <RouterLink to="/auth"><button>Profile</button></RouterLink>
        </nav>
      </div>
      <hr />
</template>
<script>
export default {
    
}
</script>
