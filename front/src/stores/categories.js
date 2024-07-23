import { defineStore } from "pinia";

export const useCategoriesStore = defineStore("categories", {
  //data
  state: () => ({ 
    categories: []
  }),

  //methods
  actions: {
    addCategories(value) {
        try {
            this.categories = []
          value.forEach((element) => this.categories.push(element))
          }
          catch(error) {
            console.log({error: error.message})
          }
    }
  },
});
