import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  //data
  state: () => ({ 
    user: {},
    token:""
  }),

  //methods
  actions: {
    addUser(value) {
        try {
            this.user = value 
          }
          catch(error) {
            console.log({msg:"Error addUser in Store", error: error.message})
          }
    },
    validToken(value) {
        try {
            this.token = value   
          }
          catch(error) {
            console.log({msg:"Error addToken in Store", error: error.message})
          }
    }
  },
});