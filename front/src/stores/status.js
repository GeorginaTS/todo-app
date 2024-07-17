import { defineStore } from "pinia";

export const useStatusStore = defineStore("status", {
  //data
  state: () => ({ 
    status: []
  }),

  //methods
  actions: {
    addStatus(value) {
        try {
            value.forEach((element) => this.status.push(element))
          }
          catch(error) {
            console.log({error: error.message})
          }
    }
  },
});
