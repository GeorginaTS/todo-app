<template>
  <div class="flex gap-10 p-4 justify-between w-full">
    <div class="w-full p-4 flex flex-col justify-center items-center">
      <h1>Welcome to toDo APP</h1>
      <h3>Register o Sign-in</h3>
    </div>
    <div class="w-full flex justify-center items-center">
      <form action="" class="flex flex-col gap-4 bg-white p-12 rounded-lg w-[80%]">
        <input type="email" name="email" id="email" v-model="email" placeholder="Enter email address">
        <input type="password" name="password" id="password" v-model="password" placeholder="Enter password">
        <button>Sign-in</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    }
  }

}
</script>
<style></style>