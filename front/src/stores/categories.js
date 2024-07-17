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
            value.forEach((element) => this.categories.push(element))
            //this.categories.push(value)
          }
          catch(error) {
            console.log({error: error.message})
          }
    }
  },
});
