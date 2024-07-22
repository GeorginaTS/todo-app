import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  //data
  state: () => ({ 
    user: "",
    token:"",
    loggedIn: false
  }),
  inject: ["serverUrl"],

  //methods
  actions: {
    async validToken(token) {
        try {
          
            this.token = token 
            const response = await fetch(`${this.serverUrl}/users/auth`, 
              {
                headers: {
                  "Content-Type": "application/json",
                  "Authorization" : `Bearer ${this.token}`
              }
            })
          const data = await response.json()
          console.log(data)
          this.token = data.token
          localStorage.setItem("token", data.token)
          console.log("Data fetch", data, "token localStorage", localStorage.getItem("token")) 
          return true
          }
          catch(error) {
            console.log({msg:"Error validToken in Store", error: error.message})
            return false
          }
    }
  },
});