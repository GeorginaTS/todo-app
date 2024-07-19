<template>
  <div class="flex gap-10 p-4 justify-between w-full div_green2 h-full">
    <div class="w-full p-4 flex flex-col justify-center items-center h-full">
      <h1>Welcome to toDo APP</h1>
      <br><br><br>
      <h3>Register o Sign-in</h3>
    </div>
    <div class="w-full flex justify-center items-center">
      <form method="POST" class="flex flex-col gap-4 div_green1 p-12 rounded-lg w-[80%]" @submit="login">
        <input type="email" name="email" id="email" v-model="email" placeholder="Enter email address">
        <input type="password" name="password" id="password" v-model="password" placeholder="Enter password">
        <button class="button_primary" type="submit">Sign-in</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      email: "georgina@merit.com",
      password: "123456",
      token:""
    }
  },
  methods: {
    async login() {
      try {
        const response = await fetch("http://localhost:3400/api/users/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({"email":this.email, "password": this.password})
                })
                const data = await response.json()
                this.token = data.token
                localStorage.setItem("token", data.token)
                console.log("Data fetch", data, "token localStorage", localStorage.getItem("token"))
                //await response.redirected("http://localhost:5173/auth")
      }
      catch(error) {
        response.send({ msg: "Error", error: error.message })
      }
    }
  }
}
</script>