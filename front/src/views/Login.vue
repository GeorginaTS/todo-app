<template>
  <div class="flex gap-10 p-4 justify-between w-full bg-green2 h-full">
    <div class="w-full p-4 flex flex-col justify-center items-center h-full">
      <h1>Welcome to toDo APP</h1>
      <br><br><br>
      <RouterLink to="/register">
        <button class="button_primary">Register</button>
      </RouterLink>
    </div>
    <div class="w-full flex justify-center items-center">
      <div class="flex flex-col gap-4 bg-green1 p-12 rounded-lg w-[80%]">
        <input type="email" name="email" id="email" v-model="email" placeholder="Enter email address">
        <input type="password" name="password" id="password" v-model="password" placeholder="Enter password">
        <button class="button_primary" @click="login">Sign-in</button>
        <p class="flex justify-center text-red-800 bg-red-200" v-if="errorMessage">{{ errorMessage }}</p>
      </div>
      
    </div>
  </div>
</template>
<script>
import { useUserStore } from "../stores/user"
export default {
  name: "Login",
  inject: ["serverUrl", "hostUrl"],
  setup() {
    const userStore = useUserStore()
    return { userStore }
  },
  data() {
    return {
      email: "georgina@merit.com",
      password: "123456",
      token: "",
      errorMessage: ""
    }
  },
  mounted() {
    this.userStore.token = ""
    this.userStore.loggedIn = false
    this.userStore.user = {}
  },
  methods: {
    async login() {
      try {
        const response = await fetch(`${this.serverUrl}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ "email": this.email, "password": this.password })
        })
        if (!response.ok) {
          throw new Error("Credenciales incorrectas");
        }
        const data = await response.json()

        if (data.token != undefined) {
          this.token = data.token
          localStorage.setItem("token", data.token)
          this.userStore.token = this.token
          this.userStore.loggedIn = true
          this.userStore.user = data.user
          this.$router.push('/auth');
        } else {
          this.errorMessage = "User not found or Incorrect Password"
          throw new Error("Credenciales incorrectas");
        }

      }
      catch (error) {
        console.error("Error login:", error.message);
        this.errorMessage = error.message || "Unknown Error";
        this.$router.push('/');
      }
    }
  }
}
</script>